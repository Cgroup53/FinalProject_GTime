using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting.Server;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteersController : ControllerBase
    {
        // GET: api/<VolunteersController>
        [HttpGet]
        public IEnumerable<Volunteer> Get()
        {
            Volunteer volunteer = new Volunteer();
            return volunteer.ReadVol();
        }

        // POST api/<VolunteersController>
        [HttpPost("Register")]
      
        public async Task<IActionResult> Register([FromBody] Volunteer volunteer)
        {
            // Check if the volunteer information and image file are provided
            if (volunteer == null || volunteer.ImageBase64 == "")
            {
                return BadRequest("Volunteer information or image file is missing.");
            }

            //// Save the image file in the server
           
            System.IO.File.WriteAllBytes($"uploadedFiles/{volunteer.Email}.jpg", Convert.FromBase64String(volunteer.ImageBase64));
            volunteer.VolImage = $"uploadedFiles/{volunteer.Email}.jpg";
            
            // Insert the volunteer into the database
            int result = volunteer.Insert();

            // Check if insertion was successful
            if (result > 0)
            {
                return Ok("Volunteer registered successfully.");
            }
            else
            {
             
                return BadRequest("Failed to register volunteer.");
            }
        }
        [HttpPost("VolAct")]
        public int Post([FromBody] Volunteer volunteer)
        {
            int numEffected = volunteer.InsertVolActivities();
            return numEffected;
        }

        [HttpPost("Login")]
        public Volunteer GetVolunteerNameandPassword([FromBody] Volunteer volunteer)
        {
            Volunteer v = volunteer.Login();
            return v;
        }
        [HttpPost("VolByEmail")]
       
        public Volunteer GetVolunteerDetailByEmail([FromBody] Volunteer volunteer)
        {
            
            Volunteer v = volunteer.ByEmail();
            return v;
        }

        [HttpPut()]
        public int Put([FromBody] Volunteer volunteer)
        {
            return volunteer.UpdateDetails(volunteer.Email);
        }

        [HttpPost("ChangePassword")]
        public int CangePass(string email)
        {
            return new Volunteer().ChangePassword(email);
        }

        [HttpPost("InsertAreaToVol")]
        public int InsertAreaToVol(string email, string areaNum)
        {
            return new Volunteer().UpdateDetailsVolArea(email, areaNum);
        }

        [HttpDelete("DeleteVolArea")]
        public int DeleteAreaToVol(string email, int areaNum)
        {
            return new Volunteer().DeleteVolArea(email, areaNum);
        }
        [HttpPost("InsertProfToVol")]
        public int InsertProfToVol(string email, string profNum)
        {
            return new Volunteer().UpdateDetailsVolProf(email, profNum);
        }

        [HttpDelete("DeleteVolProf")]
        public int DeleteProfToVol(string email, int profNum)
        {
            return new Volunteer().DeleteVolProf(email, profNum);
        }

        [HttpDelete]
        public IActionResult Delete(int actNum, string email)
        {
            Volunteer a = new Volunteer();
            a.DeleteVolAct(actNum, email);
            return Ok(actNum);
        }


    }
}
