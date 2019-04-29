using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("api/[controller]")]
    public class LookupsController : Controller
    {
        private readonly IMovieReviewUow UOW;

        public LookupsController(IMovieReviewUow uow)
        {
            UOW = uow;
        }

        // GET: api/lookups/movies
        [HttpGet("movies")]
        public IEnumerable<Movie> GetMovies(Pager movieQuery)
        {
            return UOW.Movies.GetAll(movieQuery).OrderBy(m => m.Id);

        }

        // /api/Lookups/getbyreviewerid?id=1
        [HttpGet("getbyreviewerid")]
        public MovieReview GetByReviewerId(int id)
        {
            return UOW.MovieReviews.GetById(id);
        }

        #region OData Future: IQueryable<T>
        //[Queryable]
        // public IQueryable<Movie> Get()        
        // public IQueryable<MovieReview> Get()

        #endregion


    }
}
