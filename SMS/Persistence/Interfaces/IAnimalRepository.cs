using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SMS.Models.Animals;

namespace SMS.Persistence.Interfaces
{
    public interface IAnimalRepository
    {
        Task AddAnimal(Animal animal);

        Task<IEnumerable<Animal>> GetAllAnimalsAsync();

        Task<Animal> GetAnimalAsync(int animalNumber);

        IObservable<Animal> GetAnimalObservable(int animalNumber);
    }
}