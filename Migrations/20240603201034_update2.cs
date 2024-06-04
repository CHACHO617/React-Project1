using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_Project1.Migrations
{
    public partial class update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "RecipeIngredients");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "RecipeIngredients",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
