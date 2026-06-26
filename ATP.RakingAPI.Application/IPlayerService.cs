using ATP.RankingAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATP.RankingAPI.Application
{
    public interface IPlayerService
    {
        TennisPlayer? Get(int id);
        IEnumerable<TennisPlayer> GetAll();
        void Save(TennisPlayer player);
        void Update(TennisPlayer player, int id);
        void Delete(int id);
    }
}
