using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOfficeAndGitHub", policy =>
    {
        policy.WithOrigins(
            "https://dellasiegaexternal2.github.io",
            "https://outlook.office.com",
            "https://outlook.office365.com"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowOfficeAndGitHub");
app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/api/restore/{year}", (string year, ClaimsPrincipal user) =>
{
    var userEmail = user.FindFirst("preferred_username")?.Value ?? user.FindFirst(ClaimTypes.Name)?.Value ?? "inconnu";
    Console.WriteLine($"[AUDIT] Demande RESTORE {year} par {userEmail}");
    
    // TODO: Remplace par ton code PowerShell de montage PST
    return Results.Ok(new { message = $"PST {year} restauré pour {userEmail}" });
})
.RequireAuthorization();

app.Run();