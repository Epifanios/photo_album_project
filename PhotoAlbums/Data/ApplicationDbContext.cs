using Microsoft.EntityFrameworkCore;
using PhotoAlbums.Models;

namespace PhotoAlbums.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Album> Albums { get; set; }
    }
}
