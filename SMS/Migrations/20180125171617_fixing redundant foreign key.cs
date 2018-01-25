using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SMS.Migrations
{
    public partial class fixingredundantforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_Samples_AnimalNumber",
                table: "Samples",
                column: "AnimalNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Animals_AnimalNumber",
                table: "Samples",
                column: "AnimalNumber",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Animals_AnimalNumber",
                table: "Samples");

            migrationBuilder.DropIndex(
                name: "IX_Samples_AnimalNumber",
                table: "Samples");

            migrationBuilder.AddColumn<int>(
                name: "AnimalId",
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
    }
}
