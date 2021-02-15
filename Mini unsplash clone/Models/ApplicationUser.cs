using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mini_unsplash_clone.Models
{
    public class ApplicationUser : IdentityUser
    {
        [ProtectedPersonalData]
        public virtual string firstname { get; set; }

        [ProtectedPersonalData]
        public virtual string lastname { get; set; }

    }
}
