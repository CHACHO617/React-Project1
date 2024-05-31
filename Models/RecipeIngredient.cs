using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class RecipeIngredient
    {
        [Key]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }

        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }

        public int CantidadItem { get; set; }
    }
}
