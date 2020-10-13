using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Models;
using PMA.Services.DomainModelService;

namespace PMA.Controllers
{
    public class DomainModelController : Controller
    {
        private readonly IDomainModelService _domainModelService;
        public DomainModelController(IDomainModelService domainModelService)
        {
            _domainModelService = domainModelService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult PartialDomainModels()
        {
            return View();
        }

        public async Task<JsonResult> GetPDMs()
        {
            var pdms = await _domainModelService.GetPDMs();
            return Json(pdms);
        }
        public async Task AddOrUpdatePDM()
        {
            var pdm = JsonConvert.DeserializeObject<PDM>(Request.Form["pdm"]);
            await _domainModelService.AddOrUpdatePDM(pdm);
        }

        public async Task<JsonResult> GetDomainModel()
        {
            var dm = await _domainModelService.GetDomainModel();
            return Json(dm);
        }
        public async Task UpdateDomainModel()
        {
            await _domainModelService.UpdateDomainModel();
        }
    }
}
