using ChatBusinessLogic.BusinessLogic;
using ChatBusinessLogic.Model;
using ChatMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using static System.Net.Mime.MediaTypeNames;

namespace ChatMVC.Controllers
{
    public class ChatController : Controller
    {
        private readonly ILogger<ChatController> _logger;
        private int _UserID=0;

        public ChatController(ILogger<ChatController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(string user = "", int id = 0)
        {
            _UserID = id;
            AccountInfoModel info = new AccountInfoModel();
            ViewBag.UserID = id;
            info.UserID = id;
            AccountInfoBll account = new AccountInfoBll();
            var ct = account.AccountInfo(info);
            ViewBag.Name = ct.Name;

            ViewBag.Avatar = "/image/"+ ct.Avatar;

            ViewBag.UserName = user; 
            
            FriendModel friend = new FriendModel();
            friend.UserID = id;
            FriendsBll contact = new FriendsBll();
            var fr = contact.Friend(friend);
            ViewBag.Friend_Name = fr.Name;
            ViewBag.Friend_Avatar = fr.Avatar;
            ViewBag.Last_Message=fr.LastMessage;
            ViewBag.RelationshipID = fr.RelationshipID;

            return View("Index");
        }

        public ActionResult RelationShip(int relationshipid)
        {
            ListMessageModel ListMessage = new ListMessageModel();
            ListMessage.RelationshipID = relationshipid;
            ListMessageBll message = new ListMessageBll();
            var ms = message.ListMessage(ListMessage);
            return Json(new { Message = ms });
        }
        public void AddMessage(int relationship_id, string content_message, int userid)
        {
            AddMessageModel addModel = new AddMessageModel()
            {
                RelationshipID = relationship_id,
                Content = content_message,
                AuthorID = userid,
            };
            AddMessageBll add = new AddMessageBll();
            add.AddMessage(addModel);
        }
        public IActionResult Logout()
        {
            return RedirectToAction("Index", "Home");
        }
    }
}
