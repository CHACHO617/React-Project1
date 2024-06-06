using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;
        public RecipeController(IngWebProjectContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Authorize]
        [HttpGet]
        [Route("GetRecipes")]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            return await _dbcontext.Recipes.ToListAsync();
        }

        [Authorize]
        [HttpGet]
        [Route("GetRecipeId/{id:int}")]
        public async Task<ActionResult<Recipe>> GetIngredientId(int id)
        {
            var recipe = await _dbcontext.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        [Authorize]
        [HttpPut]
        [Route("PutRecipe")]
        public async Task<IActionResult> PutRecipe([FromBody] Recipe request)
        {
            var existingItem = await _dbcontext.Recipes.FindAsync(request.RecipeId);

            Console.WriteLine("EXISTIN ITEM" + existingItem.RecipeId);

            if (existingItem == null)
            {
                return NotFound("No hay esa receta");
            }

            existingItem.RecipeName = request.RecipeName;

            _dbcontext.Recipes.Update(existingItem); // Actualiza la entidad existente en lugar de agregar una nueva instancia
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpPost]
        [Route("PostRecipe")]
        public async Task<ActionResult<Ingredient>> PostRecipe([FromBody] Recipe recipe)
        {
            if (recipe.RecipeIngredients == null)
            {
                recipe.RecipeIngredients = new List<RecipeIngredient>();
            }

            await _dbcontext.Recipes.AddAsync(recipe);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteRecipe/{id:int}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            Recipe recipe = _dbcontext.Recipes.Find(id);

            _dbcontext.Recipes.Remove(recipe);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
