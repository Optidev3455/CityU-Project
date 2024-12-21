import cv2
import time
from ultralytics import YOLO
import numpy as np
from flask import Flask, Response, redirect, url_for, jsonify
from flask_cors import CORS
import math
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)

"""
TODO:
run tests
"""

# Global variables
Video = 'video/vid1.mp4'  # Path to your video file or use 0 for webcam
Camera = cv2.VideoCapture(Video)

# Load YOLO model (use v8n for speed or v8x for precision)
Model = YOLO("yolov8n.pt").cuda() 

total_boxes_drawn = 0
cameraCount = 1
frames_counted = 0
highest_count = 0
last_count_time = time.time()
PreviousFrame = time.time()
touched = 0
touch_coordinates = []

def getCurrentFPS():
    global PreviousFrame
    CurrentFrame = time.time()
    FPS = 1 / (CurrentFrame - PreviousFrame) if PreviousFrame != CurrentFrame else 0.0
    PreviousFrame = CurrentFrame
    return FPS

def PutFPSText(Frame):
    FPS = getCurrentFPS()
    cv2.putText(
        Frame,
        f"FPS: {FPS:.2f}",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )
    return Frame

def DetectAndCountTouch(Results, Frame, TargetObjects, TouchThreshold):
    global total_boxes_drawn, frames_counted, highest_count, touched, touch_coordinates
    
    persons = []
    objects = []
    
    touch_count = 0  
    current_boxes = len(Results[0].boxes) if Results[0].boxes is not None else 0

    for Box in Results[0].boxes:
        X1, Y1, X2, Y2 = map(int, Box.xyxy[0])
        Class = int(Box.cls[0])
        Label = Model.names[Class]

        if Label == "person":
            persons.append((X1, Y1, X2, Y2))
        elif Label in TargetObjects:
            objects.append((X1, Y1, X2, Y2))

    # Use a set to track unique object centers that are counted
    counted_objects = set()

    for px1, py1, px2, py2 in persons:
        person_center = ((px1 + px2) // 2, (py1 + py2) // 2)
        for ox1, oy1, ox2, oy2 in objects:
            object_center = ((ox1 + ox2) // 2, (oy1 + oy2) // 2)
            distance = np.sqrt((person_center[0] - object_center[0])**2 + 
                               (person_center[1] - object_center[1])**2)
            if distance < TouchThreshold and object_center not in counted_objects:
                touch_count += 1
                counted_objects.add(object_center)  # Mark this object as counted
                
                touch_coordinates.append(object_center)

    for px1, py1, px2, py2 in persons:
        cv2.rectangle(Frame, (px1, py1), (px2, py2), (0, 255, 0), 2)
    for ox1, oy1, ox2, oy2 in objects:
        cv2.rectangle(Frame, (ox1, oy1), (ox2, oy1), (255, 0, 0), 2)

    cv2.putText(
        Frame,
        f"Touch Count: {touch_count}",
        (10, 60),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        2,
    )

    # Update global counts
    total_boxes_drawn += current_boxes
    frames_counted += 1
    
    # Update highest count if current boxes exceed it
    if current_boxes > highest_count:
        highest_count = current_boxes

    touched = touch_count
        
    return touch_count

def generate_frames():
    while True:
        Ret, Frame = Camera.read()
        
        if not Ret:
            break
        
        Results = Model.predict(
            source=Frame,
            imgsz=640,
            conf=0.3,
            verbose=False
        )

        TargetObjects = ["cell phone", "bottle", 'can', 'scissors', 'chair', 'laptop']
        TouchThreshold = 1250
        
        DetectAndCountTouch(Results, Frame.copy(), TargetObjects, TouchThreshold)

        PutFPSText(Frame)

        ret, buffer = cv2.imencode('.jpg', Frame)
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

def generate_heatmap(Frame):
    global touch_coordinates
    
    heatmap_image = np.zeros((480, 640), dtype=np.float32)  

    for x, y in touch_coordinates:
        if 0 <= x < 640 and 0 <= y < 480:  
            heatmap_image[y-10:y+10, x-10:x+10] += 10   # Increase dot size and intensity

    heatmap_image = cv2.GaussianBlur(heatmap_image.astype(np.float32), (21, 21), 0)
    heatmap_image = cv2.normalize(heatmap_image.astype(np.float32), None, alpha=0,
                                   beta=255,norm_type=cv2.NORM_MINMAX)

    heatmap_color = cv2.applyColorMap(np.uint8(heatmap_image), cv2.COLORMAP_JET)

    overlay_frame = cv2.addWeighted(Frame.copy(), 0.5 , heatmap_color.astype(np.uint8), 0.5 , 0)
    
    return overlay_frame

def generate_heatmap_frames():
    while True:
        Ret, Frame = Camera.read()
        
        if not Ret:
            break
        
        Results = Model.predict(
            source=Frame,
            imgsz=640,
            conf=0.3,
            verbose=False
        )

        TargetObjects = ["cell phone", "bottle", 'can', 'scissors', 'chair', 'laptop']
        TouchThreshold = 1250
        
        DetectAndCountTouch(Results, Frame.copy(), TargetObjects, TouchThreshold)

        overlay_frame = generate_heatmap(Frame) 

        ret , buffer= cv2.imencode('.jpg', overlay_frame)

        yield (b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/')
def home():
   """Home route to redirect to video feed."""
   return redirect(url_for('video_feed'))

@app.route('/api/detection_counts', methods=['GET'])
def get_detection_counts():
   """Endpoint to get the highest count of boxes drawn over the last ten seconds."""
    
   global total_boxes_drawn
   global frames_counted
   global highest_count
   global last_count_time
   
   current_time = time.time()
   
   elapsed_time = current_time - last_count_time
   
   if elapsed_time >= 10:
       response_data = {
           "highestCount": math.ceil(highest_count /10),
           "timestamp": current_time,
           "touch": touched,
           "diversity": cameraCount
       }
       
       total_boxes_drawn = 0  
       frames_counted = 0
        
       highest_count = 0       
       last_count_time = current_time
        
       return jsonify(response_data)
   
   return jsonify({
       "highestCount": highest_count,
       "timestamp": current_time,
       "touched": touched,
       "diversity": cameraCount
   })

@app.route('/video_feed')
def video_feed():
   """Video feed route."""
   return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/heatmap')
def heatmap():
   """Heatmap route."""
   return Response(generate_heatmap_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
   logging.getLogger("ultralytics").setLevel(logging.ERROR)
   
   print("Starting video stream...")
   
   try:
       app.run(host='0.0.0.0', port=5000)
   finally:
       Camera.release()
       cv2.destroyAllWindows()
