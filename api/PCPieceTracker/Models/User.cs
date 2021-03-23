using System;
using System.Collections.Generic;

namespace PCPieceTracker.Models
{
    public partial class User
    {
        public User()
        {
            Favorites = new HashSet<Favorite>();
            Reviews = new HashSet<Review>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }

        public virtual Role RoleNavigation { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
