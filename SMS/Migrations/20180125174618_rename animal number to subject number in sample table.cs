using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class renameanimalnumbertosubjectnumberinsampletable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_AnimalNumber",
                "Samples");

            migrationBuilder.RenameColumn(
                "AnimalNumber",
                "Samples",
                "SubjectNumber");

            migrationBuilder.RenameIndex(
                "IX_Samples_AnimalNumber",
                table: "Samples",
                newName: "IX_Samples_SubjectNumber");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_SubjectNumber",
                "Samples",
                "SubjectNumber",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_SubjectNumber",
                "Samples");

            migrationBuilder.RenameColumn(
                "SubjectNumber",
                "Samples",
                "AnimalNumber");

            migrationBuilder.RenameIndex(
                "IX_Samples_SubjectNumber",
                table: "Samples",
                newName: "IX_Samples_AnimalNumber");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_AnimalNumber",
                "Samples",
                "AnimalNumber",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}