using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SMS.Models.Animals;
using SMS.Persistence.Repositories;
using SMS.Persistence.Interfaces;

namespace SMS.Controllers
{
    [Route("api/[controller]")]
    public class AnimalsController : Controller
    {
        private readonly ILogger<AnimalsController> _logger;

        public AnimalsController(IAnimalRepository animalRepository, ILogger<AnimalsController> logger)
        {
            AnimalRepo = animalRepository;
            _logger = logger;
        }

        private IAnimalRepository AnimalRepo { get; }

        [HttpPost("add")]
        public async Task<IActionResult> AddAnimal([FromBody] Animal animal)
        {
            await AnimalRepo.CreateOrUpdate(animal, animal.Id);
            _logger.LogInformation($"Added new animal with id {animal.Id} and name: {animal.Name}");
            
            return Ok();
        }

        [HttpGet("find/{animalNumber}")]
        public async Task<Animal> GetAnimalAsync(int animalNumber) 
        {
            var animal = await AnimalRepo.GetAnimalAsync(animalNumber);
            _logger.LogInformation($"Got animal with number {animalNumber} with name {animal.Name}");
            return animal;
        }
    }
}