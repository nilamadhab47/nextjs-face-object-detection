//@ts-nocheck
'use client';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const Page = () => {

  const [image, setImage] = useState(null);

  const handleFile = (e) => {
    console.log("asdasdasd");
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
  }

  useEffect(() => {

    const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImage(reader.result);
    // };

    // reader.readAsDataURL(new Blob(['/Users/pranitpuri/Documents/HyperFuse/test1.png']));

    const socket = io('http://localhost:5003');
    socket.on('connect', () => {
      console.log('Client connected.');
    });

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        console.log(base64Image);
        socket.emit('new_face', {
          'image': base64Image,
        });
      };
      reader.readAsDataURL(image);
    }


    socket.on('new_face_response', (data) => {
      console.log(data);
    });

  }, [image]);

  return (
    <div>
      <h1>Speech Recognition</h1>
    </div>
  );
};

export default Page;