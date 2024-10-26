// NewAuctionController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace Main_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewAuctionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<NewAuctionController> _logger;

        public NewAuctionController(IConfiguration configuration, IWebHostEnvironment environment, ILogger<NewAuctionController> logger)
        {
            _configuration = configuration;
            _environment = environment;
            _logger = logger;
        }

        [HttpPost("add")]
        public IActionResult AddNewAuctionItem([FromForm] string name, [FromForm] decimal startingBid, [FromForm] decimal? highestBid, [FromForm] IFormFile image)
        {
            // Validate the input parameters
            if (string.IsNullOrEmpty(name) || startingBid <= 0 || image == null)
            {
                return BadRequest("Name, starting bid, and image are required fields.");
            }

            // Log the received auction item information
            _logger.LogInformation("Received auction item: Name={Name}, StartingBid={StartingBid}, HighestBid={HighestBid}", name, startingBid, highestBid);

            // Define the uploads folder path
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            _logger.LogInformation("Uploads folder path: {UploadsFolder}", uploadsFolder);

            // Create the uploads folder if it does not exist
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
                _logger.LogInformation("Created uploads folder: {UploadsFolder}", uploadsFolder);
            }

            // Generate a unique file name for the image
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            _logger.LogInformation("File path to save the image: {FilePath}", filePath);

            // Save the image to the specified path
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                    _logger.LogInformation("Image uploaded successfully: {FilePath}", filePath);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving image to file system.");
                return StatusCode(500, "Error saving the image.");
            }

            // Insert the auction item into the database
            try
            {
                using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    conn.Open();
                    string query = "INSERT INTO auction_items (name, starting_bid, highest_bid, image_url) VALUES (@Name, @StartingBid, @HighestBid, @ImageUrl)";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Name", name);
                    cmd.Parameters.AddWithValue("@StartingBid", startingBid);
                    cmd.Parameters.AddWithValue("@HighestBid", highestBid.HasValue ? (object)highestBid.Value : DBNull.Value); // Insert NULL if no highestBid
                    cmd.Parameters.AddWithValue("@ImageUrl", $"/uploads/{fileName}");

                    // Execute the query and check the result
                    int rowsAffected = cmd.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        return Ok("Auction item added successfully!");
                    }
                    else
                    {
                        return StatusCode(500, "Failed to add auction item.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inserting auction item into the database.");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
