# Lab8_Starter
Younghyun Kim

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) 
-1
2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
-No because testing message feature involve too many components.
3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
-Yes because we have an object that can be tested
4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
-Nothing will show up if headless is set to true
5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
-await page.click('img[alt="settings"]');
