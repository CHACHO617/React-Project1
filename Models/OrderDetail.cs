using System.ComponentModel.DataAnnotations;

namespace React_Project1.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }
        public string BurgerName { get; set; }
        public int AmountOrdered { get; set; }
        public int PreparedFromInventory1 { get; set; }
        public int PreparedFromInventory2 { get; set; }
        public int UnableToPrepare { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
