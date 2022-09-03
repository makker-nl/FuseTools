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
         orclNSArray = ["http://www.oracle.com/XSL/Transform/java",
                        "http://www.oracle.com/xsl/mapper/schemas",
                        "http://www.oracle.com/XSL/Transform/java",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.adapter.socket.ProtocolTranslator",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.dvm.LookupValue",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.mediator.service.common.functions.MediatorExtnFunction",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.pc.services.functions.ExtFunc",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.pc.services.functions.Xpath20",
                        "http://www.oracle.com/XSL/Transform/java/oracle.tip.xref.xpath.XRefXPathFunctions"
        ];
 
      //
          function replaceAll(text, findStr, replaceStr) {
              var result = text;
              while (result.indexOf(findStr) >= 0) {
                  result = result.replace(findStr, replaceStr);
              }
              return result;
          }
      //
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
      //
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
      //          
          function stripStylesheetElt(stylesheetElt){
              text=stylesheetElt.trim();
              
              firstSpacePos = text.indexOf(" ");
              if (firstSpacePos>=0){
                 text = text.substring(firstSpacePos);
              }
              tagEndPos = text.indexOf(">");
              if (tagEndPos>=0){
                 text = text.substring(0, tagEndPos);
              }
              return text.trim();             
          }
      //          
          function getFirstAttribute(element){
              text = element.trim();
              attribute = "";
              eqPos = text.indexOf("=");
              if (eqPos >=0){
                  attributeName = text.substring(0,eqPos ).trim()
                  attributeValue = text.substring(eqPos + 1).trim()
                  quote=attributeValue.substring(0,1);
                  endPos = attributeValue.indexOf(quote, 1);
                  if (endPos < 0) {  
                      endPos = attributeValue.length;
                  }                      
                  attributeValue = attributeValue.substring(1, endPos);
                  attribute = attributeName + "=\"" + attributeValue +"\"";
              }
              return attribute;
          }
      //          
          function stripFirstAttribute(element){
              text = element.trim();
              attribute = "";
              eqPos = text.indexOf("=");
              if (eqPos >=0){
                  text = text.substring(eqPos + 1).trim()
                  quote=text.substring(0,1);
                  endPos = text.indexOf(quote, 1) +1;
                  if (endPos < 0) {
                      endPos = text.indexOf(">", eqPos);    
                      if (endPos < 0) {  
                          endPos = text.length;
                      }
                 }
                 text = text.substring(endPos);
              }
              return text.trim();
          }
      //          
          function extractNS(attribute){
              ns = attribute.trim();
              
                 eqPos = ns.indexOf("=");
                 if (eqPos >=0){
                     // Strip part until equal sign
                     ns = ns.substring (eqPos + 1).trim();
                 }
                 // Strip Quotes
                 ns=ns.substring (1, ns.length -1);
                 return ns.trim();              
          }
      //          
          function cleanNamespaceList(namespaces) {
              var text = namespaces.trim();
              const nsMap = new Map();
              var idx = 0;
              text = stripStylesheetElt(namespaces);
              // extract Namespace Attributes
              while (text.indexOf("=") >= 0) {
                attribute = getFirstAttribute(text);
                if (attribute.startsWith("xmlns:")) {
                  ns = extractNS(attribute);
                  if (!orclNSArray.includes(ns)) {
                    nsMap.set(idx++, attribute);
                  }
                } else {
                  if (!attribute.startsWith("exclude-result-prefixes")){
                    nsMap.set(idx++, attribute);
                  }
                }
                text = stripFirstAttribute(text);
              }
              // Build up stylesheet element
              text =  "<xsl:stylesheet\n" ;
              for (const [key, value] of nsMap) {
                text =  text +  nsMap.get(key)  +"\n";
              }
              excludeNsList = getNamespaceExcludeList(text);
              text = text + excludeNsList + ">\n";
              return text;
          }
          
          this.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(
            ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
          this.columns = ko.computed(function () {
              return this.isSmall() ? 1 : 3;
          }.bind(this));
          //
          this.xslNamespaces = ko.observable('');
          this.rawXslNamespaces = ko.observable('');
          this.xslResult = ko.observable('');
          this.rawXslNamespaceExcludes = ko.observable('');
          this.btnClkGetExclNSList = function (event, viewModel) {
              var excludeNamespaces = getNamespaceExcludeList(viewModel.xslNamespaces());
              viewModel.xslResult(excludeNamespaces);
              return true;
          }.bind(this);         
          this.btnClkCleanNSList = function (event, viewModel) {
              var cleanedNamespaceList = cleanNamespaceList(viewModel.xslNamespaces());
              viewModel.xslResult(cleanedNamespaceList);
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
