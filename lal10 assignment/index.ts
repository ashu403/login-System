import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import db from './models';
import {globalErrorHandler} from './utils/globalErrorHandler';
import authRouter from './routes/auth';
import helmet from "helmet";

const app = express();

// enabling the Helmet middleware
app.use(helmet());


app.use(function (req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  db.sequelize.sync().then(() => {
    console.log("DB synced succesfully!");
}).catch((err: any) => {
    console.error("Failed to Sync DB: " + err.message);
});

app.use(bodyParser.json())

app.use('/v1/api', authRouter);

const server = http.createServer(app);
app.use(globalErrorHandler);


server.listen(process.env.PORT ?? 3000, async ()=> {
  console.log('server is listening to port 3000')    
});

export default app;