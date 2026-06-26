using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATP.RankingAPI.Domain.Entities
{
    public class TennisPlayer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int RankingScore { get; set; }
    }
}
