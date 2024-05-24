using Microsoft.EntityFrameworkCore;
using React_Project1.Models;
using System.Net.Http.Headers;
using System.Text.Json;

namespace React_Project1.Controllers
{
    public class InventarioService : IInventarioService
    {
        private readonly IngWebProjectContext _dbContext;

        public InventarioService(IngWebProjectContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Inventario1>> GetInventario1Async()
        {
            return await _dbContext.Invenatio1.ToListAsync();
        }

        public async Task<List<Inventario2>> GetInventario2Async()
        {
            return await _dbContext.Invenatio2.ToListAsync();
        }

        public async Task UpdateInventory1Async(List<Inventario1> inventory1)
        {
            _dbContext.UpdateRange(inventory1);
            await _dbContext.SaveChangesAsync();    
        }

        public async Task UpdateInventory2Async(List<Inventario2> inventory2)
        {
            _dbContext.UpdateRange(inventory2);
            await _dbContext.SaveChangesAsync();
        }


    }
}



