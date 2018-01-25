using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;

using SMS.Models;
using SMS.Models.Animals;
using SMS.Models.Samples;

namespace SMS.Persistence
{
    public class PostgresqlContext : DbContext
    {
        public PostgresqlContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Animal> Animals { get; set; }

        public DbSet<Sample> Samples { get; set; }

        public DbSet<Thing> Things { get; set; }

        public override int SaveChanges()
        {
            ChangeTracker.Entries().Where(e => e.State == EntityState.Modified).ToList().ForEach(entry => entry.Property("LastUpdate").CurrentValue = DateTime.Now);

            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}