stage('Run Integration Tests') {
    steps {
        script {
            if (fileExists('tests/integration')) {
                sh 'npm run test:integration'
            } else {
                echo 'Skipping integration tests: No test files found'
            }
        }
    }
}
