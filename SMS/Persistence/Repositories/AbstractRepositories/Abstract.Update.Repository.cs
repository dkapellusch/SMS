using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Updating Entities
     */
    public abstract partial class AbstractRepository
    {
        public async Task UpdateAsync<TEntity>(TEntity entity) where TEntity : class
        {
            SamplesContext.Set<TEntity>().Update(entity);
            await SaveChangesAsync();
        }

        public void UpdateObject<TEntity>(TEntity destination, TEntity source) where TEntity : class
        {
            foreach (var property in typeof(TEntity).GetProperties())
            {
                property.SetValue(destination, property.GetValue(source, null), null);
            }
        }

        public static object[] LoadAllRelations<TEntity>(TEntity entity) where TEntity : class
        {
            var entityProperties = typeof(TEntity).GetProperties();
            var enumerableProperties = entityProperties.Where(p => p.PropertyType != typeof(string) && typeof(IEnumerable<>).IsAssignableFrom(p.PropertyType));
            var relationalProperties = enumerableProperties.SelectMany(relation => (IEnumerable<object>)relation.GetValue(entity)).ToArray();

            return relationalProperties;
        }

        public void UpdateExistingEntity<TEntity>(TEntity entity) where TEntity : class
        {
            SamplesContext.Entry(entity).CurrentValues.SetValues(entity);
            SaveChanges();
        }
    }
}