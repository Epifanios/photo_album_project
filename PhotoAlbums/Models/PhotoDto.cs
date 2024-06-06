namespace PhotoAlbums.Models
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
    }

    public class AlbumDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<PhotoDto> Photos { get; set; }
    }
}
