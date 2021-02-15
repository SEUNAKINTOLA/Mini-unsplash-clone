using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mini_unsplash_clone.Models;
using Mini_unsplash_clone.Services;
using Newtonsoft.Json;

namespace Mini_unsplash_clone.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly mini_unsplash_cloneContext _context;
        private readonly ImagesService imagesService;

        public ImagesController(mini_unsplash_cloneContext context, ImagesService imagesService)
        {
            _context = context;
            this.imagesService = imagesService;
        }

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Images>>> GetImages(int count, int start)
        {
            return await _context.Images.Skip(start).Take(count).ToListAsync();
        }


        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Collections>>> GetImageCollections()
        {
            return await _context.Collections.ToListAsync();
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Images>> GetImages(string id)
        {
            var images = await _context.Images.FindAsync(id);

            if (images == null)
            {
                return NotFound();
            }

            return images;
        }

        // GET: api/Images/5
        [HttpPost]
        public async Task<ActionResult<List<Images>>> QueryImages(ImageQueryParam imageparam)
        {
            var images = new List<Images>();
            var count = imageparam.Count;
            var start = imageparam.Start;
            if ((imageparam.CollectionId != null) && (imageparam.Tags != null) && (imageparam.Imagename != null))
                images = await _context.Images.Where(e => (e.Tags.Contains(imageparam.Tags)) && (e.CollectionId == imageparam.CollectionId) && (e.Imagename.Contains(imageparam.Imagename))).Skip(start).Take(count).ToListAsync();
            
            else if ((imageparam.Tags != null) && (imageparam.Imagename != null))
                images = await _context.Images.Where(e => (e.Tags.Contains(imageparam.Tags))  && (e.Imagename.Contains(imageparam.Imagename))).Skip(start).Take(count).ToListAsync();
            
            else if ((imageparam.CollectionId != null) &&  (imageparam.Imagename != null))
                images = await _context.Images.Where(e => (e.CollectionId == imageparam.CollectionId) && (e.Imagename.Contains(imageparam.Imagename))).Skip(start).Take(count).ToListAsync();
           
            else if ((imageparam.CollectionId != null) && (imageparam.Tags != null) )
                images = await _context.Images.Where(e => (e.Tags.Contains(imageparam.Tags)) && (e.CollectionId == imageparam.CollectionId) ).Skip(start).Take(count).ToListAsync();
           
            else if (imageparam.Tags != null) images = await _context.Images.Where(e => e.Tags.Contains(imageparam.Tags)).Skip(start).Take(count).ToListAsync();
            
            else if (imageparam.CollectionId != null) images = await _context.Images.Where(e => e.CollectionId == imageparam.CollectionId).Skip(start).Take(count).ToListAsync();
            
            else if (imageparam.Imagename != null) images = await _context.Images.Where(e => e.Imagename.Contains(imageparam.Imagename)).Skip(start).Take(count).ToListAsync();
          
            if (images == null)
            {
                return NotFound();
            }

            return images;
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImages(string id, Images images)
        {
            if (id != images.Imageid)
            {
                return BadRequest();
            }

            _context.Entry(images).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImagesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Images>> PostImages([FromForm]  ImageUpload imageupload)
        {

            Images images = new Images();
            images.Uid = imageupload.Uid;
            images.CollectionId = imageupload.CollectionId; 
            var tags = imageupload.Tags.Split(',');
            var personsString = JsonConvert.SerializeObject(tags);
            images.Tags = personsString;
            images.Imageid = imageupload.Imageid;
            images.Imagename = imageupload.Imagename;

            using (Stream imageFileStream = imageupload.Image.OpenReadStream())
            {
                ImageUploadResult result = await imagesService.UploadImageAsync(imageFileStream);
                images.Imageurl = result.Url.OriginalString;
                images.CloudId = result.PublicId;
            }


            _context.Images.Add(images);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ImagesExists(images.Imageid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetImages", new { id = images.Imageid }, images);
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Images>> DeleteImages(string id)
        {
            var images = await _context.Images.FindAsync(id);

            if (images == null)
            {
                return NotFound();
            }

            String response = await imagesService.DeleteAsync(images.CloudId);

            if (response == "ok")
            {
                _context.Images.Remove(images);
                await _context.SaveChangesAsync();
            }
            return images;
        }

        private bool ImagesExists(string id)
        {
            return _context.Images.Any(e => e.Imageid == id);
        }
    }
}
