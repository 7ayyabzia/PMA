using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMA.Services._CurrentContext;

namespace PMA.Controllers
{
    public class AccountController : Controller
    {
        private readonly CurrentContext _currentContext;
        public AccountController(CurrentContext currentContext)
        {
            _currentContext = currentContext;
        }

        [Authorize]
        public async Task<JsonResult> GetCurrentUserInfo()
        {
            var userInfo = await _currentContext.GetCurrentUserInfo();
            return Json(userInfo);
        }
    }
}
