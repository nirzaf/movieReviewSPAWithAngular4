using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("/api/movies/{Id}/images")]
    public class ImagesController : Controller
    {
        private IHostingEnvironment _host;
        private IMovieReviewUow _uow;
        private ImageSettings _options;

        public ImagesController(IHostingEnvironment host, IMovieReviewUow uow, IOptionsSnapshot<ImageSettings> options)
        {
            _host = host;
            _uow = uow;
            _options = options.Value;
        }
        [HttpPost]
        public IActionResult Upload(int Id, IFormFile file)
        {
            var movie = _uow.Movies.GetById(Id);
            if (movie == null)
            {
                return NotFound();
            }

            if (file == null) return BadRequest("File not valid");
            if (file.Length == 0) return BadRequest("Empty File");
            if (file.Length > _options.MaxBytes) return BadRequest("File exceeded 10 MB size!");

            if (!_options.IsSupported(file.FileName)) return BadRequest("Invalid File Type");
            var uploadsFolder = Path.Combine(_host.WebRootPath, "uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filepath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var image = new Image { FileName = fileName };
            movie.Images.Add(image);
            _uow.Commit();
            return Ok(image);
        }

        //Fetch photos based on movieId
        [HttpGet]
        public IQueryable<Image>[] Get(int id)
        {
            IQueryable<Image>[] images = new[] { _uow.Images.GetAll().Where(m => m.MovieId == id) };
            if (images != null) return images;
            throw new Exception(new HttpResponseMessage(HttpStatusCode.NotFound).ToString());
        }
    }
}
