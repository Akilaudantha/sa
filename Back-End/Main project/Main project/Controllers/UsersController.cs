using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;
using System.Collections.Generic;

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
                string query = "SELECT Id, Username FROM Users";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        users.Add(new ViewModel
                        {
                            Id = reader.GetInt32("Id"),
                            Username = reader.GetString("Username")
                        });
                    }
                }
            }

            if (users.Count > 0)
            {
                return Ok(users);
            }
            else
            {
                return NotFound("No users found.");
            }
        }
    }
}
