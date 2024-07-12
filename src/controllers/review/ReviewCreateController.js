import GenreScore from '../../Models/GenreScoreModel.js';
import Movie from '../../Models/MovieModel.js';
import Review from '../../Models/ReviewModel.js';
import Tv from '../../Models/TvModel.js';

//내 리뷰를 가져온다
//

export default class ReviewCreateController {
  async createReview(reviewDTO) {
    const newReview = new Review(reviewDTO);
    const movieGenre = await Movie.findOne({ _id: reviewDTO.contentId }, { genre_ids: 1, _id: 0 });
    const tvGenre = await Tv.findOne({ _id: reviewDTO.contentId }, { genre_ids: 1, _id: 0 });
    const reviewCount = await Review.countDocuments({ userId: reviewDTO.userId });

    console.log(movieGenre, tvGenre);

    if (tvGenre) {
      const genreScore = await GenreScore.findOne({ user_id: reviewDTO.userId });

      for (const g_s of genreScore.genre_scores) {
        for (const t_g of tvGenre.genre_ids) {
          if (g_s.genre_id === t_g) {
            g_s.score += reviewDTO.grade;
            g_s.count += 1;
          }
        }
      }
      genreScore.review_count = reviewCount;
      await genreScore.save();
    }
    if (movieGenre) {
      const genreScore = await GenreScore.findOne({ user_id: reviewDTO.userId });

      for (const g_s of genreScore.genre_scores) {
        for (const t_g of movieGenre.genre_ids) {
          if (g_s.genre_id === t_g) {
            g_s.score += reviewDTO.grade;
            g_s.count += 1;
          }
        }
      }
      genreScore.review_count = reviewCount;
      await genreScore.save();
    }

    await newReview.save();

    return { message: '게시글 생성 완료' };
  }
}
