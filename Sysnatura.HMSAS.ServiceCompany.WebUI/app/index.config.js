(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($translateProvider, blockUIConfig, $provide, uiGmapGoogleMapApiProvider,$httpProvider)
    {
         $httpProvider.interceptors.push('authInterceptorService');
        //, uiGmapGoogleMapApiProvider

      //  Google Map Configurations
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCAl-t_5yPp7NyYLwNjO8Ypzw1AU3RdrkQ',
            //v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'places,geometry,visualization'
        });

        // Text Angular options
        $provide.decorator('taOptions', [
            '$delegate', function (taOptions)
            {
                //taOptions.toolbar = [
                //    ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
                //];

                taOptions.toolbar = [
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                    ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                    ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
                    ['html', 'insertImage', 'insertLink', 'wordcount', 'charcount']
                ];

                taOptions.classes = {
                    focussed           : 'focussed',
                    toolbar            : 'ta-toolbar',
                    toolbarGroup       : 'ta-group',
                    toolbarButton      : 'md-button',
                    toolbarButtonActive: 'active',
                    disabled           : '',
                    textEditor         : 'form-control',
                    htmlEditor         : 'form-control'
                };

                return taOptions;
            }
        ]);

        // Text Angular tools
        $provide.decorator('taTools', [
            '$delegate', function (taTools)
            {
                taTools.quote.iconclass = 'icon-format-quote';
                taTools.bold.iconclass = 'icon-format-bold';
                taTools.italics.iconclass = 'icon-format-italic';
                taTools.underline.iconclass = 'icon-format-underline';
                taTools.strikeThrough.iconclass = 'icon-format-strikethrough';
                taTools.ul.iconclass = 'icon-format-list-bulleted';
                taTools.ol.iconclass = 'icon-format-list-numbers';
                taTools.redo.iconclass = 'icon-redo';
                taTools.undo.iconclass = 'icon-undo';
                taTools.clear.iconclass = 'icon-close-circle-outline';
                taTools.justifyLeft.iconclass = 'icon-format-align-left';
                taTools.justifyCenter.iconclass = 'icon-format-align-center';
                taTools.justifyRight.iconclass = 'icon-format-align-right';
                taTools.justifyFull.iconclass = 'icon-format-align-justify';
                taTools.indent.iconclass = 'icon-format-indent-increase';
                taTools.outdent.iconclass = 'icon-format-indent-decrease';
                taTools.html.iconclass = 'icon-code-tags';
                taTools.insertImage.iconclass = 'icon-file-image-box';
                taTools.insertLink.iconclass = 'icon-link';
                taTools.insertVideo.iconclass = 'icon-filmstrip';

                return taTools;
            }
        ]);
    
        //$provide.decorator('taOptions', ['$delegate', function(taOptions){
        //    // $delegate is the taOptions we are decorating
        //    // here we override the default toolbars and classes specified in taOptions.
        //    taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
        //    taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
        //    taOptions.toolbar = [
        //        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
        //        ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
        //        ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
        //        ['html', 'insertImage', 'insertLink', 'wordcount', 'charcount']
        //    ];
        //    taOptions.classes = {
        //        focussed: 'focussed',
        //        toolbar: 'btn-toolbar',
        //        toolbarGroup: 'btn-group',
        //        toolbarButton: 'btn btn-default',
        //        toolbarButtonActive: 'active',
        //        disabled: 'disabled',
        //        textEditor: 'form-control',
        //        htmlEditor: 'form-control'
        //    };
        //    return taOptions; // whatever you return will be the taOptions
        //}]);
        //// this demonstrates changing the classes of the icons for the tools for font-awesome v3.x
        //$provide.decorator('taTools', ['$delegate', function(taTools){
        //    taTools.bold.iconclass = 'icon-bold';
        //    taTools.italics.iconclass = 'icon-italic';
        //    taTools.underline.iconclass = 'icon-underline';
        //    taTools.ul.iconclass = 'icon-list-ul';
        //    taTools.ol.iconclass = 'icon-list-ol';
        //    taTools.undo.iconclass = 'icon-undo';
        //    taTools.redo.iconclass = 'icon-repeat';
        //    taTools.justifyLeft.iconclass = 'icon-align-left';
        //    taTools.justifyRight.iconclass = 'icon-align-right';
        //    taTools.justifyCenter.iconclass = 'icon-align-center';
        //    taTools.clear.iconclass = 'icon-ban-circle';
        //    taTools.insertLink.iconclass = 'icon-link';
        //    taTools.insertImage.iconclass = 'icon-picture';
        //    // there is no quote icon in old font-awesome so we change to text as follows
        //    delete taTools.quote.iconclass;
        //    taTools.quote.buttontext = 'quote';
        //    return taTools;

        //}]);
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        //block ui config section
        blockUIConfig.cssClass = 'block-ui my-custom-class';
        blockUIConfig.autoBlock = false;
        // Enable browser navigation blocking
        //blockUIConfig.blockBrowserNavigation = true;
    }

})();