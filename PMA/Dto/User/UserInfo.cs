using PMA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Dto.User
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string AccountName { get; set; }
        public string Project { get; set; }
        public IEnumerable<UserProject> AssignedProjects { get; set; }
        public string Role { get; set; }
    }
}
