pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Prashasync/testing.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'sudo npm install'
            }
        }

        stage('Run Tests') {  // ✅ Stage must be inside `stages`
            steps {           // ✅ Steps must be inside `steps`
                sh 'sudo npm test'
            }
        }
    }
}
