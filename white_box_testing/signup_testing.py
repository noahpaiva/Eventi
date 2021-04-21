# signup_testing.py - Used to test user sign up functionality

from selenium import webdriver
from selenium.webdriver.common.by import By
import chromedriver_binary


driver = webdriver.Chrome()
driver.get('http://zorak2.monmouth.edu/~s1194309/Eventi/index.html')

# Presses signup button to trigger modal
signup_nav = driver.find_element(By.ID, 'signup-action')
signup_nav.click()

# Finds signup modal input fields and button
signup_email = driver.find_element(By.ID, 'signup-email')
signup_password = driver.find_element(By.ID, 'signup-password')
signup_bio = driver.find_element(By.ID, 'signup-bio')
signup_button = driver.find_element(By.ID, 'signup-init')

# Fills signup modal input fields
signup_email.send_keys('whitebox@fakeemail.com')
signup_password.send_keys('testing123')
signup_bio.send_keys('asdf')
signup_button.click()
