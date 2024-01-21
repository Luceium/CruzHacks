import { useEffect } from 'react';
const WebSocket = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1337');
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    ws.onmessage = (event) => {
      // Handle incoming messages
      console.log('Received:', event.data);
    };
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    return () => {
      ws.close();
    };
  }, []);
  return <div>WebSocket Example</div>;
};
export default WebSocket;