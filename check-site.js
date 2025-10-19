const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  console.log('🔍 Checking the Puerto Rico surprise website...\n');

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Take screenshot of intro
    await page.screenshot({ path: 'intro-screen.png', fullPage: false });
    console.log('✓ Intro screen captured');

    // Check all images on intro page
    const introImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        visible: img.offsetWidth > 0 && img.offsetHeight > 0
      }));
    });

    console.log('\n📸 Images on intro screen:');
    introImages.forEach((img, i) => {
      const status = img.visible ? '✅' : '❌';
      console.log(`  ${status} ${i + 1}. ${img.alt || 'No alt'}`);
    });

    // Click reveal button with force to bypass animation
    console.log('\n🖱️  Clicking "Reveal the Surprise!" button...');
    await page.locator('button').first().click({ force: true });
    console.log('   Waiting for airplane animation (6 seconds)...');
    await page.waitForTimeout(6000);

    // Take screenshot after reveal
    await page.screenshot({ path: 'reveal-screen.png', fullPage: false });
    console.log('✓ Reveal screen captured');

    // Check images after reveal
    const revealImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => img.offsetWidth > 0 && img.offsetHeight > 0).map(img => ({
        alt: img.alt,
        src: img.src
      }));
    });

    console.log('\n📸 Visible images after reveal:');
    revealImages.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img.alt}`);
    });

    // Scroll down
    console.log('\n📜 Scrolling to destinations section...');
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'destinations-screen.png', fullPage: false });
    console.log('✓ Destinations screen captured');

    // Scroll to gallery
    console.log('\n📜 Scrolling to gallery section...');
    await page.evaluate(() => window.scrollTo(0, 2500));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'gallery-screen.png', fullPage: false });
    console.log('✓ Gallery screen captured');

    // Final check
    const allImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => img.offsetWidth > 0 && img.offsetHeight > 0).map(img => img.alt);
    });

    console.log('\n\n=== FINAL ANALYSIS ===');
    console.log(`Total visible images: ${allImages.length}`);
    console.log('\nAll visible images:');
    allImages.forEach((alt, i) => {
      console.log(`  ${i + 1}. ${alt}`);
    });

    console.log('\n✅ Testing complete! Check the screenshots:');
    console.log('   - intro-screen.png');
    console.log('   - reveal-screen.png');
    console.log('   - destinations-screen.png');
    console.log('   - gallery-screen.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();
