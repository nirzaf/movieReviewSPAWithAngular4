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

        public DbSet<Image> Images { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //While deploying to azure, make sure to change the connection string based on azure settings
                optionsBuilder.UseSqlServer(@"Server=.\\SQLSERVER;Database=MovieReviewSPA;Trusted_Connection=True;MultipleActiveResultSets=true;");
            }
        }

        public MovieReviewDbContext(DbContextOptions<MovieReviewDbContext> options) : base(options)
        {
            //It will look for connection string from appsettings
        }
    }
}
