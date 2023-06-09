﻿using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.JewelryType
{
    public class UpdateJewelryTypeGateway
    {
        public void Update(Models.JewelryType jewelryType)
        {
            string query = @"
                           update dbo.jewelryType
                           set Name= @Name,
                           PricePerG=@PricePerG
                           where Id=@Id
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("Id", jewelryType.Id);
                    myCommand.Parameters.AddWithValue("Name", jewelryType.Name);
                    myCommand.Parameters.AddWithValue("PricePerG", jewelryType.PricePerG);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}