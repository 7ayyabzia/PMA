using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public string AccountCode { get; set; }
        public string SecretKey { get; set; }

        public DateTime CreationDate { get; set; }
        public bool Status { get; set; }
    }
}
