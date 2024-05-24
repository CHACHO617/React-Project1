using Microsoft.AspNetCore.Mvc;
using React_Project1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace React_Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BurgerController : ControllerBase
    {
        private readonly BurgerService _burgerService;

        public BurgerController(BurgerService burgerService)
        {
            _burgerService = burgerService;
        }

        [HttpPost]
        [Route("prepare-burgers")]
        public async Task<IActionResult> PrepareBurgers([FromBody] Dictionary<string, int> burgersToPrepare)
        {
            var result = await _burgerService.PrepareBurgersAndUpdateInventory(burgersToPrepare);
            return Ok(result);
        }
    }
}
