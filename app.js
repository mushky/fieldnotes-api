import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import Routes from './routes/Routes';

const app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/', Routes);

mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true  })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database ' + error);
  });
// Handles DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead warning
mongoose.set('useCreateIndex', true);
// set up port
const port = process.env.PORT || 3001;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project Support',
  });
});

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});

// , "192.168.1.75"