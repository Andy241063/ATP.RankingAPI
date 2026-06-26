using Microsoft.Extensions.DependencyInjection;

namespace ATP.RankingAPI.Application.Impl
{
    public static class Dependencies
    {
        public static void AddApplicationDependencies(this IServiceCollection Services)
        {
            Services.AddScoped<IPlayerService, PlayerService>();
        }
    }
}
