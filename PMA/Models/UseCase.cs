using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class UseCase
    {
        [Key]
        public int UseCaseId { get; set; }

        public int UseCaseFormatId { get; set; }
        public virtual UseCaseFormat UseCaseFormat { get; set; }

        public string UseCaseNumber { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Scope { get; set; }
        public string Level { get; set; }
        public string Actor { get; set; }
        public string StakeholdersInterest { get; set; }
        public string PreConditions { get; set; }
        public string PostConditions { get; set; }
        public string MainSuccessScenario { get; set; }
        public string Extensions { get; set; }
        public string SpecialRequirements { get; set; }
        public string Technology { get; set; }
        public string OpenIssues { get; set; }
    }
}
