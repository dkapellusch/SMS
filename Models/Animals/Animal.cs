using System;
using System.ComponentModel.DataAnnotations;
using SMS.Models.Enums;

namespace SMS.Models.Animals
{
    public class Animal
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Experiment { get; set; }
        
        public DateTime LastUpdateTime {get;set;}

        public RecordStatus RecordStatus {get;set;}
    }
}