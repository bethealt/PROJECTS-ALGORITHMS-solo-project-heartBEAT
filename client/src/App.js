import React, {useState, useEffect} from 'react';
import {io} from "socket.io-client";
import './App.css';

function App() {
  const myFirstSecret = process.env.FIRST_SECRET_KEY;
  const [socket] = useState(() => io(':8000'));
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
 
  useEffect(() => {
    console.log('Is this running?');
    socket.on('Welcome', data => console.log(data));
    // we need to set up all of our event listeners in the useEffect callback function
    
    return () => socket.disconnect(true);
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent

  }, [socket]);
 
  return (
    <div className="App">
    </div>
  );
}

export default App;
