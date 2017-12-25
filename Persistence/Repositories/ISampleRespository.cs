using System.Threading.Tasks;
using SMS.Models.Samples;
using System;

namespace SMS.Persistence.Repositories
{
    public interface ISampleRespository : IAbstractRepository
    {
        Sample GetSampleByNumber(int subjectNumber);
        Task<Sample> GetSampleByNumberAsync(int subjectNumber);
        IObservable<Sample> GetObservableSampleByNumber(int subjectNumber);
    }
}