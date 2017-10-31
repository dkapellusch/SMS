﻿using System;
using System.Linq;
using core2.Models;
using Microsoft.EntityFrameworkCore;

namespace core2.Persistence
{
    public class PostgresqlContext : DbContext
    {
        public PostgresqlContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Thing> Things { get; set; }


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