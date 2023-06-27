using System;
using System.Collections.Generic;

namespace NetCoreAngular.Modelos.ViewModels
{
    public class PedidoDetalleViewModel
    {
        public decimal Total { get; set; }
        public List<PedidoDetalleProductoViewModel> DetallesProductosPedido { get; set; }

        public PedidoDetalleViewModel()
        {
            this.DetallesProductosPedido = new List<PedidoDetalleProductoViewModel>();
        }

    }

    public class PedidoDetalleProductoViewModel
    {
        public string NombreProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal ImporteUnitario { get; set; }
    }
}