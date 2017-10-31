using System.ComponentModel.DataAnnotations;

namespace core2.Models
{
    public class Thing
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}