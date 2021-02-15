using  Mini_unsplash_clone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Web;
using Microsoft.AspNetCore.Http;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Mini_unsplash_clone.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly mini_unsplash_cloneContext _context;
        public IConfiguration Configuration { get; }

        public AuthorizeController(mini_unsplash_cloneContext context, IConfiguration configuration,  UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            Configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Users parameters)
        {
            var user = await _userManager.FindByEmailAsync(parameters.Username);
            if (user == null) user = await _userManager.FindByNameAsync(parameters.Username);
            if (user == null) return BadRequest("User does not exist");
            var singInResult = await _signInManager.CheckPasswordSignInAsync(user, parameters.Password, false);
            if (!singInResult.Succeeded) return BadRequest("Invalid password");

            await _signInManager.SignInAsync(user, true);

            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> Register(Users parameters)
        {
            var user = new ApplicationUser();
            user.UserName = parameters.Username;
            user.Email = parameters.Email;
            user.firstname = parameters.Firstname;
            user.lastname = parameters.Lastname;
            var result = await _userManager.CreateAsync(user, parameters.Password);
            if (!result.Succeeded) return BadRequest(result.Errors.FirstOrDefault()?.Description);
            else
            {

                const string subject = "Unsplash - Registration successful";
                var body = "<html><body>" +
                           $"<p>Hi {user.UserName}!</p>" +
                           "<p>You have succesfully created your Unsplash account.</p>" +
                           "</body></html>";

                var apiKey = Configuration.GetValue<String>("SendGridApiKey");
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("Unsplash@test.com", "Unsplash"),
                    Subject = subject,
                    HtmlContent = body
                };
                msg.AddTo(new EmailAddress(parameters.Email));
                var response = await client.SendEmailAsync(msg);
            }
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetResetPasswordToken(string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) user = await _userManager.FindByNameAsync(email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return NoContent();
            }

            var host = HttpContext.Request.Host.ToUriComponent();
            var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
            var callbackUrl = $"http://{host}/Unsplash/reset-pass?email={user.UserName}&token={HttpUtility.UrlEncode(token)}";

            var body = "<html><body>" +
                       "<h2>Password reset</h2>" +
                       $"<p>Hi {user.UserName}, please click <a href=\"{callbackUrl}\">  this link to reset your password </a></p>" +
                       "</body></html>";


            var apiKey = Configuration.GetValue<String>("SendGridApiKey");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("Unsplash@test.com", "Unsplash"),
                Subject = "Unsplash - Password reset.",
                HtmlContent = body
            };
            msg.AddTo(new EmailAddress(email));
            var response = await client.SendEmailAsync(msg);

            return Ok(response.StatusCode);
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasswordAsync2(String Token, String Email, String NewPassword)
        {

            var user = await _userManager.FindByEmailAsync(Email);
            if (user == null)
            {
                return Ok("user not found for user " + Email + " token" + Token);
            }

            var result = _userManager.ResetPasswordAsync(user, Token, NewPassword).Result;

            if (result.Succeeded)
            {
                const string subject = "Client - Password reset success.";
                var body = "<html><body>" +
                           "<h1>Your password for Client was reset</h1>" +
                           $"<p>Hi {user.UserName}!</p>" +
                           "<p>Your password for Client was reset. Please inform us if you did not request this change.</p>" +
                           "</body></html>";

                var apiKey = Configuration.GetValue<String>("SendGridApiKey");
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress("Unsplash@test.com", "Unsplash"),
                    Subject = subject,
                    HtmlContent = body
                };
                msg.AddTo(new EmailAddress(Email));
                var response = await client.SendEmailAsync(msg);

                return Ok();
            }

            return NoContent();
        }



        [HttpGet]
        public async Task<UserInfo> UserInfoAsync()
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            return await BuildUserInfoAsync();
        }


        private async Task<UserInfo> BuildUserInfoAsync()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            if (user == null) user = await _userManager.FindByNameAsync(User.Identity.Name);

            Users user1 = await _context.Users.Where(e => e.Uid == user.Id).FirstAsync();

            return new UserInfo
            {
                IsAuthenticated = User.Identity.IsAuthenticated,
                UserName = User.Identity.Name,
                FirstName = user.firstname,
                LastName = user.lastname,
                UserId = new Guid(user1.Uid)
            };
        }

    }

        
}
