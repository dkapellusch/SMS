using System.ComponentModel.DataAnnotations;

namespace SMS.Models
{
    public class Thing
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}