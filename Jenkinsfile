pipeline {
    agent any
    
    stages {
        stage('Clean Workspace Cache') {
            steps {
                cleanWs()
	    }
        }
        stage('Git Cloning') {
            steps {
                git 'https://github.com/yashadayal/ClarityPlusPackage.git'
            }
        }
	stage('Unit Testing') {
            steps {
                script {
                    def microservices = ['OrderMService', 'RecipientMService']
                    for (folder in microservices) {
                        dir(folder) {
                            sh "/home/yasha/.sdkman/candidates/maven/current/bin/mvn clean test -DskipTests"
                        }
                    }
                }
            }
        }
        stage('Build Microservices Code') {
            steps {
                script {
                    def microservices = ['OrderMService', 'RecipientMService', 'apigateway', 'eurekaServer']
                    for (folder in microservices) {
                        dir(folder) {
                            sh "/home/yasha/.sdkman/candidates/maven/current/bin/mvn clean package -DskipTests"
                        }
                    }
                }
            }
        }
	stage('Build and Push Frontend Image') {
            steps {
                dir('Frontend') {
                    sh 'docker build -t frontend:5.0 .'
                }
		withDockerRegistry([credentialsId: "Docker", url: ""]) {
                    sh "docker push yasha145/claritypluspackage:5.0"
                }
            }
        }
        stage('Build and Push Backend Images') {
            steps {
                script {
                    def dockerImageNames = ['eurekaserver', 'apigateway', 'recipient', 'order']
                    def microservices = ['eurekaServer', 'apigateway', 'RecipientMService', 'OrderMService']
                    def imageTag = '1.0'
                    for (int i = 0; i < 4; i++) {
                        def imageName = 'yasha145/claritypluspackage'
                        dir(microservices[i])
                        {
                            echo "docker build -t ${dockerImageNames[i]}:${imageTag} ."
                            sh "docker build -t ${dockerImageNames[i]}:${imageTag}  ."
                            withDockerRegistry([credentialsId: "Docker", url: ""]) {
                                sh "docker push ${imageName}:${imageTag}"
                            }
                        }
                        imageTag = (imageTag.toDouble() + 1).toString()
                    }
                }
            }
        }
        stage('Ansible Deploy') {
		steps {
			 sh "ansible-playbook -i inventory ansible-playbook.yml"

		}
	}
    }
}

