web: java $JAVA_OPTS -Dspring.profiles.active=prod -jar target/dependency/webapp-runner.jar --port $PORT target/*.war
# release: java -jar target/dependency/liquibase.jar --url=$JDBC_DATABASE_URL --classpath=target/dependency/postgres.jar update
# release: ./mvnw liquibase:update

