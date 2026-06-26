using ATP.RankingAPI.Application.Infrastructure.Interfaces;
using ATP.RankingAPI.Infrastructure.Impl;
using Microsoft.Extensions.DependencyInjection;

namespace ATP.RankingAPI.Infrastructure;

public static class Dependencies
{
    public static void AddInfrastructureDependencies(this IServiceCollection Services)
    {
        Services.AddSingleton<IPlayerRepository, PlayerRepository>();
    }
}