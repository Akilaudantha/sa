using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;
using System.Linq;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionItemsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuctionItemsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAuctionItems()
        {
            using (var conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "SELECT id, name, starting_bid AS StartingBid, highest_bid AS HighestBid, image_url AS ImageUrl FROM auction_items";
                var auctionItems = conn.Query<AuctionItemModel>(query).ToList();
                return Ok(auctionItems);
            }
        }

        [HttpPost("{id}/bid")]
        public IActionResult PlaceBid(int id, [FromBody] BidRequest request)
        {
            using (var conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = @"UPDATE auction_items 
                                 SET highest_bid = @Bid 
                                 WHERE id = @Id AND 
                                 (highest_bid IS NULL OR @Bid > highest_bid)";

                int rowsAffected = conn.Execute(query, new { Id = id, Bid = request.Bid });

                if (rowsAffected > 0)
                {
                    return Ok(new { message = "Bid placed successfully" });
                }
                else
                {
                    return BadRequest(new { message = "Bid must be higher than the current highest bid" });
                }
            }
        }
    }

    public class BidRequest
    {
        public decimal Bid { get; set; }
    }
}
