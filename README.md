Step 1: Set Up Jenkins on an Open-Source Server
Option 1: Install Jenkins on an EC2/Ubuntu Server
1️⃣ Connect to your server via SSH:

sh
Copy
Edit
ssh -i your-key.pem user@your-server-ip
2️⃣ Install Java and Jenkins:

sh
Copy
Edit
sudo apt update && sudo apt install -y openjdk-11-jdk wget
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
echo "deb http://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list
sudo apt update && sudo apt install -y jenkins
3️⃣ Start and enable Jenkins:

sh
Copy
Edit
sudo systemctl start jenkins
sudo systemctl enable jenkins
4️⃣ Get Jenkins initial password:

sh
Copy
Edit
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
5️⃣ Open Jenkins UI at http://<server-ip>:8080 and complete the setup.

🚀 Step 2: Install Required Jenkins Plugins
Go to Manage Jenkins → Plugins and install:
✅ Pipeline
✅ Git (for GitHub/GitLab integration)
✅ NodeJS (for running Jest, Cypress)
✅ Allure Reports (for test reporting)
✅ Docker Pipeline (if running tests in Docker)

🚀 Step 3: Configure GitHub/GitLab Repository
1️⃣ In Jenkins → Manage Jenkins → Manage Credentials, add:

GitHub Personal Access Token (if using GitHub)

GitLab CI/CD Token (if using GitLab)
2️⃣ Configure the Jenkins Job:

Go to Jenkins Dashboard → New Item → Pipeline

Select Pipeline and click OK

🚀 Step 4: Install and Configure Testing Frameworks
Run these commands on your Jenkins server:

sh
Copy
Edit
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Jest, Cypress, Mocha, and Supertest
npm install -g jest mocha chai cypress supertest
🚀 Step 5: Create Jenkins Pipeline for Automated Testing
1️⃣ Go to Jenkins → Pipeline → Configure
2️⃣ Select "Pipeline Script from SCM" and enter your repo URL
3️⃣ Add a Jenkinsfile to your repository:

📌 Example Jenkinsfile for Running Tests in Jenkins:

groovy
Copy
Edit
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
🚀 Step 6: Run and Monitor the Pipeline
1️⃣ Save the Jenkins job
2️⃣ Click Build Now
3️⃣ Check the Console Output for test results

🚀 Step 7: Optional - Run Tests in Docker
To ensure a clean test environment, run tests inside a Docker container.

1️⃣ Install Docker on Jenkins Server:

sh
Copy
Edit
sudo apt install -y docker.io
sudo usermod -aG docker jenkins
2️⃣ Update the Jenkinsfile:

groovy
Copy
Edit
stage('Run Tests in Docker') {
    steps {
        sh '''
        docker run --rm -v $(pwd):/app -w /app node:18 bash -c "
            npm install
            npm test
        "
        '''
    }
}
🚀 Step 8: Enhance with Slack Notifications
Send test results to Slack: 1️⃣ Install Slack Notification Plugin in Jenkins
2️⃣ Generate a Slack Webhook URL
3️⃣ Add this to your Jenkinsfile:

groovy
Copy
Edit
post {
    always {
        slackSend channel: '#test-reports', message: "Test execution completed: ${currentBuild.result}"
    }
}
🚀 Step 9: Visualize Test Reports
1. Enable Allure Reports in Jenkins
Go to Manage Jenkins → Configure System → Allure Report

Set the Path to allure-results/

Add allure command in the pipeline:

sh
Copy
Edit
npm run test:report
2. Generate HTML Test Reports
Use mochawesome for Mocha:

sh
Copy
Edit
npm install --save-dev mochawesome
Run tests and generate HTML reports:

sh
Copy
Edit
mocha --reporter mochawesome
🎯 Final Workflow Overview
1️⃣ Developer pushes code to GitHub/GitLab
2️⃣ Jenkins pulls the latest code
3️⃣ Runs unit tests (Jest/Mocha)
4️⃣ Runs API tests (Supertest/Postman)
5️⃣ Runs end-to-end tests (Cypress/Selenium)
6️⃣ Generates Allure/Mochawesome reports
7️⃣ Notifies team via Slack
8️⃣ (Optional) Uploads reports to an open-source dashboard

