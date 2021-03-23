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
    public class ProductsControllerUnitTest
    {
        private ProductsController productApi;
        private ProjectWebTest fakeDb;
        private string dbName = "productDb";

        public ProductsControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createProducts();
            productApi = new ProductsController(fakeDb._contextMock);
        }

        [Fact]
        public async void GetProducts()
        {

            var response = await productApi.GetProducts();

            response.Should().BeOfType<ActionResult<IEnumerable<Product>>>();
            response.Value.Should().HaveCount(3)
                .And.ContainItemsAssignableTo<Product>();
        }

        [Fact]
        public async void GetProductsWithID()
        {
            var response = await productApi.GetProduct(1);

            response.Should().BeOfType<ActionResult<Product>>();
            response.Value.Should().NotBeNull();
            response.Value.ProductId.Should().Be(1);
        }

        [Fact]
        public async void PatchProduct()
        {
            Product product = fakeDb._contextMock.Products.Find(1);
            fakeDb._contextMock.Entry(product).State = EntityState.Detached;
            Product newProduct = new Product
            {
                Description = "Ceci est un test",
                Image = "http://jaimelespatatas.com"
            };

            var response = await productApi.PacthProducts(1, newProduct);
            var okObject = response as OkObjectResult;
            var modProduct = okObject.Value as Product;

            response.Should().BeOfType<OkObjectResult>();
            okObject.Value.Should().NotBeNull();
            modProduct.Description.Should().Be("Ceci est un test");
            modProduct.Image.Should().Be("http://jaimelespatatas.com");

        }

        [Fact]
        public async void PostProduct()
        {
            var response = await productApi.PostProducts(
                new Product() { ProductId = 66, Description = "La cerise sur le gateau", Manufacturer = "Tensen", Model = "Cheep", Type = "CPU" }
                );
            var val = response.Result as CreatedAtActionResult;
            Product product = val.Value as Product;

            response.Should().BeOfType<ActionResult<Product>>();
            val.Value.Should().NotBeNull();
            product.ProductId.Should().Be(66);
        }

        [Fact]
        public async void DeleteProduct()
        {
            var response = await productApi.DeleteProducts(3);

            response.Should().BeOfType<ActionResult<Product>>();
            response.Value.Should().NotBeNull();
            response.Value.ProductId.Should().Be(3);
        }
    }
}
