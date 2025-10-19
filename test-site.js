const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('🔍 Checking the Puerto Rico surprise website...\n');

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

    // Take screenshot of intro
    await page.screenshot({ path: 'intro-screen.png' });
    console.log('✓ Intro screen captured');

    // Check for images on the page
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        visible: img.offsetWidth > 0 && img.offsetHeight > 0
      }));
    });

    console.log('\n📸 Images found on intro:');
    images.forEach((img, i) => {
      console.log(`${i + 1}. ${img.alt || 'No alt text'}`);
      console.log(`   Src: ${img.src}`);
      console.log(`   Visible: ${img.visible}`);
    });

    // Check background styles
    const backgroundInfo = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const backgrounds = [];
      sections.forEach((section, i) => {
        const bgImage = window.getComputedStyle(section).backgroundImage;
        const children = section.querySelectorAll('div');
        children.forEach(child => {
          const childBg = window.getComputedStyle(child).backgroundImage;
          if (childBg !== 'none') {
            backgrounds.push({ section: i, bg: childBg });
          }
        });
      });
      return backgrounds;
    });

    console.log('\n🎨 Background images:', backgroundInfo.length > 0 ? backgroundInfo : 'Using Image components');

    // Check text content
    const mainText = await page.evaluate(() => {
      return {
        heading: document.querySelector('h1')?.textContent || '',
        button: document.querySelector('button')?.textContent || ''
      };
    });

    console.log('\n📝 Text content:');
    console.log('   Heading:', mainText.heading);
    console.log('   Button:', mainText.button);

    // Click the reveal button
    console.log('\n🖱️  Clicking reveal button...');
    await page.click('button');

    // Wait for airplane animation
    await page.waitForTimeout(6000);

    // Take screenshot after reveal
    await page.screenshot({ path: 'reveal-screen.png' });
    console.log('✓ Reveal screen captured');

    // Check images after reveal
    const imagesAfterReveal = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        visible: img.offsetWidth > 0 && img.offsetHeight > 0
      }));
    });

    console.log('\n📸 Images after reveal:');
    imagesAfterReveal.forEach((img, i) => {
      console.log(`${i + 1}. ${img.alt || 'No alt text'}`);
      console.log(`   Src: ${img.src}`);
      console.log(`   Visible: ${img.visible}`);
    });

    // Scroll down to check other sections
    console.log('\n📜 Scrolling down to check other sections...');
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'destinations-screen.png' });
    console.log('✓ Destinations screen captured');

    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'gallery-screen.png' });
    console.log('✓ Gallery screen captured');

    // Final check on all visible images
    const allImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => img.offsetWidth > 0 && img.offsetHeight > 0).map(img => ({
        src: img.src,
        alt: img.alt,
        dimensions: `${img.offsetWidth}x${img.offsetHeight}`
      }));
    });

    console.log('\n✅ Final image check - All visible images:');
    allImages.forEach((img, i) => {
      const isPuertoRico = img.alt.toLowerCase().includes('puerto rico') ||
                          img.alt.toLowerCase().includes('beach') ||
                          img.alt.toLowerCase().includes('rincon') ||
                          img.alt.toLowerCase().includes('ponce') ||
                          img.alt.toLowerCase().includes('tropical');
      const status = isPuertoRico ? '✓' : '⚠️';
      console.log(`${status} ${i + 1}. ${img.alt} (${img.dimensions})`);
    });

    console.log('\n✨ Screenshots saved: intro-screen.png, reveal-screen.png, destinations-screen.png, gallery-screen.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();
