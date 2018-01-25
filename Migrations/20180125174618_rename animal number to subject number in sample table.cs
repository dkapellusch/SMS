using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SMS.Migrations
{
    public partial class renameanimalnumbertosubjectnumberinsampletable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Animals_AnimalNumber",
                table: "Samples");

            migrationBuilder.RenameColumn(
                name: "AnimalNumber",
                table: "Samples",
                newName: "SubjectNumber");

            migrationBuilder.RenameIndex(
                name: "IX_Samples_AnimalNumber",
                table: "Samples",
                newName: "IX_Samples_SubjectNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Animals_SubjectNumber",
                table: "Samples",
                column: "SubjectNumber",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Samples_Animals_SubjectNumber",
                table: "Samples");

            migrationBuilder.RenameColumn(
                name: "SubjectNumber",
                table: "Samples",
                newName: "AnimalNumber");

            migrationBuilder.RenameIndex(
                name: "IX_Samples_SubjectNumber",
                table: "Samples",
                newName: "IX_Samples_AnimalNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Samples_Animals_AnimalNumber",
                table: "Samples",
                column: "AnimalNumber",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
