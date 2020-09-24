using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class addedusecases : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UseCaseFormats",
                columns: table => new
                {
                    UseCaseFormatId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Format = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UseCaseFormats", x => x.UseCaseFormatId);
                    table.ForeignKey(
                        name: "FK_UseCaseFormats_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UseCases",
                columns: table => new
                {
                    UseCaseId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UseCaseFormatId = table.Column<int>(nullable: false),
                    UseCaseNumber = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Scope = table.Column<string>(nullable: true),
                    Level = table.Column<string>(nullable: true),
                    Actor = table.Column<string>(nullable: true),
                    StakeholdersInterest = table.Column<string>(nullable: true),
                    PreConditions = table.Column<string>(nullable: true),
                    PostConditions = table.Column<string>(nullable: true),
                    MainSuccessScenario = table.Column<string>(nullable: true),
                    Extensions = table.Column<string>(nullable: true),
                    SpecialRequirements = table.Column<string>(nullable: true),
                    Technology = table.Column<string>(nullable: true),
                    OpenIssues = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UseCases", x => x.UseCaseId);
                    table.ForeignKey(
                        name: "FK_UseCases_UseCaseFormats_UseCaseFormatId",
                        column: x => x.UseCaseFormatId,
                        principalTable: "UseCaseFormats",
                        principalColumn: "UseCaseFormatId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UseCaseFormats_ProjectId",
                table: "UseCaseFormats",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UseCases_UseCaseFormatId",
                table: "UseCases",
                column: "UseCaseFormatId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UseCases");

            migrationBuilder.DropTable(
                name: "UseCaseFormats");
        }
    }
}
