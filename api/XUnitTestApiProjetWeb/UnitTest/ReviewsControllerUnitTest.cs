using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCPieceTracker.Controllers;
using PCPieceTracker.Models;
using System.Collections.Generic;
using Xunit;
using XUnitTestApiProjetWeb.Classes;

namespace XUnitTestApiProjetWeb.UnitTest
{
    public class ReviewsControllerUnitTest
    {
        private ReviewsController reviewApi;
        private ProjectWebTest fakeDb;
        private string dbName = "reviewDb";

        public ReviewsControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createUsers();
            fakeDb.createProducts();
            fakeDb.createReviews();
            reviewApi = new ReviewsController(fakeDb._contextMock);
        }

        [Fact]
        public async void GetReviews()
        {

            var response = await reviewApi.GetReviews();

            response.Should().BeOfType<ActionResult<IEnumerable<Review>>>();
            response.Value.Should().HaveCount(3)
                .And.ContainItemsAssignableTo<Review>();
        }

        [Fact]
        public async void GetReviewsWithID()
        {
            var response = await reviewApi.GetReview(1);

            response.Should().BeOfType<ActionResult<Review>>();
            response.Value.Should().NotBeNull();
            response.Value.ReviewId.Should().Be(1);
        }

        [Fact]
        public async void PatchReview()
        {
            Review review = fakeDb._contextMock.Reviews.Find(1);
            fakeDb._contextMock.Entry(review).State = EntityState.Detached;
            Review newReview = new Review
            {
               Title="Test"
            };

            var response = await reviewApi.PatchReview(1, newReview);

            var okObject = response.Result as OkObjectResult;
            var modReview = okObject.Value as Review;

            response.Result.Should().BeOfType<OkObjectResult>();
            modReview.Should().NotBeNull();
            modReview.Title.Should().Be("Test");

        }

        [Fact]
        public async void PostReview()
        {
            var response = await reviewApi.PostReview(
                new Review() { ReviewId = 66, Title = "Pas Bon", Rating = 2, Description = "J'aime pas les brocolis", ProductId = 2, UserId = 2 }
                );
            var val = response.Result as CreatedAtActionResult;
            Review review = val.Value as Review;

            response.Should().BeOfType<ActionResult<Review>>();
            val.Value.Should().NotBeNull();
            review.ReviewId.Should().Be(66);
        }

        [Fact]
        public async void DeleteReview()
        {
            var response = await reviewApi.DeleteReview(3);

            response.Should().BeOfType<ActionResult<Review>>();
            response.Value.Should().NotBeNull();
            response.Value.ReviewId.Should().Be(3);
        }
    }
}
