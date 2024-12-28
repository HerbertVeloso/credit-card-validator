import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { router } from '@/router';

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});