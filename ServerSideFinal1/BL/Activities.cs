using System.Net;

namespace ServerSide.BL
{
    public class Activities
    {
        int actNum;
        string actName;
        string shortDesc;
        string location;
        DateTime date;
        DateTime startHour;
        DateTime endHour;
        int amount;
        int areaNum;
        int employeeID;
        bool status;
        bool isDone;
        List<Profession> activitiesProfessions = new List<Profession>();
        List<string> volunteerEmails = new List<string>();

  
        public Activities()
        {
        }

        public Activities(int actNum, string actName, string shortDesc, string location, DateTime date, DateTime startHour, DateTime endHour, int amount, int areaNum, int employeeID, bool status, bool isDone)
        {
            ActNum = actNum;
            ActName = actName;
            ShortDesc = shortDesc;
            Location = location;
            Date = date;
            StartHour = startHour;
            EndHour = endHour;
            Amount = amount;
            AreaNum = areaNum;
            EmployeeID = employeeID;
            Status = status;
            IsDone = isDone;
        }

        public List<Profession> ActivitiesProfessions { get => activitiesProfessions; set => activitiesProfessions = value; }
        public int ActNum { get => actNum; set => actNum = value; }
        public string ActName { get => actName; set => actName = value; }
        public string ShortDesc { get => shortDesc; set => shortDesc = value; }
        public string Location { get => location; set => location = value; }
        public DateTime Date { get => date; set => date = value; }
        public DateTime StartHour { get => startHour; set => startHour = value; }
        public DateTime EndHour { get => endHour; set => endHour = value; }
        public int Amount { get => amount; set => amount = value; }
        public int AreaNum { get => areaNum; set => areaNum = value; }
        public int EmployeeID { get => employeeID; set => employeeID = value; }
        public bool Status { get => status; set => status = value; }
        public bool IsDone { get => isDone; set => isDone = value; }
        public List<string> VolunteerEmails { get => volunteerEmails; set => volunteerEmails = value; }

        public List<Activities> ReadAct()
        {

            DBservices dbs = new DBservices();
            List<Activities> ActList1 = dbs.ReadAct();
            foreach (Activities activities in ActList1)
            {
                activities.ActivitiesProfessions = dbs.GetActivitieProfessions(activities.ActNum);
                activities.VolunteerEmails = dbs.GetVolunteersByActNum(activities.ActNum);
            }
            return ActList1;
        }
        public int InsertAct()
        {
            DBservices dbs = new DBservices();
            int result = dbs.InsertAct(this);
            if (result > 0)
            {

                dbs.InsertActivitieProfessions(this);
            }
            return result;

        }

        public int UpdateDetailsAct(int actNum)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedAct(this, actNum);

        }
        public int DeleteAct(int actNum)
        {
            DBservices dbs = new DBservices();
            return dbs.deleteAct(actNum);
        }
    }
}
