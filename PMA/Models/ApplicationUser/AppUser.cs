using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models.ApplicationUser
{
    public class AppUser : IdentityUser
    {
        public int AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public bool Blocked { get; set; }
        public bool Deleted { get; set; }
    }
}
