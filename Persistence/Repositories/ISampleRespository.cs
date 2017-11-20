using System.Collections.Generic;
using System.Threading.Tasks;
using SMS.Models;

namespace SMS.Persistence.Repositories
{
    public interface ISampleRespository
    {
        IEnumerable<Thing> GetAllThings();
        
        Task AddThingAsync(Thing thing);
        
    }
}