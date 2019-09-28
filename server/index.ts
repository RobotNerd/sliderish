import {Request, Response} from 'express';
import * as express from 'express';

const app = express();
const cors = require('cors');

const PORT = 3030;

//const testImage = 'images/dots-3x4.png';
const images = [
  'blue-3x4.png',
  'blue-square.png',
  'dots-3x4.png',
  'orange-square.png',
  'pink-4x3.png',
  'striped-4x3.png',
];

app.use(cors());
app.use(express.static(__dirname + '/assets'));
 
app.get('/', function (req: Request, res: Response) {
  const index = Math.floor(Math.random() * images.length);
  res.send(`${req.headers.host}/images/${images[index]}`);
});
 
app.listen(PORT);
