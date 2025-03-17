import os
import json
import time
import requests
import argparse
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from urllib.parse import urlencode
from selenium.common.exceptions import TimeoutException

class AirbnbScraper:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.base_url = "https://www.airbnb.com/s/"
        self.detailed_url = "https://www.airbnb.com/rooms/"
        self.backend_url = "http://localhost:8000/api/add_listing/"
    
    def __del__(self):
        if hasattr(self, 'driver'):
            self.driver.quit()
    
    def format_date(self, date_str):
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return date_obj.strftime("%Y-%m-%d")
    
    def build_search_url(self, location, checkin, checkout, guests):
        params = {
            "query": location,
            "checkin": self.format_date(checkin),
            "checkout": self.format_date(checkout),
            "adults": guests,
            "source": "structured_search_input_header",
            "locale": "en"
        }
        return f"{self.base_url}{location.replace(' ', '-')}?{urlencode(params, doseq=True)}"
    
    def extract_listing_ids(self, soup):
        listing_ids = []
        try:
            listing_elements = soup.select('div[data-testid="card-container"]')
            for element in listing_elements:
                link_element = element.select_one('a[href*="/rooms/"]')
                if link_element and 'href' in link_element.attrs:
                    url = link_element['href']
                    listing_id = url.split('/rooms/')[1].split('?')[0]
                    listing_ids.append(listing_id)
        except Exception as e:
            print(f"Error extracting listing IDs: {e}")
        
        return listing_ids
    
    def extract_listing_details(self, listing_id, checkin, checkout, guests):
        url = f"{self.detailed_url}{listing_id}?checkin={checkin}&checkout={checkout}&adults={guests}"
        try:
            self.driver.get(url)
            WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located((By.TAG_NAME, "h1"))
            )
            time.sleep(5)
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            title = soup.select_one('h1').text.strip() if soup.select_one('h1') else ""
            price_element = soup.select_one('span[data-testid="price"]')
            price_text = price_element.text.strip() if price_element else ""
            import re
            price_match = re.search(r'([^\d]*)(\d+)', price_text)
            currency = price_match.group(1).strip() if price_match else "$"
            price_per_night = float(price_match.group(2)) if price_match else 0
            beds = soup.select_one('span[data-testid="bed-detail"]')
            bedrooms = soup.select_one('span[data-testid="bedroom-detail"]')
            bathrooms = soup.select_one('span[data-testid="bathroom-detail"]')
            rating = soup.select_one('span[data-testid="rating"]')
            reviews = soup.select_one('span[data-testid="review-count"]')
            host_name = soup.select_one('span[data-testid="host-name"]')
            host_link = soup.select_one('a[data-testid="host-profile-link"]')
            listing_data = {
                "title": title,
                "price_per_night": price_per_night,
                "currency": currency,
                "beds": beds.text.strip() if beds else "",
                "bedrooms": bedrooms.text.strip() if bedrooms else "",
                "bathrooms": bathrooms.text.strip() if bathrooms else "",
                "rating": rating.text.strip() if rating else "",
                "reviews": reviews.text.strip() if reviews else "",
                "host_name": host_name.text.strip() if host_name else "",
                "host_link": f"https://www.airbnb.com{host_link['href']}" if host_link else "",
                "url": url
            }
            return listing_data
        except Exception as e:
            print(f"Error extracting details for listing {listing_id}: {e}")
            return None
    
    def send_to_backend(self, listing_data):
        headers = {"Content-Type": "application/json"}
        try:
            response = requests.post(self.backend_url, json=listing_data, headers=headers)
            if response.status_code == 201:
                print(f"Successfully added listing: {listing_data['title']}")
                return True
            else:
                print(f"Failed to add listing. Status code: {response.status_code}")
                print(f"Response: {response.text}")
                return False
        except Exception as e:
            print(f"Error sending data to backend: {e}")
            return False
    
    def scrape_listings(self, location, checkin, checkout, guests, max_listings=20):
        search_url = self.build_search_url(location, checkin, checkout, guests)
        print(f"Searching: {search_url}")
        self.driver.get(search_url)
        time.sleep(5)
        try:
            WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-testid="card-container"]'))
            )
        except TimeoutException:
            print("Timeout: Unable to find listings. Check if Airbnb changed its structure.")
            print(self.driver.page_source)  # Debugging: print page source to inspect
            return
        
        soup = BeautifulSoup(self.driver.page_source, 'html.parser')
        listing_ids = self.extract_listing_ids(soup)
        print(f"Found {len(listing_ids)} listings")
        for listing_id in listing_ids[:max_listings]:
            listing_data = self.extract_listing_details(listing_id, checkin, checkout, guests)
            if listing_data:
                self.send_to_backend(listing_data)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--location", required=True, help="Search location")
    parser.add_argument("--checkin", required=True, help="Check-in date (YYYY-MM-DD)")
    parser.add_argument("--checkout", required=True, help="Check-out date (YYYY-MM-DD)")
    parser.add_argument("--guests", type=int, required=True, help="Number of guests")
    parser.add_argument("--max_listings", type=int, default=20, help="Max listings to scrape")
    args = parser.parse_args()
    scraper = AirbnbScraper()
    scraper.scrape_listings(args.location, args.checkin, args.checkout, args.guests, args.max_listings)
