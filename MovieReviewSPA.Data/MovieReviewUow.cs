using System;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Data.Helpers;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data
{
    public class MovieReviewUow : IMovieReviewUow, IDisposable
    {
        public MovieReviewUow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();
            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }

        public IRepository<Movie> Movies { get { return GetStandardRepo<Movie>(); } }
        public IRepository<MovieReview> MovieReviews { get { return GetStandardRepo<MovieReview>(); } }

        public IRepository<Image> Images { get { return GetStandardRepo<Image>(); } }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        protected void CreateDbContext()
        {
            DbContext = new MovieReviewDbContext();
        }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }
        private MovieReviewDbContext DbContext { get; set; }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }
    }
}
