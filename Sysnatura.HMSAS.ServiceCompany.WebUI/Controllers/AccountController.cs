using System;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RestSharp;
using Sysnatura.HMSAS.ServiceCompanay.WebUI.Common;
using Sysnatura.HMSAS.ServiceCompanay.WebUI.Models;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI.Controllers
{
    public class AccountController:Controller
    {
        // GET: General/Account
        public ActionResult Login()
        {
            Session["currentServiceCompany"] = null;

            Session["loggedInServiceCompanyId"] = null;
            Session["loggedInServiceCompanyUserName"] = null;
            Session["token"] = null;
            return View();
        }
        //modified By:Anuja Joy-03-8-2017
        //for device datail
        [HttpPost]
        public ActionResult Login(LoginViewModel model)
        {

            model.DeviceDetail = "IP:" + Request.UserHostAddress + ",Browser:" + Request.Browser.Browser + ",BrowserType:" + Request.Browser.Type + "";
            //http://localhost:36365/
            ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;

            ViewBag.SomeMessage = "Invalid UserName or PassWord";
            var restClient = new RestClient(HMSASCommon.Url);
            var request = new RestRequest(Method.POST);
            request.RequestFormat = DataFormat.Json;
            var json = JsonConvert.SerializeObject(model);          
            request.AddParameter("application/json", json, ParameterType.RequestBody);
            request.Resource = "api/Account/ServiceCompanyLogin";

            var response = restClient.Execute<Token>(request);
            var jsonresult = JsonConvert.DeserializeObject<Token>(response.Content);

            if (response.Data != null && response.Data.ServiceCompanyId != 0)
            {


                Session["currentServiceCompanyUser"] = response.Data.CmpanyUsersDto;

                Session["loggedInServiceCompanyId"] = response.Data.ServiceCompanyId;
                Session["loggedInServiceCompanyUserName"] = response.Data.Username;   


                if (jsonresult != null)
                {
                    //  Session["empCode"] = jsonresult.JsonResultHelper.empCode;

                    Session["currentServiceCompanyUser"] = response.Data;
                    Session["token"] = jsonresult.TokenValue;
                    Session["loggedInServiceCompanyId"] = jsonresult.CmpanyUsersDto.ServiceCompanyId;
                    Session["loggedInServiceCompanyUserUsername"] = jsonresult.Username;

                    return RedirectToAction("Index", "Home");
                }

            }
            else
            {
                TempData["LoginMessage"] = "Invalid login credentials ";
                return RedirectToAction("Login", "Account", new { area = "General" });
            }


            return RedirectToAction("Login");

        }


        public ActionResult GetAllSessionValues()
        {

            dynamic obj = new ExpandoObject();

            if (Session["loggedInServiceCompanyId"] == null)
            {
                obj.serviceCompanyId = null;
            }
            else
            {

                obj.serviceCompanyId = Session["loggedInServiceCompanyId"].ToString();
                obj.username = Session["loggedInServiceCompanyUserUsername"].ToString();
                obj.token = Session["token"].ToString();
                obj.loggedInCompanyUser = Session["currentServiceCompanyUser"];
                obj.url = HMSASCommon.Url;

                //obj.userBId = Session["userBId"].ToString();
                //obj.type = Session["type"].ToString();
                //obj.empName = Session["empName"].ToString();
                //obj.moduleId = Session["moduleId"].ToString();
                //obj.empCode = Session["empCode"].ToString();
                //obj.empId = Session["empId"].ToString();
                //obj.empBId = Session["empBId"].ToString();
                //obj.token = Session["Token"].ToString();
            }
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            dynamic resultJson = JsonConvert.SerializeObject(obj, Formatting.None, settings);

            var jsonResult = new ContentResult
            {
                Content = resultJson,
                ContentType = "application/json"
            };
            return jsonResult;

        }


        public string GetSingle(string resourceMethod, string username, string password)
        {
            var restClient = new RestClient(ConfigurationManager.AppSettings["Url"] + "api/");
            var request = new RestRequest(Method.POST)
            {
                RequestFormat = DataFormat.Json,
                Resource = ConfigurationManager.AppSettings["Url"] + "api/" + "Account/Login/" + username + "/" + password
            };

            var response = restClient.Execute(request);
            return response.Content;
        }

        public string GetTocken()
        {
            //if (Session["token"] != null)
            //{
            //    var data = Session["token"].ToString();
            //    return data;
            //}
            //return "";

            return null;
        }

        public string GetloggedInUserId()
        {

            if (Session["loggedInUserId"] != null)
            {

                var data = Session["loggedInUserId"].ToString();
                return data;
            }
            return "";
        }
    }
}