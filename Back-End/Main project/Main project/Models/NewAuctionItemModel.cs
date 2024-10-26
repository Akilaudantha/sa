// Models/NewAuctionItemModel.cs
namespace Main_project.Models
{
    public class NewAuctionItemModel
    {
        public int Id { get; set; }               // Auto-incremented primary key
        public string Name { get; set; }
        public decimal StartingBid { get; set; }
        public decimal? HighestBid { get; set; }   // Nullable, initially NULL
        public string ImageUrl { get; set; }
    }
}
