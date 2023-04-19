using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using RefsCor.Models;

namespace Refs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<DataBaseContext>(options => options.UseNpgsql(
                     builder.Configuration.GetConnectionString("DataBaseContext")));

            builder.Services.AddCors(c =>
                  c.AddPolicy("AllowOrigin"
                  , options => options
                  .AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  )
                );

//            builder.Services.AddControllersWithViews();

            builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
             options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
             ).AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()
             );

            var app = builder.Build();

            app.UseCors(options => options
                 .AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 );

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => 
              {
                endpoints.MapControllers();
              });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
                RequestPath = "/Photos"
            });

            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}