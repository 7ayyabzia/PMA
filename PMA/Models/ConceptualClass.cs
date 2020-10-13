using System.ComponentModel.DataAnnotations;

namespace PMA.Models
{
    public class ConceptualClass
    {
        [Key]
        public int ConceptualClassId { get; set; }
        public string ClassName { get; set; }
        public string Attributes { get; set; }
        public string Methods { get; set; }

        public int PDMId { get; set; }
        public virtual PDM PDM { get; set; }
    }
}