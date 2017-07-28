using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data
{
    public class MovieReviewDbContext :DbContext
    {
        public MovieReviewDbContext()
        {
            Database.EnsureCreated();
        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieReview> MovieReviews { get; set; }

        public MovieReviewDbContext(DbContextOptions<MovieReviewDbContext> options) : base(options)
        {
            //It will look for connection string from appsettings

        }

    }
}
