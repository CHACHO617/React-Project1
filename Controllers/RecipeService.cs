using System.Linq;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

public class RecipeService
{
    private readonly IngWebProjectContext _dbContext;

    public RecipeService(IngWebProjectContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Recipe> GetRecipes()
    {
        // Query the Recipes table to retrieve all recipes
        return _dbContext.Recipes
                         .Include(r => r.RecipeIngredients)
                             .ThenInclude(ri => ri.Ingredient)
                         .ToList();
    }

    public Recipe GetRecipeByName(string burgerName)
    {
        // Query the Recipes table to retrieve a recipe by its name
        return _dbContext.Recipes
                         .Include(r => r.RecipeIngredients)
                             .ThenInclude(ri => ri.Ingredient)
                         .FirstOrDefault(r => r.RecipeName == burgerName);
    }
}
