using System.Collections.Generic;
using SMS.Models;

namespace SMS.Persistence.Repositories
{
    public interface ISampleRespository
    {
        IEnumerable<Thing> GetAllThings();
        
        void AddThing(Thing thing);
        
        
    }
}