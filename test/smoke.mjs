const { CASES } = await import('./.build/render.harness.js');
const html = CASES.RestaurantPage();
let fail = 0;
const check = (name, cond) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`); if (!cond) fail++; };

console.log('--- Restaurant page labels (the headline bug) ---');
check('"Rating" label present',            /Rating<\/dt>/.test(html));
check('"Delivery options" label present',  /Delivery options<\/dt>/.test(html));
check('"Opening hours" label present',     /Opening hours<\/dt>/.test(html));
check('"Location" label present',          /Location<\/dt>/.test(html));
check('no "Surfer rating"',                !/Surfer/i.test(html));
check('no "Transit Protocol"',             !/Transit Protocol/i.test(html));
check('no "Stove coordinate"',             !/Stove coordinate/i.test(html));

console.log('\n--- Address integrity ---');
check('Kano address shown',                /Post Office Road, Fagge, Kano State/.test(html));
check('no Kano/Lagos mixed address',       !/Kano \/ 12 Admiralty/.test(html));

console.log('\n--- Imagery ---');
const all = Object.values(CASES).map(f => { try { return f(); } catch { return ''; } }).join('');
check('no unsplash URLs anywhere',         !/unsplash/i.test(all));
check('no <img> tags anywhere',            !/<img/i.test(all));
check('inline SVG artwork present',        (all.match(/<svg/g) || []).length > 40);

console.log('\n--- Currency ---');
check('naira symbol rendered',             /₦/.test(CASES.DishModal()));
check('thousands separator used',          /₦3,500/.test(CASES.DishModal()));

console.log('\n--- Accessibility basics ---');
check('aria-label on icon buttons',        /aria-label=/.test(CASES.DiscoverPage()));
check('dialog role on cart drawer',        /role="dialog"/.test(CASES.CartDrawer()));

console.log(fail ? `\n${fail} assertion(s) failed` : '\nAll assertions passed');
process.exit(fail ? 1 : 0);
