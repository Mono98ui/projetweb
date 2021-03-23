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
    public class RolesControllerUnitTest
    {
        private RolesController roleApi;
        private ProjectWebTest fakeDb;
        private string dbName = "roleDb";

        public RolesControllerUnitTest()
        {
            fakeDb = new ProjectWebTest(dbName);
            fakeDb.createRoles();
            roleApi = new RolesController(fakeDb._contextMock);
        }

        [Fact]
        public async void GetRoles()
        {

            var response = await roleApi.GetRoles();

            response.Should().BeOfType<ActionResult<IEnumerable<Role>>>();
            response.Value.Should().HaveCount(2)
                .And.ContainItemsAssignableTo<Role>();
        }

        [Fact]
        public async void GetRoleWithID()
        {
            var response = await roleApi.GetRole(1);

            response.Should().BeOfType<ActionResult<Role>>();
            response.Value.Should().NotBeNull();
            response.Value.RoleId.Should().Be(1);
        }

        [Fact]
        public async void PatchRole()
        {
            Role role = fakeDb._contextMock.Roles.Find(1);
            fakeDb._contextMock.Entry(role).State = EntityState.Detached;
            Role newRole = new Role
            {
               Title = "admin"
            };

            var response = await roleApi.PatchRole(1, newRole);

            var okObject = response as OkObjectResult;
            var modRole = okObject.Value as Role;

            response.Should().BeOfType<OkObjectResult>();
            modRole.Should().NotBeNull();
            modRole.Title.Should().Be("admin");

        }

        [Fact]
        public async void PostRole()
        {
            var response = await roleApi.PostRole(
                new Role() { RoleId = 3, Title = "rejeter" }
                );
            var val = response.Result as CreatedAtActionResult;
            Role role = val.Value as Role;

            response.Should().BeOfType<ActionResult<Role>>();
            val.Value.Should().NotBeNull();
            role.RoleId.Should().Be(3);
        }

        [Fact]
        public async void DeleteRole()
        {
            var response = await roleApi.DeleteRole(2);

            response.Should().BeOfType<ActionResult<Role>>();
            response.Value.Should().NotBeNull();
            response.Value.RoleId.Should().Be(2);
        }
    }
}
