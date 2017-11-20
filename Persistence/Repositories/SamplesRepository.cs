using System.Collections.Generic;
using System.Threading.Tasks;
using SMS.Models;

namespace SMS.Persistence.Repositories
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

        public async Task AddThingAsync(Thing thing)
        {
            await Context.Things.AddAsync(thing);
            await Context.SaveChangesAsync();
        }

        public void RemoveAllThings()
        {
            Context.Things.RemoveRange(Context.Things);
            Context.SaveChanges();
        }
    }
}