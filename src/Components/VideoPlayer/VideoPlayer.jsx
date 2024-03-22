import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = ({data}) => {
  const videoRef = useRef();
  const { elm } = useParams()



  return (
    <div className='my-5'>
      <video src={data} ref={videoRef} width="800" height="600" controls />
    </div>
  );
};

export default VideoPlayer;