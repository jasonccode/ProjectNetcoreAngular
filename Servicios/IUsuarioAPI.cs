using NetCoreAngular.Modelos.ViewModels;

namespace NetCoreAngular.Servicios
{
    public interface IUsuarioAPI
    {
        public UsuarioAPIViewModel Autenticacion(AuthAPI authAPI);
    }
}
