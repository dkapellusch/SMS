using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Common Methods
     */
    public abstract partial class AbstractRepository
    {
        protected readonly PostgresqlContext _PostgresqlContext;

        protected AbstractRepository(PostgresqlContext context)
        {
            _PostgresqlContext = context;
        }

        protected int SaveChanges()
        {
            bool saveFailed;
            var result = 0;
            const int maxTries = 5;
            var tryCount = 0;
            do
            {
                saveFailed = false;

                try
                {
                    result = _PostgresqlContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    ex.Entries.Single().Reload();
                }
            }
            while (saveFailed && tryCount++ < maxTries);

            return result;
        }

        protected async Task<int> SaveChangesAsync()
        {
            bool saveFailed;
            var result = 0;

            do
            {
                saveFailed = false;

                try
                {
                    result = await _PostgresqlContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    await ex.Entries.Single().ReloadAsync().ConfigureAwait(false);
                }
            }
            while (saveFailed);

            return result;
        }
    }
}