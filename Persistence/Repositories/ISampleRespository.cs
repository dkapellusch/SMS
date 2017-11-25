using System.Collections.Generic;
using System.Threading.Tasks;
using SMS.Models;
using SMS.Models.Samples;
using System.Reactive;
using System;

namespace SMS.Persistence.Repositories
{
    public interface ISampleRespository
    {
        Sample GetSampleByNumber(int subjectNumber);
        Task<Sample> GetSampleByNumberAsync(int subjectNumber);
        IObservable<Sample> GetObservableSampleByNumber(int subjectNumber);
    }
}