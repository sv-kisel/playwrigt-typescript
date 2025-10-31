pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.49.0-jammy'
      args '-u root' // run as root to install deps if needed
    }
  }

  environment {
    REPORT_PATH = 'playwright-report/results.json'
    REPORT_URL  = 'https://example.com/api/upload' // replace with your endpoint
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/sv-kisel/playwrigt-typescript'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test --reporter=list,json'
      }
    }

    stage('Upload JSON report') {
      steps {
        script {
          // check the file exists
          sh 'ls -lh playwright-report/'
          // send it to your API or Slack etc.
          sh '''
            if [ -f "${REPORT_PATH}" ]; then
              echo "Uploading Playwright JSON report..."
              curl -X POST \
                -H "Content-Type: application/json" \
                -d @"${REPORT_PATH}" \
                ${REPORT_URL}
            else
              echo "⚠️ JSON report not found at ${REPORT_PATH}"
              exit 1
            fi
          '''
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/results.json', fingerprint: true
    }
  }
}
