﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace React_Project1.Models
{
    public partial class IngWebProjectContext : DbContext
    {
        public IngWebProjectContext()
        {
        }

        public IngWebProjectContext(DbContextOptions<IngWebProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local); DataBase=IngWebProject;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__645723A6A15AF948");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.ApelllidoUsuario)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("apelllidoUsuario");

                entity.Property(e => e.ContrasenaUsuario)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contrasenaUsuario");

                entity.Property(e => e.CorreoUsuario)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("correoUsuario");

                entity.Property(e => e.NombreUsuario)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreUsuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
