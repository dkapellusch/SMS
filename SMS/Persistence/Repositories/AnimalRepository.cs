using System;
using System.Collections.Generic;
using System.Reactive.Threading.Tasks;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SMS.Models.Animals;
using SMS.Models.Enums;
using SMS.Persistence.Interfaces;
using SMS.Persistence.Repositories.AbstractRepositories;

namespace SMS.Persistence.Repositories
{
    public class AnimalRepository : AbstractRepository, IAnimalRepository
    {
        public AnimalRepository(SamplesContext context) : base(context)
        {
        }

        public async Task AddAnimal(Animal animal)
        {
            if (!await SamplesContext.Animals.AnyAsync(a => a.Id == animal.Id))
            {
                await SamplesContext.Animals.AddAsync(animal);
            }
            else
            {
                animal.RecordStatus = RecordStatus.Modified;
                SamplesContext.Entry(await SamplesContext.Animals.FirstAsync(a => a.Id == animal.Id)).CurrentValues.SetValues(animal);
            }

            await SamplesContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Animal>> GetAllAnimalsAsync()
        {
            return await SamplesContext.Animals.ToListAsync();
        }

        public async Task<Animal> GetAnimalAsync(int animalNumber)
        {
            return await SamplesContext.Animals.FirstOrDefaultAsync(a => a.Id == animalNumber);
        }

        public IObservable<Animal> GetAnimalObservable(int animalNumber)
        {
            return SamplesContext.Animals.FirstOrDefaultAsync(a => a.Id == animalNumber).ToObservable();
        }
    }
}