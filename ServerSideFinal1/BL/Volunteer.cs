using System;
using System.Text;
using System.Security.Cryptography;
using System.Text.RegularExpressions;


namespace ServerSide.BL
{
    public class Volunteer
    {
        string email;
        string password;
        string name;
        string fname;
        string phone;
        DateTime sign;
        bool sunday;
        bool monday;
        bool tuesday;
        bool wednesday;
        bool thursday;
        bool friday;
        bool saturday;
        string imageBase64;
        string volImage;
        bool status;
        static List<Volunteer> volunteersList = new List<Volunteer>();
        List<Area> areas = new List<Area>();
        List<Profession> professions = new List<Profession>();
        List<Activities> activities = new List<Activities>();



        public string Email { get => email; set { if (IsValidEmail(value)) email = value; } }
        public string Password { get => password; set { password = HashPassword(value); } }
        public string Name { get => name; set => name = value; }
        public string Fname { get => fname; set => fname = value; }
        public string Phone { get => phone; set => phone = value; }
        public DateTime Sign { get => sign; set => sign = value; }
        public bool Sunday { get => sunday; set => sunday = value; }
        public bool Monday { get => monday; set => monday = value; }
        public bool Tuesday { get => tuesday; set => tuesday = value; }
        public bool Wednesday { get => wednesday; set => wednesday = value; }
        public bool Thursday { get => thursday; set => thursday = value; }
        public bool Friday { get => friday; set => friday = value; }
        public bool Saturday { get => saturday; set => saturday = value; }
        public static List<Volunteer> VolunteersList { get => volunteersList; set => volunteersList = value; }
        public List<Area> Areas { get => areas; set => areas = value; }
        public List<Profession> Professions { get => professions; set => professions = value; }

        public List<Activities> Activities { get => activities; set => activities = value; }
        public string ImageBase64 { get => imageBase64; set => imageBase64 = value; }
        public string VolImage { get => volImage; set { volImage = value; } }
        public bool Status { get => status; set { status = value; } }


        public Volunteer()
        {
        }

        public Volunteer(string email, string password, string name, string fname, string phone, DateTime sign, bool sunday, bool monday, bool tuesday, bool wednesday, bool thursday, bool friday, bool saturday, bool status)
        {
            Email = email;
            Password = password;
            Name = name;
            Fname = fname;
            Phone = phone;
            Sign = sign;
            Sunday = sunday;
            Monday = monday;
            Tuesday = tuesday;
            Wednesday = wednesday;
            Thursday = thursday;
            Friday = friday;
            Saturday = saturday;
            Status = status;
        }



        public string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public static bool IsValidEmail(string email)
        {
            // Regular expression pattern for validating email addresses
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            // Create a Regex object with the pattern
            Regex regex = new Regex(pattern);

            // Use the Regex.IsMatch method to check if the email matches the pattern
            return regex.IsMatch(email);
        }


        public List<Volunteer> ReadVol()
        {
            DBservices dbs = new DBservices();
            List<Volunteer> volList = dbs.ReadVol();

            foreach (Volunteer vol in volList)
            {
                vol.Areas = dbs.GetVolunteersArea(vol.Email);
                vol.Professions = dbs.GetVolunteersProfession(vol.Email);
                vol.Activities = dbs.GetVolunteersActivities(vol.Email);
                if (vol.Activities!=null)
                {
                    foreach (var activity in vol.Activities)
                    {
                        activity.ActivitiesProfessions = dbs.GetActivitieProfessions(activity.ActNum);
                    }

                }
            }

            return volList;

        }
        public int Insert()
        {
            DBservices dbs = new DBservices();
            int result = dbs.Insert(this);
            if (result > 0)
            {
                dbs.InsertVolArea(this);
                dbs.InsertVolProfession(this);
            }
            return result;

        }
        public int InsertVolActivities()
        {
            DBservices dbs = new DBservices();
            return dbs.InsertVolActivities(this);
        }
        //Login
        public Volunteer Login()
        {
            DBservices dbs = new DBservices();
            Volunteer vol = dbs.GetVolunteersByDetails(this);
            if (vol != null)
            {
                vol.Areas = dbs.GetVolunteersArea(vol.Email);
                vol.Professions = dbs.GetVolunteersProfession(vol.Email);
                vol.Activities = dbs.GetVolunteersActivities(vol.Email);
                if (vol.Activities != null)
                {
                    foreach (var activity in vol.Activities)
                    {
                        activity.ActivitiesProfessions = dbs.GetActivitieProfessions(activity.ActNum);
                    }

                }
            }
            return vol;
        }
        public Volunteer ByEmail()
        {
            DBservices dbs = new DBservices();
            Volunteer vol = dbs.GetVolunteersByEmail(this);
            if (vol != null)
            {
                vol.Areas = dbs.GetVolunteersArea(vol.Email);
                vol.Professions = dbs.GetVolunteersProfession(vol.Email);
                vol.Activities = dbs.GetVolunteersActivities(vol.Email);
                if (vol.Activities != null)
                {
                    foreach (var activity in vol.Activities)
                    {
                        activity.ActivitiesProfessions = dbs.GetActivitieProfessions(activity.ActNum);
                    }

                }
            }
            return vol;
        }
        public int UpdateDetails(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedVol(this, email);

        }
        public int DeleteVolAct(int actNum,string email)
        {
            DBservices dbs = new DBservices();
           return dbs.deleteVolAct(actNum, email);

        }
        
            public int ChangePassword(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.changePass(email);

        }
        public int UpdateDetailsVolArea(string email,string areaNum)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedVolArea(email, areaNum);

        }
        public int DeleteVolArea(string email, int areaNum)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteUpdatedVolArea(email, areaNum);

        }
        public int UpdateDetailsVolProf(string email, string profNum)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedVolProf(email, profNum);

        }
        public int DeleteVolProf(string email, int profNum)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteUpdatedVolProf(email, profNum);

        }
    }
}
