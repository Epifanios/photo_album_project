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
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>()
                .HasMany(a => a.PhotoAlbums)
                .WithOne(b => b.Album)
                .HasForeignKey(b => b.AlbumId)
                .OnDelete(DeleteBehavior.Cascade);  // Optional: Configure delete behavior

            base.OnModelCreating(modelBuilder);
        }
    }
}
