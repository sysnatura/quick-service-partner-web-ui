(function() {
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            //// Core
            'app.core',

            'angAccordion',

            'remoteValidation',
            //// Navigation
            'app.navigation',

            //// Toolbar
            'app.toolbar',

            //// Quick Panel
            'app.quick-panel',

            // Sample
            'app.sample',

           // Administrator
           'app.administrator'
             
        ]);
})();