using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SMS.Migrations
{
    public partial class renamingsubjectnumberbacktoanimalnumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubjectNumber",
                table: "Samples",
                newName: "AnimalNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AnimalNumber",
                table: "Samples",
                newName: "SubjectNumber");
        }
    }
}
