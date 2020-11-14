using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Dto.Sprint;
using PMA.Models;
using PMA.Services._CurrentContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Services.BacklogService
{
    public interface IBacklogService
    {
        Task AddIssue(BacklogIssue issue);
        Task UpdateIssue(BacklogIssue issue);
        Task<IEnumerable<BacklogIssue>> GetIssues();

        Task<SprintDto> GetActiveSprint();
        Task<SprintDto> GetSprint(int id);
        Task<IEnumerable<Sprint>> GetCompletedSprints();
        int GetActiveSprintId();
        Task StartSprint(Sprint sprint, IEnumerable<int> issues);
        Task AddIssuesInSprint(IEnumerable<int> issues, int sprintId);
        Task UpdateIssueStatus(IEnumerable<int> ids, string status);
        Task CompleteSprint(int sprintId);
    }
    public class BacklogService : IBacklogService
    {
        private readonly AppDbContext _dbContext;
        private readonly CurrentContext _currentContext;
        public BacklogService(AppDbContext dbContext, CurrentContext currentContext)
        {
            _dbContext = dbContext;
            _currentContext = currentContext;
        }

        #region "Issues"
        public async Task<IEnumerable<BacklogIssue>> GetIssues()
        {
            var projectId = _currentContext.GetActiveProjectId();
            var issues = await _dbContext.BacklogIssues.Where(s => s.ProjectId == projectId).ToListAsync();
            return issues;
        }
        public async Task AddIssue(BacklogIssue issue)
        {
            issue.IssueCode = _currentContext.GetCurrentProjectProp("ProjectName").Substring(0, 2).ToUpper() + "-" + (_dbContext.BacklogIssues.Count(s => s.ProjectId == _currentContext.GetActiveProjectId()) + 1).ToString();
            issue.ProjectId = _currentContext.GetActiveProjectId();
            await _dbContext.BacklogIssues.AddAsync(issue);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateIssue(BacklogIssue issue)
        {
            var _issue = await _dbContext.BacklogIssues.FindAsync(issue.BacklogIssueId);
            _issue.Summary = issue.Summary;
            _issue.AssignedTo = issue.AssignedTo;
            _issue.Description = issue.Description;
            _issue.Priority = issue.Priority;
            _issue.IssueType = issue.IssueType;

            _dbContext.Update(_issue);
            await _dbContext.SaveChangesAsync();
        }
        #endregion

        #region "Sprint"
        public async Task<SprintDto> GetActiveSprint()
        {
            var projectId = _currentContext.GetActiveProjectId();
            var activeSprint =  await _dbContext.Sprints.SingleOrDefaultAsync(s => s.ProjectId == projectId && s.IsActive == true);
            var sprintDto = new SprintDto
            {
                Sprint = activeSprint,
                BacklogIssues = await _dbContext.BacklogIssues.Include(s=>s.User)
                .Where(s => s.SprintId == activeSprint.SprintId).ToListAsync()
            };
            return sprintDto;
        }
        public int GetActiveSprintId()
        {
            var projectId = _currentContext.GetActiveProjectId();
            var sprint = _dbContext.Sprints.SingleOrDefault(s => s.ProjectId == projectId && s.IsActive == true);
            return sprint != null ? sprint.SprintId : 0;
        }
        public async Task StartSprint(Sprint sprint, IEnumerable<int> issues)
        {
            sprint.ProjectId = _currentContext.GetActiveProjectId();
            await _dbContext.Sprints.AddAsync(sprint);
            await _dbContext.SaveChangesAsync();

            await AddIssuesInSprint(issues, sprint.SprintId);
        }
        public async Task AddIssuesInSprint(IEnumerable<int> issues, int sprintId)
        {
            var _issues = await _dbContext.BacklogIssues.Where(s => issues.Contains(s.BacklogIssueId)).ToListAsync();
            _issues.ForEach(s => s.SprintId = sprintId);
            _dbContext.UpdateRange(_issues);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateIssueStatus(IEnumerable<int> ids, string status)
        {
            var issues = await _dbContext.BacklogIssues.Where(s=> ids.Contains(s.BacklogIssueId)).ToListAsync();
            issues.ForEach(s=>s.Status = status);

            _dbContext.UpdateRange(issues);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CompleteSprint(int sprintId)
        {
            var sprint = await _dbContext.Sprints.FindAsync(sprintId);
            sprint.IsCompleted = true;
            sprint.IsActive = false;
            sprint.EndDate = DateTime.Now;

            _dbContext.Update(sprint);
            await _dbContext.SaveChangesAsync();

            var issues = await _dbContext.BacklogIssues.Where(s => s.SprintId == sprintId).ToListAsync();
            issues.ForEach(s =>
            {
                s.Status = "DONE";
                s.IsCompleted = true;
            });
            _dbContext.UpdateRange(issues);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<SprintDto> GetSprint(int id)
        {
            var projectId = _currentContext.GetActiveProjectId();
            var activeSprint = await _dbContext.Sprints.SingleOrDefaultAsync(s => s.SprintId == id);
            var sprintDto = new SprintDto
            {
                Sprint = activeSprint,
                BacklogIssues = await _dbContext.BacklogIssues.Include(s => s.User)
                .Where(s => s.SprintId == activeSprint.SprintId).ToListAsync()
            };
            return sprintDto;
        }

        public async Task<IEnumerable<Sprint>> GetCompletedSprints()
        {
            var projectId = _currentContext.GetActiveProjectId();
            var sprints = await _dbContext.Sprints.Where(s => s.IsCompleted == true && s.ProjectId == projectId).ToListAsync();
            return sprints;
        }


        #endregion
    }
}
