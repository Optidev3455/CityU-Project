# YOLO Object Detection Project

## Overview

This project implements an object detection AI by using the YOLO model from Ultralytics. It can recognize different items in real time using a camera or a video file. The model has been trained to identify between things and people. This project also includes a dashboard for quick data visualization
and management.

## Project Capabilities

- **Real Time Detection**: It has the ability to identify things in real-time by analyzing the frames that was captured by the camera or in a video file.
- **High Accuracy**: It can give real-time results with high accuracy and few to no errors for everyday objects.
- **Two-way Detection**: The model is capable of detecting from both a video file and camera inputs.
- **Performance Monitoring**: It includes an FPS counter and an FPS graph for video captures.
- **Real Time Graph Plotting**: Running the Flask server allows the graphs in the dashboard to be updated in real-time.
- **Offline Working**: This project is hosted locally meaning you do not need to be connected to the Internet for it to run.

## Requirements

To run this project, you need to have the following dependencies installed:

- Python >= 3.10
- Ultralytics 8.3.39
- Nvidia-cuda-runtime-cu12 12.6.77
- Opencv-python 4.10.0.84
- Flask 3.1.0
- Flask-Cors 5.0.0
- Numpy 1.26.4
- Torch 2.3.0+cu121
- Torchaudio 2.3.0+cu121
- Torchvision 0.18.0+cu121
- React 18.0.0
- Typescript 5.6.2
- Electron 33.2.1
- Vite 6.0.1
- Sass 1.82.0

> [!TIP]
> It is suggested to use a GPU with CUDA compatibility if you want to achieve high FPS during video detection.

You can install the required python packages using the following command:

> [!WARNING]
> The command to install python dependencies only works with windows with python version 3.12

```bash
pip install -r requirements.txt
```

Please install pytorch separately and include this argument to install pytorch with cuda support `--index-url https://download.pytorch.org/whl/cu121`

You can install the required node packages using the following command:
```bash
npm i -D
```

## Running

To run this project, make sure you have installed all the packages required.

> [!NOTE]
> Before running electron, make sure your Flask server is up or else the detection and graph plotting features won't work.

To do that run the follow command to open up camera detection server:
```bash
python camera_detection_flask.py
```

Or
```bash
python video_detection_flask.py
```
To open up video detection server.

After running flask server, run the following command to start electron and vite:
```bash
npm run dev
```

After running the command, something like this will pop up in the terminal and a electron app will pop up.
```
VITE v6.0.3  ready in XXXX ms

➜  Local:   http://localhost:5123/
```

You can use both the electron app or in the browser by using the `localhost:5123` ip.