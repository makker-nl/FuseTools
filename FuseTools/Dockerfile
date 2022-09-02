# From: https://catalog.redhat.com/software/containers/fuse7/fuse-java-openshift-jdk11-rhel8/60891f51b6f68e29bbcc6cdb
FROM hipdevcontainerregistry001.azurecr.io/fuse7/fuse-java-openshift-jdk11-rhel8 as fusetools
USER jboss
WORKDIR /deployments
COPY --chown=jboss:jboss target/FuseTools-*.jar /deployments
EXPOSE 8080
