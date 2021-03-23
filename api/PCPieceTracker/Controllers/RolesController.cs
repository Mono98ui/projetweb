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

namespace PCPieceTracker.Controllers
{
    /*
     * Appears in database as ACL 
     */

    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ProjetWebContext _context;
        private const string strRoleId = "RoleId";

        public RolesController(ProjetWebContext context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _context.Roles
                 .Include(p => p.Users)
                 .ToListAsync();
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
            var role = await _context.Roles
                .Include(a => a.Users)
                .FirstOrDefaultAsync(a => a.RoleId == id);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // Patch: api/Roles/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<IActionResult> PatchRole(int id, Role role)
        {
            role.RoleId = id;
            var tabProperties = _context.Entry(role).Properties;

            string RoleId = role.GetType().GetProperty(strRoleId).Name;

            foreach (var prop in tabProperties)
            {
                if (prop.Metadata.Name == RoleId)
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
                if (!RoleExists(role.RoleId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(role);
        }

        // POST: api/Roles
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Role>> PostRole(Role acl)
        {
            _context.Roles.Add(acl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcl", new { id = acl.RoleId }, acl);
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Role>> DeleteRole(int id)
        {
            var acl = await _context.Roles.FindAsync(id);
            if (acl == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(acl);
            await _context.SaveChangesAsync();

            return acl;
        }

        private bool RoleExists(int id)
        {
            return _context.Roles.Any(e => e.RoleId == id);
        }
    }
}
