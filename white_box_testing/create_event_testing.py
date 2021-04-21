# create_event_testing.py - Used to test login and user event creation

from selenium import webdriver
from selenium.webdriver.common.by import By
import chromedriver_binary
from datetime_selenium import send_datetime
from datetime import datetime


driver = webdriver.Chrome()
driver.get('http://zorak2.monmouth.edu/~s1194309/Eventi/index.html')

# Presses login button to trigger modal
login_nav = driver.find_element(By.ID, 'login-action')
login_nav.click()

# Finds login modal input fields and button
login_email = driver.find_element(By.ID, 'login-email')
login_password = driver.find_element(By.ID, 'login-password')
login_button = driver.find_element(By.ID, 'login-init')

# Fills login modal input fields
login_email.send_keys('test@gmail.com')
login_password.send_keys('test1234')
login_button.click()

# Creates and presses create personal event button
personal_create = driver.find_element(By.ID, 'create-personal-event')
personal_create.click()

# Finds create event modal input fields and button
event_title = driver.find_element(By.ID, 'Title')
event_desc = driver.find_element(By.ID, 'Desc')
event_loc = driver.find_element(By.ID, 'search_input')
event_date = driver.find_element(By.ID, 'Date')
event_button = driver.find_element(By.ID, 'create-init')

# Fills create event modal input fields
event_title.send_keys('New personal event')
event_desc.send_keys('description of new event')
event_loc.send_keys('400 Cedar Ave, West Long Branch, NJ, USA')
event_date.send_keys('06012021\t0400p')
event_button.click()


