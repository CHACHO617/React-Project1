using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class Ingredient
    {
        [Key]
        public int IngredientId { get; set; }
       
        [Required]
        public string NombreIngrediente { get; set; }

        [Required]
        public string UnidadIngrediente { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    }
}
