using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_Project1.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    IdAdmin = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdentificacionAdmin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContrasenaAdmin = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.IdAdmin);
                });

            migrationBuilder.CreateTable(
                name: "Invenatio1",
                columns: table => new
                {
                    IdInventario1 = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreIngrediente1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CantidadIngrediente1 = table.Column<int>(type: "int", nullable: false),
                    UnidadIngrediente1 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invenatio1", x => x.IdInventario1);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    correoUsuario = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    nombreUsuario = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    apelllidoUsuario = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    contrasenaUsuario = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuarios__645723A6A15AF948", x => x.idUsuario);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Invenatio1");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
