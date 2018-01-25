using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SMS.Migrations
{
    public partial class CreatingSampleAnimalrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnimalId",
                table: "Samples",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnimalNumber",
                table: "Samples",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Samples_AnimalId",
                table: "Samples",
                column: "AnimalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Animals_AnimalId",
                table: "Samples",
                column: "AnimalId",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Animals_AnimalId",
                table: "Samples");

            migrationBuilder.DropIndex(
                name: "IX_Samples_AnimalId",
                table: "Samples");

            migrationBuilder.DropColumn(
                name: "AnimalId",
                table: "Samples");

            migrationBuilder.DropColumn(
                name: "AnimalNumber",
                table: "Samples");
        }
    }
}
