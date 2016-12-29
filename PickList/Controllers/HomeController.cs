using System.Collections.Generic;
using System.Web.Mvc;

namespace PickList.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Code()
        {
            return View();
        }

        public ActionResult Download()
        {
            return View();
        }

        public JsonResult GetList()
        {
            var data = getData();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<NameValuePair> getData()
        {
            var list = new List<NameValuePair>();

            list.Add(new NameValuePair { Value = "1", Text = "Mexican" });
            list.Add(new NameValuePair { Value = "2", Text = "Itialian" });
            list.Add(new NameValuePair { Value = "3", Text = "Tai" });
            list.Add(new NameValuePair { Value = "4", Text = "Japanese" });
            list.Add(new NameValuePair { Value = "5", Text = "Chinese" });
            list.Add(new NameValuePair { Value = "6", Text = "Indian" });
            list.Add(new NameValuePair { Value = "7", Text = "American" });
            list.Add(new NameValuePair { Value = "8", Text = "French" });
            
            return list;
        }

        private class NameValuePair
        {
            public string Value { get; set; }

            public string Text { get; set; }
        }
    }
}