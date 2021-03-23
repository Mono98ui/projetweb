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
    [Route("api/[controller]")]
    [ApiController]
    public class PricesController : ControllerBase
    {
        private readonly ProjetWebContext _context;
        private const string strPriceId = "PriceId";
        private const string strProductId = "ProductId";

        public PricesController(ProjetWebContext context)
        {
            _context = context;
        }

        // GET: api/Prices
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Price>>> GetPrices()
        {
            return await _context.Prices
                .Include(p => p.Product)
                .ToListAsync();
        }

        // GET: api/Prices/5
        [HttpGet("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Price>> GetPrice(int id)
        {
            var price = await _context.Prices
                .Include(p => p.Product)
                .FirstOrDefaultAsync(p => p.PriceId == id);

            if (price == null)
            {
                return NotFound();
            }

            return price;
        }

        // Patch: api/Prices/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<IActionResult> PatchPrice(int id, Price price)
        {

            price.PriceId = id;
            var tabProperties = _context.Entry(price).Properties;

            string PriceId = price.GetType().GetProperty(strPriceId).Name;
            string ProductId = price.GetType().GetProperty(strProductId).Name;

            foreach (var prop in tabProperties)
            {
                if (prop.Metadata.Name == PriceId  || prop.Metadata.Name == ProductId)
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
                if (!PriceExists(price.PriceId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(price);
        }

        // POST: api/Prices
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Price>> PostPrice(Price price)
        {
            _context.Prices.Add(price);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrice", new { id = price.PriceId }, price);
        }

        // DELETE: api/Prices/5
        [HttpDelete("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Price>> DeletePrice(int id)
        {
            var price = await _context.Prices.FindAsync(id);
            if (price == null)
            {
                return NotFound();
            }

            _context.Prices.Remove(price);
            await _context.SaveChangesAsync();

            return price;
        }

        private bool PriceExists(int id)
        {
            return _context.Prices.Any(e => e.PriceId == id);
        }
    }
}
