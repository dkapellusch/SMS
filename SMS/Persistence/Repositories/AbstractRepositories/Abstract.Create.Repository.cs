using System.Threading.Tasks;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Creating Entities
     */
    public abstract partial class AbstractRepository
    {

        public async Task CreateAsync<TEntity>(TEntity entity) where TEntity : class
        {
            await _PostgresqlContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

    }
}
