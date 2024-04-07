using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace React_Project1.Controllers
{
    /*************************

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public AuthController(IngWebProjectContext context)
        {
            _dbcontext = context;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            try
            {
                var user = _dbcontext.Usuarios.FirstOrDefault(u => u.CorreoUsuario == usuario.CorreoUsuario && u.ContrasenaUsuario == usuario.ContrasenaUsuario);
                if (user != null)
                {
                    var token = GenerateJwtToken(usuario.CorreoUsuario);
                    return Ok(new { token });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"An error occurred during login: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred during login.");
            }
        }

        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("your_secret_key_here"); // Replace with your actual secret key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    ***********************/

    
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public UsuariosController(IngWebProjectContext context)
        {   
            _dbcontext = context;
        }

        [Authorize]
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Usuario> lista = await _dbcontext.Usuarios.ToListAsync();
        
            return StatusCode(StatusCodes.Status200OK, lista);
        
        }


        
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Usuario request)
        {
            await _dbcontext.Usuarios.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }



        [Authorize]
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Usuario request)
        {
            _dbcontext.Usuarios.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }



        [Authorize]
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Usuario usuario = _dbcontext.Usuarios.Find(id);

            _dbcontext.Usuarios.Remove(usuario);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            var user = await _dbcontext.Usuarios.FirstOrDefaultAsync(u => u.CorreoUsuario == usuario.CorreoUsuario && u.ContrasenaUsuario == usuario.ContrasenaUsuario);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid email or password");
            }
            else
            {
                Console.Write(user.CorreoUsuario + "-" + user.ContrasenaUsuario);
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            try {
                
                var key = Encoding.ASCII.GetBytes("8f6c3862c4acfdf4c3b4cfd9fac9a37ce61c28ef1f0e32b9342fa682256a6f8fb2"); // Replace "your-secret-key" with your actual secret key

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, user.IdUsuario.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(1), // Token expiration time set to 30 minutes
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                /**/
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            catch (Exception ex) {
                throw;
            }
            
            
        }


    }
}
