using System.Web;
using System.Web.Mvc;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
