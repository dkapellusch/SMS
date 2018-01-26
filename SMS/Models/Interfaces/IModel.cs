using System;

using SMS.Models.Enums;

namespace SMS.Models.Interfaces
{
    public interface IModel
    {
        int Id { get; set; }

        DateTime LastUpdateTime { get; set; }

        RecordStatus RecordStatus { get; set; }
    }
}