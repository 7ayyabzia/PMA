using Microsoft.EntityFrameworkCore;
using PMA.Data;
using PMA.Models;
using PMA.Services._CurrentContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMA.Services.AccountService
{
    public interface IAccountService
    {
        Task CreateAccount(Account account);
        Task<int> IsAccountValid(string code, string key);
        Task<bool> IsCodeExist(string code);
        Task UpdateAccount(Account account);
        Task<Account> GetAccount(int id);
        Task<int> GetCurrentAccountId();
        Task ActivateProject(string userId, int ProjectToActiveId);
    }
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly CurrentContext _currentContext;
        public AccountService(AppDbContext context, CurrentContext currentContext)
        {
            _context = context;
            _currentContext = currentContext;
        }

        public async Task CreateAccount(Account account)
        {
            account.CreationDate = DateTime.Now;
            account.Status = true;

            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
        }

        public async Task<Account> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            return account;
        }

        public async Task<int> GetCurrentAccountId()
        {
            return await _currentContext.GetCurrentAccountId();
        }

        public async Task<int> IsAccountValid(string code, string key)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(s => s.AccountCode == code && s.SecretKey == key);
            return account != null ? account.AccountId : 0;
        }

        public async Task<bool> IsCodeExist(string code)
        {
            var exist = await _context.Accounts.AnyAsync(s => s.AccountCode == code);
            return exist;
        }

        public async Task UpdateAccount(Account account)
        {
            var acc = await _context.Accounts.FindAsync(account.AccountId);
            acc.AccountName = account.AccountName;
            acc.AccountCode = account.AccountCode;
            acc.SecretKey = account.SecretKey;

            _context.Update(acc);
            await _context.SaveChangesAsync();
        }
        public async Task ActivateProject(string userId, int ProjectToActiveId)
        {
            var userProjects = await _context.UserProjects.Where(s => s.Id == userId).ToListAsync();
            userProjects.ForEach(s => s.IsActive = false);
            userProjects.Where(s => s.ProjectId == ProjectToActiveId).SingleOrDefault().IsActive = true;
            _context.UpdateRange(userProjects);
            await _context.SaveChangesAsync();
        }
    }
}
