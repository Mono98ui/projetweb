using System;
using System.Collections.Generic;
using System.Reflection.Metadata;

namespace PCPieceTracker.Models
{
    public partial class Product
    {
        public Product()
        {
            Favorites = new HashSet<Favorite>();
            Prices = new HashSet<Price>();
            Reviews = new HashSet<Review>();
        }

        public int ProductId { get; set; }
        public string Manufacturer { get; set; }
        public string Type { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Price> Prices { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
