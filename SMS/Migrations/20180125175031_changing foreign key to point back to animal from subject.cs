using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class changingforeignkeytopointbacktoanimalfromsubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                "IX_Samples_AnimalNumber",
                "Samples",
                "AnimalNumber");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_AnimalNumber",
                "Samples",
                "AnimalNumber",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_AnimalNumber",
                "Samples");

            migrationBuilder.DropIndex(
                "IX_Samples_AnimalNumber",
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
    }
}