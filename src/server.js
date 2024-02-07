import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import dbConection from './db.js';
import authRouter from './routes/auth.js';
import reviewRouter from './routes/review.js';
import passport from 'passport';

dotenv.config();

const app = express();

app.listen(process.env.PORT_URL || 4000, () => {
  console.log(`${process.env.PORT_URL}번 포트에서 서버 열림!`);

  dbConection();
});

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 * 60,
      httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함 localhost, ip일때는 쓰면 안된다. 저장안됨
      sameSite: 'none',
      secure: true,
    },
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  }),
);

app.use('/auth', authRouter);
app.use('/review', reviewRouter);
