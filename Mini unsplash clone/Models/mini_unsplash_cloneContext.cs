using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Mini_unsplash_clone.Models
{
    public partial class mini_unsplash_cloneContext : DbContext
    {
        public mini_unsplash_cloneContext()
        {
        }

        public mini_unsplash_cloneContext(DbContextOptions<mini_unsplash_cloneContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aspnetroles> Aspnetroles { get; set; }
        public virtual DbSet<Collections> Collections { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Userclaims> Userclaims { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("Server=localhost;userid=root;password=;database=mini_unsplash_clone;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aspnetroles>(entity =>
            {
                entity.ToTable("aspnetroles");

                entity.Property(e => e.Id).HasMaxLength(36);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.RoleId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(36);
            });

            modelBuilder.Entity<Collections>(entity =>
            {
                entity.HasKey(e => e.CollectionId)
                    .HasName("PRIMARY");

                entity.ToTable("collections");

                entity.Property(e => e.CollectionId)
                    .HasColumnName("collectionId")
                    .HasMaxLength(36)
                    .IsFixedLength();

                entity.Property(e => e.Collectionname)
                    .IsRequired()
                    .HasColumnName("collectionname")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(e => e.Imageid)
                    .HasName("PRIMARY");

                entity.ToTable("images");

                entity.Property(e => e.Imageid)
                    .HasColumnName("imageid")
                    .HasMaxLength(36)
                    .IsFixedLength();

                entity.Property(e => e.CloudId)
                    .IsRequired()
                    .HasMaxLength(36);

                entity.Property(e => e.CollectionId)
                    .IsRequired()
                    .HasColumnName("collectionId")
                    .HasMaxLength(36)
                    .IsFixedLength();

                entity.Property(e => e.Imagename)
                    .IsRequired()
                    .HasColumnName("imagename")
                    .HasMaxLength(255);

                entity.Property(e => e.Imageurl)
                    .IsRequired()
                    .HasColumnName("imageurl")
                    .HasMaxLength(255);

                entity.Property(e => e.Tags)
                    .HasColumnName("tags")
                    .HasColumnType("longtext")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Uid)
                    .IsRequired()
                    .HasColumnName("uid")
                    .HasMaxLength(36)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PRIMARY");

                entity.ToTable("roles");

                entity.Property(e => e.RoleId)
                    .HasColumnName("roleId")
                    .HasMaxLength(36);

                entity.Property(e => e.Rolename)
                    .IsRequired()
                    .HasColumnName("rolename")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Userclaims>(entity =>
            {
                entity.ToTable("userclaims");

                entity.Property(e => e.Id).HasMaxLength(36);

                entity.Property(e => e.ClaimType)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.ClaimValue)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(36);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("users");

                entity.HasIndex(e => new { e.Email, e.Firstname, e.Lastname })
                    .HasName("basic_credentials")
                    .IsUnique();

                entity.HasIndex(e => new { e.Email, e.Username, e.RoleId, e.Password })
                    .HasName("login")
                    .IsUnique();

                entity.Property(e => e.Uid)
                    .HasColumnName("uid")
                    .HasMaxLength(36)
                    .IsFixedLength();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasMaxLength(255);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasColumnName("lastname")
                    .HasMaxLength(255);

                entity.Property(e => e.NormalizedEmail)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.NormalizedUserName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasDefaultValueSql("''''''");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255);

                entity.Property(e => e.RememberToken)
                    .HasColumnName("remember_token")
                    .HasMaxLength(25)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.RoleId)
                    .IsRequired()
                    .HasColumnName("roleId")
                    .HasMaxLength(36);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
