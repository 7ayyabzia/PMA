using PMA.Models.ApplicationUser;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class UserProject
    {
        [Key]
        public int UserProjectId { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        [ForeignKey("User")]
        public string Id { get; set; }
        public virtual AppUser User { get; set; }

        public bool IsActive { get; set; }
    }
}
