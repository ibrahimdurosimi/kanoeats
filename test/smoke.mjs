/**
 * Smoke test.
 *
 * Two jobs:
 *  1. Render every page and key component through react-dom/server. A
 *     component that throws on render shows the user a blank screen, and both
 *     `tsc` and `vite build` pass that happily — this is the only thing in the
 *     project that catches it.
 *  2. Assert on the resulting markup, so the specific regressions this app has
 *     already shipped once cannot come back.
 *
 * Renders are collected ONCE, up front, and a throw is a failure. An earlier
 * version wrapped each render in `catch { return '' }`, which meant a crashing
 * page quietly contributed an empty string and the content assertions passed
 * over it. A test that cannot fail is worse than no test.
 */
const { CASES } = await import('./.build/render.harness.js');

let fail = 0;
const check = (name, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
  if (!cond) fail++;
};

// --- 1. Every case must render ------------------------------------------------
console.log('--- Render (every page and component) ---');

/** @type {Record<string, string>} */
const rendered = {};

for (const [name, render] of Object.entries(CASES)) {
  try {
    const html = render();
    rendered[name] = html;
    // A render that produces almost nothing usually means an early return or a
    // swallowed error, not a genuinely tiny component.
    check(`${name} (${html.length}b)`, html.length > 200);
  } catch (e) {
    rendered[name] = '';
    fail++;
    console.log(`FAIL  ${name} — threw during render`);
    console.log(
      '      ' + String(e.stack || e).split('\n').slice(0, 3).join('\n      '),
    );
  }
}

const all = Object.values(rendered).join('');
const restaurantPage = rendered.RestaurantPage ?? '';

// --- 2. Regression assertions -------------------------------------------------
console.log('\n--- Restaurant page labels (the headline bug) ---');
check('"Rating" label present', /Rating<\/dt>/.test(restaurantPage));
check('"Delivery options" label present', /Delivery options<\/dt>/.test(restaurantPage));
check('"Opening hours" label present', /Opening hours<\/dt>/.test(restaurantPage));
check('"Location" label present', /Location<\/dt>/.test(restaurantPage));
check('no "Surfer rating"', !/Surfer/i.test(restaurantPage));
check('no "Transit Protocol"', !/Transit Protocol/i.test(restaurantPage));
check('no "Stove coordinate"', !/Stove coordinate/i.test(restaurantPage));

console.log('\n--- Address integrity ---');
check('Kano address shown', /Post Office Road, Fagge, Kano State/.test(restaurantPage));
check('no Kano/Lagos mixed address', !/Kano \/ 12 Admiralty/.test(all));
check('no Lagos address on a Kano kitchen', !/Ikeja, Lagos/.test(all));

console.log('\n--- Imagery ---');
check('no unsplash URLs anywhere', !/unsplash/i.test(all));
check('no <img> tags anywhere', !/<img/i.test(all));
check('inline SVG artwork present', (all.match(/<svg/g) || []).length > 40);

console.log('\n--- Currency ---');
check('naira symbol rendered', /₦/.test(rendered.DishModal ?? ''));
check('thousands separator used', /₦3,500/.test(rendered.DishModal ?? ''));

console.log('\n--- Reviews ---');
check('review comment rendered', /Properly charred/.test(rendered.ReviewList ?? ''));
check('rating average shown', /4\.5|5\.0|4\.0/.test(rendered.ReviewList ?? ''));
check('empty state when no reviews', /No reviews yet/.test(rendered['ReviewList (empty)'] ?? ''));
check(
  'star input is a real radio group',
  /type="radio"/.test(rendered['StarRating (input)'] ?? ''),
);

console.log('\n--- Catering ---');
check('catering form rendered', /Request a quote/.test(rendered.CateringPage ?? ''));
check('occasion options present', /Naming ceremony/.test(rendered.CateringPage ?? ''));

console.log('\n--- Menu editor ---');
check('dish rows rendered', /Your menu/.test(rendered.MenuEditor ?? ''));
check('add-a-dish action present', /Add a dish/.test(rendered.MenuEditor ?? ''));
check(
  'empty state when no dishes',
  /Your menu is empty/.test(rendered['MenuEditor (empty)'] ?? ''),
);

console.log('\n--- Accessibility basics ---');
check('aria-label on icon buttons', /aria-label=/.test(rendered.DiscoverPage ?? ''));
check('dialog role on cart drawer', /role="dialog"/.test(rendered.CartDrawer ?? ''));
check('dialog role on review modal', /role="dialog"/.test(rendered.ReviewModal ?? ''));

console.log(
  fail ? `\n${fail} check(s) failed` : `\nAll checks passed (${Object.keys(CASES).length} cases)`,
);
process.exit(fail ? 1 : 0);
