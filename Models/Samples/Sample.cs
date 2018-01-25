using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using SMS.Models.Animals;

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
        public DateTime LastUpdateTime { get; set; }

        [ForeignKey("Animals")]
        public int? AnimalNumber { get; set; }

        public Animal Animal { get; set; }
    }
}