using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProposalsController : ControllerBase
    {
        // GET: api/<ProposalsController>
        [HttpGet]
        public IEnumerable<Proposal> Get()
        {
            Proposal proposal = new Proposal();
            return proposal.ReadPro();
        }
        // POST api/<ProposalController>
        [HttpPost]
        public int Post([FromBody] Proposal proposal)
        {
            int numEffected = proposal.InsertPro();
            return numEffected;
        }
        [HttpPut()]
        public int Put([FromBody] Proposal proposal)
        {
            return proposal.UpdatePropDetails(proposal.ProposalNum);
        }
        [HttpDelete]
        public IActionResult Delete(int proposalNum)
        {
            Proposal p = new Proposal();
            p.DeleteProp(proposalNum);
            return Ok(proposalNum);
        }
    }
}
