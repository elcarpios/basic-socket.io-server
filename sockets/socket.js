const { io } = require('../index');
const Band = require('../models/Band');
const Bands = require('../models/Bands');
console.log('Init server');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Carpio'));
bands.addBand(new Band('Killers'));
bands.addBand(new Band('Amaral'));

// Socket Messages
io.on('connection', client => {
  console.log('Client connected');

  client.emit('active-bands', bands.getBands());

  client.on('vote-band', payload => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });

  client.on('add-band', payload => {
    bands.addBand(new Band(payload.name));
    io.emit('active-bands', bands.getBands());
  });

  client.on('delete-band', payload => {
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  })

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('new-message', payload => {
    console.log('Message here:', payload);

    client.broadcast.emit('new-message', { data: 'New message' });
  });
});