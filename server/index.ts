import {Request, Response} from 'express';
import * as express from 'express';
import * as cors from 'cors';

const app = express();
const PORT = 3030;
const PATHS = [
  `${__dirname}/assets/alaska`,
  `${__dirname}/assets/pics`,
];

import { FilePicker } from './src/file-picker';
import { PathOrder } from './src/path-order';
const order = new PathOrder(PATHS);


var cycleLimit = 10;
var shown = 0;
var basePath = order.getNext();
var picker = new FilePicker(order.getNext());
function getImage(): string {
  if (shown > cycleLimit) {
    shown = 0;
    basePath = order.getNext();
    picker = new FilePicker(basePath);
  }
  shown++;
  const imagePath = picker.getNext().substring(__dirname.length + '/assets/'.length);
  return imagePath;
}

app.use(cors());
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req: Request, res: Response) {
  res.send(`http://${req.headers.host}/${getImage()}`);
});

app.listen(PORT);
