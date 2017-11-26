﻿using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SMS.Models.Animals;
using SMS.Models.Enums;

namespace SMS.Persistence.Repositories
{
    public class AnimalRepository : IAnimalRepository
    {
        public AnimalRepository(PostgresqlContext context)
        {
            Context = context;
        }

        private PostgresqlContext Context { get; }

        public async Task AddAnimal(Animal animal)
        {
            if (!await Context.Animals.AnyAsync(a => a.Id == animal.Id))
            {
                await Context.Animals.AddAsync(animal);

            }
            else
            {
                var existingAnimal = await Context.Animals.FirstAsync(a => a.Id == animal.Id);
                existingAnimal.RecordStatus = RecordStatus.Modified;
                existingAnimal = animal;
            }
            await Context.SaveChangesAsync();
        }
    }
}