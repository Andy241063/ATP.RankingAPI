using System;
using ATP.RankingAPI.Application.Infrastructure.Interfaces;
using ATP.RankingAPI.Domain.Entities;

namespace ATP.RankingAPI.Application.Impl

internal class ReadPlayerUseCase : IPlayerRepository
{
	private readonly IPlayerRpository _playerRepository

	public ReadPlayerUseCase(IPLayerRepository playerRepository)
	{
		_playerRepository = playerRepository;
	}

	public TennisPlayer? GetTennisPlayer(int id)
	{

	}
}
