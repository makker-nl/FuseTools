# From: https://catalog.redhat.com/software/containers/fuse7/fuse-java-openshift-jdk11-rhel8/60891f51b6f68e29bbcc6cdb
FROM registry.redhat.io/fuse7/fuse-java-openshift-jdk11-rhel8:1.11-32.1658420909

USER jboss
WORKDIR /deployments
COPY --chown=jboss:jboss target/FuseTools-*.jar /deployments
EXPOSE 8080
