import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const socket = io('http://localhost:8080'); // Connect to WebSocket server

const VMeditor = () => {
  const [code, setCode] = useState('//write your code here....');

  useEffect(() => {
    // Listen for incoming data from the WebSocket server
    socket.on('editor-data', (data) => {
      console.log('Received:', data);
      setCode(data);  // Update the code state with the received data
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off('editor-data');
    };
  }, []);

  useEffect(() => {
    if (code) {
      // Emit the updated code to the server whenever it changes
      console.log("Sent:", code);
      socket.emit('editor-data', code);
    }
  }, [code]); // Run this effect whenever the `code` state changes

  return (
    <div>
      <Editor
        value={code}
        onValueChange={(newCode) => setCode(newCode)} // Update state on value change
        highlight={(code) => highlight(code, languages.javascript)}
        padding={10}
        style={{
          fontSize: 30,
          height: '600px',
        }}
      />
    </div>
  );
};

export default VMeditor;
