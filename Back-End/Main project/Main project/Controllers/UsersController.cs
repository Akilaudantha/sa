using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;
using System.Collections.Generic;
using System.Diagnostics; // For debugging

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("viewusers")]
        public IActionResult GetUsers()
        {
            var users = new List<ViewModel>();

            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "SELECT Id, Username, Email FROM Users";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var user = new ViewModel
                        {
                            Id = reader.GetInt32("Id"),
                            Username = reader.GetString("Username"),
                            Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? null : reader.GetString("Email")
                        };

                        // Log each user entry to debug
                        Debug.WriteLine($"Fetched User: {user.Id}, {user.Username}, {user.Email}");

                        users.Add(user);
                    }
                }
            }

            return users.Count > 0 ? Ok(users) : NotFound("No users found.");
        }
    }
}
