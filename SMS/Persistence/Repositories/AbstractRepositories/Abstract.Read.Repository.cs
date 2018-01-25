using System;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Getting Entities
     */
    public abstract partial class AbstractRepository
    {
        public bool Exists<T>(T entity) where T : class
        {
            return _PostgresqlContext.Set<T>().Local.Contains(entity);
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return _PostgresqlContext.Set<T>().AsNoTracking();
        }

        public DbSet<TEntity> GetDbSet<TEntity>() where TEntity : class
        {
            return _PostgresqlContext.Set<TEntity>();
        }

        public Task<TEntity> GetEntityByPrimaryKeyAsync<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return _PostgresqlContext.FindAsync<TEntity>(primaryKey);
        }

        public IObservable<TEntity> GetObservableEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return GetDbSet<TEntity>().ToObservable();
        }

        protected virtual TEntity GetEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return _PostgresqlContext.Set<TEntity>().Find(primaryKey);
        }
    }
}
