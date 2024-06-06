using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoAlbums.Models
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title can't be longer than 100 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "File path is required.")]
        public string FilePath { get; set; }

        [Required(ErrorMessage = "File name is required.")]
        public string FileName { get; set; }
        
        [ForeignKey("Album")]
        public int AlbumId { get; set; }
        public Album Album { get; set; }
    }
}


