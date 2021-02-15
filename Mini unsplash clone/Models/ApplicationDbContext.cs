using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mini_unsplash_clone.Models
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser> 
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
           base.OnModelCreating(builder);
            // builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserClaim<string>> ().ToTable("TblUserClaims").HasNoKey();
            //  builder.Entity<IdentityUserRole>().ToTable("TblUserRoles").HasNoKey();
            //builder.Entity<IdentityUserLogin>().ToTable("TblUserLogins").HasNoKey();
            // builder.Entity<Microsoft.AspNetCore.Identity.IdentityRole>().ToTable("TblRoles").HasNoKey();
            // builder.Entity<ApplicationUser>().ToTable("Users");

            builder.Entity<ApplicationUser>().ToTable("Users");
           // builder.Entity<IdentityRole<string>>().ToTable("roless");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            builder.Entity<IdentityUserRole<string>>().ToTable("aspnetroles");
            var propertyNames = typeof(ApplicationUser).GetProperties()
     .Select(p => p.Name)
     .ToList();
            var entityTypes = builder.Model.GetEntityTypes()
                .Where(t => typeof(ApplicationUser).IsAssignableFrom(t.ClrType));
            foreach (var entityType in entityTypes)
            {
                var entityTypeBuilder = builder.Entity(entityType.ClrType);
                //foreach (var propertyName in propertyNames)
                  //  entityTypeBuilder.Ignore(propertyName);
            }
            builder.Entity<ApplicationUser>(b =>
            {
                // Primary key
                b.HasKey(u => u.Id);
                // Maps to the AspNetUsers table
                b.ToTable("Users");

                b.Ignore(u => u.LockoutEnabled);
                b.Ignore(u => u.PhoneNumber);
                b.Ignore(u => u.PhoneNumberConfirmed);
                b.Ignore(u => u.AccessFailedCount);
                b.Ignore(u => u.LockoutEnd);
                b.Ignore(u => u.TwoFactorEnabled);
                b.Ignore(u => u.ConcurrencyStamp);
                b.Ignore(u => u.AccessFailedCount);
               // b.Ignore(u => u.NormalizedEmail);
                b.Ignore(u => u.EmailConfirmed);
                b.Ignore(u => u.PhoneNumberConfirmed);
                b.Ignore(u => u.SecurityStamp);

                b.Property(t => t.Id).HasColumnName("uid");
                b.Property(t => t.Email).HasColumnName("email");
                b.Property(t => t.PasswordHash).HasColumnName("password");
                // Limit the size of columns to use efficient database types
                b.Property(u => u.UserName).HasMaxLength(256);
                b.Property(u => u.Email).HasMaxLength(256);

            });

        }

    }
}
