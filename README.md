# Chat - AI Chatbot

A web-based conversational chatbot powered by OpenAI's GPT API. Simple, elegant, and easy to deploy.

## Features

- 🤖 Real-time conversation with AI
- 💬 Clean and modern UI
- 🔄 Conversation history tracking
- 🔁 Reset button to start fresh conversations
- 📱 Fully responsive design
- ⚡ Fast and lightweight

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI**: OpenAI GPT-3.5 Turbo API

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/harryonabanwo-afk/Chat.git
cd Chat
```

### 2. Create a virtual environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up environment variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
```

**Get your API key:**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy it and paste into your `.env` file

### 5. Run the application
```bash
python app.py
```

The application will start on `http://localhost:5000`

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Type your message in the input box
3. Click "Send" or press Enter
4. The AI will respond to your message
5. Use the "Reset" button to start a new conversation

## Project Structure

```
Chat/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── templates/
│   └── index.html        # Main HTML page
├── static/
│   ├── style.css         # Styling
│   └── script.js         # Frontend logic
└── README.md             # This file
```

## API Endpoints

- `GET /` - Serves the main chat interface
- `POST /chat` - Sends a message and gets a response
  - Body: `{ "message": "your message here" }`
  - Response: `{ "response": "bot response" }`
- `POST /reset` - Resets the conversation history
  - Response: `{ "message": "Conversation reset" }`

## Deployment

### Using Gunicorn (Production)
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Using Heroku
1. Create a `Procfile`:
```
web: gunicorn app:app
```

2. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

## Customization

### Change the AI Model
In `app.py`, modify the model in the `chat()` function:
```python
response = client.chat.completions.create(
    model='gpt-4',  # Change to gpt-4 for better quality
    messages=conversation_history,
    temperature=0.7,
    max_tokens=500
)
```

### Adjust Temperature and Max Tokens
- `temperature`: Controls randomness (0-1). Lower = more focused, Higher = more creative
- `max_tokens`: Maximum response length

## Troubleshooting

**"No API key provided"**
- Make sure your `.env` file is in the root directory
- Check that `OPENAI_API_KEY` is set correctly
- Restart the Flask server after updating `.env`

**"Module not found"**
- Make sure your virtual environment is activated
- Run `pip install -r requirements.txt` again

**Port 5000 already in use**
- Change the port in `app.py`: `app.run(debug=True, port=5001)`

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Feel free to fork, modify, and submit pull requests!

---

Happy chatting! 🚀
