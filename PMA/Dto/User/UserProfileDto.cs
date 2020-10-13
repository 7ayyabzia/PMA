using PMA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Dto.User
{
    public class UpdateProfileDto
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string mobileNumber { get; set; }
        public IEnumerable<UserProject> userProjects { get; set; }
    }
}
