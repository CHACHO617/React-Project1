using System;
using System.Collections.Generic;

namespace React_Project1.Models
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public string? CorreoUsuario { get; set; }
        public string? NombreUsuario { get; set; }
        public string? ApelllidoUsuario { get; set; }
        public string? ContrasenaUsuario { get; set; }
    }
}
