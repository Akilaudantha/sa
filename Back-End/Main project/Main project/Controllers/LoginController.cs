using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] UserModel user)
        {
            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "SELECT COUNT(*) FROM Users WHERE Username = @Username AND Password = @Password";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@Password", user.Password); // Use hashed passwords in real-world cases

                int count = Convert.ToInt32(cmd.ExecuteScalar());

                if (count > 0)
                {
                    return Ok("Login successful!");
                }
                else
                {
                    return Unauthorized("Invalid username or password.");
                }
            }
        }
    }
}
