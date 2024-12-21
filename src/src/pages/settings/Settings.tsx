import { useEffect, useState } from 'react';
import './settings.scss';

const Settings = () => {
    const [apiStatus, setApiStatus] = useState<string>('Checking...');
    const [cameraStatus, setCameraStatus] = useState<string>('Checking...');

    const checkApiStatus = async () => {
        setApiStatus('Checking...');
        try {
            const response = await fetch('127.0.0.1/api/detection_counts');
            if (response.ok) {
                setApiStatus('API is online');
            } else {
                setApiStatus('API is offline');
            }
        } catch (error) {
            console.error(error);
            setApiStatus('Failed to check API Status');
        }
    };

    const checkCameraStatus = async () => {
        setCameraStatus('Checking...');
        try {
            const response = await fetch('127.0.0.1/video_feed');
            if (response.ok) {
                setCameraStatus('Camera is online');
            } else {
                setCameraStatus('Camera is offline');
            }
        } catch (error) {
            console.error(error);
            setCameraStatus('Failed to check Camera Status');
        }
    };

    useEffect(() => {
        checkApiStatus();
        checkCameraStatus();
    }, []);

    return (
        <div style={{height: '100vh', userSelect: 'none'}}>
            <h2>API Status</h2>
            <br />
            <p>{apiStatus}</p> <br />
            <button onClick={checkApiStatus} className='check-button'>Check API Status</button>
            <br /><br />
            <h2>Camera Status</h2>
            <br />
            <p>{cameraStatus}</p><br />
            <button onClick={checkCameraStatus} className='check-button'>Check Camera Status</button>
            <br /><br />
            <p>Please contact a technician if something is wrong.</p>
        </div>
    );
};

export default Settings;
