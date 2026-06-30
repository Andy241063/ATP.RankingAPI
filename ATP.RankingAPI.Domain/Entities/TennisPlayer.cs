using System;
namespace ATP.RankingAPI.Domain.Entities
{
    public class TennisPlayer
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Age { get; set; }
        public required string Country { get; set; }
        public int RankingScore { get; set; }
    }
}
