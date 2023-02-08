import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
