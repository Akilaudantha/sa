using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using Dapper;
using MySql.Data.MySqlClient;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionItemsController : ControllerBase
    {
        private readonly string _connectionString = "your-connection-string-here";

        [HttpGet]
        public IActionResult GetAuctionItems()
        {
            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                string query = "SELECT * FROM auction_items";
                var auctionItems = db.Query<AuctionItem>(query);
                return Ok(auctionItems);
            }
        }
    }

    public class AuctionItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Starting_Bid { get; set; }
        public decimal Highest_Bid { get; set; }
        public string Image_Url { get; set; }
    }
}



