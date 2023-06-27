using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetCoreAngular.Modelos;
using NetCoreAngular.Servicios;
using System.Text;
using NLog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
string cors = "ConfigurarCors";
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: cors, builder =>
      {
          builder.WithMethods("*");
          builder.WithHeaders("*");
          builder.WithOrigins("*");
         
      });
});

builder.Services.AddScoped<IUsuarioAPI, UsuarioAPIServicio>();
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddNLog("nlog.config");
});
builder.Services.AddScoped<IProductos, ProductosServicio>();
builder.Services.AddScoped<ICliente, ClientesServicio>();


//JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:ClaveSecreta"]))
    };
});

builder.Services.AddNpgsql<CursoAngularNetCoreContext>(builder.Configuration.GetConnectionString("SQL"));
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(cors);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html"); ;

app.Run();
