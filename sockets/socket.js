const { io } = require('../index');

// Socket Messages
io.on('connection', client => {
  console.log('Client connected');

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('message', data => {
    console.log('Message here:', data);

    io.emit('message', { admin: 'New message' });
  });
});