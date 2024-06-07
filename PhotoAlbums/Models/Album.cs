using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PhotoAlbums.Models
{
    public class Album
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Album")]
        [Required]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title can't be longer than 100 characters.")]
        public string? Title { get; set; }
        public ICollection<Photo> PhotoAlbums { get; set; } = new List<Photo>();
    }
}
