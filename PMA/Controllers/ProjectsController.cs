using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Models;
using PMA.Services._CurrentContext;
using PMA.Services.ProjectService;

namespace PMA.Controllers
{
    [Authorize]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly CurrentContext _currentContext;
        public ProjectsController(IProjectService projectService, CurrentContext currentContext)
        {
            _projectService = projectService;
            _currentContext = currentContext;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task AddProject()
        {
            var project = JsonConvert.DeserializeObject<Project>(Request.Form["Project"]);
            project.AccountId = await _currentContext.GetCurrentAccountId();
            await _projectService.AddProject(project);
            await _projectService.AssignResources(new UserProject
            {
                ProjectId = project.ProjectId,
                Id = await _currentContext.GetUserId()
            });
        }

        public async Task<JsonResult> GetProjects()
        {
            var projects = await _projectService.GetProjects();
            return Json(projects);
        }

        public IActionResult Estimations()
        {
            return View();
        }
    }
}
