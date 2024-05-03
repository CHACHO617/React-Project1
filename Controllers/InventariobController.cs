using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventariobController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public InventariobController(IngWebProjectContext context)
        {
            _dbcontext = context;
        }

        [Authorize]
        [HttpGet]
        [Route("ListaInv2")]
        public async Task<IActionResult> ListaInv2()
        {
            List<Inventario2> inventario2 = await _dbcontext.Invenatio2.ToListAsync();

            return StatusCode(StatusCodes.Status200OK, inventario2);
        }

        [Authorize]
        [HttpPost]
        [Route("GuardarInv2")]
        public async Task<IActionResult> GuardarInv2([FromBody] Inventario2 request)
        {
            await _dbcontext.Invenatio2.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpPut]
        [Route("EditarInv2")]
        public async Task<IActionResult> EditarInv2([FromBody] Inventario2 request)
        {
            var existingItem = await _dbcontext.Invenatio2.FindAsync(request.IdInventario2);

            if (existingItem == null)
            {
                return NotFound("No hay ese item en el inventario");
            }

            existingItem.CantidadIngrediente2 = request.CantidadIngrediente2;

            _dbcontext.Invenatio2.Update(existingItem); // Actualiza la entidad existente en lugar de agregar una nueva instancia
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpDelete]
        [Route("EliminarInv2/{id:int}")]
        public async Task<IActionResult> EliminarInv2(int id)
        {
            Inventario2 Inventario2 = _dbcontext.Invenatio2.Find(id);

            _dbcontext.Invenatio2.Remove(Inventario2);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

    }
}
