using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace SMS.Persistence.Interfaces
{
    public interface IAbstractRepository
    {
        Task Create<TEntity>(TEntity entity) where TEntity : class;

        Task CreateOrUpdate<TEntity>(TEntity entity, params object[] keys) where TEntity : class;

        Task<int> DeleteEntityAndRelations<TEntity>(TEntity entity) where TEntity : class;

        bool Exists<T>(T entity) where T : class;

        IQueryable<T> GetAll<T>() where T : class;

        DbSet<TEntity> GetEntity<TEntity>() where TEntity : class;

        Task<TEntity> GetEntityByPrimaryKeyAsync<TEntity>(params object[] primaryKey) where TEntity : class;

        IObservable<TEntity> GetObservableEntityByPrimaryKey<TEntity>(params object[] primaryKey) where TEntity : class;

        int SaveChanges();

        Task<int> SaveChangesAsync();

        Task Update<TEntity>(TEntity entity) where TEntity : class;

        void UpdateObject<TEntity>(TEntity destination, TEntity source) where TEntity : class;
    }
}