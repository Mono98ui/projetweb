using System;
using System.Collections.Generic;

namespace PCPieceTracker.Models
{
    public partial class Price
    {
        public int PriceId { get; set; }
        public decimal Amount { get; set; }
        public string Source { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
