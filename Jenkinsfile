pipeline {
    agent any

    environment {
        NODEJS_VERSION = "18"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test -- --coverage'
            }
        }

        stage('Run API Tests') {
            steps {
                sh 'npm run test:api'
            }
        }

        stage('Run End-to-End Tests') {
            steps {
                sh 'npx cypress run'
            }
        }

        stage('Generate Reports') {
            steps {
                sh 'npm run test:report'
            }
        }

        stage('Publish Allure Reports') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }

        stage('Archive Test Reports') {
            steps {
                archiveArtifacts artifacts: 'reports/**/*', fingerprint: true
            }
        }
    }
}
