import {Request, Response} from 'express';
import {ImagePicker} from './src/image';
import * as cors from 'cors';
import * as express from 'express';
import * as sanitize from './src/sanitize';

const app = express();
const PORT = 3030;
const PATHS = [
  `${__dirname}/assets/alaska`,
  `${__dirname}/assets/pics`,
];
const imagePicker = new ImagePicker(PATHS, __dirname + '/assets/');

app.use(cors());
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req: Request, res: Response) {
  const count = sanitize.requestedCount(req);
  res.send(imagePicker.getImages(req.headers.host as string, count));
});

app.listen(PORT);
