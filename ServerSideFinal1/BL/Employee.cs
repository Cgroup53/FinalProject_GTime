using System;
using System.Text;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace ServerSide.BL
{
    public class Employee
    {
        int employeeID;
        string fName;
        string lName;
        string phone;
        string email;
        bool isAdmin;
        int areaNum;
        string password;
        static List<Employee> employeessList = new List<Employee>();
        public Employee()
        {

        }
        public Employee(int employeeID, string fName, string lName, string phone, string email, bool isAdmin, int areaNum, string password)
        {
            EmployeeID = employeeID;
            FName = fName;
            LName = lName;
            Phone = phone;
            Email = email;
            IsAdmin = isAdmin;
            AreaNum = areaNum;
            Password = password;


        }
    

        public int EmployeeID { get => employeeID; set => employeeID = value; }
        public string FName { get => fName; set => fName = value; }
        public string LName { get => lName; set => lName = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Email { get => email; set { if (IsValidEmail(value)) email = value; } }
        public bool IsAdmin { get => isAdmin; set => isAdmin = value; }
        public int AreaNum { get => areaNum; set => areaNum = value; }
        public static List<Employee> EmployeessList { get => employeessList; set => employeessList = value; }
        public string Password { get => password; set => password = value; }

        public static bool IsValidEmail(string email)
        {
            // Regular expression pattern for validating email addresses
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            // Create a Regex object with the pattern
            Regex regex = new Regex(pattern);

            // Use the Regex.IsMatch method to check if the email matches the pattern
            return regex.IsMatch(email);
        }

        public List<Employee> ReadEmp()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadEmp();

        }
        public int InsertEmp()
        {
            DBservices dbs = new DBservices();
            return dbs.InsertEmp(this);

        }
        //Login
        public Employee LoginEmp()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEmployeeByDetails(this);

        }
        public int UpdateDetailsEmp(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedEmp(this, email);

        }
        //public int DeleteEmp(int employeeID)
        //{
        //    DBservices dbs = new DBservices();
        //    return dbs.deleteEmp(employeeID);
        //}
    }
}
