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
    public class ProductsController : ControllerBase
    {
        private readonly ProjetWebContext _context;
        private const string strProductId = "ProductId";

        public ProductsController(ProjetWebContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.Favorites)
                .Include(p => p.Prices)
                .Include(p => p.Reviews).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                 .Include(p => p.Favorites)
                 .Include(p => p.Prices)
                 .Include(p => p.Reviews)
                 .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // Patch: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<IActionResult> PacthProducts(int id, Product products)
        {
            products.ProductId = id;
            var tabProperties = _context.Entry(products).Properties;

            string ProductId = products.GetType().GetProperty(strProductId).Name;

            foreach (var prop in tabProperties)
            {
                if (prop.Metadata.Name == ProductId)
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
                if (!ProductsExists(products.ProductId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(products);
        }

        // POST: api/Products
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Product>> PostProducts(Product products)
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Product>> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();

            return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
