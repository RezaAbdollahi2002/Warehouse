import requests

zip_code = "90210"
country_code = "us"  # US ZIP code

url = f"https://api.zippopotam.us/{country_code}/{zip_code}"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print(f"ZIP Code: {zip_code}")
    print(f"Country: {data['country']}")
    print(f"State: {data['places'][0]['state']}")
    print(f"City: {data['places'][0]['place name']}")
    print(f"Latitude: {data['places'][0]['latitude']}")
    print(f"Longitude: {data['places'][0]['longitude']}")
else:
    print(f"Error: {response.status_code}")
