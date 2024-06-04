using System;
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
        public virtual DbSet<Admin> Admins { get; set; } = null!;
        public virtual DbSet<Inventario1> Invenatio1 { get; set; } = null!;
        public virtual DbSet<Inventario2> Invenatio2 { get; set; } = null!;

        //
        public virtual DbSet<Ingredient> Ingredients { get; set; } = null!;
        public virtual DbSet<Recipe> Recipes { get; set; } = null!;
        public virtual DbSet<RecipeIngredient> RecipeIngredients { get;set;} = null!;

        //
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local); DataBase=IngWebProject;Integrated Security=true");
            }
        }
        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=b8wd9kfn1gb26hj3o4od-mysql.services.clever-cloud.com; DataBase=b8wd9kfn1gb26hj3o4od; User Id=ueonfhzqlb4q6mg3; Password=DgE9a7jY1ReAXzpxcx0t;");
            }
        }*/


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


            //
            modelBuilder.Entity<RecipeIngredient>()
            .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientId);

            OnModelCreatingPartial(modelBuilder);

            //
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order)
                .HasForeignKey(od => od.OrderId);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public async Task<int> AddRecipeIngredientAsync(int recipeId, int ingredientId, int cantidadItem)
        {
            return await Database.ExecuteSqlRawAsync(
                "EXEC AddRecipeIngredient @p0, @p1, @p2",
                recipeId, ingredientId, cantidadItem);
        }

        public async Task<int> RemoveRecipeIngredient(int recipeId, int ingredientId)
        {
            return await Database.ExecuteSqlRawAsync(
                "EXEC RemoveRecipeIngredient @p0, @p1",
                recipeId, ingredientId);
        }

    }
}
