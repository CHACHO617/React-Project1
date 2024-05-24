using React_Project1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Project1.Controllers
{
    public class BurgerService
    {
        private readonly IInventarioService _inventarioService;

        public BurgerService(IInventarioService inventarioService)
        {
            _inventarioService = inventarioService;
        }

        public async Task<List<BurgerPreparationResult>> PrepareBurgersAndUpdateInventory(Dictionary<string, int> burgersToPrepare)
        {
            Console.WriteLine("ENTRO");
            var inventory1 = await _inventarioService.GetInventario1Async();
            foreach (var item in inventory1)
            {
                Console.WriteLine($"ID: {item.IdInventario1}, Name: {item.NombreIngrediente1}, Quantity: {item.CantidadIngrediente1}, Unit: {item.UnidadIngrediente1}");
            }
            Console.WriteLine(inventory1);
            var inventory2 = await _inventarioService.GetInventario2Async();

            var results = new List<BurgerPreparationResult>();

            var recipes = new List<Receta>
            {
                new Receta
                {
                    BurgerName = "Beef Burger",
                    IngredientsBurger = new List<Item>
                    {
                        new Item { NombreItem = "Pan", CantidadItem = 1 },
                        new Item { NombreItem = "Carne", CantidadItem = 2 }
                    }
                },
                new Receta
                {
                    BurgerName = "Chicken Burger",
                    IngredientsBurger = new List<Item>
                    {
                        new Item { NombreItem = "Pan", CantidadItem = 1 },
                        new Item { NombreItem = "Pollo", CantidadItem = 1 },
                        new Item { NombreItem = "Lechuga", CantidadItem = 2 }
                    }
                }
            };

            foreach (var burger in burgersToPrepare)
            {
                var recipe = recipes.FirstOrDefault(r => r.BurgerName == burger.Key);
                if (recipe != null)
                {
                    var result = PrepareBurger(burger.Key, inventory1, inventory2, recipe.IngredientsBurger, burger.Value);
                    results.Add(result);
                }
            }

            await _inventarioService.UpdateInventory1Async(inventory1);
            await _inventarioService.UpdateInventory2Async(inventory2);

            return results;
        }

        public BurgerPreparationResult PrepareBurger(string burgerName, List<Inventario1> inventory1, List<Inventario2> inventory2, List<Item> recipe, int burgersToPrepare)
        {
            int preparedFromInventory1 = 0;
            int preparedFromInventory2 = 0;

            for (int i = 0; i < burgersToPrepare; i++)
            {
                if (CanPrepareBurger1(inventory1, recipe))
                {
                    preparedFromInventory1++;
                    UpdateInventory1(inventory1, recipe);
                }
                else if (CanPrepareBurger2(inventory2, recipe))
                {
                    preparedFromInventory2++;
                    UpdateInventory2(inventory2, recipe);
                }
                else
                {
                    break;
                }
            }

            return new BurgerPreparationResult
            {
                BurgerName = burgerName,
                PreparedFromInventory1 = preparedFromInventory1,
                PreparedFromInventory2 = preparedFromInventory2,
                UnableToPrepare = burgersToPrepare - (preparedFromInventory1 + preparedFromInventory2)
            };
        }

        private bool CanPrepareBurger1(List<Inventario1> inventory, List<Item> recipe)
        {
            foreach (var item in recipe)
            {
                var invItem = inventory.FirstOrDefault(i => i.NombreIngrediente1 == item.NombreItem);
                if (invItem == null || invItem.CantidadIngrediente1 < item.CantidadItem)
                {
                    return false;
                }
            }
            return true;
        }

        private void UpdateInventory1(List<Inventario1> inventory, List<Item> recipe)
        {
            foreach (var item in recipe)
            {
                var invItem = inventory.FirstOrDefault(i => i.NombreIngrediente1 == item.NombreItem);
                if (invItem != null)
                {
                    invItem.CantidadIngrediente1 -= item.CantidadItem;
                }
            }
        }

        private bool CanPrepareBurger2(List<Inventario2> inventory, List<Item> recipe)
        {
            return recipe.All(item =>
            {
                var invItem = inventory.FirstOrDefault(i => i.NombreIngrediente2 == item.NombreItem);
                return invItem != null && invItem.CantidadIngrediente2 >= item.CantidadItem;
            });
        }

        private void UpdateInventory2(List<Inventario2> inventory, List<Item> recipe)
        {
            foreach (var item in recipe)
            {
                var invItem = inventory.FirstOrDefault(i => i.NombreIngrediente2 == item.NombreItem);
                if (invItem != null)
                {
                    invItem.CantidadIngrediente2 -= item.CantidadItem;
                }
            }
        }

    }
}
