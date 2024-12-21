import json
import re
from datetime import datetime

# Paste your TypeScript code here
typescript_code = '''
export const detectionData = {
    color: "#6699cc",
    icon: "/chart.svg",
    title: "Detections",
    url: 'd',
    time: "this week",
    lastNumber: 1000,
    number: 8762,
    percentage: Math.round((8762 - 1000) / 1000 * 100),
    chartData: [
        { name: "Sun", amount: 432 },
        { name: "Mon", amount: 134 },
        { name: "Tue", amount: 1425 },
        { name: "Wed", amount: 234 },
        { name: "Thu", amount: 34 },
        { name: "Fri", amount: 4576 },
        { name: "Sat", amount: 1607 },
    ],
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

# Preprocess JSON data to remove invalid control characters
json_input = re.sub(r'[\x00-\x1F\x7F]', '', json_data)

# Load JSON data
data = json.loads(json_input)

# Extract date and convert to day of the week
date_str = data["date"]
date_obj = datetime.strptime(date_str, "%Y-%m-%d")

# Get abbreviated day (e.g., 'Thu')
day_of_week = date_obj.strftime("%a") 

# Extract chartData from TypeScript code using regex
chart_data_matches = re.findall(r'\{ name:\s*"(.*?)",\s*amount:\s*(\d+)\s*\}', typescript_code) # Code might be wrong, copied from stackoverflow
chart_data = {day: int(amount) for day, amount in chart_data_matches}

new_amount = sum(entry["camCount"] for entry in data["data"])

days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
index_to_update = days_of_week.index(day_of_week)
chart_data[days_of_week[index_to_update]] = new_amount

total_number = sum(chart_data.values())
last_number = int(re.search(r'lastNumber:\s*(\d+)', typescript_code).group(1))
percentage = f'Math.round(({total_number} - {last_number}) / {last_number} * 100)'

typescript_code_updated = f'''
export const detectionData = {{
    color: "#6699cc",
    icon: "/chart.svg",
    title: "Detections",
    url: 'd',
    time: "{day_of_week} this week",
    lastNumber: {last_number}, // Adjust as necessary
    number: {total_number}, // Updated total number
    percentage: {percentage}, // Updated percentage calculation
    chartData: [
        {{ name: 'Sun', amount: {chart_data["Sun"]} }},
        {{ name: 'Mon', amount: {chart_data["Mon"]} }},
        {{ name: 'Tue', amount: {chart_data["Tue"]} }},
        {{ name: 'Wed', amount: {chart_data["Wed"]} }},
        {{ name: 'Thu', amount: {chart_data["Thu"]} }},
        {{ name: 'Fri', amount: {chart_data["Fri"]} }},
        {{ name: 'Sat', amount: {chart_data["Sat"]} }},
   ],
}}
'''

print("Updated Detection Data:")
print(typescript_code_updated)
