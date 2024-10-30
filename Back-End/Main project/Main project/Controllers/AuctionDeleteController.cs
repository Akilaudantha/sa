using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionDeleteController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuctionDeleteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await conn.OpenAsync();

                // Prepare the SQL DELETE command
                string query = "DELETE FROM AuctionItems WHERE Id = @Id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);

                // Execute the command and check the result
                var result = await cmd.ExecuteNonQueryAsync();
                if (result > 0)
                {
                    return Ok(new { Message = "Auction item deleted successfully." });
                }
                else
                {
                    return NotFound(new { Message = "Auction item not found." });
                }
            }
        }
    }
}
