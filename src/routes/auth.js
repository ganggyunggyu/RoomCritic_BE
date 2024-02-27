import express from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/UserModel.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { JoinRequestDTO } from '../DTO/auth/JoinRequestDTO.js';
import { LoginRequestDTO } from '../DTO/auth/LoginRequestDTO.js';
import GenreScore from '../Models/GenreScoreModel.js';

const router = express.Router();
router.use(passport.session());

router.post('/join', async (req, res) => {
  const joinRequestDTO = new JoinRequestDTO(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const emailCheck = await User.findOne({ email: req.body.email });
    const phoneNumberCheck = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (emailCheck) {
      return res.status(201).json({ message: '중복되는 이메일이 있습니다' });
    }
    if (phoneNumberCheck) {
      return res.status(201).json({ message: '중복되는 휴대폰 번호가 있습니다' });
    }
    const user = new User({
      email: req.body.email,
      password: hashPassword,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
      role: 'user',
      reviewCount: 0,
    });
    const initialGenreScores = [
      { genre_id: 12, genre_name: '모험', score: 0, count: 0 },
      { genre_id: 14, genre_name: '판타지', score: 0, count: 0 },
      { genre_id: 16, genre_name: '애니메이션', score: 0, count: 0 },
      { genre_id: 18, genre_name: '드라마', score: 0, count: 0 },
      { genre_id: 27, genre_name: '공포', score: 0, count: 0 },
      { genre_id: 28, genre_name: '액션', score: 0, count: 0 },
      { genre_id: 35, genre_name: '코미디', score: 0, count: 0 },
      { genre_id: 36, genre_name: '역사', score: 0, count: 0 },
      { genre_id: 37, genre_name: '서부', score: 0, count: 0 },
      { genre_id: 53, genre_name: '스릴러', score: 0, count: 0 },
      { genre_id: 80, genre_name: '범죄', score: 0, count: 0 },
      { genre_id: 99, genre_name: '다큐멘터리', score: 0, count: 0 },
      { genre_id: 878, genre_name: 'SF', score: 0, count: 0 },
      { genre_id: 9648, genre_name: '미스터리', score: 0, count: 0 },
      { genre_id: 10402, genre_name: '음악', score: 0, count: 0 },
      { genre_id: 10749, genre_name: '로맨스', score: 0, count: 0 },
      { genre_id: 10751, genre_name: '가족', score: 0, count: 0 },
      { genre_id: 10752, genre_name: '전쟁', score: 0, count: 0 },
      { genre_id: 10759, genre_name: '어드벤처', score: 0, count: 0 },
      { genre_id: 10762, genre_name: '키드', score: 0, count: 0 },
      { genre_id: 10763, genre_name: '뉴스', score: 0, count: 0 },
      { genre_id: 10764, genre_name: '리얼리티', score: 0, count: 0 },
      { genre_id: 10765, genre_name: '판타지', score: 0, count: 0 },
      { genre_id: 10766, genre_name: '댄스', score: 0, count: 0 },
      { genre_id: 10767, genre_name: '토크', score: 0, count: 0 },
      { genre_id: 10768, genre_name: '정치', score: 0, count: 0 },
      { genre_id: 10770, genre_name: 'TV 영화', score: 0, count: 0 },
    ];

    const saveUser = await user.save();

    const newGenreScore = new GenreScore({
      user_id: saveUser._id,
      review_count: 0,
      genre_scores: initialGenreScores,
    });

    await newGenreScore.save();

    res.status(200).json({ message: '회원가입 성공' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: '회원가입 실패' });
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // 이 부분을 'email'로 설정
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return cb(null, false, { message: '존재하지 않는 이메일 입니다.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return cb(null, false, { message: '비밀번호를 확인해주세요.' });
        }
        return cb(null, user);
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    },
  ),
);
//세션 생성
//유저에 대한 정보를 받아서 세션을 생성
passport.serializeUser((user, done) => {
  console.log('세션 생성', user);
  process.nextTick(() => {
    done(null, {
      user,
    });
  });
});
//쿠키 분석
//req.user 사용 가능
passport.deserializeUser(async (user, done) => {
  console.log('쿠키 분석', user);
  process.nextTick(() => {
    done(null, user);
  });
});

router.post('/login', async (req, res, next) => {
  const loginRequestDTO = new LoginRequestDTO(req.body);
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log(user);
      res.status(200).json({ message: '로그인 성공', isLoggedIn: true, userInfo: { ...user } });
    });
  })(req, res, next);
});

router.get('/login/check', async (req, res) => {
  console.log(req.user);
  try {
    if (!req.user) {
      return res
        .status(201)
        .json({ message: '세션 만료', isLoggedIn: false, userInfo: { ...req.user } });
    }
    return res.status(200).json({
      message: '세션 유지',
      isLoggedIn: true,
      userInfo: { ...req.user },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.clearCookie('connect.sid').status(200).json({ message: '로그아웃 성공' });
  });
});

export default router;
