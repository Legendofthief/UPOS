using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Refs.Models
{
    public class Teacher
    {
        [Key]
        [Column(TypeName = "int4")]
        public int id { get; set; }

        [Column(TypeName = "int4")]
        public int departmentid { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? recordnum { get; set; }

        [Column(TypeName = "varchar(100")]
        public string? fio { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? qualification { get; set; }

        [Column(TypeName = "date")]
        public DateOnly? startdt { get; set; }

        [Column(TypeName = "date")]
        public DateOnly? enddt { get; set; }
    }
}
