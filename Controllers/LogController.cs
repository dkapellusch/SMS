using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SMS.Models.Internal;

namespace SMS.Controllers
{
    [Route("logging")]
    public class LogController : Controller
    {
        public LogController(ILogger<LogController> _logger)
        {
            Logger = _logger;
        }

        [HttpPost("info/")]
        public IActionResult WriteLog([FromBody]LogMessage message)
        {
            Logger.LogError(1, 
                            null, 
                            $@"Message from client {this.Request.HttpContext.Connection.RemoteIpAddress}, 
                            {message.Message}", 
                            message.Args);
            return Ok();
        }

        public ILogger<LogController> Logger { get; }
    }
}