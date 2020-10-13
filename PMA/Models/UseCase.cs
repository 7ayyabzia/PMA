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
        public IEnumerable<MainSuccessScenario> MainSuccessScenario { get; set; }
        public IEnumerable<Extension> Extensions { get; set; }
        public string SpecialRequirements { get; set; }
        public string Technology { get; set; }
        public string OpenIssues { get; set; }

        public IEnumerable<UseCaseTechnicalFactor> TechnicalFactors { get; set; }
        public IEnumerable<UseCaseEnvironmentalFactor> EnvironmentalFactors { get; set; }
    }

    public class MainSuccessScenario
    {
        [Key]
        public int MainSuccessScenarioId { get; set; }

        public int Number { get; set; }
        public string Value { get; set; }

        public int UseCaseId { get; set; }
        public virtual UseCase UseCase { get; set; }
    }

    public class Extension
    {
        [Key]
        public int ExtensionId { get; set; }

        public string Number { get; set; }
        public string Value { get; set; }
        public string ExtensionSolutions { get; set; }

        public int UseCaseId { get; set; }
        public virtual UseCase UseCase { get; set; }
    }
}
