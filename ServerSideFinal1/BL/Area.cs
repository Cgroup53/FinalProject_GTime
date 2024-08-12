namespace ServerSide.BL
{
    public class Area
    {
        int areaNum;
        string areaName;

        public Area(int areaNum, string areaName)
        {
            AreaNum = areaNum;
            AreaName = areaName;
        }
        public Area() { }   

        public int AreaNum { get => areaNum; set => areaNum = value; }
        public string AreaName { get => areaName; set => areaName = value; }

        public List<Area> ReadArea()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadArea();

        }
        public int InsertArea()
        {
            DBservices dbs = new DBservices();
            return dbs.InsertArea(this);

        }
        public int UpdateDetailsArea(int areaNum)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertUpdatedArea(this, areaNum);

        }
        public int DeleteArea(int areaNum)
        {
            DBservices dbs = new DBservices();
            return dbs.deleteArea(areaNum);
        }
    }
}
