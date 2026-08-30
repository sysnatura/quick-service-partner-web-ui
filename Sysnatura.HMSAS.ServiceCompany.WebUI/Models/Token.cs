using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sysnatura.HMSAS.ServiceCompanay.WebUI.Common;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI.Models
{
    public class Token
    {
        public int ServiceCompanyId { get; set; }
        public string Username { get; set; }
        public string TokenValue { get; set; }
        public DateTime Expiry { get; set; }
        public CompanyUsersDto CmpanyUsersDto { get; set; }
        public LoginViewModel LoginViewModel { get; set; }
        public byte Module { get; set; }
    }
}