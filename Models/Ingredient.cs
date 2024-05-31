using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class Ingredient
    {
        [Key]
        public int IngredientId { get; set; }
        public string NombreIngrediente { get; set; }
        public int CantidadIngrediente { get; set; }
        public string UnidadIngrediente { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get ; set; }   
    }
}
