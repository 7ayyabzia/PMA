using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Models;
using PMA.Services.UseCaseService;

namespace PMA.Controllers
{
    public class UseCasesController : Controller
    {
        private readonly IUseCaseService _useCaseService;
        public UseCasesController(IUseCaseService useCaseService)
        {
            _useCaseService = useCaseService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetFormat()
        {
            var useCase = await _useCaseService.GetFormat();
            return Json(useCase);
        }
        public async Task AddOrUpdateFormat(string format)
        {
            await _useCaseService.AddOrUpdateFormat(format);
        }
        public async Task<JsonResult> GetUseCases()
        {
            var useCases = await _useCaseService.GetUseCases();
            return Json(useCases);
        }
        public async Task AddUseCase()
        {
            var usecase = JsonConvert.DeserializeObject<UseCase>(Request.Form["usecase"]);
            await _useCaseService.AddUseCase(usecase);
        }
        public async Task EditUseCase()
        {
            var usecase = JsonConvert.DeserializeObject<UseCase>(Request.Form["usecase"]);
            await _useCaseService.UpdateUseCase(usecase);
        }

        public async Task<JsonResult> GetFactors()
        {
            var factors = await _useCaseService.GetFactors();
            return Json(factors);
        }
    }
}
