﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SMS.Models.Enums;
using SMS.Persistence;
using System;

namespace SMS.Migrations
{
    [DbContext(typeof(PostgresqlContext))]
    partial class PostgresqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("SMS.Models.Animals.Animal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Experiment");

                    b.Property<DateTime>("LastUpdateTime");

                    b.Property<string>("Name");

                    b.Property<int>("RecordStatus");

                    b.HasKey("Id");

                    b.ToTable("Animals");
                });

            modelBuilder.Entity("SMS.Models.Samples.Sample", b =>
                {
                    b.Property<int>("SubjectNumber")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AgeInMonths");

                    b.Property<DateTime>("LastUpdateTime");

                    b.HasKey("SubjectNumber");

                    b.ToTable("Samples");
                });

            modelBuilder.Entity("SMS.Models.Thing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Things");
                });
#pragma warning restore 612, 618
        }
    }
}
