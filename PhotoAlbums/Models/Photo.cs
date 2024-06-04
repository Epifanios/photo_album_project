namespace PhotoAlbums.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int AlbumId { get; set; }
        public Album Album { get; set; }
    }
}
