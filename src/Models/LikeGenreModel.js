import mongoose from 'mongoose';

const likeGenreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true, uniqe: true },
  genre_count: [{ genre_id: Number, count: Number }], // 장르 번호와 해당 장르의 리뷰 수를 저장하는 배열
});

const LikeGenre = mongoose.model('LikeGenre', likeGenreSchema);

export default LikeGenre;
