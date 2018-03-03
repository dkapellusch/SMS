using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class renamesubjectnumbertoidinsampletable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                "SubjectNumber",
                "Samples",
                "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                "Id",
                "Samples",
                "SubjectNumber");
        }
    }
}