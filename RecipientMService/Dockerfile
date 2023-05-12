FROM openjdk:17
COPY ./target/RecipientMService-0.0.1-SNAPSHOT.jar ./
WORKDIR ./
EXPOSE 9002
ENTRYPOINT ["java", "-jar"]
CMD ["RecipientMService-0.0.1-SNAPSHOT.jar"]
