import hashlib
import hmac
import json
import random
import string
from datetime import datetime

# Secret key for HMAC
SECRET_KEY = b'supersecretkey'

# Function to generate a random key
def generate_key():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))

# Function to create a signed key
def create_signed_key(prefix):
    key = prefix + '-' + generate_key()
    signature = hmac.new(SECRET_KEY, key.encode(), hashlib.sha256).hexdigest()[:4].upper()
    return f"{key}{signature}"

# Function to verify a signed key
def verify_key(key):
    if len(key) != 13:
        return False
    prefix_key = key[:9]
    signature = key[9:]
    expected_signature = hmac.new(SECRET_KEY, prefix_key.encode(), hashlib.sha256).hexdigest()[:4].upper()
    return hmac.compare_digest(expected_signature, signature)

# Generate keys with expiration dates
def generate_keys_with_expiry(num_keys, start_year, interval_years):
    keys = {}
    for i in range(num_keys):
        key = create_signed_key("LJC")
        expiration_year = start_year + (i * interval_years)
        expiration_date = f"{expiration_year}-07-01"
        keys[key] = expiration_date
    return keys

# Export keys to a JS file
def export_keys_to_js(keys, file_path):
    with open(file_path, 'w') as f:
        f.write("const validKeys = {\n")
        for key, expiry in keys.items():
            f.write(f'    "{key}": "{expiry}",\n')
        f.write("};\n")

if __name__ == "__main__":
    num_keys = 100
    start_year = 2024
    interval_years = 1
    keys = generate_keys_with_expiry(num_keys, start_year, interval_years)
    export_keys_to_js(keys, 'src/js/refs/valid_keys.js')

    # Example: Verify a key
    test_key = list(keys.keys())[0]
    print(f"Key: {test_key}, Valid: {verify_key(test_key)}")
