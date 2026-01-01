import requests
import os
from dotenv import load_dotenv

load_dotenv()
url = "https://gemini-1-5-flash.p.rapidapi.com/"

headers = {
	"x-rapidapi-key": os.getenv("X_RAPIDAPI_KEY"), 
	"x-rapidapi-host": os.getenv("X_RAPIDAPI_BOT_HOST"), 
	"Content-Type": os.getenv("CONTENT_TYPE") 
}
def model(prompt:str)->str:
    payload = {
        "model": "gemini-1.5-flash",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }
    return requests.post(url,json=payload,headers=headers).json()

# Return address
def get_address(zipcode:str)->str:
    payload = {
        "model": "gemini-1.5-flash",
        "messages": [
            {
                "role": "user",
                "content": f"Give me the address of {zipcode} in the USA. You give me the address in this format. [Street Number] [Street Name] [Street Type] [Secondary Unit Designator (optional)]. [City], [State] [ZIP Code] "
            }
        ]
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()

        # Extract content from Gemini response
        content = data.get("choices", [])[0].get("message", {}).get("content", "").strip()

        return content if content else None

    except Exception as e:
        print("Gemini API error:", e)
        return None


