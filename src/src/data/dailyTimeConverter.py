import json
import re
from datetime import datetime, timedelta, timezone

# Paste your TypeScript code here
typescript_code = '''
export const dailyTime = {
    title: "Daily Human Flow",
    color: "magenta",
    dataKey: 'detection',
    total: 39569,
    chartData: [
        { name: "12 am - 4am",  detection: 51        },
        { name: "4 am - 8 am",  detection: 6513      },
        { name: "8 am - 12 nn", detection: 11651    },
        { name: "12 nn - 4 pm", detection: 6449     },
        { name: "4 pm - 8 pm",  detection: 6161      },
        { name: "8 pm - 12 am", detection: 8771     }
    ]
}
'''

# Paste your JSON data here
json_data = '''
{
  "date": "2024-12-18",
  "data": [
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533866.2384262
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533876.5570369
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533886.5711021
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533896.8917112
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533906.9092834
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533917.8402238
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 1,
      "camCount": 1,
      "timestamp": 1734533928.5255063
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533940.8368118
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533951.529182
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533962.8321075
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533973.5781257
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533983.9032216
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734533993.9282117
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734534004.279091
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734534014.672498
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734534025.0915387
    },
    {
      "className": "Counts",
      "count": 1,
      "touch": 0,
      "camCount": 1,
      "timestamp": 1734534035.182076
    }
  ]
}
'''

def preprocess_json(json_input):
    # Remove invalid control characters using regex
    return re.sub(r'[\x00-\x1F\x7F]', '', json_input)

# Preprocess and load JSON data
json_input = preprocess_json(json_data)

try:
    data = json.loads(json_input)
except json.JSONDecodeError as e:
    print(f"JSON decoding error: {e}")
    print("JSON input was:")
    print(json_input) # Print the problematic JSON for debugging, can be ignored
    exit()

# Dictionary to hold counts for each time range
time_ranges = {
    '12 am - 4am': (0, 4),
    '4 am - 8 am': (4, 8),
    '8 am - 12 nn': (8, 12),
    '12 nn - 4 pm': (12, 16),
    '4 pm - 8 pm': (16, 20),
    '8 pm - 12 am': (20, 24)
}

# Initialize a dictionary to hold counts for each time range
time_count = {name: 0 for name in time_ranges.keys()}

for entry in data["data"]:
    timestamp = entry["timestamp"]
    
    # Convert Unix timestamp to Hong Kong Timezone
    dt = datetime.fromtimestamp(timestamp, tz=timezone.utc) + timedelta(hours=8)
    
    # Determine which time range this falls into
    hour = dt.hour
    for time_range, (start_hour, end_hour) in time_ranges.items():
        if start_hour <= hour < end_hour:
            time_count[time_range] += entry["touch"] # Use entry["touch"] to update detections
            break

# Update chartData with new counts from time_count
chart_data_matches = re.findall(r'\{ name:\s*"(.*?)",\s*detection:\s*(\d+)\s*\}', typescript_code)
chart_data = {name: int(detection) for name, detection in chart_data_matches}

# Override chartData with new values from time_count
for key in chart_data.keys():
    if key in time_count:
        chart_data[key] = time_count[key]

# Calculate total based on updated chart data
total_number = sum(chart_data.values())

# Update TypeScript code with calculated values
typescript_code_updated = f'''
export const dailyTime = {{
    title: "Daily Human Flow",
    color: "magenta",
    dataKey: 'detection',
    total: {total_number}, // Updated total count
    chartData: [
        {{ name: '12 am - 4am', detection: {chart_data["12 am - 4am"]} }},
        {{ name: '4 am - 8 am', detection: {chart_data["4 am - 8 am"]} }},
        {{ name: '8 am - 12 nn', detection: {chart_data["8 am - 12 nn"]} }},
        {{ name: '12 nn - 4 pm', detection: {chart_data["12 nn - 4 pm"]} }},
        {{ name: '4 pm - 8 pm', detection: {chart_data["4 pm - 8 pm"]} }},
        {{ name: '8 pm - 12 am', detection: {chart_data["8 pm - 12 am"]} }}
   ]
}}
'''

print("Updated Total Time Data:")
print(typescript_code_updated)
