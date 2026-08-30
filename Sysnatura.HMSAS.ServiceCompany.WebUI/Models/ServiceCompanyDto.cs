using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI.Models
{
    public class ServiceCompanyDto
    {

        public int ServiceCompanyId { get; set; }
        public int PlanId { get; set; }
        public string Name { get; set; }
        public byte RecordStatus { get; set; }
        public string Username { get; set; }
        public int AccountId { get; set; }
        public Nullable<int> LastPaymentId { get; set; }
        public byte PaymentStatus { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<System.DateTime> InitalPaymentDate { get; set; }
        public int CompanyCount { get; set; }
        public bool IsRealEstate { get; set; }
        public int? RealEstateId { get; set; }
    }
}