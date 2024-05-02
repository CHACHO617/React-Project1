using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public partial class Admin
    {
        [Key]
        public int IdAdmin { get; set; }
        public string? IdentificacionAdmin { get; set; }
        public string? ContrasenaAdmin { get; set; }
    }
}
