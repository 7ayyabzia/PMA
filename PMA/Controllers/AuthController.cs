using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PMA.Dto.User;
using PMA.Models;
using PMA.Models.ApplicationUser;
using PMA.Services.AccountService;
using PMA.Services.ProjectService;

namespace PMA.Controllers
{
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAccountService _accountService;
        private readonly IProjectService _projectService;

        public AuthController(
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
        }

        public async Task<JsonResult> IsUsernameValid(string username)
        {
            try
            {
                AppUser user = await _userManager.FindByNameAsync(username);
                return user == null ? Json(true) : Json(false);
            }
            catch(Exception Ex)
            {
                Console.WriteLine(Ex.Message);
                return null;
            }
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Register(IFormCollection form)
        {
            try
            {
                var registerDto = JsonConvert.DeserializeObject<RegisterDto>(form["registerDto"]);
                var account = JsonConvert.DeserializeObject<Account>(form["account"]);
                var project = JsonConvert.DeserializeObject<Project>(form["project"]);

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
                    MobileNumber = registerDto.MobileNumber
                };

                //Add Account of the User
                await _accountService.CreateAccount(account);

                //Assigning Account to User
                user.AccountId = account.AccountId;
                IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);
                if (!result.Succeeded)
                    return Json(result.Errors.Select(s => s.Description).ToString());

                var roleResult = await _userManager.AddToRoleAsync(user, "Manager");
                if (!roleResult.Succeeded)
                    return Json(roleResult.Errors.Select(s => s.Description).ToString());

                //Create Project
                project.AccountId = account.AccountId;
                project.StartingDate = DateTime.Now;
                await _projectService.AddProject(project);

                //Create User Project
                var userProject = new UserProject
                {
                    Id = user.Id,
                    ProjectId = project.ProjectId,
                    IsActive = true
                };
                await _projectService.AssignResources(userProject);

                return Json("Success");
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
            {
                ViewBag.Result = "The username and/or password entered are not valid. Please try again or contact support.";
                return View();
            }
            if (user.Blocked == true || user.Deleted == true)
            {
                ViewBag.Result = "You can not log in! Please contact your Manager";
                return View();
            }

            var result = await _signInManager.PasswordSignInAsync(loginDto.Username, loginDto.Password, false, false);
            if (!result.Succeeded)
            {
                ViewBag.Result = "Invalid Username or Password!";
                return View();
            }

            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Auth");
        }

        [Authorize]
        public IActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                ViewBag.Error = "No User Found!";
                return View();
            }
            var result = await _userManager.ChangePasswordAsync(user,
                changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                    ViewBag.Error = error.Description;
                }
                return View();
            }

            await _signInManager.RefreshSignInAsync(user);
            return RedirectToAction("Index", "Conversations");
        }

    }
}
