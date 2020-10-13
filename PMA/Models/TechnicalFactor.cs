using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class TechnicalFactor
    {
        [Key]
        public int TechnicalFactorId { get; set; }
        public string Factor { get; set; }
        public string Description { get; set; }
        public double Weight { get; set; }
    }
}
