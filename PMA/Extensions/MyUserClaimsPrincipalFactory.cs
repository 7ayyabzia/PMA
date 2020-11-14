using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using PMA.Models.ApplicationUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PMA.Extensions
{
    public class MyUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUser>
    {
        public MyUserClaimsPrincipalFactory
        (
            UserManager<AppUser> userManager,
            IOptions<IdentityOptions> optionsAccessor
        ) : base(userManager, optionsAccessor)
        {
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(AppUser user)
        {
            var identity = await base.GenerateClaimsAsync(user);

            var AccountIdClaim = new Claim("AccountId", user.AccountId.ToString());
            var UserIdClaim = new Claim("UserId", user.Id.ToString());

            identity.AddClaim(AccountIdClaim);
            identity.AddClaim(UserIdClaim);

            return identity;
        }
    }
}
