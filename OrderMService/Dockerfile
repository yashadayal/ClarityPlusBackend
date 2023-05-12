FROM openjdk:17
COPY ./target/OrderMService-0.0.1-SNAPSHOT.jar ./
WORKDIR ./
EXPOSE 9001
ENTRYPOINT ["java", "-jar"]
CMD ["OrderMService-0.0.1-SNAPSHOT.jar"]
