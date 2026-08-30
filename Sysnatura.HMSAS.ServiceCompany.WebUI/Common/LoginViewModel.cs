using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Linq;
using System.Web;


namespace Sysnatura.HMSAS.ServiceCompanay.WebUI.Common
{
   public class LoginViewModel
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
       public string Password { get; set; }
        public string DeviceDetail { get; set; }
    }

    public class HMSASCommon
    {
        public static string Url = ConfigurationManager.AppSettings["Url"];
    }
}