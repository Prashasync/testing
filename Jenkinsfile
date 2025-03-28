pipeline {
    agent any

    environment {
        DOCS_OUTPUT_DIR = "docs"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo.git'
            }
        }

        stage('Setup Python Environment') {
            steps {
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate'
                sh 'pip install mintlify'
            }
        }

        stage('Generate Documentation') {
            steps {
                sh 'mintlify generate --output $DOCS_OUTPUT_DIR'
            }
        }

        stage('Upload to S3 (Optional)') {
            steps {
                withAWS(credentials: 'aws-credentials-id') {
                    sh 'aws s3 sync $DOCS_OUTPUT_DIR s3://your-s3-bucket/docs'
                }
            }
        }

        stage('Deploy Documentation (Optional)') {
            steps {
                sh 'rsync -avz $DOCS_OUTPUT_DIR/ user@your-web-server:/var/www/docs/'
            }
        }
    }

    post {
        success {
            echo 'Documentation successfully generated and uploaded!'
        }
        failure {
            echo 'Documentation generation failed!'
        }
    }
}
