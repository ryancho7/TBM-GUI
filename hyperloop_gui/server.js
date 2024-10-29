const WebSocket = require('ws');

// Create a WebSocket server on port 5000
const wss = new WebSocket.Server({ port: 5000 });
let temp = 25;
wss.on('connection', (ws) => {
  console.log('Client connected');


  // Send a test message every 3 seconds to the connected client
  const sendTestData = setInterval(() => {
    temp = temp + Math.random() * 2 - 1;
    const testData = JSON.stringify({
      sensorData: temp, // Example: random sensor data
      timestamp: new Date().toISOString()
    });

    ws.send(testData); // Send data to the client
  }, 100);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(sendTestData); // Stop sending data if the client disconnects
  });
});

console.log('WebSocket server running on ws://localhost:5000');
