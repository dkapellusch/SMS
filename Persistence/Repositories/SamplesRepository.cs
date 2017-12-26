using System.Threading.Tasks;
using SMS.Models;
using SMS.Models.Samples;
using System.Linq;
using System;
using System.Reactive.Linq;
using SMS.Persistence.Interfaces;

namespace SMS.Persistence.Repositories
{
    public class SamplesRepository : AbstractRepository, ISampleRespository
    {
        public SamplesRepository(PostgresqlContext context) : base(context)
        {
            Context = context;
        }

        private PostgresqlContext Context { get; }


        public Sample GetSampleByNumber(int subjectNumber)
        {
            return Context.Samples.FirstOrDefault(s => s.SubjectNumber == subjectNumber);
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

        public async Task<Sample> GetSampleByNumberAsync(int subjectNumber)
        {
            return (Sample) await Context.FindAsync(typeof(Sample), subjectNumber);
        }

        public IObservable<Sample> GetObservableSampleByNumber(int subjectNumber)
        {
            return Context.Samples.ToObservable();
        }
    }
}