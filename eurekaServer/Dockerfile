FROM openjdk:17
COPY ./target/eurekaServer-0.0.1-SNAPSHOT.jar ./
WORKDIR ./
EXPOSE 8761
ENTRYPOINT ["java", "-jar"]
CMD ["eurekaServer-0.0.1-SNAPSHOT.jar"]
