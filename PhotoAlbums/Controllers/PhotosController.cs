using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbums.Data;
using PhotoAlbums.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PhotoAlbums.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PhotosController> _logger;

        public PhotosController(IWebHostEnvironment webHostEnvironment, ApplicationDbContext context, ILogger<PhotosController> logger)
        {
            _webHostEnvironment = webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
            _context = context;
            _logger = logger;
        }


        [HttpPost("album/{id}/upload")]
        [Route("upload")]
        [ApiExplorerSettings(IgnoreApi = true)]

        public async Task<IActionResult> UploadPhotos(int id, [FromForm] IFormFile file, [FromForm] string title)
        {
            var getAlbum = await _context.Albums.FindAsync(id);
            if (getAlbum == null)
            {
                return NotFound();
            }

            if (file == null || string.IsNullOrEmpty(title))
            {
                return BadRequest("File and title are required.");
            }

            if (_webHostEnvironment.WebRootPath == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "WebRootPath is not configured correctly");
            }

            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo
            {
                Title = title,
                FilePath = Path.Combine("uploads", fileName),
                FileName = fileName,
                AlbumId = id
            };

            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            var photoDto = new PhotoDto
            {
                Id = photo.Id,
                Title = photo.Title,
                FilePath = $"/uploads/{fileName}"
            };

            return Ok(photoDto);
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePhoto(int id)
        {
            var photo = await _context.Photos.FindAsync(id); // Get photo by passed ID parameter

            // Check if photo is exist
            if (photo == null)
            {
                return NotFound();
            }

            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return Ok("Photo Deleted Successful");
        }       


        [HttpGet]
        public async Task<IActionResult> GetPhotosByAlbumId([FromQuery] int albumId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)        
        {
            var totalPhotos = await _context.Photos.CountAsync(p => p.AlbumId == albumId);
            var photos = await _context.Photos
                .Where(p => p.AlbumId == albumId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PhotoDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    FilePath = $"/{p.FilePath.Replace("\\", "/")}"
                })
                .ToListAsync();

            var result = new PaginatedPhotosDto
            {
                Photos = photos,
                TotalCount = totalPhotos
            };

            return Ok(result);
        }

        
    }
}

