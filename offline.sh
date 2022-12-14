set -e
mvn -v
mvn clean install
mvn archetype:generate -o -X -e -lrun-mvn-output.txt \
  -DarchetypeGroupId=org.apache.maven.archetypes  \
  -DgroupId=kotya0710.com.vk \
  -DartifactId=kotya0710.com.github \
  -DarchetypeArtifactId=maven-archetype-webapp
