using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Main_project
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure CORS policy to allow all origins, methods, and headers
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // Add MVC controllers
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Show developer exception page in development mode
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Serve static files
            app.UseStaticFiles();

            // Set up routing
            app.UseRouting();

            // Use CORS policy
            app.UseCors("AllowAllOrigins");

            // Enable authorization
            app.UseAuthorization();

            // Configure endpoints
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // Map controller routes
            });
        }
    }
}
