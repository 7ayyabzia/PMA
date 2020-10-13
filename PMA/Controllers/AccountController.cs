using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PMA.Dto.User;
using PMA.Models;
using PMA.Models.ApplicationUser;
using PMA.Services._CurrentContext;
using PMA.Services.AccountService;
using PMA.Services.ProjectService;

namespace PMA.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly CurrentContext _currentContext;
        private readonly IAccountService _accountService;
        private readonly IProjectService _projectService;

        public AccountController(
            CurrentContext currentContext,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAccountService accountService,
            IProjectService projectService
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _accountService = accountService;
            _projectService = projectService;
            _currentContext = currentContext;
        }


        [Authorize]
        public async Task<JsonResult> GetCurrentUserInfo()
        {
            var userInfo = await _currentContext.GetCurrentUserInfo();
            return Json(userInfo);
        }

        public IActionResult Update()
        {
            return View();
        }

        public async Task<JsonResult> GetAccount()
        {
            var accountId = await _currentContext.GetCurrentAccountId();
            var account = await _accountService.GetAccount(accountId);
            return Json(account);
        }
        public async Task UpdateAccount()
        {
            var account = JsonConvert.DeserializeObject<Account>(Request.Form["account"]);
            await _accountService.UpdateAccount(account);
        }
        [Authorize]
        public async Task<IActionResult> UpdateProfile()
        {
            var userId = await _currentContext.GetUserId();
            var user = await _userManager.Users.Include(s => s.UserProjects)
                .ThenInclude(s => s.Project).SingleOrDefaultAsync(s => s.Id == userId);

            UpdateProfileDto profile = new UpdateProfileDto
            {
                email = user.Email,
                mobileNumber = user.MobileNumber,
                firstName = user.FirstName,
                lastName = user.LastName,
                id = user.Id,
                userProjects = user.UserProjects
            };
            return View(profile);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto updateProfileDto)
        {
            var user = await _userManager.GetUserAsync(User);

            user.FirstName = updateProfileDto.firstName;
            user.LastName = updateProfileDto.lastName;
            user.MobileNumber = updateProfileDto.mobileNumber;
            user.Email = updateProfileDto.email;
            user.UserName = updateProfileDto.email;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                result.Errors.ToList().ForEach(s => ViewBag.Error += s.Description);
                return View(updateProfileDto);
            }

            return RedirectToAction("UpdateProfile");
        }


        #region "Users"
        [Authorize]
        public async Task<JsonResult> AddUser()
        {
            try
            {
                var registerDto = JsonConvert.DeserializeObject<RegisterDto>(Request.Form["registerDto"]);
                var userProject = JsonConvert.DeserializeObject<UserProject>(Request.Form["userProject"]);

                AppUser user = await _userManager.FindByNameAsync(registerDto.Email);
                if (user != null)
                {
                    return Json("Email Already Registered!");
                }

                user = new AppUser
                {
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    MobileNumber = registerDto.MobileNumber,
                    AccountId = await _currentContext.GetCurrentAccountId()
                };


                string errors = "";
                IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);
                if (!result.Succeeded)
                {
                    errors = string.Join(", ", result.Errors.Select(s => s.Description));
                    return Json(errors);
                }

                var roleResult = await _userManager.AddToRoleAsync(user, "Engineer");
                if (!roleResult.Succeeded)
                {
                    errors = string.Join(", ", result.Errors.Select(s => s.Description));
                    return Json(errors);
                }

                userProject.Id = user.Id;
                await _projectService.AssignResources(userProject);

                return Json(true);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
        public async Task<JsonResult> UpdateUser()
        {
            var registerDto = JsonConvert.DeserializeObject<RegisterDto>(Request.Form["registerDto"]);
            var user = await _userManager.Users.SingleOrDefaultAsync(s => s.Id == registerDto.Id);

            user.FirstName = registerDto.FirstName;
            user.LastName = registerDto.LastName;
            user.MobileNumber = registerDto.MobileNumber;
            user.Email = registerDto.Email;
            user.UserName = registerDto.Email;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var error = result.Errors.Select(s => s.Description).FirstOrDefault();
                return Json(error);
            }

            return Json(true);
        }
        public async Task<JsonResult> GetAccountUsers()
        {
            var accountId = await _currentContext.GetCurrentAccountId();
            var userId = await _currentContext.GetUserId();
            var users = await _userManager.Users.Where(s => s.AccountId == accountId && s.Deleted == false && s.Id != userId).Include(s => s.UserProjects)
                .ThenInclude(s => s.Project).ToListAsync();

            users.ForEach(s => s.UserProjects.ToList().ForEach(a => { a.User = null; a.Project.UserProjects = null; }));
            return Json(users);
        }
        public async Task ActivateProject(int id, string userid)
        {
            await _accountService.ActivateProject(userid, id);
        }
        public async Task AddUserProject()
        {
            var userProject = JsonConvert.DeserializeObject<UserProject>(Request.Form["userProject"]);
            await _projectService.AssignResources(userProject);
        }
        public async Task DeleteUserProject(int id)
        {
            await _projectService.UnAssignUser(id);
        }
        public async Task BlockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.Blocked = true;
            await _userManager.UpdateAsync(user);
        }
        public async Task UnblockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.Blocked = false;
            await _userManager.UpdateAsync(user);
        }
        public async Task DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.Deleted = true;
            await _userManager.UpdateAsync(user);
        }

        #endregion
    }
}
