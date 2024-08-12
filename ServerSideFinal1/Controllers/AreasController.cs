using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreasController : ControllerBase
    {
        // GET: api/<AreasController>
        [HttpGet]
        public IEnumerable<Area> Get()
        {
            Area area = new Area();
            return area.ReadArea();
        }
        // POST api/<AreasController>
        [HttpPost]
        public int Post([FromBody] Area area)
        {
            int numEffected = area.InsertArea();
            return numEffected;
        }
        // PUT api/<AreasController>/5
        [HttpPut("Update")]
        public int Put([FromBody] Area area)
        {
            return area.UpdateDetailsArea(area.AreaNum);
        }


        // DELETE api/<AreasController>/5
        [HttpDelete]
        public IActionResult Delete(int areaNum)
        {
            Area a = new Area();
            a.DeleteArea(areaNum);
            return Ok(areaNum);
        }

    }
}
