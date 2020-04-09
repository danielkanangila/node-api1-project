import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

// Setting api routes
app.use('/api', routes);

export default app;