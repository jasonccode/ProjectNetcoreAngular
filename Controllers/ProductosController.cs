using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using NetCoreAngular.Modelos;
using NetCoreAngular.Modelos.ViewModels;
using NetCoreAngular.Servicios;

namespace NetCoreAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProductosController : ControllerBase
    {
        private IProductos productoServicio;
        private readonly ILogger<ProductosController> log;
        public ProductosController(IProductos productoServicio, ILogger<ProductosController> l)
        {
            this.productoServicio = productoServicio;
            this.log = l;
        }

        [HttpGet]
        public IActionResult DameProductos()
        {
            Resultado res = new Resultado();
            try
            {
                var lista = productoServicio.DameProductos();
                res.ObjetoGenerico = lista;

            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al obtener los libros " + ex.Message;
                log.LogError("Se produjo un error al obtener los libros " + ex.ToString());
            }

            return Ok(res);
        }

        [HttpPost]
        public IActionResult AgregarPedido(PedidoViewModel p)
        {
            Resultado res = new Resultado();

            try
            {
                productoServicio.AgregarPedido(p);

            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al realizar el pedido" + ex.Message;
                res.Texto = "Se produjo un error al realizar el pedido";
                log.LogError("Se produjo un error al realizar el pedido " + ex.ToString());
            }

            return Ok(res);
        }

        [HttpPost("Pedidos")]
        public IActionResult PedidosClientes(ClienteViewmodel c)
        {
            Resultado res = new Resultado();

            try
            {
                var lista = productoServicio.PedidosClientes(c);
                res.ObjetoGenerico = lista;
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al obtener pedidos del cliente" + ex.Message;
                res.Texto = "Se produjo un error al obtener pedidos del cliente";
                log.LogError("SSe produjo un error al obtener pedidos del cliente" + ex.ToString());
            }

            return Ok(res);
        }
    }
}
