using System.Collections.Generic;
using core2.Models;

namespace core2.Persistence.Repositories
{
    public interface ISampleRespository
    {
        IEnumerable<Thing> GetAllThings();
        
        void AddThing(Thing thing);
        
        
    }
}