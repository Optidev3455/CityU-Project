import json
import re
from datetime import datetime

# Paste your TypeScript code here
typescript_code = '''
export const pickedData = {
    color: "#61dafb",
    icon: "/chart.svg",
    title: "Picked Up Products",
    url: 'cu',
    time: "this week",
    lastTotal: 109,
    total: 97,
    percentage: Math.round((97 - 109) / 109 * 100),
    number: Math.round(97 / 24) + ' /h',
    chartData: [
        { name: "Sun", amount: 13 },
        { name: "Mon", amount: 14 },
        { name: "Tue", amount: 15 },
        { name: "Wed", amount: 14 },
        { name: "Thu", amount: 14 },
        { name: "Fri", amount: 14 },
        { name: "Sat", amount: 13 }
    ]
}
'''

# Paste your JSON data for pickedData here
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

# Extract date and convert to day of the week
date_str = data["date"]
date_obj = datetime.strptime(date_str, "%Y-%m-%d")

# Get abbreviated day (e.g., 'Wed')
day_of_week = date_obj.strftime("%a") 

# Extract chartData from TypeScript code using regex
chart_data_matches = re.findall(r'\{ name:\s*"(.*?)",\s*amount:\s*(\d+)\s*\}', typescript_code)
chart_data = {day: int(amount) for day, amount in chart_data_matches}
total_touch_count = sum(i["touch"] for i in data["data"])

chart_data[day_of_week] = total_touch_count
total_number = sum(chart_data.values())
last_total = int(re.search(r'lastTotal:\s*(\d+)', typescript_code).group(1))
percentage = f'Math.round(({total_number} - {last_total}) / {last_total} * 100)'

# Update TypeScript code with calculated values
typescript_code_updated = f'''
export const pickedData = {{
    color: "#61dafb",
    icon: "/chart.svg",
    title: "Picked Up Products",
    url: 'cu',
    time: "this week",
    lastTotal: {last_total},
    total: {total_number}, // Updated total count
    percentage: {percentage}, // Updated percentage calculation
    number: Math.round({total_number} / 24) + ' /h', // Updated hourly rate calculation
    chartData: [
        {{ name: 'Sun', amount: {chart_data["Sun"]} }},
        {{ name: 'Mon', amount: {chart_data["Mon"]} }},
        {{ name: 'Tue', amount: {chart_data["Tue"]} }},
        {{ name: 'Wed', amount: {chart_data["Wed"]} }},
        {{ name: 'Thu', amount: {chart_data["Thu"]} }},
        {{ name: 'Fri', amount: {chart_data["Fri"]} }},
        {{ name: 'Sat', amount: {chart_data["Sat"]} }}
   ]
}}
'''

# Print updated TypeScript code for pickedData
print("Updated Picked Data:")
print(typescript_code_updated)
