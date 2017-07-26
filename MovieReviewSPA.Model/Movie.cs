using System;
using System.Collections.Generic;

namespace MovieReviewSPA.Model
{
    public class Movie
    {
        public int Id { get; set; }
        public string MovieName { get; set; }
        public string DirectorName { get; set; }
        public string ReleaseYear { get; set; }
        public virtual ICollection<MovieReview> Reviews { get; set; }

    }
}
