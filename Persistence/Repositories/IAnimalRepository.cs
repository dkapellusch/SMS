using System.Threading.Tasks;
using SMS.Models.Animals;

namespace SMS.Persistence.Repositories
{
    public interface IAnimalRepository
    {
        Task AddAnimal(Animal animal);
    }
}