import requests
from bs4 import BeautifulSoup

def fetch_website_text(url: str) -> str:
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup(["script", "style"]):
        tag.decompose()

    return soup.get_text(separator=" ", strip=True)
