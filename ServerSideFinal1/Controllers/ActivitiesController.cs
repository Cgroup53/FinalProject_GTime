using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        // GET: api/<ActivitiesController>
        [HttpGet]
        public IEnumerable<Activities> Get()
        {
            Activities a = new Activities();
            return a.ReadAct();
        }


        // POST api/<ActivitiesController>
        [HttpPost]
        public int Post([FromBody] Activities a)
        {
            int numEffected = a.InsertAct();
            return numEffected;
        }

        [HttpPut("Update")]
        public int Put([FromBody] Activities a)
        {
            return a.UpdateDetailsAct(a.ActNum);
        }


        // DELETE api/<ActivitiesController>/5
        [HttpDelete]
        public IActionResult Delete(int actNum)
        {
            Activities a = new Activities();
            a.DeleteAct(actNum);
            return Ok(actNum);
        }
    }
}
