using System;
using System.Linq;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using SMS.Models.Animals;
using SMS.Models.Enums;
using SMS.Models.Samples;
using SMS.Persistence;

namespace SMS.Test
{
    [TestClass]
    public class SampleRepositoryTest
    {
        public IServiceProvider ServiceProvider => TestContext.ServiceProvider;

        public PostgresqlContext Context => ServiceProvider.GetService<PostgresqlContext>();

        [TestMethod]
        public void MonkeyCreated_SamplesAssociated_SavedCorrectly()
        {
            var monkey = new Animal { AgeInMonths = 12, AnimalType = AnimalType.Monkey, Experiment = "ICR", Name = "JoJo", RecordStatus = RecordStatus.New };
            var sample = new Sample { AgeInMonths = 12, SampleType = SampleType.Gut };

            monkey.Samples.Add(sample);
            monkey.Samples.Add(new Sample { AgeInMonths = 12, SampleType = SampleType.Gut });
            monkey.Samples.Add(new Sample { AgeInMonths = 12, SampleType = SampleType.Gut });
            monkey.Samples.Add(new Sample { AgeInMonths = 12, SampleType = SampleType.Gut });
            monkey.Samples.Add(new Sample { AgeInMonths = 12, SampleType = SampleType.Gut });
            Context.Animals.Add(monkey);

            Context.SaveChanges();

            var animalSaved = Context.Animals.Find(monkey.Id);
            var associatedSamples = animalSaved.Samples.ToList();

            Assert.AreEqual(monkey,animalSaved);
            Assert.AreEqual(5, associatedSamples.Count);
        }

        [TestMethod]
        public void SampleCreated_AnimalAssociated_SavedCorrectly()
        {
            var sample = new Sample { AgeInMonths = 12, SampleType = SampleType.Gut };
            var monkey = new Animal { AgeInMonths = 12, AnimalType = AnimalType.Monkey, Experiment = "ICR", Name = "JoJo", RecordStatus = RecordStatus.New };

            sample.Animal = monkey;
            Context.Samples.Add(sample);

            Context.SaveChanges();

            var savedSample = Context.Samples.Find(sample.Id);
            var associatedAnimal = savedSample.Animal;
            var associatedSample = associatedAnimal.Samples.First();

            Assert.AreEqual(monkey,associatedAnimal);
            Assert.AreEqual(sample, savedSample);
            Assert.AreEqual(sample, associatedSample);
        }
    }
}