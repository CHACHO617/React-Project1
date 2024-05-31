using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class Recipe
    {
        [Key]
        public int RecipeId { get; set; }
        public string RecipeName { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }    
    }
}
