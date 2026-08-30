using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI.Models
{
    public class JsonResultHelper
    {
        public int ServiceCompanyId { get; set; }
        public int AddressId { get; set; }
        public int ContactId { get; set; }
        public int PlanId { get; set; }
        public string Name { get; set; }
        public byte RecordStatus { get; set; }
        public string Username { get; set; }
        public int AccountId { get; set; }
        public Nullable<int> LastPaymentId { get; set; }
        public byte PaymentStatus { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<System.DateTime> InitalPaymentDate { get; set; }


        public string Password { get; set; }
    }

    public class CompanyUsersDto
    {
        public int CompanyUsersId { get; set; }
        public int ServiceCompanyId { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public byte RoleType { get; set; }
        public string RoleTypeName { get; set; }
  
        public string Password { get; set; }
        public byte RecordStatus { get; set; }
        public virtual ServiceCompanyDto ServiceCompanyDto { get; set; }
    }
}