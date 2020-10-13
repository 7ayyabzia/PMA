using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class UseCaseEnvironmentalFactor
    {
        [Key]
        public int UseCaseEnvironmentalFactorId { get; set; }

        public int EnvironmentalFactorId { get; set; }
        public virtual EnvironmentalFactor EnvironmentalFactor { get; set; }

        public int UseCaseId { get; set; }
        public virtual UseCase UseCase { get; set; }
    }
}
