using System.IO;
using System.Linq;

namespace MovieReviewSPA.Model
{
   public class ImageSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsSupported(string fileName)
        {
            return AcceptedFileTypes.Any(s => s == (Path.GetExtension(fileName).ToLower()));
        }
    }
}
