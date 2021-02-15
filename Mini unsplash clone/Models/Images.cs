using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Mini_unsplash_clone.Models
{
    public partial class Images
    {
        public string Imageid { get; set; }
        public string Imagename { get; set; }
        public string Uid { get; set; }
        public string Imageurl { get; set; }
        public string CloudId { get; set; }
        public string Tags { get; set; }
        public string CollectionId { get; set; }
    }
}
