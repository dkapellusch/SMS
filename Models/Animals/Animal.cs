using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using SMS.Extensions;
using SMS.Models.Enums;

namespace SMS.Models.Animals
{
    public class Animal
    {
        private int _id;
        private string _name;
        private AnimalType _animalType;
        private string _experiment;
        private DateTime _lastUpdateTime;
        private RecordStatus _recordStatus;
        private DateTime? _birthDate;
        private int? _ageInMonths;

        public event PropertyChangedEventHandler _PropertyChanged;

        public Animal()
        {
            _PropertyChanged += (sender, args) => LastUpdateTime = DateTime.Now;
        }

        [Key]
        public int Id
        {
            get { return _id; }
            set
            {
                _id = value;
                OnPropertyChanged();
            }
        }

        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged();
            }
        }

        public AnimalType AnimalType
        {
            get { return _animalType; }
            set
            {
                _animalType = value;
                OnPropertyChanged();
            }
        }

        public string Experiment
        {
            get { return _experiment; }
            set
            {
                _experiment = value;
                OnPropertyChanged();
            }
        }

        public DateTime LastUpdateTime
        {
            get { return _lastUpdateTime; }
            set { _lastUpdateTime = value; }
        }

        public RecordStatus RecordStatus
        {
            get { return _recordStatus; }
            set
            {
                _recordStatus = value;
                OnPropertyChanged();
            }
        }

        public DateTime? BirthDate
        {
            get { return _birthDate; }
            set
            {
                _birthDate = value;
                OnPropertyChanged();
            }
        }

        public int? AgeInMonths
        {
            get { return _ageInMonths; }
            set
            {
                _ageInMonths = value;
                OnPropertyChanged();
            }
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string name = null)
        {
            var handler = _PropertyChanged;
            handler?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}