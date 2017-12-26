using System;
using System.Diagnostics;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SMS.Models.Internal;
using SMS.Models.Samples;
using SMS.Persistence.Repositories;
using SMS.Persistence.Interfaces;

namespace SMS.Controllers
{
    [Route("logging")]
    public class LogController : Controller
    {
        public LogController(ILogger<LogController> _logger, ISampleRespository samples)
        {
            Logger = _logger;
            Samples = samples;
        }

        private ISampleRespository Samples { get; }

        private ILogger<LogController> Logger { get; }

        [HttpPost("info/")]
        public IActionResult WriteLog([FromBody] LogMessage message)
        {
            Logger.LogError(1,
                null,
                $@"Message from client {Request.HttpContext.Connection.RemoteIpAddress}, 
                            {message.Message}",
                message.Args);
            
            Samples.GetObservableSampleByNumber(1).Subscribe(Observer.Create<Sample>(sample =>
            {
                var x = sample.AgeInMonths;
            }));
            
            return Ok();
        }

        [HttpGet("task/")]
        public async Task<TimeSpan> SampleFromTask()
        {
            var s = Stopwatch.StartNew();
            var sample = await Samples.GetSampleByNumberAsync(1);
            return TimeSpan.FromMilliseconds(s.ElapsedMilliseconds);
        }

        [HttpGet("observe/")]
        public async Task<TimeSpan> SampleFromObservable()
        {
            var s = Stopwatch.StartNew();
            Sample sam;
            await Samples.GetObservableSampleByNumber(1).Do(i => sam = i).LastAsync();

            return TimeSpan.FromMilliseconds(s.ElapsedMilliseconds);
        }
    }
}