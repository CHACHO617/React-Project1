using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeIngredientController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;
        public RecipeIngredientController(IngWebProjectContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Authorize]
        [HttpGet]
        [Route("GetRecipeIngredients")]
        public async Task<ActionResult<IEnumerable<RecipeIngredient>>> GetRecipeIngredients()
        {
            return await _dbcontext.RecipeIngredients.ToListAsync();
        }

        [Authorize]
        [HttpPut]
        [Route("PutRecipeIngredient")]
        public async Task<IActionResult> PutRecipeIngredient(RecipeIngredient recipeIngredient)
        {
            Console.WriteLine("PUT ENTRO----------");

            // Fetch the existing entity from the database
            var existingEntity = await _dbcontext.RecipeIngredients
                .Include(ri => ri.Recipe)
                .Include(ri => ri.Ingredient)
                .FirstOrDefaultAsync(ri => ri.RecipeId == recipeIngredient.RecipeId && ri.IngredientId == recipeIngredient.IngredientId);


            Console.WriteLine(existingEntity.ToString());

            if (existingEntity == null)
            {
                return NotFound("The recipe ingredient combination does not exist.");
            }


            if (recipeIngredient.CantidadItem <= 0)
            {
                return BadRequest("No puedes ingresar valores que sean 0 o menores a 0");
            }
            else
            {
                // Update the fields
                existingEntity.CantidadItem = recipeIngredient.CantidadItem;
                // Update other fields if necessary
            }


            try
            {
                await _dbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeIngredientExists(recipeIngredient.RecipeId, recipeIngredient.IngredientId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool RecipeIngredientExists(int recipeId, int ingredientId)
        {
            return _dbcontext.RecipeIngredients.Any(e => e.RecipeId == recipeId && e.IngredientId == ingredientId);
        }

        [Authorize]
        [HttpPost]
        [Route("PostRecipeIngredient")]
        public async Task<ActionResult> PostRecipeIngredient([FromBody] RecipeIngredient request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request");
            }

            if (request.CantidadItem <= 0)
            {
                return BadRequest("No puedes ingresar valores que sean 0 o menores a 0");
            }

            try
            {
                await _dbcontext.AddRecipeIngredientAsync(request.RecipeId, request.IngredientId, request.CantidadItem);

                return StatusCode(StatusCodes.Status200OK, "Recipe ingredient added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding recipe ingredient: {ex.Message}");
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteRecipeIngredient/{recipeId}/{ingredientId}")]
        public async Task<ActionResult> DeleteRecipeIngredient(int recipeId, int ingredientId)
        {
            Console.WriteLine("Its In");
            try
            {
                await _dbcontext.RemoveRecipeIngredient(recipeId, ingredientId);

                return StatusCode(StatusCodes.Status200OK, "Recipe ingredient deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting recipe ingredient: {ex.Message}");
            }
        }
    }
}
