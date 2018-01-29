using System;
using System.IO;
using System.Linq;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using SMS.Persistence;

namespace SMS.Test
{
    [TestClass]
    internal class TestContext
    {
        private const string ConfigurationSettingsFile = "appsettings.json";

        private const string TestDatabaseName = "testDb";

        public static IServiceProvider ServiceProvider { get; private set; }

        public static void ClearDatabase()
        {
            var context = ServiceProvider.GetService<SamplesContext>();

            context.Samples.ToList().ForEach(e => context.Entry(e).State = EntityState.Deleted);
            context.Animals.ToList().ForEach(e => context.Entry(e).State = EntityState.Deleted);
            context.Things.ToList().ForEach(e => context.Entry(e).State = EntityState.Deleted);
            context.SaveChanges();
        }

        [AssemblyInitialize]
        public static void AssemblyInit(Microsoft.VisualStudio.TestTools.UnitTesting.TestContext context)
        {
            var configurationBuilder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(ConfigurationSettingsFile);
            var configuration = configurationBuilder.Build();
            var startup = new Startup(configuration);

            Startup.CurrentDatabaseName = TestDatabaseName;
            Startup.IsTestRun = true;
            startup.ConfigureServices(new ServiceCollection());
            ServiceProvider = Startup.ServiceProvider;
            ClearDatabase();
        }
    }
}
