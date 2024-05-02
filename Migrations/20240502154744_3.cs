using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_Project1.Migrations
{
    public partial class _3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invenatio2",
                columns: table => new
                {
                    IdInventario2 = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreIngrediente2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CantidadIngrediente2 = table.Column<int>(type: "int", nullable: false),
                    UnidadIngrediente2 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invenatio2", x => x.IdInventario2);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invenatio2");
        }
    }
}
