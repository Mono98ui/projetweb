using System;
using System.Collections.Generic;

namespace PCPieceTracker.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public string Title { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
