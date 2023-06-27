using System.ComponentModel.DataAnnotations;

namespace NetCoreAngular.Modelos.ViewModels
{
    public class AuthAPI
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
