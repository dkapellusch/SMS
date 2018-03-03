using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SMS.Models;

namespace SMS.Test
{
    [TestClass]
    public class AbstractRepoTest
    {
        private readonly TestRepository _repo = new TestRepository();

        [TestMethod]
        public async Task ThingAdded_SavedCorrectly()
        {
            var thing = new Thing {Name = "TestName"};
            await _repo.CreateAsync(thing);

            var thingFromDb = _repo.GetEntityByPrimaryKey<Thing>(thing.Id);
            Assert.AreEqual(thing, thingFromDb);
        }

        [TestMethod]
        public async Task ThingAdded_ThenUpdated_SavedCorrectly()
        {
            var thing = new Thing {Name = "TestName"};
            await _repo.CreateAsync(thing);

            thing.Name = "NewName";
            await _repo.UpdateAsync(thing);
            var thingFromDb = _repo.GetEntityByPrimaryKey<Thing>(thing.Id);

            Assert.AreEqual(thing, thingFromDb);
        }

        [TestMethod]
        public async Task AddOrUpdate_AddsWhenMissing_UpdatesWhenPresent()
        {
            var thing = new Thing {Name = "TestName"};
            await _repo.CreateOrUpdate(thing);

            thing.Name = "NewName";
            await _repo.UpdateAsync(thing);
            var thingFromDb = _repo.GetEntityByPrimaryKey<Thing>(thing.Id);

            Assert.AreEqual(thing, thingFromDb);
        }
    }
}