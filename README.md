# humblebrag
This is the humblebrag repo which accomplishes the following tasks:
1) Working Web Server
2) Working Back End
3) Working OCR

To configure web server: run npm start in terminal
To configure Flask Back End: run pip install -r requirements.txt in a virtual environment
Then, run the python file to start the back end.

Now, you can take a screenshot of a profile, drag it into the web server which then does OCR in the backend using GCP, which then gives it to Open AI to generate a response.

Note: Please generate a service account JSON file from GCP and asign the path to the credential path for the GCP credentials.
Note: Also remember to use the command export OPENAI_API_KEY="" and fill the quotes with your API key in the python terminal.

General overview: The humbleFront is the React Front end, the HumbleFlask is the flask backend.
