set -e
mvn -v
mvn clean install
mvn archetype:generate -emp -ep -fn -q \
  -DarchetypeGroupId=org.apache.maven.archetypes  \
  -DgroupId=kotya0710.com.vk \
  -DartifactId=kotya0710.com.github \
  -DarchetypeArtifactId=maven-archetype-webapp
