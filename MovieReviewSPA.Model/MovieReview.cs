using System.ComponentModel.DataAnnotations;

namespace MovieReviewSPA.Model
{
    public class MovieReview
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string ReviewerName { get; set; }
        [Required]
        [StringLength(500)]
        public string ReviewerComments { get; set; }
        [Required]
        public int ReviewerRating { get; set; }
        public int MovieId { get; set; }

    }
}