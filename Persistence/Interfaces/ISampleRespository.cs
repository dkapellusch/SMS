using System;
using System.Threading.Tasks;

using SMS.Models.Samples;

namespace SMS.Persistence.Interfaces
{
    public interface ISampleRespository : IAbstractRepository
    {
        IObservable<Sample> GetObservableSampleByNumber(int subjectNumber);

        Sample GetSampleByNumber(int subjectNumber);

        Task<Sample> GetSampleByNumberAsync(int subjectNumber);
    }
}