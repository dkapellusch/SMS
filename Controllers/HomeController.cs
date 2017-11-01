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
        public HomeController(ILogger<HomeController> logger, ISampleRespository samples)
        {
            samples.AddThing(new Thing{Name = "Something"});
            var addedSample = samples.GetAllThings().LastOrDefault();
            logger.LogWarning($"Just added a new sample with name {addedSample?.Name}, and id {addedSample?.Id}");
            
        }
        
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
