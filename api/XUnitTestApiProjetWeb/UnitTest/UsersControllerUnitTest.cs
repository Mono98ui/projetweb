using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PCPieceTracker.Controllers;
using PCPieceTracker.Models;
using System;
using System.Collections.Generic;
using Xunit;
using XUnitTestApiProjetWeb.Classes;

namespace XUnitTestApiProjetWeb.UnitTest
{
    public class UsersControllerUnitTest
    {
        private UsersController userApi;
        private ProjectWebTest fakeDb;
        private string dbName = "userDb";

        public UsersControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createRoles();
            fakeDb.createUsers();

            var builder = new ConfigurationBuilder()
           .AddJsonFile("appSettings.json");
            IConfiguration Configuration = builder.Build();

            userApi = new UsersController(fakeDb._contextMock, Configuration);
        }

        [Fact]
        public async void GetUsers()
        {

            var response = await userApi.GetUsers();

            response.Should().BeOfType<ActionResult<IEnumerable<User>>>();
            response.Value.Should().HaveCount(3)
                .And.ContainItemsAssignableTo<User>();
        }

        [Fact]
        public async void GetUserWithID()
        {
            var response = await userApi.GetUser(1);

            var okObject = response.Result as OkObjectResult;
            var modUser = okObject.Value as User;

            response.Should().BeOfType<ActionResult<User>>();
            modUser.Should().NotBeNull();
            modUser.UserId.Should().Be(1);
        }

        [Fact]
        public async void Authenticate()
        {
            var response = await userApi.GetUser(1);
            var okObject = response.Result as OkObjectResult;
            var user = okObject.Value as User;
            user.Password = "password";
            
            var responseAuth = await userApi.Authenticate(user);
            var okObjectAuth = responseAuth.Result as OkObjectResult;

            responseAuth.Should().BeOfType<ActionResult<User>>();

            foreach (var prop in okObjectAuth.Value.GetType().GetProperties())
            {
                var val = prop.GetValue(okObjectAuth.Value);
                val.Should().NotBeNull();

                if (prop.Name == "UserId")
                    val.Should().Be(1);
            }
        }

        [Fact]
        public async void PatchUser()
        {
            User user = fakeDb._contextMock.Users.Find(1);
            fakeDb._contextMock.Entry(user).State = EntityState.Detached;
            User newUser = new User
            {
                Username = "lol"
            };

            var response = await userApi.PatchUser(1, newUser);

            var okObject = response as OkObjectResult;
            var modUser = okObject.Value as User;

            response.Should().BeOfType<OkObjectResult>();
            modUser.Should().NotBeNull();
            modUser.Username.Should().Be("lol");

        }

        [Fact]
        public async void PostUser()
        {
            var response = await userApi.Register(
                new User() { UserId = 66, Username = "MonsterSlayer", Password = "banane123", FirstName = "Albert", LastName = "Leponge", Email = "catSlayer@hotnail.con", Role = 1 }
                );
            var val = response.Result as CreatedAtActionResult;
            User user = val.Value as User;

            response.Should().BeOfType<ActionResult<User>>();
            val.Value.Should().NotBeNull();
            user.UserId.Should().Be(66);
        }

        [Fact]
        public async void DeleteUser()
        {
            var response = await userApi.DeleteUser(3);

            response.Should().BeOfType<ActionResult<User>>();
            response.Value.Should().NotBeNull();
            response.Value.UserId.Should().Be(3);
        }
    }
}
