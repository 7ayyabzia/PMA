using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Dto.User;
using PMA.Models.ApplicationUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Services._CurrentContext
{

    public class CurrentContext
    {
        private readonly IHttpContextAccessor _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _dbContext;
        public CurrentContext(IHttpContextAccessor context, UserManager<AppUser> userManager, AppDbContext dbContext)
        {
            _context = context;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public string GetUserId()
        {
            var userId = _context.HttpContext.User.FindFirst("UserId").Value;
            return userId;
        }

        public int GetCurrentAccountId()
        {
            var accountId = Convert.ToInt32(_context.HttpContext.User.FindFirst("AccountId").Value);
            return accountId;
        }

        public int GetActiveProjectId()
        {
            var user = GetUserId();
            var project = _dbContext.UserProjects.SingleOrDefault(s => s.Id == user && s.IsActive == true);
            return project.ProjectId;
        }

        public string GetCurrentProjectProp(string propName)
        {
            var userProject = _dbContext.UserProjects.Include(s=>s.Project).SingleOrDefault(s => s.IsActive == true && s.Id == GetUserId());
            var project = userProject.Project;
            var result = project.GetType().GetProperty(propName).GetValue(project, null) as string;
            return result;
        }

        public async Task<UserInfo> GetCurrentUserInfo()
        {
            var id = GetUserId();
            var user = await _userManager.Users.Include(s=>s.UserProjects).ThenInclude(s=>s.Project).SingleOrDefaultAsync(s => s.Id == id);
            var roles = await _userManager.GetRolesAsync(user);
            var userRoles = string.Join(',', roles.ToArray());
            var userInfo = new UserInfo
            {
                Name = user.FirstName + " " + user.LastName,
                AccountName = _dbContext.Accounts.Find(user.AccountId).AccountName,
                Project = user.UserProjects.SingleOrDefault(s => s.IsActive == true).Project.ProjectName,
                //AssignedProjects = user.UserProjects.Where(s => s.IsActive == false).ToList(),
                Role = userRoles
            };
            //userInfo.AssignedProjects.ToList().ForEach(s => s.Project.UserProjects = null);
            return userInfo;
        }
    }
}
