import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import Routes from './routes/Routes';

const app = express();
const cors = require('cors');

const { spawn } = require('child_process');
const path = require('path')
//mongodump --forceTableScan  --db=supernote --archive=./supernote.gzip --gzip

const DB_NAME = process.env.DB_NAME
const ARCHIVE_PATH = path.join(__dirname, 'public', `${DB_NAME}.gzip`)

backupMongoDB()

function backupMongoDB() {
  const child = spawn('mongodump', [
    '--forceTableScan',
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ]);

  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data)
  });

  child.stderr.on('data', (data) => {
    console.log('stderr:\n', data)
  });

  child.on('error', (error) => {
    console.log('error:\n', error)
  });
  
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code)
    else if (signal) console.log('Process killed with signal:', signal)
    else console.log('Backup is successful')
  });
}

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