using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class Addingsamplescollectiontoanimalandrecordstatustosample : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "RecordStatus",
                "Samples",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "RecordStatus",
                "Samples");
        }
    }
}