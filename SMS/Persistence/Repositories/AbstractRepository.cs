using System;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using SMS.Persistence.Interfaces;

namespace SMS.Persistence.Repositories
{
    public abstract class AbstractRepository : IAbstractRepository
    {
        protected readonly PostgresqlContext _postgresContext;

        protected AbstractRepository(PostgresqlContext context)
        {
            _postgresContext = context;
        }

        public async Task Create<TEntity>(TEntity entity) where TEntity : class
        {
            await _postgresContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

        public async Task CreateOrUpdate<TEntity>(TEntity entity, params object[] keys) where TEntity : class
        {
            if (Update(entity, keys[0]) == null)
            {
                await Create(entity);
            }
        }

        public Task<int> DeleteEntityAndRelations<TEntity>(TEntity entity) where TEntity : class
        {
            GetEntity<TEntity>().Remove(entity);
            return SaveChangesAsync();
        }

        public bool Exists<T>(T entity) where T : class
        {
            return _postgresContext.Set<T>().Local.Contains(entity);
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return _postgresContext.Set<T>().AsNoTracking();
        }

        public DbSet<TEntity> GetEntity<TEntity>() where TEntity : class
        {
            return _postgresContext.Set<TEntity>();

            // return _postgresContext.GetType()
            //                        .GetProperties(BindingFlags.Instance | BindingFlags.Public)
            //                        .Where(p => p.PropertyType.GetGenericArguments()
            //                        .FirstOrDefault() == typeof(TEntity))
            //                        .Select(p => p.GetValue(_postgresContext))
            //                        .FirstOrDefault() as DbSet<TEntity>;
        }

        public Task<TEntity> GetEntityByPrimaryKeyAsync<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return _postgresContext.FindAsync<TEntity>(primaryKey);
        }

        public IObservable<TEntity> GetObservableEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return GetEntity<TEntity>().ToObservable();
        }

        public int SaveChanges()
        {
            bool saveFailed;
            var result = 0;

            do
            {
                saveFailed = false;

                try
                {
                    result = _postgresContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    ex.Entries.Single().Reload();
                }
            }
            while (saveFailed);

            return result;
        }

        public async Task<int> SaveChangesAsync()
        {
            bool saveFailed;
            var result = 0;

            do
            {
                saveFailed = false;

                try
                {
                    result = await _postgresContext.SaveChangesAsync();
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

        public async Task Update<TEntity>(TEntity entity) where TEntity : class
        {
            GetEntity<TEntity>().Update(entity);
            await SaveChangesAsync();
        }

        public virtual T Update<T>(T t, object key) where T : class
        {
            if (t == null)
            {
                return null;
            }

            var exist = _postgresContext.Set<T>().Find(key);
            if (exist != null)
            {
                _postgresContext.Entry(exist).CurrentValues.SetValues(t);
                SaveChanges();
            }

            return exist;
        }

        public void UpdateObject<TEntity>(TEntity destination, TEntity source) where TEntity : class
        {
            foreach (var property in typeof(TEntity).GetProperties())
            {
                property.SetValue(destination, property.GetValue(source, null), null);
            }
        }

        private bool ExistsByPrimaryKey<TEntity>(params object[] keys) where TEntity : class
        {
            //            return GetEntityByPrimaryKey<TEntity>(keys) != null;
            return _postgresContext.Set<TEntity>().Find(keys) != null;
        }
    }
}