using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIG CORS : Accepte que GitHub Pages + Outlook appelle l'API
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

// 2. CONFIG SSO : Valide le token Azure AD
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowOfficeAndGitHub");
app.UseAuthentication();
app.UseAuthorization();

// 3. ENDPOINT PROTÉGÉ PAR SSO
app.MapPost("/api/restore/{year}", (string year, ClaimsPrincipal user) =>
{
    var userEmail = user.FindFirst("preferred_username")?.Value ?? "inconnu";
    Console.WriteLine($"[AUDIT] Demande RESTORE {year} par {userEmail}");
    
    // TODO: ICI  CODE POWERSHELL POUR MONTER LE PST
    return Results.Ok(new { message = $"PST {year} restauré pour {userEmail}" });
})
.RequireAuthorization();

app.Run();
