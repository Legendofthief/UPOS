using System.ComponentModel.DataAnnotations;

namespace Lab4.Models
{
    public class Grade
    {
        [Key]
        public int StudentId { get; set; }

        public int DisciplineId { get; set; }

        public int? Grades { get; set; }

    }

}
