# FuseTools

This application is primarly to serve the FuseToolsJS OracleJET application.
But can be expanded with REST services to serve serverside computations and handling. 

## Serve static content
The [FuseToolsJS](../FuseToolsJS/README.md) application is served within this application. During the maven build, the [FuseToolsJS web](../FuseToolsJS/src/main/resources) folder is copied to the [src/main/resources/web](src/main/resources/web) folder, which is in the [.gitignore](.gitignore) file.

To have this folder served by the HTTP server, the java class [StaticResourceConfiguration](src/main/java/nl/mio/tools/fusetools/StaticResourceConfiguration.java) adds this as a ResourceHandler to the registry. For more explanation see [baeldung.com: Serve Static Resources with Spring](https://www.baeldung.com/spring-mvc-static-resources)

## Build

Build the application with

    mvn clean package
    
Use the script [dckr_bld.sh](scripts/dckr_bld.sh) to build a Docker container.
Use the script [dckr_push.sh](scripts/dckr_push.sh) to tag and push it to Dockerhub. 
The script [dckr_env.sh](scripts/dckr_bld.sh) sets some environment variables to support these scripts. 

Use the yaml files to deploy the image to OpenShift. To deploy to Kubernetes an ingress and possibly a NodePort service need to be created to have it accessible.