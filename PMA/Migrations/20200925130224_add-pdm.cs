using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class addpdm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PDMs",
                columns: table => new
                {
                    PDMId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UseCaseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PDMs", x => x.PDMId);
                    table.ForeignKey(
                        name: "FK_PDMs_UseCases_UseCaseId",
                        column: x => x.UseCaseId,
                        principalTable: "UseCases",
                        principalColumn: "UseCaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConceptualClasses",
                columns: table => new
                {
                    ConceptualClassId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassName = table.Column<string>(nullable: true),
                    Attributes = table.Column<string>(nullable: true),
                    Methods = table.Column<string>(nullable: true),
                    PDMId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConceptualClasses", x => x.ConceptualClassId);
                    table.ForeignKey(
                        name: "FK_ConceptualClasses_PDMs_PDMId",
                        column: x => x.PDMId,
                        principalTable: "PDMs",
                        principalColumn: "PDMId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConceptualClasses_PDMId",
                table: "ConceptualClasses",
                column: "PDMId");

            migrationBuilder.CreateIndex(
                name: "IX_PDMs_UseCaseId",
                table: "PDMs",
                column: "UseCaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConceptualClasses");

            migrationBuilder.DropTable(
                name: "PDMs");
        }
    }
}
