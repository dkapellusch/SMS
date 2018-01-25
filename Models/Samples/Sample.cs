using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using SMS.Models.Animals;
using SMS.Models.Enums;

namespace SMS.Models.Samples
{
    public class Sample
    {
        public Sample()
        {

        }

        public Sample(int animalNumber, int ageInMonths, SampleType sampleType)
        {
            AnimalNumber = animalNumber;
            AgeInMonths = ageInMonths;
            SampleType = sampleType;
        }

        [Key]
        public int Id { get; set; }

        public SampleType SampleType { get; set; }

        public int AgeInMonths { get; set; }

        public DateTime LastUpdateTime { get; set; }

        public RecordStatus RecordStatus { get; set; }

        [ForeignKey(nameof(Animal))]
        public int? AnimalNumber { get; set; }

        public Animal Animal { get; set; }
    }
}