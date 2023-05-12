FROM openjdk:17
COPY ./target/apigateway-0.0.1-SNAPSHOT.jar ./
WORKDIR ./
EXPOSE 9003
ENTRYPOINT ["java", "-jar"]
CMD ["apigateway-0.0.1-SNAPSHOT.jar"]
