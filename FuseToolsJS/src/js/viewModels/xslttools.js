/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils'
      , 'knockout'
      , 'ojs/ojbootstrap'
      , 'ojs/ojresponsiveutils'
      , 'ojs/ojresponsiveknockoututils'
      , 'ojs/ojknockout'
      , 'ojs/ojinputtext'
      , 'ojs/ojlabel'
      , 'ojs/ojformlayout'
      , 'ojs/ojbutton'
    ],
 function(accUtils, ko, Bootstrap, ResponsiveUtils, ResponsiveKnockoutUtils) {
    function XSLTToolsViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
          function replaceAll(text, findStr, replaceStr) {
              var result = text;
              while (result.indexOf(findStr) >= 0) {
                  result = result.replace(findStr, replaceStr);
              }
              return result;
          }
          function removeAllAttributeValues(text) {
              while (text.indexOf("=") >= 0) {
                  eqPos = text.indexOf("=");
                  nlPos = text.indexOf("\n", eqPos);
                  if (nlPos >= 0) {
                      text = text.substring(0, eqPos) + text.substring(nlPos);
                  } else {
                      text = text.substring(0, eqPos)
                  }
              }
              return text;
          }

          function getNamespaceExcludeList(namespaces) {
              var text = namespaces;
              text = replaceAll(text, "<xsl:stylesheet", "\n");
              text = replaceAll(text, ">", "\n");
              text = replaceAll(text, "xmlns:", "\n");
              text = replaceAll(text, "version=", "\n=");
              text = replaceAll(text, "exclude-result-prefixes=", "\n=");
              text = removeAllAttributeValues(text);
              text = replaceAll(text, "\r", "\n");
              text = replaceAll(text, "\n", " ");
              text = replaceAll(text, "\t", " ");
              text = replaceAll(text, "  ", " ");
              text = "exclude-result-prefixes=\"" + text.trim() + "\"";
              return text;
          }
          this.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(
            ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
          this.columns = ko.computed(function () {
              return this.isSmall() ? 1 : 3;
          }.bind(this));
          this.xslNamespaces = ko.observable('');
          this.rawXslNamespaces = ko.observable('');
          this.xslNamespaceExcludes = ko.observable('');
          this.rawXslNamespaceExcludes = ko.observable('');
          this.buttonClick = function (event, viewModel) {
              var excludeNamespaces = getNamespaceExcludeList(viewModel.xslNamespaces());
              viewModel.xslNamespaceExcludes(excludeNamespaces);
              return true;
          }.bind(this);
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('XSLTTools page loaded.', 'assertive');
        document.title = "XSLTTools";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return XSLTToolsViewModel;
  }
);
