using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Models;
using PMA.Services._CurrentContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Services.UseCaseService
{
    public interface IUseCaseService
    {
        Task<UseCaseFormat> GetFormat();
        Task AddOrUpdateFormat(string format);

        Task<IEnumerable<UseCase>> GetUseCases();
        Task AddUseCase(UseCase useCase);
        Task UpdateUseCase(UseCase useCase);
        Task DeleteUseCase(int id);
    }
    public class UseCaseService : IUseCaseService
    {
        private readonly AppDbContext _dbContext;
        private readonly CurrentContext _currentContext;
        public UseCaseService(AppDbContext dbContext, CurrentContext currentContext)
        {
            _dbContext = dbContext;
            _currentContext = currentContext;
        }

        #region "Format"
        public async Task<UseCaseFormat> GetFormat()
        {
            var projectId = await _currentContext.GetActiveProjectId();
            var format = await _dbContext.UseCaseFormats.SingleOrDefaultAsync(s => s.ProjectId == projectId);
            return format;
        }

        public async Task AddOrUpdateFormat(string format)
        {
            var projectId = await _currentContext.GetActiveProjectId();

            var _format = await GetFormat();
            if(_format == null)
            {
                var formatObj = new UseCaseFormat
                {
                    ProjectId = projectId,
                    Format = format
                };
                await _dbContext.UseCaseFormats.AddAsync(formatObj);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                _format.Format = format;
                _dbContext.UseCaseFormats.Update(_format);
                await _dbContext.SaveChangesAsync();
            }
        }

        private async Task<int> GetFormatId()
        {
            var projectId = await _currentContext.GetActiveProjectId();
            var format = await _dbContext.UseCaseFormats
                .Select(s=> new {s.UseCaseFormatId, s.ProjectId }).SingleOrDefaultAsync(s => s.ProjectId == projectId);
            return format.UseCaseFormatId;
        }
        #endregion

        #region "UseCases"

        public async Task AddUseCase(UseCase useCase)
        {
            useCase.UseCaseFormatId = await GetFormatId();

            await _dbContext.AddAsync(useCase);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUseCase(int id)
        {
            var useCase = await _dbContext.UseCaseFormats.FindAsync(id);
            _dbContext.Remove(useCase);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<UseCase>> GetUseCases()
        {
            var formatId = await GetFormatId();
            var useCases = await _dbContext.UseCases.Where(s => s.UseCaseFormatId == formatId).ToListAsync();
            return useCases;
        }

        public async Task UpdateUseCase(UseCase useCase)
        {
            var _useCase = await _dbContext.UseCases.FindAsync(useCase.UseCaseId);

            _useCase.Actor = useCase.Actor;
            _useCase.Description = useCase.Description;
            _useCase.Extensions = useCase.Extensions;
            _useCase.Level = useCase.Level;
            _useCase.MainSuccessScenario = useCase.MainSuccessScenario;
            _useCase.OpenIssues = useCase.OpenIssues;
            _useCase.PostConditions = useCase.PostConditions;
            _useCase.PreConditions = useCase.PreConditions;
            _useCase.Scope = useCase.Scope;
            _useCase.SpecialRequirements = useCase.SpecialRequirements;
            _useCase.StakeholdersInterest = useCase.StakeholdersInterest;
            _useCase.Technology = useCase.Technology;
            _useCase.Title = useCase.Title;
            _useCase.UseCaseNumber = useCase.UseCaseNumber;

            _dbContext.UseCases.Update(_useCase);
            await _dbContext.SaveChangesAsync();

        }

        #endregion 
    }

}
