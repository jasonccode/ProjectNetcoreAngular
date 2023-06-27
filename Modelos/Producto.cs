using System;
using System.Collections.Generic;

namespace NetCoreAngular.Modelos
{
    public partial class Producto
    {
        public Producto()
        {
            LineasPedidos = new HashSet<LineasPedido>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public string Descripcion { get; set; } = null!;

        public virtual ICollection<LineasPedido> LineasPedidos { get; set; }
    }
}
