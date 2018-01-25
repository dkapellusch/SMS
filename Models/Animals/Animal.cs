using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

using SMS.Models.Enums;

namespace SMS.Models.Animals
{
    public class Animal
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
        }

        public event PropertyChangedEventHandler PropertyChanged;

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

        public string Name
        {
            get => _name;
            set
            {
                _name = value;
                OnPropertyChanged();
            }
        }

        public RecordStatus RecordStatus
        {
            get => _recordStatus;
            set
            {
                _recordStatus = value;
                OnPropertyChanged();
            }
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string name = null)
        {
            var handler = PropertyChanged;
            handler?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}