using ATP.RankingAPI.Domain.Entities;

namespace ATP.RankingAPI.Application.Infrastructure.Interfaces
{
    public interface IPlayerRepository
    {
        TennisPlayer? Get(int id);
        IEnumerable<TennisPlayer> GetAll();
        void Save(TennisPlayer player);
        void Update(TennisPlayer player, int id);
        void Delete(int id);

    }
}
