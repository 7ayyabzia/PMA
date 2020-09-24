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

        public async Task<AppUser> GetUser()
        {
            var User = _context.HttpContext.User;
            var user = await _userManager.GetUserAsync(User);
            return user;
        }

        public async Task<string> GetUserId()
        {
            var user = await GetUser();
            return user.Id;
        }

        public async Task<int> GetCurrentAccountId()
        {
            var user = await GetUser();
            return user.AccountId;
        }

        public async Task<int> GetActiveProjectId()
        {
            var user = await GetUserId();
            var project = await _dbContext.UserProjects.SingleOrDefaultAsync(s => s.Id == user && s.IsActive == true);
            return project.ProjectId;
        }

        public async Task<int> GetActiveUserProjectId()
        {
            var user = await GetUserId();
            var project = await _dbContext.UserProjects.SingleOrDefaultAsync(s => s.Id == user && s.IsActive == true);
            return project.UserProjectId;
        }

        public async Task<UserInfo> GetCurrentUserInfo()
        {
            var id = await GetUserId();
            var user = await _userManager.Users.Include(s=>s.UserProjects).ThenInclude(s=>s.Project).SingleOrDefaultAsync(s => s.Id == id);
            var roles = await _userManager.GetRolesAsync(user);
            var userRoles = string.Join(',', roles.ToArray());
            var userInfo = new UserInfo
            {
                Name = user.FirstName + " " + user.LastName,
                AccountName = _dbContext.Accounts.Find(user.AccountId).AccountName,
                Project = user.UserProjects.SingleOrDefault(s => s.IsActive == true).Project.ProjectName,
                AssignedProjects = user.UserProjects.Where(s => s.IsActive == false).ToList(),
                Role = userRoles
            };
            return userInfo;
        }
    }
}
