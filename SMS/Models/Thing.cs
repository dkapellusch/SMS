using System;
using System.ComponentModel.DataAnnotations;
using SMS.Models.Enums;
using SMS.Models.Interfaces;

namespace SMS.Models
{
    public class Thing : IModel
    {
        public string Name { get; set; }

        [Key]
        public int Id { get; set; }

        public DateTime LastUpdateTime { get; set; }
        public RecordStatus RecordStatus { get; set; }
    }
}