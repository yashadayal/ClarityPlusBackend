# Clarity Plus Package

## Problem Statement

The existing package management procedure within IIITB involves the delivery of shipments intended for students and professors to the reception area. At this point, an on-duty guard is tasked with manually recording the recipient's details in a register. Subsequently, upon receiving a courier, the designated recipient is required to provide their signature in the register, acknowledging the successful receipt of the package.

However, this seemingly straightforward process is marred by two fundamental challenges that significantly impact its efficiency and security. The primary challenge revolves around the authenticity of the recipient. The inherent risk of individuals falsifying signatures to claim packages not intended for them introduces a critical security vulnerability. Moreover, the second challenge pertains to the environmentally unsustainable consumption of paper resources due to the manual register-based documentation.

Addressing these issues is of paramount importance to ensure a seamless and secure package handling process within the college campus. The introduction of the "Clarity Plus Package" micro-services application marks a transformative step towards resolving these challenges effectively. By adopting this innovative platform, IIITB seeks to establish an advanced, secure, and eco-friendly approach to package management, ushering in an era of enhanced operational efficiency and reduced environmental impact.

## Technology Stack

- **Database**: MySQL
- **Back-end**: Java (Spring Boot - Microservices)
- **Front-end**: ReactJS
- **Continuous Development (SCM)**: GitHub
- **Continuous Build**: Maven
- **Package-management tool**: npm
- **Continuous Integration**: Jenkins
- **Containerization**: Docker and Docker Compose
- **Continuous Deployment**: Ansible
- **Monitoring**: Elasticsearch - Logstash - Kibana
- **IDE**: IntelliJ and VSCode

## Project Structure

The GitHub repository contains the following folders and files:

1. **Frontend**: Contains the source code of the frontend using ReactJS.
2. **OrderMService**: Contains the source code of the order microservice, responsible for managing and processing orders within the package handling workflow.
3. **RecipientMService**: Contains the source code of the recipient microservice, dedicated to managing recipient information and order details.
4. **apigateway**: Serves as the entry point for external clients to interact with the microservices.
5. **eurekaServer**: Eureka Spring Cloud facilitates micro-service discovery and registration.
6. **Jenkinsfile**: Contains the Jenkins pipeline script for CI/CD.
7. **WebHook Testing**: Used for GitHub webhook testing purposes.
8. **Ansible-Playbook**: Contains the tasks to be performed on the target machine.
9. **docker-compose file**: Defines services, networks, and volumes for Docker containerization.
10. **inventory**: Contains the IP address, location of the SSH private key, etc., of the target machine (in our case, an AWS EC2 instance).

## Installation

The installation process is simplified by using Docker containers. The Docker images include all configurations and dependencies required for the application. Therefore, there's no need for explicit installations.

## Usage

To run the project:

1. Make sure Docker is installed on your system.
2. Navigate to the project directory.
3. Run the command: `docker-compose up`

The project will start running with all necessary configurations.

## How It Works

1. Login as either a Guard or a Recipient.
2. After the recipient logs in, they can enter the details of the order they are about to deliver, which will be saved in the Recipient Database.
3. The guard will enter the details about the arrived parcel. (Steps 2 and 3 are independent and can be done in any order.)
4. The recipient will go to collect the parcel. An OTP will be sent to their email ID. On successful verification, the guard will hand over the parcel to the recipient.

## Contact

For any queries or support, please contact [yasha.dayal145@gmail.com](mailto:yasha.dayal145@gmail.com).
