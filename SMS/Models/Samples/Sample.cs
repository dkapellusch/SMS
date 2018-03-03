using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SMS.Models.Animals;
using SMS.Models.Enums;
using SMS.Models.Interfaces;

namespace SMS.Models.Samples
{
    public class Sample : IModel
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

        public int AgeInMonths { get; set; }

        public Animal Animal { get; set; }

        [ForeignKey(nameof(Animal))]
        public int? AnimalNumber { get; set; }

        public SampleType SampleType { get; set; }

        [Key]
        public int Id { get; set; }

        public DateTime LastUpdateTime { get; set; }

        public RecordStatus RecordStatus { get; set; }
    }
}