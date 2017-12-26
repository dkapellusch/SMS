using System;
using System.Threading.Tasks;
using SMS.Models.Animals;

namespace SMS.Persistence.Interfaces
{
    public interface IAnimalRepository : IAbstractRepository
    {
        Task AddAnimal(Animal animal);
        Task<Animal> GetAnimalAsync(int animalNumber);
        IObservable<Animal> GetAnimalObservable(int animalNumber);
    }
}