namespace Main_project.Models
{
    public class AuctionItemModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal StartingBid { get; set; }
        public decimal? HighestBid { get; set; } 
        public string ImageUrl { get; set; }
    }
}
