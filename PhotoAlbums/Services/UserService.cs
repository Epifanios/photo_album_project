using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using PhotoAlbums.Models;

public class UserService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<UserService> _logger;

    public UserService(HttpClient httpClient, ILogger<UserService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    //Serialize json keys for Users API using User Model
    public async Task<List<User>> GetUsersAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync("https://jsonplaceholder.typicode.com/users");
            response.EnsureSuccessStatusCode(); //Check if is successful

            var responseContent = await response.Content.ReadAsStringAsync();
            var users = JsonSerializer.Deserialize<List<User>>(responseContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true //match JSON properties irrespective of their case
            });

            if (users == null)
            {
                _logger.LogError("Failed to deserialize users.");
                return new List<User>();
            }

            return users;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cannot fetch users!");
            return new List<User>();
        }
    }
}
