using NetCoreAngular.Modelos;
using NetCoreAngular.Modelos.ViewModels;

namespace NetCoreAngular.Servicios
{
    public interface IProductos
    {
        public List<Producto> DameProductos();
        public void AgregarPedido(PedidoViewModel p);
        public List<PedidoDetalleViewModel> PedidosClientes(ClienteViewmodel c); 
    }
}
