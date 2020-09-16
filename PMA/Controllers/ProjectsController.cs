using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Models;
using PMA.Services.ProjectService;

namespace PMA.Controllers
{
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task AddProject()
        {
            var project = JsonConvert.DeserializeObject<Project>(Request.Form["Project"]);
            await _projectService.AddProject(project);
        }

        public async Task<JsonResult> GetProjects()
        {
            var projects = await _projectService.GetProjects();
            return Json(projects);
        }
    }
}
