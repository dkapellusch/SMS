using System;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;
using SMS.Models;
using SMS.Models.Samples;
using SMS.Persistence.Interfaces;
using SMS.Persistence.Repositories.AbstractRepositories;

namespace SMS.Persistence.Repositories
{
    public class SamplesRepository : AbstractRepository, ISampleRepository
    {
        public SamplesRepository(SamplesContext context) : base(context)
        {
            Context = context;
        }

        private SamplesContext Context { get; }

        public IObservable<Sample> GetObservableSampleByNumber(int subjectNumber)
        {
            return Context.Samples.ToObservable();
        }

        public Sample GetSampleByNumber(int subjectNumber)
        {
            return Context.Samples.FirstOrDefault(s => s.Id == subjectNumber);
        }

        public async Task<Sample> GetSampleByNumberAsync(int subjectNumber)
        {
            return (Sample) await Context.FindAsync(typeof(Sample), subjectNumber);
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