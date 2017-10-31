using System.Collections.Generic;
using core2.Models;

namespace core2.Persistence.Repositories
{
    public class SamplesRepository : ISampleRespository
    {
        public SamplesRepository(PostgresqlContext context)
        {
            Context = context;
        }

        private PostgresqlContext Context { get; }

        public IEnumerable<Thing> GetAllThings()
        {
            return Context.Things;
        }

        public void AddThing(Thing thing)
        {
            Context.Things.Add(thing);
            Context.SaveChanges();
        }

        public void RemoveAllThings()
        {
            Context.Things.RemoveRange(Context.Things);
            Context.SaveChanges();
        }
    }
}