using System;
using System.ComponentModel.DataAnnotations;

namespace PetSupport.Core.ResourceParameters
{
    public class PetsittersSearchParameters
    {
        //FindPetSitterShortFormDTO
        public string City { get; set; }
        public int? ServiceId { get; set; } = null;
        //FindPetSitterLongFormDTO
        public string Street { get; set; }
        public int? MinPrice { get; set; } = 0;
        public int? MaxPrice { get; set; } = Int32.MaxValue;

        //Pagination
        private const int MaxPageSize = 25;
        public int PageNumber { get; set; } = 1;
        private int _pageSize;

        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > MaxPageSize)? MaxPageSize: value;
            }
        }

    }
}