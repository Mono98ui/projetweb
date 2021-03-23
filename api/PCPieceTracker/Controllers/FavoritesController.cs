using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCPieceTracker.Contexts;
using PCPieceTracker.Models;

namespace PCPieceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly ProjetWebContext _context;

        public FavoritesController(ProjetWebContext context)
        {
            _context = context;
        }

        // GET: api/Favorites
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
        {
            return await _context.Favorites
                .Include(f => f.User)
                .Include(f => f.Product)
                .ThenInclude(p => p.Prices)
                .Include(f => f.Product)
                .ThenInclude(p => p.Reviews)
                .ToListAsync();
        }

        // GET: api/Favorites/5
        [HttpGet("{user_id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorite(int user_id)
        { // NOTE: Cette route n'a pas vraiment de sens, étant donné qu'on ne va jamais afficher "un favoris". On peut afficher
          // une liste de favoris, et naviguer vers un produit, mais jamais le contraire.
          // TODO: Revoir l'implémentation de cette route.

            if (user_id == 0)
            {
                return NotFound();
            }
            var favorite = await _context.Favorites
               .Where(f => f.UserId == user_id)
               .Include(f => f.User)
               .Include(f => f.Product)
               .ThenInclude(p => p.Prices)
               .Include(f => f.Product)
               .ThenInclude(p => p.Reviews)
               .ToListAsync();

            if (favorite == null)
            {
                return NotFound();
            }

            return favorite;
        }

        // POST: api/Favorites
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Favorite>> PostFavorite(Favorite favorite)
        {
            try
            {
                if (FavoriteExists(favorite))
                {
                    return Conflict();
                }
                else
                {
                    _context.Favorites.Add(favorite);
                    await _context.SaveChangesAsync();
                }
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return CreatedAtAction(nameof(GetFavorite), new { user_id = favorite.UserId }, favorite);
        }

        // DELETE: api/Favorites/5/2/List 1
        [HttpDelete("{user_id}/{product_id}/{list_name}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Favorite>> DeleteFavorite(int user_id, int product_id, string list_name)
        {
            if (user_id == 0 || product_id == 0)
            {
                return NotFound();
            }

            var favorite = await _context.Favorites.SingleOrDefaultAsync(fav => fav.UserId == user_id && fav.ProductId == product_id && fav.ListName == list_name);

            if (favorite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return favorite;
        }

        private bool FavoriteExists(Favorite favCreate)
        {
            return _context.Favorites.Any(fav => fav.UserId == favCreate.UserId 
            && fav.ProductId == favCreate.ProductId
            && fav.ListName == favCreate.ListName);
        }
    }
}
