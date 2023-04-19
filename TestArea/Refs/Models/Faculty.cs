using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Refs.Models
{
    public class Faculty
    {
        [Key]
        [Column(TypeName = "int4")]
        public int id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? facultycode { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string? facultynm { get; set; }
    }
 }
