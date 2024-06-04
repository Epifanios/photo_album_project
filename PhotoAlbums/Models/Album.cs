using System.Text.Json;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
//using Newtonsoft.Json;


namespace PhotoAlbums.Models
{
    public class Album
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Title { get; set; }
        public ICollection<Photo> PhotoAlbums { get; set; } = new List<Photo>();
    }
}
