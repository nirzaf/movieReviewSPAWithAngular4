using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data.Contracts
{
    public interface IMovieReviewUow
    {
        void Commit();
        IRepository<Image> Images { get; }
        IRepository<Movie> Movies { get; }
        IRepository<MovieReview> MovieReviews { get; }
    }
}
