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

    public class AlbumsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserService _userApiService;


        public AlbumsController(ApplicationDbContext context, UserService userApiService)
        {
            _context = context;
            _userApiService = userApiService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
        {
            return await _context.Albums.ToListAsync(); //Get All Albums
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);  //Get Album by passed ID parameter

            //Check if album is exist
            if (album == null)
            {
                return NotFound();
            }

            return album;
        }


        [HttpPost]
        public async Task<ActionResult<Album>> CreateAlbum([FromForm] Album album)
        {
            var users = await _userApiService.GetUsersAsync(); //Call User Service for fetching users

            //Check if user is exist
            if (!users.Any(c => c.Id == album.UserId))
            {
                return BadRequest("Invalid User.");
            }

            _context.Albums.Add(album);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAlbum), new { id = album.Id }, album);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAlbum(int id, [FromForm] Album album)
        {
            var getAlbum = await _context.Albums.FindAsync(id); //Get Album by passed ID parameter

            if (getAlbum == null)
            {
                return NotFound();
            }

            var users = await _userApiService.GetUsersAsync(); //Call User Service for fetching users
            
            //Check if user is exist
            if (!users.Any(c => c.Id == album.UserId))
            {
                return BadRequest("Invalid category_id.");
            }

            //Save new values to existing values
            getAlbum.Title = album.Title;
            getAlbum.UserId = album.UserId;

            _context.Albums.Update(getAlbum);
            await _context.SaveChangesAsync();

            // Return JSON result
            return new JsonResult(getAlbum);
        }


        [HttpGet("user/{id}")]
        public async Task<ActionResult> GetAlbumsByUser(int id, int page = 1, int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
            {
                return BadRequest("Page number and page size must be greater than zero.");
            }

            // Get total number of albums for the user
            var totalAlbums = await _context.Albums
                .Where(p => p.UserId == id)
                .CountAsync();         

            // Calculate total pages
            var totalPages = (int)Math.Ceiling(totalAlbums / (double)pageSize);

            // Fetch the albums for the current page
            var albums = await _context.Albums
                .Where(p => p.UserId == id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new
            {
                Albums = albums,
                TotalCount = totalAlbums,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };

            return Ok(response);
        }


        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id); // Get Album by passed ID parameter

            // Check if album is exist
            if (album == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return Ok("Album Deleted Successful");
        }       
    }
}

