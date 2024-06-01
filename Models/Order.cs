using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string Email { get; set; }
        public DateTime OrderDate { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
