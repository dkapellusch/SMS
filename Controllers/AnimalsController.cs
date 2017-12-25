using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SMS.Models.Animals;
using SMS.Persistence.Repositories;

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
//            await AnimalRepo.AddAnimal(animal);
            await AnimalRepo.CreateOrUpdate(animal, animal.Id);
            _logger.LogInformation($"Added new animal with id {animal.Id} and name: {animal.Name}");
            
            return Ok();
        }
    }
}