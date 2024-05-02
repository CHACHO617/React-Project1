using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Inventario1
    {
        [Key]
        public int IdInventario1 { get; set; }
        public string NombreIngrediente1 { get; set; }
        public int CantidadIngrediente1 { get; set; }
        public string UnidadIngrediente1 { get; set; }

    }
}
