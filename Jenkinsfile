pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20.9'  // Ensure correct Node.js version
        git 'git'  // Explicitly define Git tool
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/Prashasync/testing.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm audit fix --force'
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    try {
                        sh 'npm run test:unit'
                    } catch (Exception e) {
                        echo 'Unit tests failed!'
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                script {
                    if (fileExists('tests/integration')) {
                        try {
                            sh 'npm run test:integration'
                        } catch (Exception e) {
                            echo 'Integration tests failed!'
                            currentBuild.result = 'FAILURE'
                        }
                    } else {
                        echo 'Skipping Integration Tests: No test files found'
                    }
                }
            }
        }

        stage('Run API Tests') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                sh 'npm run test:api'
            }
        }

        stage('Run End-to-End Tests') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                sh 'npm run test:e2e'
            }
        }
    }

    post {
        always {
            echo 'Archiving test results and artifacts...'
            junit 'test-results/*.xml'
            archiveArtifacts artifacts: 'test-results/*.xml, coverage/**', fingerprint: true

            script {
                if (currentBuild.result == 'FAILURE') {
                    echo 'Build failed! Check test results.'
                }
            }
        }
    }
}
