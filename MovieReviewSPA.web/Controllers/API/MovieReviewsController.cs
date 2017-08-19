using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Web.Controllers.API
{
    [Route("api/[controller]")]
    public class MovieReviewsController : Controller
    {
        private readonly IMovieReviewUow UOW;

        public MovieReviewsController(IMovieReviewUow uow)
        {
            UOW = uow;
        }
        [HttpGet("")]
        public IEnumerable<MovieReview> Get()
        {
            return UOW.MovieReviews.GetAll().OrderBy(m => m.MovieId);
        }

        [HttpGet("{id}")]
        public IEnumerable<MovieReview> Get(int Id)
        {
            return UOW.MovieReviews.GetAll().Where(m => m.MovieId == Id);
        }

        [HttpGet("[action]")]
        public MovieReview GetByReviewId(int id)
        {
            return UOW.MovieReviews.GetAll().FirstOrDefault(m => m.Id == id);
        }

        // /api/MovieReviews/getbyreviewername?value=rahul
        [HttpGet("[action]")]
        public MovieReview GetByReviewerName(string value)
        {
            var review = UOW.MovieReviews.GetAll().FirstOrDefault(m => m.ReviewerName.StartsWith(value));

            if (review != null) return review;
            throw new Exception(new HttpResponseMessage(HttpStatusCode.NotFound).ToString());
        }

        // Update an existing review
        // PUT /api/MovieReviews/
        [HttpPut("")]
        public HttpResponseMessage Put([FromBody]MovieReview review)
        {
            //review.Id = Id;
            UOW.MovieReviews.Update(review);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // Create a new review
        // POST /api/MovieReviews
        [HttpPost("{id}")]
        public int Post(int Id, [FromBody]MovieReview review)
        {
            review.MovieId = Id;
            UOW.MovieReviews.Add(review);
            UOW.Commit();

            return Response.StatusCode = (int)HttpStatusCode.Created;
        }

        //Delete a review
        //Delete /api/MovieReviews/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            UOW.MovieReviews.Delete(id);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
