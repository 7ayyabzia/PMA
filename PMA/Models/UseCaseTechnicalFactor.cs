using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class UseCaseTechnicalFactor
    {
        [Key]
        public int UseCaseTechnicalFactorId { get; set; }

        public int TechnicalFactorId { get; set; }
        public virtual TechnicalFactor TechnicalFactor { get; set; }

        public int UseCaseId { get; set; }
        public virtual UseCase UseCase { get; set; }
    }
}
