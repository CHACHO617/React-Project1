using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;
        
        public IngredientController (IngWebProjectContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("GetIngredients")]
        public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
        {
            return await _dbcontext.Ingredients.ToListAsync();
        }

        [HttpGet]
        [Route("GetIngredientId/{id:int}")]
        public async Task <ActionResult<Ingredient>> GetIngredientId(int id)
        {
            var ingredient = await _dbcontext.Ingredients.FindAsync(id);

            if (ingredient == null)
            {
                return NotFound();
            }

            return ingredient;
        }
        
        [HttpPut]
        [Route("PutIngredient")]
        public async Task<IActionResult> PutIngredient([FromBody] Ingredient request)
        {
            var existingItem = await _dbcontext.Ingredients.FindAsync(request.IngredientId);

            Console.WriteLine("EXISTIN ITEM" + existingItem.IngredientId);

            if (existingItem == null)
            {
                return NotFound("No hay ese ingrediente");
            }

            existingItem.NombreIngrediente = request.NombreIngrediente;
            existingItem.UnidadIngrediente = request.UnidadIngrediente.ToString();

            _dbcontext.Ingredients.Update(existingItem); // Actualiza la entidad existente en lugar de agregar una nueva instancia
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPost]       
        [Route("PostIngredient")]
        public async Task<ActionResult<Ingredient>> PostIngredient([FromBody] Ingredient ingredient)
        {
            if (ingredient.RecipeIngredients == null)
            {
                ingredient.RecipeIngredients = new List<RecipeIngredient>();
            }

            await _dbcontext.Ingredients.AddAsync(ingredient);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("DeleteIngredient/{id:int}")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            Ingredient ingredient = _dbcontext.Ingredients.Find(id);

            _dbcontext.Ingredients.Remove(ingredient);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
        
    }
}
