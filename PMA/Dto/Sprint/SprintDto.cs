using System.Collections.Generic;
using PMA.Models;

namespace PMA.Dto.Sprint
{
    public class SprintDto
    {
        public PMA.Models.Sprint Sprint { get; set; }
        public IEnumerable<BacklogIssue> BacklogIssues { get; set; }
    }
}
