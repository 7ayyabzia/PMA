using PMA.Models.ApplicationUser;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class BacklogIssue
    {
        [Key]
        public int BacklogIssueId { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string IssueCode { get; set; }
        public string IssueType { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; } = "TODO";
        public DateTime IssueAddedDate { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;

        [ForeignKey("User")]
        public string AssignedTo { get; set; }
        public virtual AppUser User { get; set; }

        [Description("If Issue is listed in Sprint")]
        public int? SprintId { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
