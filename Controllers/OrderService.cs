using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;
using System.Xml.Schema;

namespace React_Project1.Controllers
{
    public class OrderService
    {
        private readonly IngWebProjectContext _dbContext;

        public OrderService(IngWebProjectContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveOrderAsync(string email, List<BurgerPreparationResult> preparationResults)
        {
            var order = new Order
            {
                Email = email,
                OrderDate = DateTime.Now,
                OrderDetails = preparationResults.Select(pr => new OrderDetail
                {
                    BurgerName = pr.BurgerName,
                    AmountOrdered = pr.PreparedFromInventory1 + pr.PreparedFromInventory2,
                    PreparedFromInventory1 = pr.PreparedFromInventory1,
                    PreparedFromInventory2 = pr.PreparedFromInventory2,
                    UnableToPrepare = pr.UnableToPrepare
                }).ToList()
            };

            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<ResponseIngredient> GetMostUsedIngredientAsync(DateTime startDate, DateTime endDate)
        {
            var ingredientUsage = await _dbContext.OrderDetails
                .Where(od => od.Order.OrderDate >= startDate && od.Order.OrderDate <= endDate)
                .Join(_dbContext.Recipes, od => od.BurgerName, r => r.RecipeName, (od, r) => new { od, r })
                .SelectMany(
                    x => x.r.RecipeIngredients,
                    (x, ri) => new
                    {
                        ri.IngredientId,
                        IngredientName = ri.Ingredient.NombreIngrediente,
                        IngredientUnit = ri.Ingredient.UnidadIngrediente,
                        QuantityUsed = x.od.AmountOrdered * ri.CantidadItem
                    }
                )
                .GroupBy(x => new { x.IngredientId, x.IngredientName, x.IngredientUnit })
                .Select(g => new
                {
                    g.Key.IngredientId,
                    g.Key.IngredientName,
                    g.Key.IngredientUnit,
                    TotalQuantityUsed = g.Sum(x => x.QuantityUsed)
                })
                .OrderByDescending(x => x.TotalQuantityUsed)
                .FirstOrDefaultAsync();

            Console.WriteLine("INGREDIENTE---" + ingredientUsage);

            if (ingredientUsage == null)
                return null;

            /*return new Ingredient
            {
                IngredientId = ingredientUsage.IngredientId,
                NombreIngrediente = ingredientUsage.IngredientName,
                UnidadIngrediente = ingredientUsage.TotalQuantityUsed.ToString(),
            };*/
            return new ResponseIngredient
            {
                IngredientId = ingredientUsage.IngredientId,
                NombreIngrediente = ingredientUsage.IngredientName,
                CantidadUsadaIngrediente = ingredientUsage.TotalQuantityUsed,
            };

        }
    }
}




