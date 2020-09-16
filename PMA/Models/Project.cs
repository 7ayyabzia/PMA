using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectType { get; set; }
        public string ProjectDescription { get; set; }
        public DateTime StartingDate { get; set; }
        public bool IsCompleted { get; set; }
        public string CurrentStatus { get; set; }

        public int AccountId { get; set; }
        public virtual Account Account { get; set; }

        public virtual IEnumerable<UserProject> UserProjects { get; set; }
    }
}
