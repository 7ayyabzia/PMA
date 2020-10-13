using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Models;
using PMA.Services._CurrentContext;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Services.DomainModelService
{
    public interface IDomainModelService
    {
        Task<IEnumerable<PDM>> GetPDMs();
        Task AddOrUpdatePDM(PDM pdm);

        Task<DomainModel> GetDomainModel();
        Task UpdateDomainModel();
    }
    public class DomainModelService : IDomainModelService
    {
        private readonly AppDbContext _dbcontext;
        private readonly CurrentContext _currentContext;
        public DomainModelService(AppDbContext dbcontext, CurrentContext currentContext)
        {
            _dbcontext = dbcontext;
            _currentContext = currentContext;
        }
        public async Task<IEnumerable<PDM>> GetPDMs()
        {
            var projectId = await _currentContext.GetActiveProjectId();
            var pdms = await _dbcontext.PDMs
                .Include(s=>s.ConceptualClasses).Include(s=>s.UseCase)
                .Where(s => s.UseCase.UseCaseFormat.ProjectId == projectId).ToListAsync();
            pdms.ForEach(s => s.ConceptualClasses.ToList().ForEach(a => a.PDM = null) );
            return pdms;
        }

        public async Task AddOrUpdatePDM(PDM pdm)
        {
            if(pdm.PDMId == 0)
                await _dbcontext.AddAsync(pdm);
            else
            {
                var _pdm = await _dbcontext.PDMs.Include(s=>s.ConceptualClasses).SingleOrDefaultAsync(s => s.UseCaseId == pdm.UseCaseId);
                _pdm.ConceptualClasses = pdm.ConceptualClasses;
                _dbcontext.PDMs.Update(_pdm);
            }
            await _dbcontext.SaveChangesAsync();

        }

        public async Task<DomainModel> GetDomainModel()
        {
            var projectId = await _currentContext.GetActiveProjectId();
            var dm = await _dbcontext.DomainModels.Include(s => s.DomainModelConcepts).SingleOrDefaultAsync(s => s.ProjectId == projectId);
            if(dm == null)
            {
                dm = new DomainModel { ProjectId = projectId };
                await _dbcontext.AddAsync(dm);
                await _dbcontext.SaveChangesAsync();
            }
            
            dm.DomainModelConcepts.ToList().ForEach(s => s.DomainModel = null);
            return dm;
        }

        public async Task UpdateDomainModel()
        {
            var projectId = await _currentContext.GetActiveProjectId();
            var pdms = await _dbcontext.PDMs.Include(s => s.ConceptualClasses)
                .Where(s => s.UseCase.UseCaseFormat.ProjectId == projectId).ToListAsync();

            var dm = await _dbcontext.DomainModels.Include(s => s.DomainModelConcepts).SingleOrDefaultAsync(s => s.ProjectId == projectId);

            var classes = pdms.SelectMany(s => s.ConceptualClasses).Select(a => a.ClassName).ToList();
            dm.DomainModelConcepts = classes.Distinct().ToList().Select(s => new DomainModelConcept { ClassName = s }).ToList();
            _dbcontext.Update(dm);
            await _dbcontext.SaveChangesAsync();
        }
    }

}
