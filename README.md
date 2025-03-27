# testing
testing for 


Step 5: Test the Deployment
Now that everything is deployed, push some API code to AWS CodeCommit.

Clone your AWS CodeCommit repository:

sh
Copy
Edit
git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/my-api-repo
cd my-api-repo
Create a simple API file:

sh
Copy
Edit
echo 'def get_users(): return "List of users"' > api.py
Commit and push the changes:

sh
Copy
Edit
git add api.py
git commit -m "Added API function"
git push origin main
7️⃣ Step 6: View Generated API Documentation
Once the commit is pushed: ✅ AWS EventBridge triggers Lambda.
✅ Lambda extracts API details and uploads api_documentation.json to S3.
✅ You can download/view the generated docs in AWS S3 Console.

