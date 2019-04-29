using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;
using MovieReviewSPA.web.ViewModels.Movie;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private IMovieReviewUow UOW;

        public MoviesController(IMovieReviewUow uow)
        {
            UOW = uow;
        }

        // GET api/movies
        [HttpGet("")]
        public IQueryable Get(Pager movieQuery)
        {
            var model = UOW.Movies.GetAll(movieQuery).OrderByDescending(m => m.Reviews.Count())
                .Select(m => new MovieViewModel
                {
                    Id = m.Id,
                    MovieName = m.MovieName,
                    DirectorName = m.DirectorName,
                    ReleaseYear = m.ReleaseYear,
                    NoOfReviews = m.Reviews.Count()
                });
            return model;

        }

        // GET api/movies/1
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            var movie = UOW.Movies.GetById(id);
            if (movie != null) return movie;
            throw new Exception(new HttpResponseMessage(HttpStatusCode.NotFound).ToString());
        }


        // Update an existing movie
        // PUT /api/movie/
        [HttpPut("")]
        public HttpResponseMessage Put([FromBody]Movie movie)
        {
            UOW.Movies.Update(movie);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // Create a new movie
        // POST /api/movies
        [Authorize("AdminRole")]
        [HttpPost("")]
        public int Post([FromBody]Movie movie)
        {
            UOW.Movies.Add(movie);
            UOW.Commit();
            return Response.StatusCode = (int)HttpStatusCode.Created;
        }

        // DELETE api/movies/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            UOW.Movies.Delete(id);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

    }
}
