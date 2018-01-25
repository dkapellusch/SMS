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
            GetDbSet<TEntity>().Update(entity);
            await SaveChangesAsync();
        }

        public void UpdateObject<TEntity>(TEntity destination, TEntity source) where TEntity : class
        {
            foreach (var property in typeof(TEntity).GetProperties())
            {
                property.SetValue(destination, property.GetValue(source, null), null);
            }
        }

        protected static object[] LoadAllRelations<T>(T entity) where T : class
        {
            var entityProperties = typeof(T).GetProperties();
            var enumerableProperties = entityProperties.Where(p => p.PropertyType != typeof(string) && typeof(IEnumerable<>).IsAssignableFrom(p.PropertyType));
            var relationalProperties = enumerableProperties.SelectMany(relation => (IEnumerable<object>)relation.GetValue(entity)).ToArray();

            return relationalProperties;
        }

        protected void UpdateExistingEntity<TEntity>(TEntity entity) where TEntity : class
        {
            _PostgresqlContext.Entry(entity).CurrentValues.SetValues(entity);
            SaveChanges();
        }
    }
}