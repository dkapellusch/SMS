namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Deleting Entities
     */
    public abstract partial class AbstractRepository
    {
        protected void DeleteEntity<TEntity>(TEntity entity, bool shouldSave = true) where TEntity : class
        {
            if (!Exists(entity))
            {
                return;
            }

            _PostgresqlContext.Set<TEntity>().Remove(entity);

            if (shouldSave)
            {
                SaveChanges();
            }
        }

        protected void DeleteEntityAndRelations<TEntity>(TEntity entity, bool shouldSave = true) where TEntity : class
        {
            if (!Exists(entity))
            {
                return;
            }

            LoadAllRelations(entity);
            _PostgresqlContext.Set<TEntity>().Remove(entity);

            if (shouldSave)
            {
                SaveChanges();
            }
        }
    }
}