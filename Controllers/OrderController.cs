using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project1.Models;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IngWebProjectContext _dbcontext;

        public OrderController(IngWebProjectContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllOrders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            return await _dbcontext.Orders.ToListAsync();
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrderId/{id:int}")]
        public async Task<ActionResult<Order>> GetOrderId(int id)
        {
            var order = await _dbcontext.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [Authorize]
        [HttpGet]
        [Route("GetAllOrderDetails")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAllOrderDetails()
        {
            return await _dbcontext.OrderDetails.ToListAsync();
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrderDetailId/{id:int}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetailId(int id)
        {
            var order = await _dbcontext.OrderDetails.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [Authorize]
        [HttpGet]
        [Route("GetOrderDetailsByOrderId/{orderId:int}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetailsByOrderId(int orderId)
        {
            var orderDetails = await _dbcontext.OrderDetails
                                                .Where(od => od.OrderId == orderId)
                                                .ToListAsync();

            if (orderDetails == null || !orderDetails.Any())
            {
                return NotFound("No order details found for the specified order ID.");
            }

            return orderDetails;
        }


    }
}
