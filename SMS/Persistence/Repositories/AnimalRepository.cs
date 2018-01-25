using System;
using System.Collections.Generic;
using System.Reactive.Threading.Tasks;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SMS.Models.Animals;
using SMS.Models.Enums;
using SMS.Persistence.Interfaces;

namespace SMS.Persistence.Repositories
{
    public class AnimalRepository : AbstractRepository, IAnimalRepository
    {
        public AnimalRepository(PostgresqlContext context) : base(context)
        {
        }

        public async Task AddAnimal(Animal animal)
        {
            if (!await _PostgresqlContext.Animals.AnyAsync(a => a.Id == animal.Id))
            {
                await _PostgresqlContext.Animals.AddAsync(animal);
            }
            else
            {
                animal.RecordStatus = RecordStatus.Modified;
                _PostgresqlContext.Entry(await _PostgresqlContext.Animals.FirstAsync(a => a.Id == animal.Id)).CurrentValues.SetValues(animal);
            }

            await _PostgresqlContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Animal>> GetAllAnimalsAsync()
        {
            return await _PostgresqlContext.Animals.ToListAsync();
        }

        public async Task<Animal> GetAnimalAsync(int animalNumber)
        {
            return await _PostgresqlContext.Animals.FirstOrDefaultAsync(a => a.Id == animalNumber);
        }

        public IObservable<Animal> GetAnimalObservable(int animalNumber)
        {
            return _PostgresqlContext.Animals.FirstOrDefaultAsync(a => a.Id == animalNumber).ToObservable();
        }
    }
}