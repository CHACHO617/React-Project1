using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioaController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public InventarioaController(IngWebProjectContext context)
        {
            _dbcontext = context;
        }

        [Authorize]
        [HttpGet]
        [Route("ListaInv1")]
        public async Task<IActionResult> ListaInv1()
        {
            List<Inventario1> inventario1 = await _dbcontext.Invenatio1.ToListAsync();

            return StatusCode(StatusCodes.Status200OK, inventario1);
        }

        [Authorize]
        [HttpPost]
        [Route("GuardarInv1")]
        public async Task<IActionResult> GuardarInv1([FromBody] Inventario1 request)
        {
            if (string.IsNullOrWhiteSpace(request.NombreIngrediente1) || request.CantidadIngrediente1 <= 0 || string.IsNullOrWhiteSpace(request.UnidadIngrediente1))
            {
                return BadRequest("Todos los campos deben ser completados y la cantidad debe ser mayor que cero.");
            }

            await _dbcontext.Invenatio1.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpPut]
        [Route("EditarInv1")]
        public async Task<IActionResult> EditarInv1([FromBody] Inventario1 request)
        {
            var existingItem = await _dbcontext.Invenatio1.FindAsync(request.IdInventario1);

            if (existingItem == null)
            {
                return NotFound("No hay ese item en el inventario");
            }

            if(request.CantidadIngrediente1 >= 0)
            {
                existingItem.CantidadIngrediente1 = request.CantidadIngrediente1;
            }
            else
            {
                return BadRequest("La cantidad no puede ser menor a cero");
            }

            _dbcontext.Invenatio1.Update(existingItem); // Actualiza la entidad existente en lugar de agregar una nueva instancia
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpDelete]
        [Route("EliminarInv1/{id:int}")]
        public async Task<IActionResult> EliminarInv1(int id)
        {
            Inventario1 Inventario1 = _dbcontext.Invenatio1.Find(id);

            _dbcontext.Invenatio1.Remove(Inventario1);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
