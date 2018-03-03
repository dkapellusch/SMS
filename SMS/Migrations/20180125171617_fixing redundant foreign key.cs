using Microsoft.EntityFrameworkCore.Migrations;

namespace SMS.Migrations
{
    public partial class fixingredundantforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                "AnimalId",
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
    }
}