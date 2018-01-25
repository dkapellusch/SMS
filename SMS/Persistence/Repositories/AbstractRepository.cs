using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace SMS.Persistence.Repositories
{
    public abstract class AbstractRepository
    {
        protected readonly PostgresqlContext _PostgresqlContext;

        protected AbstractRepository(PostgresqlContext context)
        {
            _PostgresqlContext = context;
        }

        public async Task Create<TEntity>(TEntity entity) where TEntity : class
        {
            await _PostgresqlContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

        public bool Exists<T>(T entity) where T : class
        {
            return _PostgresqlContext.Set<T>().Local.Contains(entity);
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return _PostgresqlContext.Set<T>().AsNoTracking();
        }

        public DbSet<TEntity> GetEntity<TEntity>() where TEntity : class
        {
            return _PostgresqlContext.Set<TEntity>();
        }

        public Task<TEntity> GetEntityByPrimaryKeyAsync<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return _PostgresqlContext.FindAsync<TEntity>(primaryKey);
        }

        public IObservable<TEntity> GetObservableEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return GetEntity<TEntity>().ToObservable();
        }

        public async Task Update<TEntity>(TEntity entity) where TEntity : class
        {
            GetEntity<TEntity>().Update(entity);
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

        protected void DeleteEntityAndRelations<TEntity>(TEntity entity, bool shouldSave = true) where TEntity : class
        {
            LoadAllRelations(entity);
            _PostgresqlContext.GetDbSet<TEntity>().Remove(entity);

            if (shouldSave)
            {
                SaveChanges();
            }
        }

        protected virtual TEntity GetEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class
        {
            return _PostgresqlContext.Get<TEntity>(primaryKey);
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

        protected void UpdateExistingEntity<TEntity>(TEntity entity) where TEntity : class
        {
            _PostgresqlContext.Entry(entity).CurrentValues.SetValues(entity);
            SaveChanges();
        }
    }
}