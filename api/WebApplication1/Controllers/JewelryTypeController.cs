﻿using JewelryManagement.Contexts.JewelryType;
using JewelryManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryTypeController : ControllerBase
    {
        private readonly GetJewelryTypesContext getJewelryTypesContext;
        private readonly GetJewelryTypeByIdContext getJewelryTypeByIdContext;
        private readonly CreateJewelryTypeContext createJewelryTypeContext;
        private readonly UpdateJewelryTypeContext updateJewelryTypeContext;
        private readonly DeleteJewelryTypeContext deleteJewelryTypeContext;

        public JewelryTypeController()
        {
            getJewelryTypesContext = new GetJewelryTypesContext();
            getJewelryTypeByIdContext = new GetJewelryTypeByIdContext();
            createJewelryTypeContext = new CreateJewelryTypeContext();
            updateJewelryTypeContext = new UpdateJewelryTypeContext();
            deleteJewelryTypeContext = new DeleteJewelryTypeContext();
        }

        [HttpGet]
        public JsonResult Get()
        {
            return getJewelryTypesContext.Execute();
        }

        [HttpGet]
        [Route("edit/{id}")]
        public JsonResult GetById(int id)
        {
            return getJewelryTypeByIdContext.Execute(id);
        }

        [HttpPost]
        public JsonResult Post(JewelryType type)
        {
            return createJewelryTypeContext.Execute(type);
        }

        [HttpPut]
        public JsonResult Put(JewelryType type)
        {
            return updateJewelryTypeContext.Execute(type);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return deleteJewelryTypeContext.Execute(id);
        }
    }
}