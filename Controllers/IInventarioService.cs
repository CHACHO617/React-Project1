using React_Project1.Models;

namespace React_Project1.Controllers
{
    public interface IInventarioService
    {
        Task<List<Inventario1>> GetInventario1Async();
        Task<List<Inventario2>> GetInventario2Async();
        Task UpdateInventory1Async(List<Inventario1> inventory1);
        Task UpdateInventory2Async(List<Inventario2> inventory2);


    }
}
