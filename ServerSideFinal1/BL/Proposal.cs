namespace ServerSide.BL
{
    public class Proposal
    {
        int proposalNum;
        string proposalName;
        string shortDesc;
        bool status;
        //DateTime date;
        //int amount;
        //int employeeID;
        string email;
        //List<Profession> proposalProfessions = new List<Profession>();

        public Proposal()
        { }
        public Proposal(int proposalNum, string proposalName, string shortDesc, bool status,string email)
        {
            ProposalNum = proposalNum;
            ProposalName = proposalName;
            ShortDesc = shortDesc;
            Status = status;
            //EmployeeID = employeeID;
            Email = email;
        }

        public int ProposalNum { get => proposalNum; set => proposalNum = value; }
        public string ProposalName { get => proposalName; set => proposalName = value; }
        public string ShortDesc { get => shortDesc; set => shortDesc = value; }

        //public int EmployeeID { get => employeeID; set => employeeID = value; }
        public string Email { get => email; set => email = value; }
        public bool Status { get => status; set => status = value; }

        //public List<Profession> ProposalProfessions { get => proposalProfessions; set => proposalProfessions = value; }

        public List<Proposal> ReadPro()
        {
            DBservices dbs = new DBservices();
            List<Proposal>propList = dbs.ReadPro();
            //foreach (Proposal prop in propList)
            //{
            //    prop.ProposalProfessions = dbs.GetProposalProfessions(prop.ProposalNum);

            //}
            return propList;    
        }
        public int InsertPro()
        {
            DBservices dbs = new DBservices();
            int result= dbs.InsertPro(this);
            //if (result > 0)
            //{
            //    dbs.InsertProposalProfessions(this);
            //}
            return result;  
        }
    public int UpdatePropDetails(int proposalNum)
    {
        DBservices dbs = new DBservices();
        return dbs.InsertUpdatedProp(this, proposalNum);

    }
        public int DeleteProp(int proposalNum)
        {
            DBservices dbs = new DBservices();
            return dbs.deleteProp(proposalNum);
        }
    }
}

