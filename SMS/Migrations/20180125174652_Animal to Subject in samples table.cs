using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class AnimaltoSubjectinsamplestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_SubjectNumber",
                "Samples");

            migrationBuilder.DropIndex(
                "IX_Samples_SubjectNumber",
                "Samples");

            migrationBuilder.AddColumn<int>(
                "SubjectId",
                "Samples",
                nullable: true);

            migrationBuilder.CreateIndex(
                "IX_Samples_SubjectId",
                "Samples",
                "SubjectId");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_SubjectId",
                "Samples",
                "SubjectId",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_SubjectId",
                "Samples");

            migrationBuilder.DropIndex(
                "IX_Samples_SubjectId",
                "Samples");

            migrationBuilder.DropColumn(
                "SubjectId",
                "Samples");

            migrationBuilder.CreateIndex(
                "IX_Samples_SubjectNumber",
                "Samples",
                "SubjectNumber");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_SubjectNumber",
                "Samples",
                "SubjectNumber",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}