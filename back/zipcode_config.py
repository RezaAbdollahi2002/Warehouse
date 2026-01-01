import requests
from fastapi import HTTPException, status
import os
from dotenv import load_dotenv
load_dotenv()

def get_address(zipcode:str)->str:
    if not zipcode:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Empty zipcode.")
    country_code = "us"
    url = f"https://api.zippopotam.us/{country_code}/{zipcode}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return f"{data['places'][0]['place name']}, {data['places'][0]['state']}"
    else:
        print(f"Error: {response.status_code}")






