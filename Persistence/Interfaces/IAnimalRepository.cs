using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using SMS.Models.Animals;

namespace SMS.Persistence.Interfaces
{
    public interface IAnimalRepository : IAbstractRepository
    {
        Task AddAnimal(Animal animal);
        Task<Animal> GetAnimalAsync(int animalNumber);
        Task<IEnumerable<Animal>> GetAllAnimalsAsync();
        IObservable<Animal> GetAnimalObservable(int animalNumber);
    }
}