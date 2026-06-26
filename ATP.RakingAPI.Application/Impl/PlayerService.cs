using System;
using ATP.RankingAPI.Application.Infrastructure.Interfaces;
using ATP.RankingAPI.Domain.Entities;

namespace ATP.RankingAPI.Application.Impl
{
	internal class PlayerService : IPlayerService
	{
		private readonly IPlayerRepository _playerRepository;

		public PlayerService(IPlayerRepository playerRepository)
		{
			_playerRepository = playerRepository;
		}

		public TennisPlayer? Get(int id)
		{
			return _playerRepository.Get(id);
		}
		public IEnumerable<TennisPlayer> GetAll()
		{
			return _playerRepository.GetAll();
		}

		public void Save(TennisPlayer player)
        {
			_playerRepository.Save(player);
		}

        public void Update(TennisPlayer player, int id)
        {
            _playerRepository.Update(player, id);
        }

		public void Delete(int id)
		{
			_playerRepository.Delete(id);
		}
    }
}
