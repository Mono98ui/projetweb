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
    public class ReviewsController : ControllerBase
    {
        private readonly ProjetWebContext _context;
        private const string strReviewId = "ReviewId";
        private const string strUserId = "UserId";
        private const string strProductId = "ProductId";

        public ReviewsController(ProjetWebContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews
                .Include(r => r.Product)
                .Include(r => r.User)
                .ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews
                .Include(r => r.Product)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.ReviewId == id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // Patch: api/Reviews/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPatch("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Review>> PatchReview(int id,Review review)
        {
            review.ReviewId = id;
            var tabProperties = _context.Entry(review).Properties;

            string ReviewId = review.GetType().GetProperty(strReviewId).Name;
            string UserId = review.GetType().GetProperty(strUserId).Name;
            string ProductId = review.GetType().GetProperty(strProductId).Name;

            foreach (var prop in tabProperties)
            {
                if (prop.Metadata.Name == ReviewId || prop.Metadata.Name == UserId || prop.Metadata.Name == ProductId)
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
                if (!ReviewExists(review.ReviewId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(review);
        }

        // POST: api/Reviews
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.ReviewId }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        [EnableCors("AllowMyOrigin")]
        public async Task<ActionResult<Review>> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return review;
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewId == id);
        }
    }
}
