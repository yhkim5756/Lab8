describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    expect(page.url()).toMatch("/#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const header = await page.$eval('h1', (title) => title.textContent);
    expect(header == "Entry 1").toBe(true);
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const title = await page.$eval('entry-page', (title) => title.entry.title);
    expect(title == 'You like jazz?').toBe(true);

    const date = await page.$eval('entry-page', (date) => date.entry.date);
    expect(date == '4/25/2021').toBe(true);

    const content = await page.$eval('entry-page', (content) => content.entry.content);
    expect(content == "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.").toBe(true);

    const img = await page.$eval('entry-page', (img) => img.entry.image);
    expect(img.src).toMatch('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    
    expect(img.alt == 'bee with sunglasses').toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const click = await page.$eval('body', (click) => click.className);
    expect(click == 'single-entry').toBe(true);

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img[alt="settings"]');
    expect(page.url()).toMatch('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('h1', (title) => title.textContent);
    expect(header == "Settings").toBe(true);
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const click = await page.$eval('body', (click) => click.className);
    expect(click == 'settings').toBe(true);
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toMatch('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toMatch('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const header = await page.$eval('h1', (title) => title.textContent);
    expect(header == "Journal Entries").toBe(true);
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    const element = await page.$eval('body', (click) => click.classList.length);
    expect(element == 0).toBe(true);
  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForNavigation(); 
    expect(page.url()).toMatch("/#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const header = await page.$eval('h1', (title) => title.textContent);
    expect(header == "Entry 2").toBe(true);
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {

    const title = await page.$eval('entry-page', (title) => title.entry.title);
    expect(title == 'Run, Forrest! Run!').toBe(true);

    const date = await page.$eval('entry-page', (date) => date.entry.date);
    expect(date == '4/26/2021').toBe(true);

    const content = await page.$eval('entry-page', (content) => content.entry.content);
    expect(content == "Mama always said life was like a box of chocolates. You never know what you're gonna get.").toBe(true);

    const img = await page.$eval('entry-page', (img) => img.entry.image);
    expect(img.src).toMatch('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(img.alt == 'forrest running').toBe(true);
    }, 10000);

  // create your own test 17
  it('Test17: Verify the url is correct when clicking the header', async () => {
    await page.click('entry-page');
    expect(page.url()).toMatch('http://127.0.0.1:5500/');
    await page.goBack();
  });
  // create your own test 18
  it('Test18: Verify the url is correct when clicking on the nineth entry', async () => {
    const entries = await page.$$('journal-entry');
    await entries[8].click();
    await page.waitForNavigation();
    expect(page.url()).toMatch("/#entry9");
  });
  // create your own test 19
    it('Test19: Verify the title is current when clicking on the nineth entry', async () => {
    const title = await page.$eval('h1', (title) =>  title.textContent);
    expect(title == "Entry 9").toBe(true);

  });

  // create your own test 20
  it('Test20: Verify the entry page contents is correct when clicking on the nineth entry', async () => {

    const title = await page.$eval('entry-page', (title) => title.entry.title);
    expect(title == 'Keep moving forward').toBe(true);

    const date = await page.$eval('entry-page', (date) => date.entry.date);
    expect(date == '5/3/2021').toBe(true);

    const content = await page.$eval('entry-page', (content) => content.entry.content);
    expect(content == "Everyone will tell you to let it go and move on, but don't! Instead, let it fester and boil inside of you! Take these feelings and lock them away. Let them fuel your actions. Let hate be your ally, and you will be capable of wonderful, horrid things. Heed my words, Goob: don't let it go.").toBe(true);

    const img = await page.$eval('entry-page', (img) => img.entry.image);
    expect(img.src).toMatch('https://i.pinimg.com/originals/7b/13/82/7b13822ce506f9d3fcb7707c0f6e72c3.png');
    expect(img.alt).toMatch("mr. steak you're my only friend");
    }, 10000);

});
