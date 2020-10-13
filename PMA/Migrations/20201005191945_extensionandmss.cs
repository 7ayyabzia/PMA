using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class extensionandmss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainSuccessScenario",
                table: "UseCases");

            migrationBuilder.CreateTable(
                name: "Extensions",
                columns: table => new
                {
                    ExtensionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    ExtensionSolutions = table.Column<string>(nullable: true),
                    UseCaseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Extensions", x => x.ExtensionId);
                    table.ForeignKey(
                        name: "FK_Extensions_UseCases_UseCaseId",
                        column: x => x.UseCaseId,
                        principalTable: "UseCases",
                        principalColumn: "UseCaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MainSuccessScenarios",
                columns: table => new
                {
                    MainSuccessScenarioId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    UseCaseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MainSuccessScenarios", x => x.MainSuccessScenarioId);
                    table.ForeignKey(
                        name: "FK_MainSuccessScenarios_UseCases_UseCaseId",
                        column: x => x.UseCaseId,
                        principalTable: "UseCases",
                        principalColumn: "UseCaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Extensions_UseCaseId",
                table: "Extensions",
                column: "UseCaseId");

            migrationBuilder.CreateIndex(
                name: "IX_MainSuccessScenarios_UseCaseId",
                table: "MainSuccessScenarios",
                column: "UseCaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Extensions");

            migrationBuilder.DropTable(
                name: "MainSuccessScenarios");

            migrationBuilder.AddColumn<string>(
                name: "MainSuccessScenario",
                table: "UseCases",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
