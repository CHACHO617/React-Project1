﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using React_Project1.Models;

#nullable disable

namespace React_Project1.Migrations
{
    [DbContext(typeof(IngWebProjectContext))]
    partial class IngWebProjectContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.28")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("React_Project1.Models.Admin", b =>
                {
                    b.Property<int>("IdAdmin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdAdmin"), 1L, 1);

                    b.Property<string>("ContrasenaAdmin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdentificacionAdmin")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdAdmin");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("React_Project1.Models.Inventario1", b =>
                {
                    b.Property<int>("IdInventario1")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdInventario1"), 1L, 1);

                    b.Property<int>("CantidadIngrediente1")
                        .HasColumnType("int");

                    b.Property<string>("NombreIngrediente1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UnidadIngrediente1")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdInventario1");

                    b.ToTable("Invenatio1");
                });

            modelBuilder.Entity("React_Project1.Models.Inventario2", b =>
                {
                    b.Property<int>("IdInventario2")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdInventario2"), 1L, 1);

                    b.Property<int>("CantidadIngrediente2")
                        .HasColumnType("int");

                    b.Property<string>("NombreIngrediente2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UnidadIngrediente2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdInventario2");

                    b.ToTable("Invenatio2");
                });

            modelBuilder.Entity("React_Project1.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("idUsuario");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"), 1L, 1);

                    b.Property<string>("ApelllidoUsuario")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("apelllidoUsuario");

                    b.Property<string>("ContrasenaUsuario")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("contrasenaUsuario");

                    b.Property<string>("CorreoUsuario")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("correoUsuario");

                    b.Property<string>("NombreUsuario")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nombreUsuario");

                    b.HasKey("IdUsuario")
                        .HasName("PK__Usuarios__645723A6A15AF948");

                    b.ToTable("Usuarios");
                });
#pragma warning restore 612, 618
        }
    }
}
