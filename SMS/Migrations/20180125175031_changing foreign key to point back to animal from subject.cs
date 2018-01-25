using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SMS.Migrations
{
    public partial class changingforeignkeytopointbacktoanimalfromsubject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Animals_SubjectId",
                table: "Samples");

            migrationBuilder.DropIndex(
                name: "IX_Samples_SubjectId",
                table: "Samples");

            migrationBuilder.DropColumn(
                name: "SubjectId",
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
                name: "SubjectId",
                table: "Samples",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Samples_SubjectId",
                table: "Samples",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Animals_SubjectId",
                table: "Samples",
                column: "SubjectId",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
