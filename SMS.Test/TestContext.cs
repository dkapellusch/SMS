using System;
using System.IO;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SMS.Test
{
    [TestClass]
    internal class TestContext
    {
        private const string CONFIGURATION_SETTINGS_FILE = "appsettings.json";

        public static IServiceProvider ServiceProvider { get; private set; }

        [AssemblyInitialize]
        public static void AssemblyInit(Microsoft.VisualStudio.TestTools.UnitTesting.TestContext context)
        {
            var configurationBuilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(CONFIGURATION_SETTINGS_FILE);
            var configuration = configurationBuilder.Build();
            var startup = new Startup(configuration);

            startup.ConfigureServices(new ServiceCollection());
            ServiceProvider = Startup.ServiceProvider;
        }
    }
}
