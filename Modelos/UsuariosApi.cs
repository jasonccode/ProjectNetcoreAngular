using System;
using System.Collections.Generic;

namespace NetCoreAngular.Modelos
{
    public partial class UsuariosApi
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public byte[] Password { get; set; } = null!;
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
    }
}
