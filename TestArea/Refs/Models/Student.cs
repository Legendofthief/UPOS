using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Refs.Models
{
    public class Student
    {
        [Key]
        [Column(TypeName = "int4")]
        public int id { get; set; }

        [Column(TypeName = "int4")]
        public int groupid { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? recordnum { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? studentname { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? phone { get; set; }

        [Column(TypeName = "varchar(4000)")]
        public string? photo { get; set; }
    }
}
