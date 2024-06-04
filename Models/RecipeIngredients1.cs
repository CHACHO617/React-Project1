using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class RecipeIngredients1
    {
        [Key]
        public int RecipeId { get; set; }


        public int IngredientId { get; set; }


        public int CantidadItem { get; set; }
    }
}
