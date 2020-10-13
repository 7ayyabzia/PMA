using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class addedtechnicalandenvfactors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnvironmentalFactors",
                columns: table => new
                {
                    EnvironmentalFactorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Factor = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Weight = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnvironmentalFactors", x => x.EnvironmentalFactorId);
                });

            migrationBuilder.CreateTable(
                name: "TechnicalFactors",
                columns: table => new
                {
                    TechnicalFactorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Factor = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Weight = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechnicalFactors", x => x.TechnicalFactorId);
                });

            migrationBuilder.CreateTable(
                name: "UseCaseEnvironmentalFactors",
                columns: table => new
                {
                    UseCaseEnvironmentalFactorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnvironmentalFactorId = table.Column<int>(nullable: false),
                    UseCaseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UseCaseEnvironmentalFactors", x => x.UseCaseEnvironmentalFactorId);
                    table.ForeignKey(
                        name: "FK_UseCaseEnvironmentalFactors_EnvironmentalFactors_EnvironmentalFactorId",
                        column: x => x.EnvironmentalFactorId,
                        principalTable: "EnvironmentalFactors",
                        principalColumn: "EnvironmentalFactorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UseCaseEnvironmentalFactors_UseCases_UseCaseId",
                        column: x => x.UseCaseId,
                        principalTable: "UseCases",
                        principalColumn: "UseCaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UseCaseTechnicalFactors",
                columns: table => new
                {
                    UseCaseTechnicalFactorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TechnicalFactorId = table.Column<int>(nullable: false),
                    UseCaseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UseCaseTechnicalFactors", x => x.UseCaseTechnicalFactorId);
                    table.ForeignKey(
                        name: "FK_UseCaseTechnicalFactors_TechnicalFactors_TechnicalFactorId",
                        column: x => x.TechnicalFactorId,
                        principalTable: "TechnicalFactors",
                        principalColumn: "TechnicalFactorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UseCaseTechnicalFactors_UseCases_UseCaseId",
                        column: x => x.UseCaseId,
                        principalTable: "UseCases",
                        principalColumn: "UseCaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UseCaseEnvironmentalFactors_EnvironmentalFactorId",
                table: "UseCaseEnvironmentalFactors",
                column: "EnvironmentalFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_UseCaseEnvironmentalFactors_UseCaseId",
                table: "UseCaseEnvironmentalFactors",
                column: "UseCaseId");

            migrationBuilder.CreateIndex(
                name: "IX_UseCaseTechnicalFactors_TechnicalFactorId",
                table: "UseCaseTechnicalFactors",
                column: "TechnicalFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_UseCaseTechnicalFactors_UseCaseId",
                table: "UseCaseTechnicalFactors",
                column: "UseCaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UseCaseEnvironmentalFactors");

            migrationBuilder.DropTable(
                name: "UseCaseTechnicalFactors");

            migrationBuilder.DropTable(
                name: "EnvironmentalFactors");

            migrationBuilder.DropTable(
                name: "TechnicalFactors");
        }
    }
}
