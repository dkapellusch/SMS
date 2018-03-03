using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using SMS.Models.Enums;
using SMS.Models.Interfaces;
using SMS.Models.Samples;

namespace SMS.Models.Animals
{
    public class Animal : IModel
    {
        private int? _ageInMonths;

        private AnimalType _animalType;

        private DateTime? _birthDate;

        private string _experiment;

        private int _id;

        private string _name;

        private RecordStatus _recordStatus;

        public Animal()
        {
            PropertyChanged += (sender, args) => LastUpdateTime = DateTime.Now;
            RecordStatus = RecordStatus.New;
        }

        public int? AgeInMonths
        {
            get => _ageInMonths;
            set
            {
                _ageInMonths = value;
                OnPropertyChanged();
            }
        }

        public AnimalType AnimalType
        {
            get => _animalType;
            set
            {
                _animalType = value;
                OnPropertyChanged();
            }
        }

        public DateTime? BirthDate
        {
            get => _birthDate;
            set
            {
                _birthDate = value;
                OnPropertyChanged();
            }
        }

        public string Experiment
        {
            get => _experiment;
            set
            {
                _experiment = value;
                OnPropertyChanged();
            }
        }

        public string Name
        {
            get => _name;
            set
            {
                _name = value;
                OnPropertyChanged();
            }
        }

        public ICollection<Sample> Samples { get; set; } = new HashSet<Sample>();

        [Key]
        public int Id
        {
            get => _id;
            set
            {
                _id = value;
                OnPropertyChanged();
            }
        }

        public DateTime LastUpdateTime { get; set; }

        public RecordStatus RecordStatus
        {
            get => _recordStatus;
            set
            {
                _recordStatus = value;
                OnPropertyChanged();
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string name = null)
        {
            var handler = PropertyChanged;
            handler?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}