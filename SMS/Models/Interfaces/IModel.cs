using System;

using SMS.Models.Enums;

namespace SMS.Models.Interfaces
{
    internal interface IModel
    {
        int Id { get; set; }

        DateTime LastUpdateTime { get; set; }

        RecordStatus RecordStatus { get; set; }
    }
}