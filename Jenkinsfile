pipeline {
    agent any

    environment {
        IMAGE_NAME = 'kshitijdock032/joke-genie'
        CONTAINER_NAME = 'jokegenie-container'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kshitij-y/Joke-Genie.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-cred1', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! The JokeGenie container is up and running at port 3000.'
        }

        failure {
            echo '❌ Deployment failed! Check the console output for errors in build, push, or run steps.'
        }

        always {
            echo '📦 CI/CD Pipeline execution completed.'
        }
    }
}
