using System.Diagnostics;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using SMS.Persistence.Interfaces;

namespace SMS.Controllers
{
    public class HomeController : Controller
    {
        private ILogger _logger;

        public HomeController(ILogger<HomeController> logger, ISampleRepository samples)
        {
            _logger = logger;
            Samples = samples;
        }

        private ISampleRepository Samples { get; }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}