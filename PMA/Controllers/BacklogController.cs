using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Extensions;
using PMA.Models;
using PMA.Services.BacklogService;

namespace PMA.Controllers
{
    public class BacklogController : Controller
    {
        private readonly IBacklogService _backlogService;
        public BacklogController(IBacklogService backlogService)
        {
            _backlogService = backlogService;
        }
        public IActionResult Issues()
        {
            return View();
        }

        public async Task<JsonResult> GetIssues()
        {
            var issues = await _backlogService.GetIssues();
            return Json(issues);
        }
        public async Task AddIssue()
        {
            var issue = JsonConvert.DeserializeObject<BacklogIssue>(Request.Form["Issue"]);
            if (issue.BacklogIssueId == 0)
                await _backlogService.AddIssue(issue);
            else
                await _backlogService.UpdateIssue(issue);
        }
        public async Task<ContentResult> RenderIssueDialogue()
        {
            var result = await this.RenderViewToStringAsync("/Views/Backlog/_CreateIssue.cshtml", "");
            return Content(result);
        }

        public async Task<IActionResult> ActiveSprintAsync()
        {
            try
            {
                var sprint = await _backlogService.GetActiveSprint();
                return View(sprint);
            }
            catch(Exception Ex)
            {
                ViewBag.Error = "*No Sprint is active currently. To start sprint, please select issues in 'Backlog' and start sprint!";
                return View();
            }
        }

        public async Task<JsonResult> GetActiveSprint()
        {
            var sprint = await _backlogService.GetActiveSprint();
            return Json(sprint);
        }

        public JsonResult GetActiveSprintId()
        {
            return Json(_backlogService.GetActiveSprintId());
        }

        public async Task AddIssuesInSprint()
        {
            var sprintId = Convert.ToInt32(Request.Form["sprintId"]);
            var issues = JsonConvert.DeserializeObject<IEnumerable<int>>(Request.Form["issues"]);
            await _backlogService.AddIssuesInSprint(issues, sprintId);
        }

        public async Task StartSprint()
        {
            var sprint = JsonConvert.DeserializeObject<Sprint>(Request.Form["sprint"]);
            var issues = JsonConvert.DeserializeObject<IEnumerable<int>>(Request.Form["issues"]);
            await _backlogService.StartSprint(sprint, issues);
        }

        public async Task UpdateIssueStatus()
        {
            var todo = JsonConvert.DeserializeObject<IEnumerable<int>>(Request.Form["todo"]);
            var inprogress = JsonConvert.DeserializeObject<IEnumerable<int>>(Request.Form["inprogress"]);
            var done = JsonConvert.DeserializeObject<IEnumerable<int>>(Request.Form["done"]);
            await _backlogService.UpdateIssueStatus(todo, "TODO");
            await _backlogService.UpdateIssueStatus(inprogress, "IN PROGRESS");
            await _backlogService.UpdateIssueStatus(done, "DONE");
        }

        public async Task CompleteSprint(int sprintId)
        {
            await _backlogService.CompleteSprint(sprintId);
        }
        public async Task<IActionResult> CompletedSprints()
        {
            var sprints = await _backlogService.GetCompletedSprints();
            return View(sprints);
        }

        public async Task<IActionResult> SprintReport(int id)
        {
            try
            {
                var sprint = await _backlogService.GetSprint(id);
                return View(sprint);
            }
            catch(Exception Ex)
            {
                return Ok("404 Error, No page found!");
            }
        }
    }
}
