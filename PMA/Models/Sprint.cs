using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class Sprint
    {
        [Key]
        public int SprintId { get; set; }
        public string SprintName { get; set; }
        public string SprintGoal { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EstimatedEndDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsActive { get; set; } = true;

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
