using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Mini_unsplash_clone.Models
{
    public partial class Users
    {
        public string Uid { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RoleId { get; set; }
        public string RememberToken { get; set; }
        public string NormalizedUserName { get; set; }
        public string NormalizedEmail { get; set; }
    }
}
