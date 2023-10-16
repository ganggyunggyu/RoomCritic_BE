/** @format */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = () =>
  main()
    .then(() => {
      console.log('DB연결완료');
      // const catSchema = new mongoose.Schema({
      //   name: String,
      // });
      // const Cat = mongoose.model('Cat', catSchema);

      // // 새로운 고양이 생성 및 저장
      // const kitty = new Cat({ name: 'Zildjian' });

      // kitty.save().then(() => {
      //   console.log('고양이가 저장되었습니다.');
      // });
    })
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default db;
