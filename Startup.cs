using System.Collections.Generic;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.ResponseCompression;

using NLog.Extensions.Logging;
using NLog.Web;

using SMS.Persistence;
using SMS.Persistence.Repositories;


//    ResponseCompression

namespace SMS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<ISampleRespository, SamplesRepository>();
            services.AddTransient<IAnimalRepository, AnimalRepository>();
            services.AddDbContext<PostgresqlContext>(o => o.UseNpgsql(Configuration.GetConnectionString("PostgreSQL")));

            services.AddDistributedMemoryCache();
            services.AddSession();
            services.AddMvc();
            services.AddResponseCompression();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddNLog();
            app.AddNLogWeb();
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            env.ConfigureNLog("nlog.Config");

            env.EnvironmentName = EnvironmentName.Development;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    HotModuleReplacementClientOptions = new Dictionary<string, string>
                    {
                        {"reload", "true"},
                        {"overlay", "true"}
                    },
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
             
            app.UseSession();
            app.UseResponseCompression();
            
            app.UseStaticFiles(new StaticFileOptions {
                OnPrepareResponse = content =>
                {
                    if(content.File.Name.EndsWith(".js.gz"))
                    {
                        content.Context.Response.Headers["Content-Type"] = "text/javascript";
                        content.Context.Response.Headers["Content-Encoding"] = "gzip";
                    }
                }
            });
           
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Home", action = "Index"});
            });
            
        }
    }
}