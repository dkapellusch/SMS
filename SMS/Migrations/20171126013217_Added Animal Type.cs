using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class AddedAnimalType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "AnimalType",
                "Animals",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "AnimalType",
                "Animals");
        }
    }
}