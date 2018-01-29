namespace SMS.Persistence.Repositories.AbstractRepositories
{
    /*
     * Abstract Repository Portion For Deleting Entities
     */
    public abstract partial class AbstractRepository
    {
        public void DeleteEntity<TEntity>(TEntity entity, bool shouldSave = true) where TEntity : class
        {
            if (!Exists(entity))
            {
                return;
            }

            SamplesContext.Set<TEntity>().Remove(entity);

            if (shouldSave)
            {
                SaveChanges();
            }
        }

        public void DeleteEntityAndRelations<TEntity>(TEntity entity, bool shouldSave = true) where TEntity : class
        {
            if (!Exists(entity))
            {
                return;
            }

            LoadAllRelations(entity);
            SamplesContext.Set<TEntity>().Remove(entity);

            if (shouldSave)
            {
                SaveChanges();
            }
        }
    }
}