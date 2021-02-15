using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Mini_unsplash_clone.Services
{
    public class ImagesService
    {
        private const int maxImageWidth = 1100;
        private const int maxImageHeight = 1100;
        private readonly IConfiguration configuration;
        private readonly Account cloudinaryAccount;
        private readonly Cloudinary cloudinary;

        public ImagesService(IConfiguration configuration)
        {
            this.configuration = configuration;

            cloudinaryAccount = new Account(
                this.configuration["CloudinaryName"],
                this.configuration["CloudinaryKey"],
                this.configuration["CloudinarySecret"]);

            cloudinary = new Cloudinary(cloudinaryAccount);
        }

        public async Task<ImageUploadResult> UploadImageAsync(Stream imageFileStream)
        {
            ImageUploadParams imageUploadParams = new ImageUploadParams()
            {
                File = new FileDescription(Guid.NewGuid().ToString(), imageFileStream),
                Folder = configuration["CloudinaryFolder"],
                Transformation = new Transformation()
                .Width(maxImageWidth)
                .Height(maxImageHeight)
                .Crop(configuration["CloudinaryCrop"]),
            };

            ImageUploadResult imageUploadResult = await cloudinary.UploadAsync(imageUploadParams);

            var deleteParams = new DeletionParams(imageUploadResult.PublicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return imageUploadResult;
        }

        public async Task<String> DeleteAsync(String PublicId)
        {
            var deleteParams = new DeletionParams(PublicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result.Result;
        }
    }
}
