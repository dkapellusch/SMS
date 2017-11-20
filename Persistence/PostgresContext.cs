using System;
using System.Linq;
using SMS.Models;
using Microsoft.EntityFrameworkCore;
using SMS.Models.Animals;
namespace SMS.Persistence
{
    public class PostgresqlContext : DbContext
    {
        public PostgresqlContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Thing> Things { get; set; }
        public DbSet<Animal> Animals { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.Entries()
                         .Where(e => e.State == EntityState.Modified).ToList()
                         .ForEach(entry => entry.Property("LastUpdate").CurrentValue = DateTime.Now);
            
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}