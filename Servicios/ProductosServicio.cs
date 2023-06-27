using Microsoft.EntityFrameworkCore.Storage;
using NetCoreAngular.Modelos;
using NetCoreAngular.Modelos.ViewModels;

namespace NetCoreAngular.Servicios
{
    public class ProductosServicio : IProductos
    {
        public List<Producto> DameProductos()
        {
            List<Producto> lista;
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                lista = basedatos.Productos.ToList();
            }
            return lista;
        }

        public void AgregarPedido(PedidoViewModel p)
        {
            IDbContextTransaction transaccion = null;
            try
            {
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    transaccion = basedatos.Database.BeginTransaction();
                    {
                        var pedido = new Pedido();
                        pedido.Total = p.DetallesPedido.Sum(p => p.Cantidad * p.ImporteUnitario);
                        var cliente = basedatos.Clientes.Single(cli => cli.Email == p.email);
                        pedido.IdCliente = cliente.Id;
                        pedido.FechaPedido = DateTime.Now;
                        basedatos.Pedidos.Add(pedido);
                        basedatos.SaveChanges();

                        foreach (var d in p.DetallesPedido)
                        {
                            var detalle = new LineasPedido();
                            detalle.Cantidad = d.Cantidad;
                            detalle.ImporteUnitario = d.ImporteUnitario;
                            detalle.IdProducto = d.IdProducto;
                            detalle.IdPedido = pedido.Id;
                            basedatos.LineasPedidos.Add(detalle);
                            basedatos.SaveChanges();

                        }
                    }

                    transaccion.Commit();
                }
            }
            catch (Exception ex)
            {
                if (transaccion != null)
                    transaccion.Rollback();

                throw new Exception(ex.ToString());
            }
        }

        public List<PedidoDetalleViewModel> PedidosClientes(ClienteViewmodel c)
        {
            List<PedidoDetalleViewModel> lista = new List<PedidoDetalleViewModel>();
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                var cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
                List<Pedido> listaPedido = (from p in basedatos.Pedidos
                                            where p.IdCliente == cliente.Id
                                            select p).ToList();
                foreach (Pedido p in listaPedido)
                {
                    PedidoDetalleViewModel auxPedido = new PedidoDetalleViewModel();
                    auxPedido.Total = p.Total;
                    List<LineasPedido> listaDetalle = (from pd in basedatos.LineasPedidos
                                                       where pd.IdPedido == p.Id
                                                       select pd).ToList();
                    foreach (LineasPedido l in listaDetalle)
                    {
                        PedidoDetalleProductoViewModel prod = new PedidoDetalleProductoViewModel();
                        prod.ImporteUnitario = l.ImporteUnitario;
                        prod.Cantidad = l.Cantidad;
                        var producto = basedatos.Productos.Single(p => p.Id == l.IdProducto);
                        prod.NombreProducto = producto.Nombre;
                        auxPedido.DetallesProductosPedido.Add(prod);
                    }
                    lista.Add(auxPedido);
                }
            }
            return lista;
        }
    }
}
