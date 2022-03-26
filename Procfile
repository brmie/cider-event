web: java $JAVA_OPTS -Dspring.profiles.active=prod -jar target/dependency/webapp-runner.jar --port $PORT target/*.war
JAVA_TOOL_OPTIONS: -Xmx300m -Xss512k -XX:CICompilerCount=2 -Dfile.encoding=UTF-8 
release: java -jar target/dependency/liquibase.jar --url=$JDBC_DATABASE_URL --classpath=target/dependency/postgres.jar update
