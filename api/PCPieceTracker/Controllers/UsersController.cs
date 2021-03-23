using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCPieceTracker.Models;
using PCPieceTracker.Contexts;
using Microsoft.AspNetCore.Cors;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace PCPieceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ProjetWebContext _context;
        private const string strUserId = "UserId";
        private const string strRole = "Role";
        private string secretKey;

        public UsersController(ProjetWebContext context, IConfiguration configuration)
        {
            _context = context;
            secretKey = configuration.GetValue<string>("secretKey");
        }

        // GET: api/Users
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users
                .Include(u => u.RoleNavigation)
                .Include(u => u.Favorites)
                .Include(u => u.Reviews)
                .ThenInclude(u => u.Product)
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.RoleNavigation)
                .Include(u => u.Favorites)
                .Include(u => u.Reviews)
                .ThenInclude(u => u.Product)
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // Patch: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<IActionResult> PatchUser(int id, User user)
        {
            user.UserId = id;
            var tabProperties = _context.Entry(user).Properties;

            string UserId = user.GetType().GetProperty(strUserId).Name;
            string Role = user.GetType().GetProperty(strRole).Name;

            foreach (var prop in tabProperties)
            {
                if (prop.Metadata.Name == UserId || prop.Metadata.Name == Role)
                    continue;

                if (prop.CurrentValue != null)
                    prop.IsModified = true;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.UserId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // POST: api/Users/auth
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("register")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<User>> Register(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // POST: api/Users/auth
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("auth")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<User>> Authenticate(User user)
        {
            User userVerified = await AuthenticateUserAsync(user);

            if (userVerified == null)
            {
                return NotFound();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);


            return Ok(new
            {
                UserId = userVerified.UserId,
                Username = userVerified.Username,
                Password = userVerified.Password,
                FirstName = userVerified.FirstName,
                LastName = userVerified.LastName,
                Email = userVerified.Email,
                Role = userVerified.Role,
                RoleNavigation = new
                {
                    RoleId = userVerified.RoleNavigation.RoleId,
                    Title = userVerified.RoleNavigation.Title
                },
                Favorites = userVerified.Favorites,
                Reviews = userVerified.Reviews,
                Token = tokenString
            });
        }

        private async Task<User> AuthenticateUserAsync(User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
                return null;

            var userVerified = await _context.Users
                .Include(u => u.RoleNavigation)
                .Include(u => u.Favorites)
                .Include(u => u.Reviews)
                .ThenInclude(u => u.Product)
                .FirstOrDefaultAsync(u => u.Username == user.Username);
            ;

            if (userVerified == null)
                return null;

            if (!IsPasswordCorrect(user.Password, userVerified.Password))
                return null;

            return userVerified;
        }

        private bool IsPasswordCorrect(string password, string passwordUser)
        {

            var pwdMd5 = EasyEncryption.MD5.ComputeMD5Hash(password);

            return pwdMd5 == passwordUser;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
