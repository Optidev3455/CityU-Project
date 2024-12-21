import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import './chart.scss';

// Define an interface for the detection count data
interface DetectionCount {
    className: string;  // Class name of detected objects
    count: number;      // Number of detections in this interval
    touch: number;      // Number of picked up items in this interval
    timestamp: number;  // UNIX timestamp for when detections occurred
}

const Chart = () => {
    const [data, setData] = useState<DetectionCount[]>(() => {
        const savedData = localStorage.getItem('chartData');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [uploadedData, setUploadedData] = useState<DetectionCount[]>([]);
    const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now()); // Initialize with current time

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/detection_counts');
            const result = await response.json();

            if (result) {
                const newData = [{
                    className: 'Counts',
                    count: result.highestCount,
                    touch: result.touch,
                    camCount: result.diversity,
                    timestamp: result.timestamp
                }];

                setData(prevData => {
                    const updatedData = [...prevData, ...newData];
                    localStorage.setItem('chartData', JSON.stringify(updatedData));
                    return updatedData;
                });

                setLastFetchTime(Date.now());
            }
        } catch (error) {
            console.error('Error fetching detection counts:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            // Fetch data only if 10 seconds have passed since last fetch
            if (currentTime - lastFetchTime >= 10000) {
                fetchData();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lastFetchTime]);

    const clearChart = () => {
        if (window.confirm("⚠️ Warning: Clearing the chart will remove all data and cannot be recovered.\n\nDo you want to proceed?")) {
            setData([]);
            localStorage.removeItem('chartData');
            setLastFetchTime(Date.now()); // Reset last fetch time
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    
                    // Check if the uploaded JSON has the expected structure
                    if (jsonData && jsonData.data) {
                        // Extract only the data part and set it for charting
                        setUploadedData(jsonData.data);
                    } else {
                        console.error('Uploaded JSON does not contain valid data structure.');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };
    
    

    const clearUploadedChart = () => {
        setUploadedData([]);
    };

    const saveChartAsJSON = () => {
        // Get current date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
        const dataToSave = {
            date: formattedDate,
            data: data
        };
    
        const jsonString = JSON.stringify(dataToSave, null, 2); 
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const filename = `data_${formattedDate}.json`;
    
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    
    return (
        <div style={{ height: '100vh', userSelect: 'none' }}>
            <section id='d'>
                <h1>Real-Time Detection Counts</h1>
                <LineChart width={800} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleTimeString('en-GB')}
                        stroke="#fff"
                    >
                        <Label value="Time" offset={-8} position="bottom" fill="#fff" style={{ textAnchor: 'middle' }} />
                    </XAxis>
                    <YAxis stroke="#fff">
                        <Label value="Detections" angle={-90} offset={2} position={'insideLeft'} fill="#fff" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip
                        formatter={(value, name) => {
                            const formattedValue = value.toLocaleString('en-GB');
                            if (name === 'count') {
                                return [formattedValue, 'Detections'];
                            } else if (name === 'touch') {
                                return [formattedValue, 'Picked Up'];
                            }
                            return [formattedValue];
                        }}
                        labelFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleTimeString('en-GB')}
                        contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    <Line type='monotone' dataKey="touch" stroke='#6699cc' />

                </LineChart>

                {data.length > 0 && (
                    <button className="chart-button" onClick={saveChartAsJSON}>Save Chart as JSON</button>
                )}
                &nbsp;
                <button className="chart-button" onClick={clearChart}>Clear Chart</button>
            </section>

            <br /><br /><br /><br />
            <h1>Generate Chart From File</h1>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                    className="upload-button"
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    Choose File
                    <span className="tooltip">Upload your JSON file generated by the charts</span>
                </button>
                &nbsp;
                <input
                    type="file"
                    accept=".json"
                    id="file-input"
                    className="file-input"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {uploadedData.length > 0 && (
                <LineChart width={800} height={400} data={uploadedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp"
                        tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleTimeString('en-GB')}
                        stroke="#fff"
                    >
                        <Label value="Time" offset={-8} position="bottom" fill="#fff" style={{ textAnchor: 'middle' }} />
                    </XAxis>
                    <YAxis stroke="#fff">
                        <Label value="Detections" angle={-90} offset={2} position={'insideLeft'} fill="#fff" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip
                        formatter={(value, name) => {
                            const formattedValue = value.toLocaleString('en-GB');
                            if (name === 'count') {
                                return [formattedValue, 'Detections'];
                            } else if (name === 'touch') {
                                return [formattedValue, 'Picked Up'];
                            }
                            return [formattedValue];
                        }}
                        labelFormatter={(timestamp) => new Date(timestamp * 1000).toLocaleTimeString('en-GB')}
                        contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    <Line type='monotone' dataKey="touch" stroke='#6699cc' />

                </LineChart>
            )}
            <button className="chart-button" onClick={clearUploadedChart}>Clear Chart</button>
        </div>
    );
};

export default Chart;