using Microsoft.AspNetCore.Mvc;
using ServerSide.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        // GET: api/<EmployeesController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            Employee employee = new Employee();
            return employee.ReadEmp();
        }

        // GET api/<EmployeesController>/5
        [HttpPost("Register")]
        public int Post([FromBody] Employee emp)
        {
            int numEffected = emp.InsertEmp();
            return numEffected;
        }


        // POST api/<EmployeesController>
        [HttpPost ("Login")]
        public Employee GetEmployeeNameandPassword([FromBody] Employee emp)
        {
            Employee e = emp.LoginEmp();
            return e;
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("Update")]
        public int Put([FromBody] Employee emp)
        {
            return emp.UpdateDetailsEmp(emp.Email);
        }

        // DELETE api/<AreasController>/5
        //[HttpDelete]
        //public IActionResult Delete(int employeeID)
        //{
        //    Employee emp = new Employee();
        //    emp.DeleteEmp(employeeID);
        //    return Ok(employeeID);
        //}

    }
}
