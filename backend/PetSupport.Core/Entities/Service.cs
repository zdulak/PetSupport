﻿using PetSupport.Core.Enums;
using PetSupport.Data.Entities;

namespace PetSupport.Core.Entities
{
    public class Service: BaseEntity
    {
        public string ImageId { get; set; }
        public ServiceType Name { get; set; }
        public string Description { get; set; }
        public Unit Unit { get; set; }
        public decimal Price { get; set; }
    }
}