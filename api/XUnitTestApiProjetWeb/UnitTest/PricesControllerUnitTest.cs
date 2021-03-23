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
    public class PricesControllerUnitTest
    {
        private PricesController priceApi;
        private ProjectWebTest fakeDb;
        private string dbName = "priceDb";

        public PricesControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createProducts();
            fakeDb.createPrices();
            priceApi = new PricesController(fakeDb._contextMock);
        }

        [Fact]
        public async void GetPrices()
        {
            
            var response = await priceApi.GetPrices();

            response.Should().BeOfType<ActionResult<IEnumerable<Price>>>();
            response.Value.Should().HaveCount(3)
                .And.ContainItemsAssignableTo<Price>();
        }

        [Fact]
        public async void GetPricesWithID()
        {
            var response = await priceApi.GetPrice(1);

            response.Should().BeOfType<ActionResult<Price>>();
            response.Value.Should().NotBeNull();
            response.Value.PriceId.Should().Be(1);
        }

        [Fact]
        public async void PatchPrice()
        {
            Price price = fakeDb._contextMock.Prices.Find(1);
            fakeDb._contextMock.Entry(price).State = EntityState.Detached;
            Price newPrice = new Price
            {
                Amount = 876
            };

            var response = await priceApi.PatchPrice(1, newPrice);
            var okObject = response as OkObjectResult;
            var modPrice = okObject.Value as Price;

            response.Should().BeOfType<OkObjectResult>();
            okObject.Value.Should().NotBeNull();
            modPrice.Amount.Should().Be(876);

        }

        [Fact]
        public async void PostPrice()
        {
            var response = await priceApi.PostPrice(
                new Price() { PriceId = 66, Amount = 1, Source = "ghetto.com/test", ProductId = 1 });
            var val = response.Result as CreatedAtActionResult;
            Price price = val.Value as Price;

            response.Should().BeOfType<ActionResult<Price>>();
            val.Value.Should().NotBeNull();
            price.PriceId.Should().Be(66);
        }

        [Fact]
        public async void DeletePrice()
        {
            var response = await priceApi.DeletePrice(3);

            response.Should().BeOfType<ActionResult<Price>>();
            response.Value.Should().NotBeNull();
            response.Value.PriceId.Should().Be(3);
        }


    }
}
