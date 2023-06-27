using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NetCoreAngular.Modelos
{
    public partial class CursoAngularNetCoreContext : DbContext
    {
        public CursoAngularNetCoreContext()
        {
        }

        public CursoAngularNetCoreContext(DbContextOptions<CursoAngularNetCoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<LineasPedido> LineasPedidos { get; set; } = null!;
        public virtual DbSet<Pedido> Pedidos { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<UsuariosApi> UsuariosApis { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
              //  optionsBuilder.UseSqlServer(configuration.GetConnectionString("SQL"));
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("SQL"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("CLIENTES");

                entity.HasIndex(e => e.Email, "IX_CLIENTES")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaBaja).HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Password).HasMaxLength(500);
            });

            modelBuilder.Entity<LineasPedido>(entity =>
            {
                entity.ToTable("LINEAS_PEDIDOS");

                entity.Property(e => e.ImporteUnitario).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.IdPedidoNavigation)
                    .WithMany(p => p.LineasPedidos)
                    .HasForeignKey(d => d.IdPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LINEAS_PEDIDOS_PEDIDOS");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.LineasPedidos)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LINEAS_PEDIDOS_PRODUCTOS");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.ToTable("PEDIDOS");

                entity.Property(e => e.FechaPedido).HasColumnType("datetime");

                entity.Property(e => e.Total).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PEDIDOS_CLIENTES");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("PRODUCTOS");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<UsuariosApi>(entity =>
            {
                entity.ToTable("USUARIOS_API");

                entity.HasIndex(e => e.Email, "IX_USUARIOS_API")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaBaja).HasColumnType("datetime");

                entity.Property(e => e.Password).HasMaxLength(500);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
