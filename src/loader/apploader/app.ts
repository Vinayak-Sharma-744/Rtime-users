// import express from "express"
// import router from "../../routes/route"
// import dotenv from "dotenv"
// import morgan from "morgan"
// import cors from "cors"
// import session from "express-session"
// import passport from "passport"
// import cron from "node-cron"
// import { countUserCron } from "../../helper/helper"


// dotenv.config()

// const appLoader = () =>  {
//   process.on('uncaughtException', (err) => {
//     console.error('Uncaught Exception:', err);
//     process.exit(1);
// });

//   const port = process.env.PORT;
//   const app = express()
//   app.use(express.json())
//   app.use(session({
//     secret: String(process.env.SESSION_SECRET),
//     resave: false,
//     saveUninitialized: false
//   }))

//   app.use(passport.initialize())
//   app.use(passport.session())

//   app.use(morgan('dev'))
//   app.use(cors())
//   app.use(router)
    
//   app.listen(port,()=>{
//     console.log("server is running on port: ", port)
//   })

//   cron.schedule('3 10 * * *', countUserCron)
// }

// export default appLoader

import express, { Request, Response, NextFunction } from 'express';
import router from '../../routes/route';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cron from 'node-cron';
import { countUserCron } from '../../helper/helper';



dotenv.config();

const appLoader = () => {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });

  const port = process.env.PORT;
  const app = express();
  // app.use(express.json());
  app.use(
    session({
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(morgan('dev') as (req: Request, res: Response, next: NextFunction) => void);


  app.use(passport.initialize());
  app.use(passport.session());

  // Explicitly provide types for morgan
  app.use(morgan('dev') as (req: Request, res: Response, next: NextFunction) => void);

  app.use(cors());
  app.use(router);

  app.listen(port, () => {
    console.log('server is running on port: ', port);
  });

  cron.schedule('3 10 * * *', countUserCron);
};

export default appLoader;

