using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class addedsampletypetosamplestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "SampleType",
                "Samples",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "SampleType",
                "Samples");
        }
    }
}