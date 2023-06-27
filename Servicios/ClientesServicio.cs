using NetCoreAngular.Modelos;
using NetCoreAngular.Modelos.ViewModels;
using System.Text;

namespace NetCoreAngular.Servicios
{
    public class ClientesServicio : ICliente
    {
        private readonly IConfiguration configuration;

        public ClientesServicio(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public List<Cliente> DameClientes()
        {
            List<Cliente> lista;
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                lista = basedatos.Clientes.ToList();
            }

            return lista;
        }
        public void AgregarCliente(ClienteViewmodel c)
        {
            byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            Util util = new Util(keyBbyte);

            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {

                Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
                cliente.Nombre = c.nombre;
                cliente.Password = Encoding.ASCII.GetBytes(util.cifrar(c.pass, configuration["ClaveCifrado"]));
                basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                basedatos.SaveChanges();
            }
        }
        public void EditarCliente(ClienteViewmodel c)
        {
            byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            Util util = new Util(keyBbyte);

            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {

                Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
                cliente.Nombre = c.nombre;
                cliente.Password = Encoding.ASCII.GetBytes(util.cifrar(c.pass, configuration["ClaveCifrado"]));
                basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                basedatos.SaveChanges();
            }
        }
        public void BorrarCliente(String Email)
        {

            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == Email);
                cliente.FechaBaja = DateTime.Now;
                basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                basedatos.SaveChanges();
            }
        }
        public ClienteViewmodel Login(ClienteViewmodel c)
        {

            byte[] keyBbyte = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            Util util = new Util(keyBbyte);
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
                if (cliente == null ||
                c.pass != util.desCifrar(Encoding.ASCII.GetString(cliente.Password), configuration["ClaveCifrado"]))
                    throw new Exception("Error al inicar sesión");

            }

            return c;

        }

        public Cliente DameCliente(ClienteViewmodel c)
        {
            Cliente cliente;
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
            }

            return cliente;

        }
    }
}