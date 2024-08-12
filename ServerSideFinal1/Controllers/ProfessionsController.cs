using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessionsController : ControllerBase
    {
        // GET: api/<ProfessionsController>
        [HttpGet]
        public IEnumerable<Profession> Get()
        {
            Profession pro = new Profession();
            return pro.ReadProfession();
        }
        // POST api/<ProfessionsController>
        [HttpPost]
        public int Post([FromBody] Profession pro)
        {
            int numEffected = pro.InsertProfession();
            return numEffected;
        }
        // PUT api/<ProfessionsController>/5
        [HttpPut("Update")]
        public int Put([FromBody] Profession pro)
        {
            return pro.UpdateDetailsProfession(pro.ProfessionNum);
        }


        // DELETE api/<ProfessionsController>/5
        [HttpDelete]
        public IActionResult Delete(int ProfessionNum)
        {
            Profession p = new Profession();
            p.DeleteProfession(ProfessionNum);
            return Ok(ProfessionNum);
        }
    }
}
