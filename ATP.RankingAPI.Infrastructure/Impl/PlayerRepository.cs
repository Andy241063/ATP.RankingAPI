using ATP.RankingAPI.Application.Infrastructure.Interfaces;
using ATP.RankingAPI.Domain.Entities;
using MySql.Data.MySqlClient;

namespace ATP.RankingAPI.Infrastructure.Impl
{
    internal class PlayerRepository : IPlayerRepository
    {
        string connectionString = "Server=localhost;Port=3306;Database=tennisplayer;User ID=root;Password=;";

        public TennisPlayer? Get(int id)
        {
            using var connection = new MySqlConnection(connectionString);

            connection.Open();

            string query = "SELECT id, name, age, country, ranking_score FROM player WHERE Id = @Id";

            using var command = new MySqlCommand(query, connection);

            command.Parameters.AddWithValue("@Id", id);

            using var reader = command.ExecuteReader();

            var playerList = new List<TennisPlayer>();

            while (reader.Read())
            {
                var player = new TennisPlayer
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name"),
                    Age = reader.GetInt32("age"),
                    Country = reader.GetString("country"),
                    RankingScore = reader.GetInt32("ranking_score")
                };

                playerList.Add(player);
            }

            return playerList.FirstOrDefault();
        }

        public IEnumerable<TennisPlayer> GetAll()
        {
            using var connection = new MySqlConnection(connectionString);

            connection.Open();

            string query = "SELECT id, name, age, country, ranking_score FROM player ORDER BY ranking_score DESC";

            using var command = new MySqlCommand(query, connection);

            using var reader = command.ExecuteReader();

            var playerList = new List<TennisPlayer>();

            while (reader.Read())
            {
                var player = new TennisPlayer
                {
                    Id = reader.GetInt32("id"),
                    Name = reader.GetString("name"),
                    Age = reader.GetInt32("age"),
                    Country = reader.GetString("country"),
                    RankingScore = reader.GetInt32("ranking_score")
                };
                playerList.Add(player);
            }
            return playerList;
        }

        public void Save(TennisPlayer player)
        {
            using var connection = new MySqlConnection(connectionString);
    
            connection.Open();
    
            string query = "INSERT INTO player (name, age, country, ranking_score) VALUES (@Name, @Age, @Country, @RankingScore)";
    
            using var command = new MySqlCommand(query, connection);

            command.Parameters.AddWithValue("@Name", player.Name);
            command.Parameters.AddWithValue("@Age", player.Age);
            command.Parameters.AddWithValue("@Country", player.Country);
            command.Parameters.AddWithValue("@RankingScore", player.RankingScore);
    
            command.ExecuteNonQuery();
        }

        public void Update(TennisPlayer player, int id)
        {
            using var connection = new MySqlConnection(connectionString);
    
            connection.Open();
    
            string query = "UPDATE player SET name = @Name, age = @Age, country = @Country, ranking_score = @RankingScore WHERE id = @Id";
    
            using var command = new MySqlCommand(query, connection);
    
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@Name", player.Name);
            command.Parameters.AddWithValue("@Age", player.Age);
            command.Parameters.AddWithValue("@Country", player.Country);
            command.Parameters.AddWithValue("@RankingScore", player.RankingScore);
    
            command.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var connection = new MySqlConnection(connectionString);
    
            connection.Open();
    
            string query = "DELETE FROM player WHERE id = @Id";
    
            using var command = new MySqlCommand(query, connection);
    
            command.Parameters.AddWithValue("@Id", id);
    
            command.ExecuteNonQuery();
        }
    }
}

