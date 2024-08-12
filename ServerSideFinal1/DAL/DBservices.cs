using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using ServerSide.BL;
using System.Xml.Linq;
using System.Data.Common;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }



    //--------------------------------------------------------------------------------------------------
    // This method Inserts a volunteer to the Volunteers table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(Volunteer volunteer)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateVolunteerInsertCommandWithStoredProcedure("SP_InsertVolunteer_Y24424", con, volunteer);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method reads volunteer from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Volunteer> ReadVol()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Volunteer> volunteersList = new List<Volunteer>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadVolunteer", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Volunteer v = new Volunteer();
                v.Email = dataReader["Email"].ToString();
                v.Password = dataReader["Password"].ToString();
                v.Name = dataReader["Name"].ToString();
                v.Fname = dataReader["Fname"].ToString();
                v.Phone = dataReader["Phone"].ToString();
                v.Sign = DateTime.Parse(dataReader["Sign"].ToString());
                v.Sunday = Convert.ToBoolean(dataReader["Sunday"]);
                v.Monday = Convert.ToBoolean(dataReader["Monday"]);
                v.Tuesday = Convert.ToBoolean(dataReader["Tuesday"]);
                v.Wednesday = Convert.ToBoolean(dataReader["Wednesday"]);
                v.Thursday = Convert.ToBoolean(dataReader["Thursday"]);
                v.Friday = Convert.ToBoolean(dataReader["Friday"]);
                v.Saturday = Convert.ToBoolean(dataReader["Saturday"]);
                v.VolImage = dataReader["Img"].ToString();
                v.Status = Convert.ToBoolean(dataReader["Status"]);
                
                volunteersList.Add(v);
            }
            return volunteersList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //---------------------------------------------------------------------------------
    // Get User SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------

    public Volunteer GetVolunteersByDetails(Volunteer volunteer)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithParameters("spGetVolunteerByDetails", con, volunteer);  // create the command


        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            Volunteer v = new Volunteer();
            while (dataReader.Read())
            {
                volunteer.Email = dataReader["Email"].ToString();
                volunteer.Password = dataReader["Password"].ToString();
                volunteer.Name = dataReader["Name"].ToString();
                volunteer.Fname = dataReader["Fname"].ToString();
                volunteer.Phone = dataReader["Phone"].ToString();
                volunteer.Sign = DateTime.Parse(dataReader["Sign"].ToString());
                volunteer.Sunday = Convert.ToBoolean(dataReader["Sunday"]);
                volunteer.Monday = Convert.ToBoolean(dataReader["Monday"]);
                volunteer.Tuesday = Convert.ToBoolean(dataReader["Tuesday"]);
                volunteer.Wednesday = Convert.ToBoolean(dataReader["Wednesday"]);
                volunteer.Thursday = Convert.ToBoolean(dataReader["Thursday"]);
                volunteer.Friday = Convert.ToBoolean(dataReader["Friday"]);
                volunteer.Saturday = Convert.ToBoolean(dataReader["Saturday"]);
                volunteer.VolImage = dataReader["Img"].ToString();
                volunteer.Status= Convert.ToBoolean(dataReader["Status"]);

            }
            return volunteer;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    public Volunteer GetVolunteersByEmail(Volunteer volunteer)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandByEmailWithSPWithParameters("spGetVolunteerByEmail", con, volunteer);  // create the command


        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            Volunteer v = new Volunteer();
            while (dataReader.Read())
            {
                v.Email = dataReader["Email"].ToString();
                v.Password = dataReader["Password"].ToString();
                v.Name = dataReader["Name"].ToString();
                v.Fname = dataReader["Fname"].ToString();
                v.Phone = dataReader["Phone"].ToString();
                v.Sign = DateTime.Parse(dataReader["Sign"].ToString());
                v.Sunday = Convert.ToBoolean(dataReader["Sunday"]);
                v.Monday = Convert.ToBoolean(dataReader["Monday"]);
                v.Tuesday = Convert.ToBoolean(dataReader["Tuesday"]);
                v.Wednesday = Convert.ToBoolean(dataReader["Wednesday"]);
                v.Thursday = Convert.ToBoolean(dataReader["Thursday"]);
                v.Friday = Convert.ToBoolean(dataReader["Friday"]);
                v.Saturday = Convert.ToBoolean(dataReader["Saturday"]);
                v.VolImage = dataReader["Img"].ToString();
                v.Status = Convert.ToBoolean(dataReader["Status"]);
            }
            return v;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //----------------------
    //--------------------------------------------------------------------------------------------------
    // This method Updates a user to the user table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedVol(Volunteer volunteer, String email)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateVolunteerInsertCommandWithStoredProcedure("SPUpdateVolunteer", con, volunteer, email);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method Updates a user area to the user table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedVolArea(string email, string areaNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateVolunteerAreaInsertCommandWithStoredProcedure("SP_InsertVolunteersArea_Y4524", con, email, areaNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    

            public int DeleteUpdatedVolArea(string email, int areaNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteVolunteerAreaCommandWithStoredProcedure("sp_DeleteVolArea", con, email, areaNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    
    //--------------------------------------------------------------------------------------------------
    // This method Updates a user profession to the user table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedVolProf(string email, string profNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateVolunteerProfInsertCommandWithStoredProcedure("SP_InsertVolunteersProfession_Y4524", con, email, profNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    public int DeleteUpdatedVolProf(string email, int profNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteVolunteerProfCommandWithStoredProcedure("sp_DeleteVolProf", con, email, profNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    
    //--------------------------------------------------------------------------------------------------
    // This method Updates a user password to the user table 
    //--------------------------------------------------------------------------------------------------
    public int changePass(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        Volunteer vol = new Volunteer();
        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetVolunteersCommandByEmail("SPUpdateNEWPasswordVolunteer", con, email);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
            //SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            //Volunteer v = new Volunteer();
            //while (dataReader.Read())
            //{
            //    v.Email = dataReader["Email"].ToString();
            //    v.Password = dataReader["Password"].ToString();
            //    //v.Name = dataReader["Name"].ToString();
            //    //v.Fname = dataReader["Fname"].ToString();
            //    //v.Phone = dataReader["Phone"].ToString();
            //    //v.Sign = DateTime.Parse(dataReader["Sign"].ToString());
            //    //v.Sunday = Convert.ToBoolean(dataReader["Sunday"]);
            //    //v.Monday = Convert.ToBoolean(dataReader["Monday"]);
            //    //v.Tuesday = Convert.ToBoolean(dataReader["Tuesday"]);
            //    //v.Wednesday = Convert.ToBoolean(dataReader["Wednesday"]);
            //    //v.Thursday = Convert.ToBoolean(dataReader["Thursday"]);
            //    //v.Friday = Convert.ToBoolean(dataReader["Friday"]);
            //    //v.Saturday = Convert.ToBoolean(dataReader["Saturday"]);

            //}
            //return vol.Password;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Employee to the Employees table 
    //--------------------------------------------------------------------------------------------------
    public int InsertEmp(Employee emp)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateEmployeeInsertCommandWithStoredProcedure("SP_InsertEmployees_Y4524", con, emp);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method reads employee from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Employee> ReadEmp()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Employee> employeesList = new List<Employee>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadEmployees", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Employee e = new Employee();
                e.Email = dataReader["Email"].ToString();
                e.FName = dataReader["FirstName"].ToString();
                e.LName = dataReader["LastName"].ToString();
                e.Phone = dataReader["Phone"].ToString();

                e.IsAdmin = Convert.ToBoolean(dataReader["Status"]);
                e.EmployeeID = Convert.ToInt32(dataReader["EmployeeID"]);
                e.AreaNum = Convert.ToInt32(dataReader["AreaNum"]);
                e.Password = dataReader["Password"].ToString();
                employeesList.Add(e);
            }
            return employeesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Get User SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------

    public Employee GetEmployeeByDetails(Employee employee)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithParametersEmp("spGetEmployeeByDetails", con, employee);  // create the command


        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            Employee e = new Employee();
            while (dataReader.Read())
            {
                e.Email = dataReader["Email"].ToString();
                e.FName = dataReader["FirstName"].ToString();
                e.LName = dataReader["LastName"].ToString();
                e.Phone = dataReader["Phone"].ToString();
                e.IsAdmin = Convert.ToBoolean(dataReader["Status"]);
                e.EmployeeID = Convert.ToInt32(dataReader["EmployeeID"]);
                e.AreaNum = Convert.ToInt32(dataReader["AreaNum"]);
                e.Password = dataReader["Password"].ToString();
            }
            return e;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    //--------------------------------------------------------------------------------------------------
    // This method Updates a employe to the employee table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedEmp(Employee emp, String email)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateEmployeeInsertCommandWithStoredProcedure("SPUpdateEmployees", con, emp, email);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method delete Emp from the database 
    //--------------------------------------------------------------------------------------------------
    //public int deleteEmp(int employeeID)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    cmd = DeleteEmpCommandWithStoredProcedure("sp_DeleteEmp", con, employeeID);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------------------------------------
    // This method reads Areas from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Area> ReadArea()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Area> areasList = new List<Area>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadArea", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Area a = new Area();
                a.AreaNum = Convert.ToInt32(dataReader["AreaNum"].ToString());
                a.AreaName = dataReader["AreaName"].ToString();


                areasList.Add(a);

            }
            return areasList;

        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Area to the Areas table 
    //--------------------------------------------------------------------------------------------------
    public int InsertArea(Area area)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateAreaInsertCommandWithStoredProcedure("SP_InsertArea_Y29424", con, area);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method Updates a Area to the Areas table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedArea(Area area, int areaNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateAreasInsertCommandWithStoredProcedure("SPUpdateArea", con, area, areaNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method delete Area from the database 
    //--------------------------------------------------------------------------------------------------
    public int deleteArea(int areaNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteAreaCommandWithStoredProcedure("sp_DeleteArea", con, areaNum);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    public List<Area> GetVolunteersArea(string email)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetVolunteersCommandByEmail("GetAreas", con, email);        // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            List<Area> areas = new List<Area>();
            while (dataReader.Read())
            {
                Area a = new Area(Convert.ToInt32(dataReader["AreaNum"].ToString()), dataReader["AreaName"].ToString());
                areas.Add(a);
            }
            return areas;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public void InsertVolArea(Volunteer volunteer)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        //1,3,5,80
        string areasCode = volunteer.Areas.Count > 0 ? string.Join(",", volunteer.Areas.Select(a => a.AreaNum)) : "";

        cmd = InsertVolAreaCommand("SP_InsertVolunteersArea_Y4524", con, volunteer.Email, areasCode);        // create the command

        try
        {
            cmd.ExecuteNonQuery(); // execute the command
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }



    public List<Profession> GetVolunteersProfession(string email)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetVolunteersCommandByEmail("GetProfessions", con, email);        // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            List<Profession> professions = new List<Profession>();
            while (dataReader.Read())
            {
                Profession p = new Profession(Convert.ToInt32(dataReader["ProfessionNum"].ToString()), dataReader["ProfessionName"].ToString(), dataReader["ShortDesc"].ToString());
                professions.Add(p);
            }

            return professions;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public void InsertVolProfession(Volunteer volunteer)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        //1,3,5,80
        string professionCode = volunteer.Professions.Count > 0 ? string.Join(",", volunteer.Professions.Select(p => p.ProfessionNum)) : "";

        cmd = InsertVolProfessionCommand("SP_InsertVolunteersProfession_Y4524", con, volunteer.Email, professionCode);        // create the command

        try
        {
            cmd.ExecuteNonQuery(); // execute the command
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public List<string> GetVolunteersByActNum(int actNum)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<string> VOL = new List<string>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            throw (ex);
        }

        cmd = CreateCommandByActNumWithSPWithParameters("spGetVolunteerByActNum", con, actNum); // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            while (dataReader.Read())
            {
                VOL.Add(dataReader["Email"].ToString());
            }
            return VOL;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }

    //public List<string> GetVolunteersByActNum(int actNum)
    //{
    //    SqlConnection con;
    //    SqlCommand cmd;
    //    List<string> VOL = new List<string>();

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    cmd = CreateCommandByActNumWithSPWithParameters("spGetVolunteerByActNum", con, actNum);        // create the command

    //    try
    //    {
    //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
    //        while (dataReader.Read())
    //        {
    //            while (dataReader.Read())
    //            {
    //            Volunteer v = new Volunteer();
    //                v.Email = dataReader["Email"].ToString();

    //                VOL.Add(v.Email);
    //            }

    //            //Volunteer v = new Volunteer(dataReader["Email"].ToString());
    //        }

    //        return VOL;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }
    //}


    //--------------------------------------------------------------------------------------------------
    // This method Inserts a volunteer to the Volunteers table 
    //--------------------------------------------------------------------------------------------------
    public int InsertAct(Activities a)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateActivitesInsertCommandWithStoredProcedure("SP_InsertActivities_Y3524", con, a);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            a.ActNum = Convert.ToInt32(cmd.Parameters["@id"].Value);

            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method reads employee from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Activities> ReadAct()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Activities> activitiesProfessions = new List<Activities>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadActivites", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Activities a = new Activities();
                a.ActNum = Convert.ToInt32(dataReader["ActNum"]);
                a.ActName = dataReader["ActName"].ToString();
                a.ShortDesc = dataReader["ShortDesc"].ToString();
                a.Location = dataReader["Location"].ToString();
                a.Date = DateTime.Parse(dataReader["Date"].ToString());
                //a.StartHour = TimeOnly.Parse(dataReader["StartHour"].ToString());
                //a.EndHour = TimeOnly.Parse(dataReader["EndHour"].ToString());
                if (!string.IsNullOrEmpty(dataReader["StartHour"].ToString()))
                {
                    a.StartHour = DateTime.Parse(dataReader["StartHour"].ToString());
                }

                // Check if EndHour field is not null or empty before parsing
                if (!string.IsNullOrEmpty(dataReader["EndHour"].ToString()))
                {
                    a.EndHour = DateTime.Parse(dataReader["EndHour"].ToString());
                }
                a.Amount = Convert.ToInt32(dataReader["Amount"]);
                a.AreaNum = Convert.ToInt32(dataReader["AreaNum"]);
                a.EmployeeID = Convert.ToInt32(dataReader["EmployeeID"]);
                a.Status = Convert.ToBoolean(dataReader["Status"]);
                a.IsDone = Convert.ToBoolean(dataReader["IsDone"]);
                activitiesProfessions.Add(a);
            }
            return activitiesProfessions;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method Updates a Activities to the Activities table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedAct(Activities act, int actNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateActivitiesInsertCommandWithStoredProcedure("SPUpdateActivitiesTBL", con, act, actNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method delete Activities from the database 
    //--------------------------------------------------------------------------------------------------
    public int deleteAct(int actNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteActivitiesCommandWithStoredProcedure("sp_DeleteAct", con, actNum);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    public List<Activities> GetVolunteersActivities(string email)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetVolunteersCommandByEmail("GetActivities", con, email);        // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            List<Activities> activities = new List<Activities>();

            while (dataReader.Read())
            {
                Activities a = new Activities();
                a.ActNum = Convert.ToInt32(dataReader["ActNum"]);
                a.ActName = dataReader["ActName"].ToString();
                a.ShortDesc = dataReader["ShortDesc"].ToString();
                a.Location = dataReader["Location"].ToString();
                a.Date = DateTime.Parse(dataReader["Date"].ToString());
                //a.StartHour = TimeOnly.Parse(dataReader["StartHour"].ToString());
                //a.EndHour = TimeOnly.Parse(dataReader["EndHour"].ToString());
                if (!string.IsNullOrEmpty(dataReader["StartHour"].ToString()))
                {
                    a.StartHour = DateTime.Parse(dataReader["StartHour"].ToString());
                }

                // Check if EndHour field is not null or empty before parsing
                if (!string.IsNullOrEmpty(dataReader["EndHour"].ToString()))
                {
                    a.EndHour = DateTime.Parse(dataReader["EndHour"].ToString());
                }
                a.Amount = Convert.ToInt32(dataReader["Amount"]);
                a.AreaNum = Convert.ToInt32(dataReader["AreaNum"]);
                a.EmployeeID = Convert.ToInt32(dataReader["EmployeeID"]);
                a.Status = Convert.ToBoolean(dataReader["Status"]);
                activities.Add(a);
            }
            return activities;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public int InsertVolActivities(Volunteer volunteer)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        //1,3,5,80
        string actCode = volunteer.Activities.Count > 0 ? string.Join(",", volunteer.Activities.Select(a => a.ActNum)) : "";

        cmd = InsertVolActivitiesCommand("SP_InsertActualVolunteering_Y4524", con, volunteer.Email, actCode);        // create the command

        try
        {

            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }
    public int deleteVolAct(int actNum, string email)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteVolActCommandWithStoredProcedure("sp_DeleteVolAct", con, actNum, email);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;

        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    public List<Profession> GetActivitieProfessions(int ActNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = GetProfessionCommandByActNum("GetprofessionsOfAct", con, ActNum);        // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            List<Profession> ActivitiesProfessions = new List<Profession>();

            while (dataReader.Read())
            {
                Profession p = new Profession(Convert.ToInt32(dataReader["professionNum"].ToString()), dataReader["professionName"].ToString(), dataReader["shortDesc"].ToString());
                ActivitiesProfessions.Add(p);
            }
            return ActivitiesProfessions;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    public void InsertActivitieProfessions(Activities activities)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        //1,3,5,80
        string professionsActCode = activities.ActivitiesProfessions.Count > 0 ? string.Join(",", activities.ActivitiesProfessions.Select(a => a.ProfessionNum)) : "";

        cmd = InsertActivitieProfessionsCommand("SP_InsertActivitiesProfession_Y4524", con, activities.ActNum, professionsActCode);        // create the command

        try
        {
            cmd.ExecuteNonQuery(); // execute the command
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads proposals from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Proposal> ReadPro()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Proposal> proposalsList = new List<Proposal>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadProposal", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Proposal p = new Proposal();
                p.ProposalNum = Convert.ToInt32(dataReader["ProposalNum"]);
                p.ProposalName = dataReader["ProposalName"].ToString();
                p.ShortDesc = dataReader["ShortDesc"].ToString();
                p.Status = Convert.ToBoolean(dataReader["Status"]);
                p.Email = dataReader["Email"].ToString();


                proposalsList.Add(p);

            }
            return proposalsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a proposal to the proposals table 
    //--------------------------------------------------------------------------------------------------
    public int InsertPro(Proposal pro)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateProposalInsertCommandWithStoredProcedure("SP_InsertProposal_Y4524", con, pro);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method delete proposal from the database 
    //--------------------------------------------------------------------------------------------------
    public int deleteProp(int proposalNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeletProposalCommandWithStoredProcedure("sp_DeleteProposal", con, proposalNum);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method Updates a proposal to the proposal table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedProp(Proposal proposal, int proposalNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateProposalCommandWithStoredProcedure("SPUpdateProposal", con, proposal, proposalNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //public List<Profession> GetProposalProfessions(int ProposalNum)
    //{
    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    cmd = GetProfessionCommandByProposalNum("GetprofessionsOfProp", con, ProposalNum);        // create the command

    //    try
    //    {
    //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
    //        List<Profession> ProposalProfessions = new List<Profession>();
    //        while (dataReader.Read())
    //        {
    //            Profession p = new Profession(Convert.ToInt32(dataReader["professionNum"].ToString()), dataReader["professionName"].ToString(), dataReader["shortDesc"].ToString());
    //            ProposalProfessions.Add(p);
    //        }
    //        return ProposalProfessions;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }
    //}

    //public void InsertProposalProfessions(Proposal proposal)
    //{
    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("myProjDB"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    //1,3,5,80
    //    string professionsCode = proposal.ProposalProfessions.Count > 0 ? string.Join(",", proposal.ProposalProfessions.Select(a => a.ProfessionNum)) : "";

    //    cmd = InsertProposalProfessionsCommand("SP_InsertProposalProfessions_Y4524", con, proposal.ProposalNum, professionsCode);        // create the command

    //    try
    //    {
    //        cmd.ExecuteNonQuery(); // execute the command
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }
    //}

    //--------------------------------------------------------------------------------------------------
    // This method reads Profession from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Profession> ReadProfession()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Profession> professionsList = new List<Profession>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateCommandWithSPWithoutParameters("sp_ReadProfession", con);             // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Profession p = new Profession();
                p.ProfessionNum = Convert.ToInt32(dataReader["ProfessionNum"].ToString());
                p.ProfessionName = dataReader["ProfessionName"].ToString();
                p.ShortDesc = dataReader["ShortDesc"].ToString();


                professionsList.Add(p);

            }
            return professionsList;

        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a profession to the professions table 
    //--------------------------------------------------------------------------------------------------
    public int InsertProfession(Profession profession)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateProfessionInsertCommandWithStoredProcedure("SP_InsertProfession_Y29424", con, profession);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method Updates a Profession to the Profession table 
    //--------------------------------------------------------------------------------------------------
    public int InsertUpdatedProfession(Profession profession, int ProfessionNum)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateProfessionsInsertCommandWithStoredProcedure("SPUpdateProfession", con, profession, ProfessionNum);        // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------------------------------------
    // This method delete Profession from the database 
    //--------------------------------------------------------------------------------------------------
    public int deleteProfession(int ProfessionNum)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = DeleteProfessionCommandWithStoredProcedure("sp_DeleteProfession", con, ProfessionNum);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateVolunteerInsertCommandWithStoredProcedure(string spName, SqlConnection con, Volunteer volunteer)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", volunteer.Email);
        cmd.Parameters.AddWithValue("@Password", volunteer.Password);
        cmd.Parameters.AddWithValue("@Name", volunteer.Name);

        cmd.Parameters.AddWithValue("@Fname", volunteer.Fname);

        cmd.Parameters.AddWithValue("@Phone", volunteer.Phone);
        //cmd.Parameters.AddWithValue("@Sign", volunteer.Sign);
        cmd.Parameters.AddWithValue("@Sunday", volunteer.Sunday);
        cmd.Parameters.AddWithValue("@Monday", volunteer.Monday);
        cmd.Parameters.AddWithValue("@Tuesday", volunteer.Tuesday);
        cmd.Parameters.AddWithValue("@Wednesday", volunteer.Wednesday);
        cmd.Parameters.AddWithValue("@Thursday", volunteer.Thursday);
        cmd.Parameters.AddWithValue("@Friday", volunteer.Friday);
        cmd.Parameters.AddWithValue("@Saturday", volunteer.Saturday);

        cmd.Parameters.AddWithValue("@Img", volunteer.VolImage);
        cmd.Parameters.AddWithValue("@Status", volunteer.Status);



        return cmd;
    }

    private SqlCommand CreateCommandWithSPWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }
    private SqlCommand CreateCommandWithSPWithParameters(String spName, SqlConnection con, Volunteer volunteer)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", volunteer.Email);

        cmd.Parameters.AddWithValue("@Password", volunteer.Password);


        return cmd;
    }
    private SqlCommand CreateCommandByEmailWithSPWithParameters(String spName, SqlConnection con, Volunteer volunteer)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", volunteer.Email);


        return cmd;
    }
    private SqlCommand CreateCommandByActNumWithSPWithParameters(String spName, SqlConnection con, int ActNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", ActNum);


        return cmd;
    }
    private SqlCommand UpdateVolunteerInsertCommandWithStoredProcedure(String spName, SqlConnection con, Volunteer volunteer, String email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@Password", volunteer.Password);
        cmd.Parameters.AddWithValue("@Name", volunteer.Name);

        cmd.Parameters.AddWithValue("@Fname", volunteer.Fname);
        cmd.Parameters.AddWithValue("@Phone", volunteer.Phone);
        cmd.Parameters.AddWithValue("@Sign", volunteer.Sign);
        cmd.Parameters.AddWithValue("@Sunday", volunteer.Sunday);
        cmd.Parameters.AddWithValue("@Monday", volunteer.Monday);
        cmd.Parameters.AddWithValue("@Tuesday", volunteer.Tuesday);
        cmd.Parameters.AddWithValue("@Wednesday", volunteer.Wednesday);
        cmd.Parameters.AddWithValue("@Thursday", volunteer.Thursday);
        cmd.Parameters.AddWithValue("@Friday", volunteer.Friday);
        cmd.Parameters.AddWithValue("@Saturday", volunteer.Saturday);
        cmd.Parameters.AddWithValue("@Img", volunteer.VolImage);
        cmd.Parameters.AddWithValue("@Status", volunteer.Status);
        return cmd;
    }
    private SqlCommand UpdateVolunteerAreaInsertCommandWithStoredProcedure(string spName, SqlConnection con, string email, string areaNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@AreaNum", areaNum);
        
        return cmd;
    }
    
         private SqlCommand UpdateVolunteerProfInsertCommandWithStoredProcedure(string spName, SqlConnection con, string email, string profNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@ProfessionNum", profNum);

        return cmd;
    }

    private SqlCommand DeleteVolunteerAreaCommandWithStoredProcedure(string spName, SqlConnection con, string email, int areaNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@AreaNum", areaNum);

        return cmd;
    }
    
           private SqlCommand DeleteVolunteerProfCommandWithStoredProcedure(string spName, SqlConnection con, string email, int profNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@ProfessionNum", profNum);

        return cmd;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateEmployeeInsertCommandWithStoredProcedure(String spName, SqlConnection con, Employee employee)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", employee.Email);
        cmd.Parameters.AddWithValue("@FirstName", employee.FName);
        cmd.Parameters.AddWithValue("@LastName", employee.LName);
        cmd.Parameters.AddWithValue("@Phone", employee.Phone);
        cmd.Parameters.AddWithValue("@EmployeeID", employee.EmployeeID);
        cmd.Parameters.AddWithValue("@Status", employee.IsAdmin);
        cmd.Parameters.AddWithValue("@AreaNum", employee.AreaNum);
        cmd.Parameters.AddWithValue("@Password", employee.Password);



        return cmd;
    }



    private SqlCommand UpdateEmployeeInsertCommandWithStoredProcedure(String spName, SqlConnection con, Employee employee, String email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text


        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@Password", employee.Password);
        cmd.Parameters.AddWithValue("@FirstName", employee.FName);
        cmd.Parameters.AddWithValue("@LastName", employee.LName);
        cmd.Parameters.AddWithValue("@Phone", employee.Phone);
        cmd.Parameters.AddWithValue("@EmployeeID", employee.EmployeeID);
        cmd.Parameters.AddWithValue("@Status", employee.IsAdmin);
        cmd.Parameters.AddWithValue("@AreaNum", employee.AreaNum);
        return cmd;
    }

    private SqlCommand CreateCommandWithSPWithParametersEmp(String spName, SqlConnection con, Employee emp)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", emp.Email);

        cmd.Parameters.AddWithValue("@Password", emp.Password);


        return cmd;
    }
    private SqlCommand DeleteEmpCommandWithStoredProcedure(String spName, SqlConnection con, int employeeID)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@EmployeeID", employeeID);


        return cmd;
    }
    //---------------------------------------------------------------------------------
    // Create the Proposals SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateAreaInsertCommandWithStoredProcedure(String spName, SqlConnection con, Area area)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@AreaNum", area.AreaNum);
        cmd.Parameters.AddWithValue("@AreaName", area.AreaName);

        return cmd;
    }

    private SqlCommand UpdateAreasInsertCommandWithStoredProcedure(String spName, SqlConnection con, Area a, int areaNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@AreaNum", areaNum);
        cmd.Parameters.AddWithValue("@AreaName", a.AreaName);


        return cmd;
    }

    private SqlCommand DeleteAreaCommandWithStoredProcedure(String spName, SqlConnection con, int areaNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@AreaNum", areaNum);


        return cmd;
    }
    
      

    private SqlCommand InsertVolAreaCommand(string spName, SqlConnection con, string email, string areasCode)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@AreaNum", areasCode);

        return cmd;
    }
    private SqlCommand InsertVolProfessionCommand(string spName, SqlConnection con, string email, string professionCode)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@ProfessionNum", professionCode);

        return cmd;
    }
    private SqlCommand InsertVolActivitiesCommand(string spName, SqlConnection con, string email, string actCode)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@ActNum", actCode);

        return cmd;
    }
    private SqlCommand GetVolunteersCommandByEmail(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }




    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateActivitesInsertCommandWithStoredProcedure(String spName, SqlConnection con, Activities a)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@ActNum", a.ActNum);
        cmd.Parameters.AddWithValue("@ActName", a.ActName);
        cmd.Parameters.AddWithValue("@ShortDesc", a.ShortDesc);
        cmd.Parameters.AddWithValue("@Location", a.Location);

        cmd.Parameters.AddWithValue("@Date", a.Date);

        cmd.Parameters.AddWithValue("@StartHour", a.StartHour);
        cmd.Parameters.AddWithValue("@EndHour", a.EndHour);
        cmd.Parameters.AddWithValue("@Amount", a.Amount);
        cmd.Parameters.AddWithValue("@AreaNum", a.AreaNum);
        cmd.Parameters.AddWithValue("@EmployeeID", a.EmployeeID);
        cmd.Parameters.AddWithValue("@Status", a.Status);
        cmd.Parameters.AddWithValue("@IsDone", a.IsDone);
        cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

        return cmd;
    }


    private SqlCommand UpdateActivitiesInsertCommandWithStoredProcedure(String spName, SqlConnection con, Activities a, int actNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", actNum);
        cmd.Parameters.AddWithValue("@ActName", a.ActName);
        cmd.Parameters.AddWithValue("@ShortDesc", a.ShortDesc);
        cmd.Parameters.AddWithValue("@Location", a.Location);
        cmd.Parameters.AddWithValue("@Date", a.Date);
        cmd.Parameters.AddWithValue("@StartHour", a.StartHour);
        cmd.Parameters.AddWithValue("@EndHour", a.EndHour);
        cmd.Parameters.AddWithValue("@Amount", a.Amount);
        cmd.Parameters.AddWithValue("@AreaNum", a.AreaNum);
        cmd.Parameters.AddWithValue("@EmployeeID", a.EmployeeID);
        cmd.Parameters.AddWithValue("@Status", a.Status);
        cmd.Parameters.AddWithValue("@IsDone", a.IsDone);

        return cmd;
    }
    //---------------------------------------------------------------------------------
    // Create the SqlCommand Delete Act 3
    //---------------------------------------------------------------------------------
    private SqlCommand DeleteActivitiesCommandWithStoredProcedure(String spName, SqlConnection con, int actNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", actNum);


        return cmd;
    }
    private SqlCommand DeletProposalCommandWithStoredProcedure(String spName, SqlConnection con, int proposalNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@proposalNum", proposalNum);


        return cmd;
    }
    private SqlCommand DeleteVolActCommandWithStoredProcedure(String spName, SqlConnection con, int actNum, string email)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", actNum);
        cmd.Parameters.AddWithValue("@Email", email);


        return cmd;
    }

    //---------------------------------------------------------------------------------
    // Create the Proposals SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateProposalInsertCommandWithStoredProcedure(String spName, SqlConnection con, Proposal pro)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@ProposalNum", pro.ProposalNum);
        cmd.Parameters.AddWithValue("@ProposalName", pro.ProposalName);
        cmd.Parameters.AddWithValue("@ShortDesc", pro.ShortDesc);
        cmd.Parameters.AddWithValue("@Status", pro.Status);


        cmd.Parameters.AddWithValue("@Email", pro.Email);

        return cmd;
    }

    private SqlCommand UpdateProposalCommandWithStoredProcedure(String spName, SqlConnection con, Proposal pro, int proNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
        cmd.Parameters.AddWithValue("@ProposalNum", proNum);
        cmd.Parameters.AddWithValue("@ProposalName", pro.ProposalName);
        cmd.Parameters.AddWithValue("@ShortDesc", pro.ShortDesc);
        cmd.Parameters.AddWithValue("@Email", pro.Email);
        cmd.Parameters.AddWithValue("@Status", pro.Status);

        return cmd;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateProfessionInsertCommandWithStoredProcedure(String spName, SqlConnection con, Profession p)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@ProfessionNum", p.ProfessionNum);
        cmd.Parameters.AddWithValue("@ProfessionName", p.ProfessionName);
        cmd.Parameters.AddWithValue("@ShortDesc", p.ShortDesc);


        return cmd;
    }

    private SqlCommand UpdateProfessionsInsertCommandWithStoredProcedure(String spName, SqlConnection con, Profession p, int ProfessionNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ProfessionNum", ProfessionNum);
        cmd.Parameters.AddWithValue("@ProfessionName", p.ProfessionName);
        cmd.Parameters.AddWithValue("@ShortDesc", p.ShortDesc);

        return cmd;
    }

    private SqlCommand DeleteProfessionCommandWithStoredProcedure(String spName, SqlConnection con, int ProfessionNum)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ProfessionNum", ProfessionNum);


        return cmd;
    }
    private SqlCommand GetProfessionCommandByProposalNum(string spName, SqlConnection con, int proposalNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ProposalNum", proposalNum);

        return cmd;
    }
    private SqlCommand InsertProposalProfessionsCommand(string spName, SqlConnection con, int proposalNum, string professionsCode)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ProposalNum", proposalNum);
        cmd.Parameters.AddWithValue("@ProfessionNum", professionsCode);

        return cmd;
    }

    private SqlCommand GetProfessionCommandByActNum(string spName, SqlConnection con, int actNum)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", actNum);

        return cmd;
    }
    private SqlCommand InsertActivitieProfessionsCommand(string spName, SqlConnection con, int actNum, string professionsActCode)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@ActNum", actNum);
        cmd.Parameters.AddWithValue("@ProfessionNum", professionsActCode);

        return cmd;
    }
}

