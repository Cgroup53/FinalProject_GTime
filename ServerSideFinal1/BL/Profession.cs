namespace ServerSide.BL
{
    public class Profession
    {
        int professionNum;
        string professionName;
        string shortDesc;

        public Profession(int professionNum, string professionName, string shortDesc)
        {
            ProfessionNum = professionNum;
            ProfessionName = professionName;
            ShortDesc = shortDesc;
        }
        public Profession() { }

        public int ProfessionNum { get => professionNum; set => professionNum = value; }
        public string ProfessionName { get => professionName; set => professionName = value; }
        public string ShortDesc { get => shortDesc; set => shortDesc = value; }

        public List<Profession> ReadProfession()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadProfession();

        }
        public int InsertProfession()
        {
            DBservices dbs = new DBservices();
            return dbs.InsertProfession(this);

        }
        public int UpdateDetailsProfession(int professionNum)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedProfession(this, professionNum);

        }
        public int DeleteProfession(int professionNum)
        {
            DBservices dbs = new DBservices();
            return dbs.deleteProfession(professionNum);
        }
    }
}
