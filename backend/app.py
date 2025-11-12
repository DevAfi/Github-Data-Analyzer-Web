from flask import Flask, jsonify, request
from flask_cors import CORS
from services.analyzer import GitHubAnalyzer
from services.github_api import GitHubAPI

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        owner = data.get('owner')
        repo = data.get('repo')

        if not owner or not repo:
            return jsonify({'error': 'missing owner or repo'}), 400
        
        api = GitHubAPI(use_cache=True)
        analyzer = GitHubAnalyzer(api=api)

        results = analyzer.analyze_repository(owner, repo)

        print("Type of languages:", type(results['languages']))
        print("Languages data:", results['languages'])


        response = {
            'overview': {
                'name': results['overview'].name,
                'full_name': results['overview'].full_name,
                'description': results['overview'].description,
                'stars': results['overview'].stars,
                'forks': results['overview'].forks,
                'created_at': results['overview'].created_at.isoformat(),
                'updated_at': results['overview'].updated_at.isoformat(),
                'language': results['overview'].language
            },
            'commit_stats': {
                'total_commits': results['commit_stats'].total_commits,
                'commits_per_day': results['commit_stats'].commits_per_day,
                'most_active_day': results['commit_stats'].most_active_day,
                'most_active_hour': results['commit_stats'].most_active_hour
            },
            'contributors': [
                {
                    'login': c.login,
                    'contributions': c.contributions,
                    'percentage': c.percentage
                }
                for c in results['contributors']
            ],
            'languages': results['languages'],
            'health': {
                'activity_score': results['health'].activity_score,
                'contributor_score': results['health'].contributor_score,
                'documentation_score': results['health'].documentation_score,
                'overall_score': results['health'].overall_score,
                'rating': results['health'].rating
            }
        }
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
