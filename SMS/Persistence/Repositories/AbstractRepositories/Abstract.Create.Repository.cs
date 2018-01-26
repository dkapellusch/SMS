using System.Threading.Tasks;

using SMS.Models.Interfaces;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Creating Entities
     */
    public abstract partial class AbstractRepository
    {

        public async Task CreateAsync<TEntity>(TEntity entity) where TEntity : class
        {
            await PostgresqlContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

        public async Task CreateOrUpdate<TModel>(TModel model) where TModel : class, IModel
        {
            var (exists, existingModel) = await ModelExistsAsync(model);
            if (exists)
            {
                await UpdateAsync(existingModel);
                return;
            }

            await CreateAsync(model);
        }
    }
}
