using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Inventario2
    {
        [Key]
        public int IdInventario2 { get; set; }
        public string NombreIngrediente2 { get; set; }
        public int CantidadIngrediente2 { get; set; }
        public string UnidadIngrediente2 { get; set; }
    }
}
