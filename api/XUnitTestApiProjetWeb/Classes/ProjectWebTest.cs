using PCPieceTracker.Contexts;
using Microsoft.EntityFrameworkCore;
using PCPieceTracker.Models;
using System;
using System.Collections.Generic;

namespace XUnitTestApiProjetWeb.Classes
{
    public class ProjectWebTest
    {
        public ProjetWebContext _contextMock;

        public ProjectWebTest(string databaseName)
        {
          
            var options = new DbContextOptionsBuilder<ProjetWebContext>()
          .UseInMemoryDatabase(databaseName: databaseName)
          .Options;

            _contextMock = new ProjetWebContext(options);
            _contextMock.Database.EnsureDeleted();
            _contextMock.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        }


        public void createFavorites()
        {
            var favOne = new Favorite() { UserId = 1, ProductId = 3 };
            var favTwo = new Favorite() { UserId = 2, ProductId = 2 };
            var favThree = new Favorite() { UserId = 3, ProductId = 1 };

            _contextMock.Favorites.Add(favOne);
            _contextMock.Favorites.Add(favTwo);
            _contextMock.Favorites.Add(favThree);

            _contextMock.SaveChanges();

        }

        public void createReviews()
        {
            var reviewOne = new Review() { ReviewId = 1, Title = "Excellent", Rating = 2, Description = "J'aime les patates", ProductId = 2, UserId = 3 };
            var reviewTwo = new Review() { ReviewId = 2, Title = "Pas Bon", Rating = 2, Description = "J'aime pas les brocolis", ProductId = 2, UserId = 2 };
            var reviewThree = new Review() { ReviewId = 3, Title = "moyen", Rating = 2, Description = "Quest que la vie", ProductId = 2, UserId = 1 };

            _contextMock.Reviews.Add(reviewOne);
            _contextMock.Reviews.Add(reviewTwo);
            _contextMock.Reviews.Add(reviewThree);

            _contextMock.SaveChanges();

        }

        public void createProducts()
        {
            var productOne = new Product() { ProductId = 1, Description = "Nimporte quoi", Manufacturer = "Intello", Model = "Lacreme", Type = "GPU", Image ="http://Yolo.com" };
            var productTwo = new Product() { ProductId = 2, Description = "Je ne sais pas", Manufacturer = "Hein Tel", Model = "Lasoupe", Type = "GPU", Image = "http://Yolo.com" };
            var productThree = new Product() { ProductId = 3, Description = "La cerise sur le gateau", Manufacturer = "Tensen", Model = "Cheep", Type = "CPU", Image = "http://Yolo.com" };


            _contextMock.Products.Add(productOne);
            _contextMock.Products.Add(productTwo);
            _contextMock.Products.Add(productThree);

            _contextMock.SaveChanges();

        }

        public void createPrices()
        {
            var priceOne = new Price() { PriceId = 1, Amount = 999, Source = "example.com/test", ProductId = 3 };
            var priceTwo = new Price() { PriceId = 2, Amount = 99, Source = "example.ca/test", ProductId = 2 };
            var priceThree = new Price() { PriceId = 3, Amount = 9, Source = "example.qc.ca/test", ProductId = 1 };

            _contextMock.Prices.Add(priceOne);
            _contextMock.Prices.Add(priceTwo);
            _contextMock.Prices.Add(priceThree);

            _contextMock.SaveChanges();

        }

        public void createUsers()
        {
            var userOne = new User() { UserId = 1, Username = "MonsterSlayer", Password = "5f4dcc3b5aa765d61d8327deb882cf99", FirstName = "Albert", LastName = "Leponge", Email = "catSlayer@hotnail.con", Role = 1 };
            var userTwo = new User() { UserId = 2, Username = "Bomba", Password = "5f4dcc3b5aa765d61d8327deb882cf99", FirstName = "Bob", LastName = "Leponge", Email = "seaSlayer@hotnail.con", Role = 2 };
            var userThree = new User() { UserId = 3, Username = "Beetle", Password = "5f4dcc3b5aa765d61d8327deb882cf99", FirstName = "Charlie", LastName = "Leponge", Email = "wakandaSlayer@hotnail.con", Role = 2 };

            _contextMock.Users.Add(userOne);
            _contextMock.Users.Add(userTwo);
            _contextMock.Users.Add(userThree);

            _contextMock.SaveChanges();

        }

        public void createRoles()
        {
            var roleOne = new Role() { RoleId = 1, Title = "admin" };
            var roleTwo = new Role() { RoleId = 2, Title = "tourist" };

            _contextMock.Roles.Add(roleOne);
            _contextMock.Roles.Add(roleTwo);

            _contextMock.SaveChanges();

        }
    }
}
