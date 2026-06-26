using ATP.RankingAPI.Application;
using ATP.RankingAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ATP.RankingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TennisPlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        public TennisPlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public ActionResult Get([FromQuery] int id)
        {
            var player = _playerService.Get(id);

            return Ok(player);
        }

        [HttpGet("all")]
        public ActionResult <IEnumerable<TennisPlayer>> GetAll()
        {
            var players = _playerService.GetAll();

            return Ok(players);
        }

        [HttpPost]
        public ActionResult Save([FromBody] TennisPlayer player)
        { 
            _playerService.Save(player);

            return Created();
        }

        [HttpPut]
        public ActionResult Update([FromBody] TennisPlayer player, [FromQuery] int id)
        {
            _playerService.Update(player, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _playerService.Delete(id);

            return NoContent();
        }

        // exemplo google search: https://www.google.com/search?q=123&w=456
        //[HttpGet("/search")]
        //public ActionResult Search([FromQuery] string q, [FromQuery] string w)
        //{
        //    return Ok(new { });
        //}

        // exemplo linkedin profile: https://www.linkedin.com/in/1234567890/0987654321
        //[HttpGet("/in/{idPerfil}/{guestId}")]
        //public ActionResult Perfil([FromRoute] string idPerfil, [FromRoute] string guestId)
        //{
        //    return Ok(new { });
        //}
    }
}
