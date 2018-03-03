using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class renamingsubjectnumberbacktoanimalnumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                "SubjectNumber",
                "Samples",
                "AnimalNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                "AnimalNumber",
                "Samples",
                "SubjectNumber");
        }
    }
}