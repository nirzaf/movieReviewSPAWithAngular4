using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MovieReviewSPA.Data;

namespace MovieReviewSPA.web.Migrations
{
    [DbContext(typeof(MovieReviewDbContext))]
    [Migration("20170727160105_InitialDb")]
    partial class InitialDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MovieReviewSPA.Model.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DirectorName");

                    b.Property<string>("MovieName");

                    b.Property<string>("ReleaseYear");

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("MovieReviewSPA.Model.MovieReview", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MovieId");

                    b.Property<string>("ReviewerComments");

                    b.Property<string>("ReviewerName");

                    b.Property<int>("ReviewerRating");

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.ToTable("MovieReviews");
                });

            modelBuilder.Entity("MovieReviewSPA.Model.MovieReview", b =>
                {
                    b.HasOne("MovieReviewSPA.Model.Movie")
                        .WithMany("Reviews")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
