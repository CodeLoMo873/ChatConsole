using ChatMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using ChatBusinessLogic.BusinessLogic;
using ChatBusinessLogic.Model;
using Newtonsoft.Json;

namespace ChatMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login(string name1, string pass)
        {
            LoginModel model = new LoginModel();
            model.UserName = name1;
            model.PassWord = pass;
            LoginBll chat = new LoginBll();
            var rs = chat.Login(model);
            if (rs.IsSuccess)
            {
                return RedirectToAction("Index", "Chat", new { user = name1 , id = rs.UserID});
            }
            else
            {
                ViewBag.ErrorMessage = "Invalid username or password";
                return View("Index"); 
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
