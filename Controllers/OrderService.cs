using Microsoft.AspNetCore.Mvc;
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
    }
}




