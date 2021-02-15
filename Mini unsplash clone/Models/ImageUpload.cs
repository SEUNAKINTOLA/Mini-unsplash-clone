using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Mini_unsplash_clone.Models
{
    public partial class ImageUpload
    {
        public string Imageid { get; set; }
        public string Uid { get; set; }

        public string Imagename { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        public string Tags { get; set; }
        public string CollectionId { get; set; }
    }
}
