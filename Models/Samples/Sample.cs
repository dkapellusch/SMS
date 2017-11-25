using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace SMS.Models.Samples
{
    public class Sample
    {
        public Sample()
        {
            
        }
        
        public Sample(int subjectNumber, int ageInMonths)
        {
            SubjectNumber = subjectNumber;
            AgeInMonths = ageInMonths;
        }
        
        [Key]
        public int SubjectNumber { get; set; }
        public int AgeInMonths { get; set; }
        public DateTime LastUpdateTime {get;set;} 
    }
}