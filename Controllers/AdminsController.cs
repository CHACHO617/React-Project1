using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using React_Project1.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize] // Assuming you want authorization for the whole controller

    public class AdminsController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public AdminsController(IngWebProjectContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("ListaAdmins")]
        public async Task<IActionResult> Lista()
        {
            List<Admin> lista = await _dbcontext.Admins.ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);

        }

        
        [HttpPost]
        [Route("GuardarAdmins")]
        public async Task<IActionResult> Guardar([FromBody] Admin request)
        {
            await _dbcontext.Admins.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        [HttpPut]
        [Route("EditarAdmin")]
        public async Task<IActionResult> EditarAdmin([FromBody] Admin request)
        {
            _dbcontext.Admins.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("EliminarAdmin/{id:int}")]
        public async Task<IActionResult> EliminarAdmin(int id)
        {
            Admin Admin = _dbcontext.Admins.Find(id);

            _dbcontext.Admins.Remove(Admin);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPost]
        [Route("LoginAdmin")]
        public async Task<IActionResult> LoginAdmin([FromBody] Admin admin)
        {
            var adm = await _dbcontext.Admins.FirstOrDefaultAsync(a => a.IdentificacionAdmin == admin.IdentificacionAdmin && a.ContrasenaAdmin == admin.ContrasenaAdmin);

            if(adm == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid admin credentials");
            }
            else
            {
                Console.WriteLine(adm.IdentificacionAdmin + "-" + adm.ContrasenaAdmin);
            }

            var token = GenerateJwtToken(adm);

            return Ok(new {Token = token});

        }

        private string GenerateJwtToken(Admin user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {

                var key = Encoding.ASCII.GetBytes("8f6c3862c4acfdf4c3b4cfd9fac9a37ce61c28ef1f0e32b9342fa682256a6f8fb2"); // Replace "your-secret-key" with your actual secret key

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, user.IdAdmin.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30), // Token expiration time set to 30 minutes
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                /**/
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            catch (Exception ex)
            {
                throw;
            }


        }
    }
}



/*
namespace React_Project1.Controllers
{

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

            try
            {

                var key = Encoding.ASCII.GetBytes("8f6c3862c4acfdf4c3b4cfd9fac9a37ce61c28ef1f0e32b9342fa682256a6f8fb2"); // Replace "your-secret-key" with your actual secret key

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, user.IdUsuario.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30), // Token expiration time set to 30 minutes
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            catch (Exception ex)
            {
                throw;
            }


        }


    }
}*/
