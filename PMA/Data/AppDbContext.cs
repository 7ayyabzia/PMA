using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMA.Models;
using PMA.Models.ApplicationUser;

namespace PMA.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }
        public DbSet<UseCaseFormat> UseCaseFormats { get; set; }
        public DbSet<UseCase> UseCases { get; set; }
        public DbSet<MainSuccessScenario> MainSuccessScenarios { get; set; }
        public DbSet<Extension> Extensions { get; set; }
        public DbSet<PDM> PDMs { get; set; }
        public DbSet<ConceptualClass> ConceptualClasses { get; set; }
        public DbSet<DomainModel> DomainModels { get; set; }
        public DbSet<DomainModelConcept> DomainModelConcepts { get; set; }
        public DbSet<TechnicalFactor> TechnicalFactors { get; set; }
        public DbSet<EnvironmentalFactor> EnvironmentalFactors { get; set; }
        public DbSet<UseCaseTechnicalFactor> UseCaseTechnicalFactors { get; set; }
        public DbSet<UseCaseEnvironmentalFactor> UseCaseEnvironmentalFactors { get; set; }
    }
}
