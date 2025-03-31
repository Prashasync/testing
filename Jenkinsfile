pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'  // Use Node.js 20+ for compatibility
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-credentials', 
                    url: 'https://github.com/Prashasync/testing.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install jest mocha cypress supertest mocha-junit-reporter jest-junit --save-dev'
            }
        }

        stage('Run Unit & Integration Tests') {
            steps {
                script {
                    try {
                        sh 'npm run test:unit'  
                        sh 'npm run test:integration'  
                    } catch (Exception e) {
                        echo 'Unit/Integration tests failed!'
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Run API Tests') {
            steps {
                script {
                    try {
                        sh 'npm run test:api'  
                    } catch (Exception e) {
                        echo 'API tests failed!'
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Run End-to-End Tests') {
            steps {
                script {
                    try {
                        sh 'npx cypress run --reporter junit --reporter-options mochaFile=test-results/cypress-[hash].xml'
                    } catch (Exception e) {
                        echo 'E2E tests failed!'
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }

    post {
        always {
            junit '**/test-results/*.xml'  
            archiveArtifacts artifacts: '**/test-results/**', fingerprint: true
        }
        failure {
            echo "Build failed! Check test results."
        }
    }
}
