using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data;

namespace MovieReviewSPA.web.Controllers
{
    public class HomeController : Controller
    {
        private MovieReviewDbContext _dbContext;

        public HomeController(MovieReviewDbContext dbContext)
        {
           _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            var movies = _dbContext.Movies.ToList();
            return View(movies);

        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
