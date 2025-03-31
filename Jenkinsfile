pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20.9'
        git 'Default'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    try {
                        git credentialsId: 'github-credentials', url: 'https://github.com/Prashasync/testing.git', branch: 'main'
                    } catch (Exception e) {
                        echo 'WARNING: Git credentials not found! Using public access.'
                        git url: 'https://github.com/Prashasync/testing.git', branch: 'main'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm audit fix --force || true'
            }
        }

        stage('Run Unit & Integration Tests') {
            steps {
                script {
                    def unitTestPassed = true
                    try {
                        sh 'npm run test:unit'
                    } catch (Exception e) {
                        echo 'Unit tests failed!'
                        unitTestPassed = false
                    }

                    if (fileExists('tests/integration')) {
                        try {
                            sh 'npm run test:integration'
                        } catch (Exception e) {
                            echo 'Integration tests failed!'
                            unitTestPassed = false
                        }
                    } else {
                        echo 'Skipping Integration Tests: No test files found'
                    }

                    if (!unitTestPassed) {
                        error 'Unit or Integration tests failed. Stopping pipeline.'
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
                sh 'xvfb-run --auto-servernum npm run test:e2e'
            }
        }
    }

    post {
        always {
            echo 'Archiving test results and artifacts...'
            junit 'tests/results/*.xml'
            archiveArtifacts artifacts: 'tests/results/*.xml, coverage/**', fingerprint: true

            script {
                if (currentBuild.result == 'FAILURE') {
                    echo 'Build failed! Check test results.'
                }
            }
        }
    }
}
