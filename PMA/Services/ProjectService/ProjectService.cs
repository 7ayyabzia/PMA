using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Models;
using PMA.Services._CurrentContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace PMA.Services.ProjectService
{
    public interface IProjectService
    {
        Task AddProject(Project project);
        Task<IEnumerable<Project>> GetProjects();
        Task EditProject(Project project);
        Task DeleteProject(int id);
        Task AssignResources(UserProject userProject);
    }
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _dbcontext;
        private readonly CurrentContext _currentContext;
        public ProjectService(AppDbContext dbcontext, CurrentContext currentContext)
        {
            _dbcontext = dbcontext;
            _currentContext = currentContext;
        }
        public async Task AddProject(Project project)
        {
            var accountId = await _currentContext.GetCurrentAccountId();
            project.AccountId = accountId;

            await _dbcontext.AddAsync(project);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var accountId = await _currentContext.GetCurrentAccountId();
            var projects = await _dbcontext.Projects.Where(s=>s.AccountId == accountId).ToListAsync();
            return projects;
        }

        public async Task AssignResources(UserProject userProject)
        {
            userProject.IsActive = true;

            await _dbcontext.UserProjects.AddAsync(userProject);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteProject(int id)
        {
            var project = await _dbcontext.Projects.Include(s=>s.UserProjects).SingleOrDefaultAsync(s=>s.ProjectId == id);
            _dbcontext.Remove(project);
            await _dbcontext.SaveChangesAsync();
        }

        public async Task EditProject(Project project)
        {
            var _project = _dbcontext.Projects.Find(project.ProjectId);

            _project.ProjectName = project.ProjectName;
            _project.ProjectType = project.ProjectType;
            _project.ProjectDescription = project.ProjectDescription;
            _project.CurrentStatus = project.CurrentStatus;

            _dbcontext.Update(_project);
            await _dbcontext.SaveChangesAsync();
        }

    }
}
