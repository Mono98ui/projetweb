using System;
using System.Collections.Generic;

namespace PCPieceTracker.Models
{
    public partial class Favorite
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ListName { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
