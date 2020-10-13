using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class PDM
    {
        [Key]
        public int PDMId { get; set; }

        public int UseCaseId { get; set; }
        public virtual UseCase UseCase { get; set; }

        public IEnumerable<ConceptualClass> ConceptualClasses { get; set; }
    }
}
