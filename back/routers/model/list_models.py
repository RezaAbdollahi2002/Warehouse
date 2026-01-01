from google import genai
 
client = genai.Client(api_key="GEMINI_API_KEY")  # <-- Replace this

models = client.models.list()

for m in models:
    print(m.name)