using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using Main_project.Models;
using System.Net.Mail; // Add this for email sending
using System.Net;

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
        public IActionResult Signup([FromBody] SignupModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Email))
            {
                return BadRequest("Invalid user data.");
            }

            using (MySqlConnection conn = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                conn.Open();
                string query = "INSERT INTO Users (Username, Password, Email) VALUES (@Username, @Password, @Email)";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password); // Remember to hash passwords in production!
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.ExecuteNonQuery();
                }
            }

            // Send the thank-you email after successful registration
            SendThankYouEmail(user.Email);

            return Ok("User registered successfully!");
        }

        private void SendThankYouEmail(string emailAddress)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com") 
                {
                    Port = 587, // SMTP server uses
                    Credentials = new NetworkCredential("pereraakila41@gmail.com", "Akila0112918358"), // Replace with your credentials
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("Akilaudantha09@gmail.com"),
                    Subject = "Thank You for Signing Up!",
                    Body = "Thank you for choosing our site! We're glad to have you.",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(emailAddress);

                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                // Handle any errors
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }
    }
}