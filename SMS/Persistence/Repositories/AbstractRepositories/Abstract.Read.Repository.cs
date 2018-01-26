using System;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SMS.Models.Interfaces;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Getting Entities
     */
    public abstract partial class AbstractRepository
    {
        public bool Exists<TEntity>(TEntity entity) where TEntity : class => PostgresqlContext.Set<TEntity>().Contains(entity);

        public IQueryable<TEntity> GetAll<TEntity>() where TEntity : class => PostgresqlContext.Set<TEntity>().AsNoTracking();

        public virtual TEntity GetEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class => PostgresqlContext.Set<TEntity>().Find(primaryKey);

        public Task<TEntity> GetEntityByPrimaryKeyAsync<TEntity>(params object[] primaryKey) where TEntity : class => PostgresqlContext.FindAsync<TEntity>(primaryKey);

        public IObservable<TEntity> GetObservableEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class => PostgresqlContext.Set<TEntity>().ToObservable();

        public (bool exists, TModel entity) ModelExists<TModel>(TModel entity) where TModel : class, IModel
        {
            var existingEntity = GetEntityByPrimaryKey<TModel>(entity.Id);
            return (exists: existingEntity != null, entity: existingEntity);
        }

        public async Task<(bool exists, TModel entity)> ModelExistsAsync<TModel>(TModel entity) where TModel : class, IModel
        {
            var existingEntity = await GetEntityByPrimaryKeyAsync<TModel>(entity.Id);
            return (exists: existingEntity != null, entity: existingEntity);
        }
    }
}