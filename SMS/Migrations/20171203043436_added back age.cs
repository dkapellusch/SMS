using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class addedbackage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "AgeInMonths",
                "Animals",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "AgeInMonths",
                "Animals");
        }
    }
}