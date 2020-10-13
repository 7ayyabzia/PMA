using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class addeddomainmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DomainModels",
                columns: table => new
                {
                    DomainModelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DomainModels", x => x.DomainModelId);
                    table.ForeignKey(
                        name: "FK_DomainModels_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DomainModelConcepts",
                columns: table => new
                {
                    DomainModelConceptId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassName = table.Column<string>(nullable: true),
                    Attributes = table.Column<string>(nullable: true),
                    Methods = table.Column<string>(nullable: true),
                    DomainModelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DomainModelConcepts", x => x.DomainModelConceptId);
                    table.ForeignKey(
                        name: "FK_DomainModelConcepts_DomainModels_DomainModelId",
                        column: x => x.DomainModelId,
                        principalTable: "DomainModels",
                        principalColumn: "DomainModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DomainModelConcepts_DomainModelId",
                table: "DomainModelConcepts",
                column: "DomainModelId");

            migrationBuilder.CreateIndex(
                name: "IX_DomainModels_ProjectId",
                table: "DomainModels",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DomainModelConcepts");

            migrationBuilder.DropTable(
                name: "DomainModels");
        }
    }
}
