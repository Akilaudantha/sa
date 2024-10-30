using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;

namespace Main_project.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminLoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdminLoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Route: POST api/admin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminModel admin)
        {
            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "SELECT COUNT(*) FROM Admins WHERE Username = @Username AND Password = @Password";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Username", admin.Username);
                cmd.Parameters.AddWithValue("@Password", admin.Password);

                int count = Convert.ToInt32(cmd.ExecuteScalar());

                if (count > 0)
                {
                    return Ok("Admin login successful!");
                }
                else
                {
                    return Unauthorized("Invalid admin username or password.");
                }
            }
        }
    }
}
