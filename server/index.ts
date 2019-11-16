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


const MAX: number = 20;
const cycleLimit: number = 10;
var shown: number = 0;
var basePath = order.getNext();
var picker = new FilePicker(order.getNext());
function getImage(host: string, count: number = 1): string[] {
  if (shown > cycleLimit) {
    shown = 0;
    basePath = order.getNext();
    picker = new FilePicker(basePath);
  }
  shown += count;
  const imagePaths = [];
  for (let imagePath of picker.getNext(count)) {
    if (imagePath) {
      imagePaths.push(
        `http://${host}/` +
        imagePath.substring(__dirname.length + '/assets/'.length)
      );
    }
    else {
      console.log("WARNING: imagePath is undefined or empty string");
      console.log(imagePaths);
    }
  };
  return imagePaths;
}

app.use(cors());
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req: Request, res: Response) {
  var count: number = req.query.count ? parseInt(req.query.count) : 1;
  if (count > MAX) {
    count = MAX;
  }
  else if (count <= 0) {
    count = 1;
  }
  res.send(getImage(req.headers.host as string, count));
});

app.listen(PORT);
