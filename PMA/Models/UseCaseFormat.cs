using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class UseCaseFormat
    {
        [Key]
        public int UseCaseFormatId { get; set; }
        public string Format { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
