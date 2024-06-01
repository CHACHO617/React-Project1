using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_Project1.Migrations
{
    public partial class IngredientFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CantidadIngrediente",
                table: "Ingredients");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CantidadIngrediente",
                table: "Ingredients",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
