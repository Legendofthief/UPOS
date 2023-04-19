using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using RefsCor.Models;
using Refs.Models;
using System.Net;

namespace RefsCor.Models
{
    public class DataBaseContext:DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options):base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("refs");
            base.OnModelCreating(modelBuilder);

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                var currentTableName = modelBuilder.Entity(entity.Name).Metadata.GetDefaultTableName();
                if (currentTableName != null)
                {
                    modelBuilder.Entity(entity.Name).ToTable(currentTableName.ToLower());
                }
            }
        }

        public DbSet<Refs.Models.Student> Students { get; set; } = default!;

        public DbSet<Refs.Models.Faculty> Faculties { get; set; } = default!;

        public DbSet<Refs.Models.Department> Departments { get; set; } = default!;

        public DbSet<Refs.Models.Teacher> Teachers { get; set; } = default!;
    }
}
