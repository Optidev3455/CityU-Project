import { useState, useEffect } from 'react';
import "./camera.scss";


const Camera = () => {
    const [hasVideoFeed, setHasVideoFeed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkVideoFeed = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/video_feed', {
                    method: 'HEAD'
                });
                setHasVideoFeed(response.ok);
            } catch (error) {
                console.error("Error fetching video feed:", error);
                setHasVideoFeed(false);
            } finally {
                setIsLoading(false);
            }
        };

        // Check for video feed every few seconds (optional)
        const intervalId = setInterval(checkVideoFeed, 5000);
        checkVideoFeed();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='center'>
            <h1>Live Camera Feed</h1>
            <div className="camera">
                {isLoading ? (
                    <div className="loading-panel">
                        <h2>Connecting to camera...</h2>
                    </div>
                ) : hasVideoFeed ? (
                    <img src="http://127.0.0.1:5000/video_feed" alt="Video Feed" />
                ) : (
                    <div className="no-input-panel">
                        <h2>Fatal Error: No Video Input</h2>
                        <p>Please check your camera or video source.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Camera;
