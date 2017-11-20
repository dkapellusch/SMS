using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SMS.Models;
using SMS.Persistence.Repositories;

namespace SMS.Controllers
{
    public class HomeController : Controller
    {
        private ILogger _logger;
        
        public HomeController(ILogger<HomeController> logger, ISampleRespository samples)
        {
            _logger = logger;
            Samples = samples;

        }

        private ISampleRespository Samples { get; }

        public async Task<IActionResult> Index()
        {
            await Samples.AddThingAsync(new Thing { Name = "Something" });
            var addedSample = Samples.GetAllThings().LastOrDefault();
            _logger.LogWarning($"Just added a new sample with name {addedSample?.Name}, and id {addedSample?.Id}");
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
