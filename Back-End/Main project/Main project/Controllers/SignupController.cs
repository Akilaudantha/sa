using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;
using Microsoft.OpenApi.Models;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SignupController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Invalid user data.");
            }

            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "INSERT INTO Users (Username, Password) VALUES (@Username, @Password)";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password); // Don't forget to hash passwords in production!
                    cmd.ExecuteNonQuery();
                }
            }

            return Ok("User registered successfully!");
        }
    }
}
