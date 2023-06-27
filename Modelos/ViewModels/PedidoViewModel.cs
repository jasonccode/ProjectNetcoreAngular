namespace NetCoreAngular.Modelos.ViewModels
{
    public class PedidoViewModel
    {
        public string email { get; set; }
        public List<LineasPedidoViewModel> DetallesPedido { get; set; }
        public PedidoViewModel() { this.DetallesPedido = new List<LineasPedidoViewModel>(); }
    }

    public class LineasPedidoViewModel
    {
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }

        public decimal ImporteUnitario { get; set; }
    }
 }
