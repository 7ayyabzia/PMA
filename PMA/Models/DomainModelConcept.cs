using System.ComponentModel.DataAnnotations;

namespace PMA.Models
{
    public class DomainModelConcept
    {
        [Key]
        public int DomainModelConceptId { get; set; }

        public string ClassName { get; set; }
        public string Attributes { get; set; }
        public string Methods { get; set; }

        public int DomainModelId { get; set; }
        public virtual DomainModel DomainModel { get; set; }
    }
}