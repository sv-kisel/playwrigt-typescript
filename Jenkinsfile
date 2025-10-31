pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.49.0-jammy'
            args '-u root'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sv-kisel/playwrigt-typescript'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci && npx playwright install --with-deps'
            }
        }

        stage('Run Playwright tests') {
            steps {
                // even if tests fail, pipeline continues
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npx playwright test --reporter=json'
                }
            }
        }

        stage('Upload JSON Report') {
            when {
                expression { true } // always run this stage
            }
            steps {
                script {
                    sh '''
                        echo "🔍 Searching for Playwright JSON report..."
                        REPORT_PATH=$(find . -name "results.json" | head -n 1)
                        if [ -n "$REPORT_PATH" ]; then
                            echo "📤 Uploading Playwright JSON report: $REPORT_PATH"
                            curl -X POST "http://host.docker.internal:3001/api/v1/json-report/upload" \
                                -H "Authorization: " \
                                -F "report=@$REPORT_PATH;type=application/json" \
                                -F "projectId=1782448e-f065-4e08-a179-f013dd24f6b9"
                        else
                            echo "⚠️ No JSON report found for upload"
                        fi
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "📦 Archiving Playwright JSON results..."
            archiveArtifacts artifacts: '**/results.json', fingerprint: true
        }
    }
}
