import React, { useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './CallComponent.css';

const CallComponent = () => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  const localVideoRef = useRef(null);

  const joinCall = async () => {
    const appId = '6ca7c34439524ba3aeac33e47938cf61';
    const token = '007eJxTYLgt67Q9SvPzjIPf7MOP8MxeXvWyLbfV7UtH0WrlJ//suJkUGMySE82TjU1MjC1NjUySEo0TUxOTjY1TTcwtjS2S08wMLyyNSG8IZGQIkVnLwsgAgSA+C0NJam4BAwMAlr4gIA==';
    const channel = 'temp';

    // Join the channel
    await client.join(appId, channel, token, null);

    // Publish local video
    const localTrack = await AgoraRTC.createCameraVideoTrack();
    localTrack.play(localVideoRef.current);
    await client.publish([localTrack]);
  };

  return (
    <div className="call-component">
      <div ref={localVideoRef} className="video-stream"></div>
      <button onClick={joinCall}>Join Call</button>
    </div>
  );
};

export default CallComponent;
