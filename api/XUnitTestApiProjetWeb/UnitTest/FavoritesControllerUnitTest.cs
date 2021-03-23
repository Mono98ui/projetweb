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
    public class FavoritesControllerUnitTest
    {
        private FavoritesController favoriteApi;
        private ProjectWebTest fakeDb;
        private string dbName = "favDb";

        public FavoritesControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createRoles();
            fakeDb.createUsers();
            fakeDb.createProducts();
            fakeDb.createFavorites();
            favoriteApi = new FavoritesController(fakeDb._contextMock);
        }

        [Fact]
        public async void GetFavorites()
        {

            var response = await favoriteApi.GetFavorites();

            response.Should().BeOfType<ActionResult<IEnumerable<Favorite>>>();
            response.Value.Should().HaveCount(3)
                .And.ContainItemsAssignableTo<Favorite>();
        }

        [Fact]
        public async void GetFavoriteWithID()
        {
            var response = await favoriteApi.GetFavorite(1);

            var favList = response.Value as List<Favorite>;

            response.Should().BeOfType<ActionResult<IEnumerable<Favorite>>>();
            response.Value.Should().NotBeNull();
            favList[0].ProductId.Should().Be(3);
        }

        [Fact]
        public async void PostFavorite()
        {
            var response = await favoriteApi.PostFavorite(
                new Favorite() { UserId = 3, ProductId = 3 }
                );
            var val = response.Result as CreatedAtActionResult;
            Favorite fav = val.Value as Favorite;

            response.Should().BeOfType<ActionResult<Favorite>>();
            val.Value.Should().NotBeNull();
            fav.UserId.Should().Be(3);
            fav.ProductId.Should().Be(3);
        }

        [Fact]
        public async void DeleteFavorite()
        {
            Favorite fav = fakeDb._contextMock.Favorites.Find(3, 1);
            fakeDb._contextMock.Entry(fav).State = EntityState.Detached;
            var response = await favoriteApi.DeleteFavorite(3, 1);


            response.Should().BeOfType<ActionResult<Favorite>>();
            response.Value.Should().NotBeNull();
            response.Value.UserId.Should().Be(3);
        }
    }
}
