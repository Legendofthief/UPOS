using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Refs.Models
{
    public class Department
    {
        [Key]
        [Column(TypeName = "int4")]
        public int id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? departmentcode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? departmentnm { get; set; }

    }
}
