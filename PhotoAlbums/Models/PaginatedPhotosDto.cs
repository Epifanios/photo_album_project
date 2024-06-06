using System.Collections.Generic;

namespace PhotoAlbums.Models {
    public class PaginatedPhotosDto
    {
        public List<PhotoDto> Photos { get; set; }
        public int TotalCount { get; set; }
    }
}
