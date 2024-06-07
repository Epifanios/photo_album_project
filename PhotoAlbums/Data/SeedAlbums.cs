using Bogus;
using Microsoft.EntityFrameworkCore;
using PhotoAlbums.Models;
using System;
using System.Linq;

namespace PhotoAlbums.Data
{
    public static class SeedAlbums
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Check if the database has been seeded
                if (context.Albums.Any())
                {
                    return;   // DB has been seeded
                }

                // Generate fake data
                var albums = new Faker<Album>()
                    .RuleFor(a => a.UserId, f => f.Random.Int(1, 100))
                    .RuleFor(a => a.Title, f => string.Join(" ", f.Lorem.Words(f.Random.Int(2, 3))))
                    .Generate(50);  // Generate 10 albums

                context.Albums.AddRange(albums);
                context.SaveChanges();
            }
        }
    }
}
