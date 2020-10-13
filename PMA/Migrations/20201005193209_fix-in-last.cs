using Microsoft.EntityFrameworkCore.Migrations;

namespace PMA.Migrations
{
    public partial class fixinlast : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Extensions",
                table: "UseCases");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Extensions",
                table: "UseCases",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
