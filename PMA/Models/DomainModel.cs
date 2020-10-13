using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class DomainModel
    {
        [Key]
        public int DomainModelId { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public IEnumerable<DomainModelConcept> DomainModelConcepts { get; set; }
    }
}
