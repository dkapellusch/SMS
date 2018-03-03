using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class CreatingSampleAnimalrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                "AnimalId",
                "Samples",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                "AnimalNumber",
                "Samples",
                nullable: true);

            migrationBuilder.CreateIndex(
                "IX_Samples_AnimalId",
                "Samples",
                "AnimalId");

            migrationBuilder.AddForeignKey(
                "FK_Samples_Animals_AnimalId",
                "Samples",
                "AnimalId",
                "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Samples_Animals_AnimalId",
                "Samples");

            migrationBuilder.DropIndex(
                "IX_Samples_AnimalId",
                "Samples");

            migrationBuilder.DropColumn(
                "AnimalId",
                "Samples");

            migrationBuilder.DropColumn(
                "AnimalNumber",
                "Samples");
        }
    }
}