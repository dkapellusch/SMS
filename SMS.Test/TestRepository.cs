using Microsoft.Extensions.DependencyInjection;

using SMS.Persistence;
using SMS.Persistence.Repositories.AbstractRepositories;

namespace SMS.Test
{
    internal class TestRepository : AbstractRepository
    {
        public TestRepository() : this(TestContext.ServiceProvider.GetService<PostgresqlContext>())
        {
        }

        public TestRepository(PostgresqlContext context) : base(context)
        {
        }

    }
}