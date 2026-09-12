using System.Web;
using System.Web.Optimization;

namespace Sysnatura.HMSAS.ServiceCompanay.WebUI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-1.10.2.min"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            bundles.UseCdn = true;

            bundles.Add(new StyleBundle("~/Content/bootstrap", "https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css").Include(
                      "~/Content/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Styles/css").Include(
                    "~/assets/index.min.css",
                    "~/assets/custom-style.css",
                    "~/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css",
                    "~/bower_components/angular-xeditable/dist/css/xeditable.min.css",
                    "~/bower_components/angular-block-ui/angular-block-ui.min.css",
                    "~/bower_components/textAngular/dist/textAngular.min.css",
                    "~/bower_components/moment-picker/dist/angular-moment-picker.min.css",
                    "~/Content/DatePicker/font_family_Roboto.min.css",
                    "~/Content/DatePicker/material-datetimepicker.min.css",
                    "~/Content/angular-accordion-master/ang-accordion.min.css"                    
                ));

            bundles.Add(new ScriptBundle("~/BowerComponents/jquery", "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js").Include(
                "~/bower_components/jquery/dist/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularjs", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js").Include(
               "~/bower_components/angular/angular.min.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularAnimate", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min.js").Include(
                "~/bower_components/angular-animate/angular-animate.min.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularAria", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.min.js").Include(
               "~/bower_components/angular-aria/angular-aria.min.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularCookies", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-cookies.min.js").Include(
               "~/bower_components/angular-cookies/angular-cookies.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularSanitize", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-sanitize.min.js").Include(
               "~/bower_components/angular-sanitize/angular-sanitize.min.js"));

            bundles.Add(new ScriptBundle("~/BowerComponents/angularResource", "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-resource.min.js").Include(
              "~/bower_components/angular-resource/angular-resource.min.js"));

            bundles.Add(new ScriptBundle("~/Scripts/bower").Include(
                "~/bower_components/angular-messages/angular-messages.min.js",
                "~/bower_components/angular-material/angular-material.min.js",
                "~/bower_components/angular-translate/angular-translate.min.js",
                "~/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js",
                "~/bower_components/mobile-detect/mobile-detect.min.js",
                "~/bower_components/moment/moment.min.js",
                "~/bower_components/perfect-scrollbar/js/perfect-scrollbar.min.js",
                "~/bower_components/angular-xeditable/dist/js/xeditable.min.js",
                "~/bower_components/Sortable/Sortable.min.js",
                "~/bower_components/angular-filter/angular-filter.min.js",
                "~/bower_components/moment-picker/dist/angular-moment-picker.min.js",
                "~/bower_components/ng-flow/dist/ng-flow-standalone.min.js",
                "~/bower_components/flow.js/dist/flow.min.js",
                "~/bower_components/ng-flow/dist/ng-flow.min.js",
                "~/bower_components/angular-ui-sortable/sortable.min.js",
                "~/bower_components/datatables/media/js/jquery.dataTables.min.js",
                "~/bower_components/angular-datatables/dist/angular-datatables.min.js",
                "~/bower_components/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.min.js",
                "~/bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.min.js",
                "~/bower_components/angular-block-ui/angular-block-ui.min.js",
                "~/bower_components/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.min.js",
                "~/bower_components/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.min.js",
                "~/bower_components/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.min.js",
                "~/bower_components/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.min.js",
                "~/bower_components/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.min.js",
                "~/bower_components/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.min.js",
                "~/bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js",
                "~/bower_components/angular-datatables/dist/plugins/select/angular-datatables.select.min.js",
                "~/bower_components/datatables-responsive/js/dataTables.responsive.min.js",
                "~/bower_components/Sortable/ng-sortable.min.js",
                "~/bower_components/textAngular/dist/textAngular-rangy.min.js",
                "~/bower_components/textAngular/dist/textAngular-sanitize.min.js",
                "~/bower_components/textAngular/dist/textAngular.min.js",
                "~/bower_components/textAngular/dist/textAngularSetup.min.js",
                "~/bower_components/angular-datatables/dist/plugins/columnfilter/dataTables.columnFilter.min.js",
                "~/bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.min.js",
                "~/bower_components/LocalStorage/angular-local-storage.min.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/js").Include(
                    "~/Scripts/ngAutocomplete.min.js",
                    "~/Scripts/angularGoogleMaps/lodash.min.js",
                    "~/Scripts/angularGoogleMaps/angular-simple-logger.js",
                    "~/Scripts/angularGoogleMaps/angular-google-maps.min.js",
                    "~/Scripts/ngRemoteValidate.min.js",
                    "~/Scripts/angular-accordion-master/js/ang-accordion.min.js",
                    "~/Scripts/DatePicker/angular-material-datetimepicker.min.js",
                    "~/Scripts/DatePicker/beautifier.min.js",
                    "~/Scripts/imageUpload.min.js",
                    "~/Scripts/script.min.js",
                    "~/Scripts/jquery.countup/assets/countup/jquery.countup.min.js"                    
                ));

            bundles.Add(new ScriptBundle("~/Scripts/quick").Include(
                    "~/app/quick-panel/quick-panel.module.min.js",
                    "~/app/quick-panel/tabs/chat/chat-tab.controller.min.js",
                    "~/app/quick-panel/tabs/chat/services/chat-tab.service.min.js",
                    "~/app/quick-panel/quick-panel.controller.min.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/core").Include(
                    "~/app/core/core.module.min.js",
                    "~/app/core/directives/ms-widget/ms-widget.directive.min.js",
                    "~/app/core/directives/ms-timeline/ms-timeline.min.js",
                    "~/app/core/directives/ms-stepper/ms-stepper.directive.min.js",
                    "~/app/core/directives/ms-splash-screen/ms-splash-screen.directive.min.js",
                    "~/app/core/directives/ms-sidenav-helper/ms-sidenav-helper.directive.min.js",
                    "~/app/core/directives/ms-shortcuts/ms-shortcuts.directive.js",
                    "~/app/core/directives/ms-search-bar/ms-search-bar.directive.js",
                    "~/app/core/directives/ms-scroll/ms-scroll.directive.min.js",
                    "~/app/core/directives/ms-responsive-table/ms-responsive-table.directive.js",
                    "~/app/core/directives/ms-random-class/ms-random-class.directive.min.js",
                    "~/app/core/directives/ms-navigation/ms-navigation.directive.js",
                    "~/app/core/directives/ms-nav/ms-nav.directive.min.js",
                    "~/app/core/directives/ms-material-color-picker/ms-material-color-picker.directive.js",
                    "~/app/core/directives/ms-masonry/ms-masonry.directive.min.js",
                    "~/app/core/directives/ms-info-bar/ms-info-bar.directive.min.js",
                    "~/app/core/directives/ms-form-wizard/ms-form-wizard.directive.min.js",
                    "~/app/core/directives/ms-datepicker-fix/ms-datepicker-fix.directive.min.js",
                    "~/app/core/directives/ms-card/ms-card.directive.min.js",
                    "~/app/core/theming/fuse-theming.service.js",
                    "~/app/core/theming/fuse-theming.config.min.js",
                    "~/app/core/theming/fuse-themes.constant.js",
                    "~/app/core/theming/fuse-palettes.constant.min.js",
                    "~/app/core/theming/fuse-generator.service.js",
                    "~/app/core/theme-options/theme-options.directive.min.js",
                    "~/app/core/services/ms-utils.service.min.js",
                    "~/app/core/services/ms-api.provider.min.js",
                    "~/app/core/services/api-resolver.service.min.js",
                    "~/app/core/services/permissions.min.js",
                    "~/app/core/filters/tag.filter.min.js",
                    "~/app/core/filters/filterByPropIds.filter.min.js",
                    "~/app/core/filters/filterByIds.filter.min.js",
                    "~/app/core/filters/basic.filter.min.js",
                    "~/app/core/filters/altDate.filter.min.js",
                    "~/app/core/directives/highlight.directive.min.js",
                    "~/app/core/config/fuse-config.provider.min.js",
                    "~/app/core/core.run.min.js",
                    "~/app/core/core.config.min.js",
                    "~/app/core/directives/common.directive.min.js",                    
                    "~/app/core/directives/hasPermission.min.js",
                    "~/Scripts/passwordmatch/angular-input-match.min.js"
                ));

            bundles.Add(new ScriptBundle("~/Scripts/controller").Include(                    
                    "~/app/index.module.js",
                    "~/app/index.run.js",
                    "~/app/index.route.js",
                    "~/app/index.controller.js",
                    "~/app/index.constants.js",
                    "~/app/index.config.js",
                    "~/app/index.api.js",
                    "~/app/toolbar/toolbar.module.js",
                    "~/app/toolbar/toolbar.controller.js",
                    "~/app/navigation/navigation.module.js",
                    "~/app/navigation/navigation.controller.js",
                    "~/app/main/sample/sample.module.js",
                    "~/app/main/sample/sample.controller.js",
                    "~/app/main/main.controller.js",
                    "~/app/main/Administrator/administrator.module.js",
                    "~/app/main/Administrator/serviceOrderAssign/serviceOrderAssign.module.js",
                    "~/app/main/Administrator/serviceCompanyEmployee/serviceCompanyEmployee.module.js",
                    "~/app/main/Administrator/companyUser/companyUser.module.js",
                    "~/app/main/Administrator/customerList/customerList.module.js",
                    "~/app/main/Administrator/branch/branch.module.js",
                    "~/app/main/Administrator/branch/branch.module.js",
                    "~/app/main/Administrator/ServiceCompanyAttribute/serviceCompanyAttribute.module.js",
                    "~/app/main/Administrator/CompanyProfile/companyProfileModule.js",
                    "~/app/main/Administrator/Dashboard/dashboard.module.js"
                ));
            BundleTable.EnableOptimizations = false;
        }
    }
}
