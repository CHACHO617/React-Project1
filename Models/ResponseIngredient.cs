using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class ResponseIngredient
    {
        public int IngredientId { get; set; }

        public string NombreIngrediente { get; set; }

        public string UnidadIngrediente { get; set; }

        public int CantidadUsadaIngrediente { get; set; }

        public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    }
}

