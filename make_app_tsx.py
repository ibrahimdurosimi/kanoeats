html_str = r"""
<!-- ===== SPRITE ===== -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <pattern id="dagi" width="90" height="90" patternUnits="userSpaceOnUse">
    <g fill="none" stroke="#E9A93A" stroke-width="1.5">
      <rect x="22" y="22" width="46" height="46" transform="rotate(45 45 45)"/>
      <rect x="30" y="30" width="30" height="30"/><circle cx="45" cy="45" r="6"/>
    </g>
  </pattern>
  <symbol id="i-suya" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#3C1108"/><circle cx="60" cy="60" r="43" fill="#5A1E0C"/>
    <g stroke="#C8A16A" stroke-width="3.4" stroke-linecap="round"><path d="M26 44h70M26 62h70M26 80h70"/></g>
    <g fill="#8E3415"><rect x="34" y="36" width="18" height="17" rx="5"/><rect x="57" y="36" width="18" height="17" rx="5"/><rect x="80" y="37" width="14" height="15" rx="5"/>
      <rect x="30" y="54" width="18" height="17" rx="5"/><rect x="53" y="54" width="18" height="17" rx="5"/><rect x="76" y="55" width="17" height="15" rx="5"/>
      <rect x="34" y="72" width="18" height="17" rx="5"/><rect x="57" y="72" width="18" height="17" rx="5"/><rect x="80" y="73" width="14" height="15" rx="5"/></g>
    <g fill="#B85425" opacity=".85"><rect x="34" y="36" width="18" height="7" rx="3.5"/><rect x="57" y="36" width="18" height="7" rx="3.5"/>
      <rect x="30" y="54" width="18" height="7" rx="3.5"/><rect x="53" y="54" width="18" height="7" rx="3.5"/>
      <rect x="34" y="72" width="18" height="7" rx="3.5"/><rect x="57" y="72" width="18" height="7" rx="3.5"/></g>
    <g fill="#E9A93A"><circle cx="42" cy="47" r="1.7"/><circle cx="66" cy="45" r="1.7"/><circle cx="38" cy="65" r="1.7"/><circle cx="62" cy="64" r="1.7"/><circle cx="45" cy="83" r="1.7"/><circle cx="70" cy="81" r="1.7"/></g>
  </symbol>
  <symbol id="i-masa" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#2A1B08"/><circle cx="60" cy="60" r="44" fill="#3D2810"/>
    <g><circle cx="43" cy="43" r="15" fill="#E0B25E"/><circle cx="43" cy="43" r="10.5" fill="#F2D294"/>
      <circle cx="77" cy="43" r="15" fill="#E0B25E"/><circle cx="77" cy="43" r="10.5" fill="#F2D294"/>
      <circle cx="43" cy="77" r="15" fill="#E0B25E"/><circle cx="43" cy="77" r="10.5" fill="#F2D294"/>
      <circle cx="77" cy="77" r="15" fill="#E0B25E"/><circle cx="77" cy="77" r="10.5" fill="#F2D294"/>
      <circle cx="60" cy="60" r="13" fill="#D9A44E"/><circle cx="60" cy="60" r="9" fill="#EFCB88"/></g>
    <g fill="#C08A34" opacity=".6"><circle cx="40" cy="40" r="1.6"/><circle cx="74" cy="41" r="1.5"/><circle cx="41" cy="79" r="1.5"/><circle cx="79" cy="75" r="1.4"/></g>
  </symbol>
  <symbol id="i-fura" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#0B3327"/>
    <path d="M38 36h44l-5 52a8 8 0 0 1-8 7H51a8 8 0 0 1-8-7z" fill="#F5F0E2"/>
    <path d="M38 36h44l-1.6 17H39.6z" fill="#FFFDF8"/>
    <path d="M41 58h38l-3.6 30a8 8 0 0 1-8 7H52.6a8 8 0 0 1-8-7z" fill="#EDE4CE"/>
    <g fill="#C99A4E"><circle cx="52" cy="70" r="6"/><circle cx="68" cy="76" r="6.5"/><circle cx="58" cy="86" r="5.5"/><circle cx="70" cy="62" r="4.5"/></g>
    <rect x="34" y="30" width="52" height="8" rx="4" fill="#E9A93A"/>
  </symbol>
  <symbol id="i-kilishi" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#4A2410"/><circle cx="60" cy="60" r="43" fill="#F1E7D2"/>
    <path d="M32 42c12-6 26-6 38-2s18 4 20 10-8 10-20 10-30 4-38-2-6-12 0-16z" fill="#8E3B18"/>
    <path d="M30 68c12-5 26-5 38-1s18 3 20 9-8 9-20 9-30 3-38-2-6-11 0-15z" fill="#A0491F"/>
    <g fill="#C96A32" opacity=".7"><ellipse cx="46" cy="49" rx="7" ry="3.4"/><ellipse cx="68" cy="52" rx="8" ry="3.4"/><ellipse cx="44" cy="76" rx="7" ry="3.2"/><ellipse cx="70" cy="78" rx="7.5" ry="3.2"/></g>
    <g fill="#E9A93A"><circle cx="40" cy="45" r="1.6"/><circle cx="60" cy="47" r="1.6"/><circle cx="50" cy="73" r="1.6"/><circle cx="76" cy="74" r="1.5"/></g>
  </symbol>
  <symbol id="i-tuwo" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#12291F"/><circle cx="60" cy="60" r="44" fill="#1C3B2C"/>
    <ellipse cx="60" cy="66" rx="36" ry="27" fill="#D97B22"/><ellipse cx="60" cy="63" rx="32" ry="23" fill="#EF9A34"/>
    <ellipse cx="48" cy="55" rx="18" ry="15" fill="#F7F2E4"/><ellipse cx="48" cy="52" rx="15" ry="12" fill="#FFFDF6"/>
    <g fill="#A85416" opacity=".65"><circle cx="74" cy="66" r="4.5"/><circle cx="66" cy="78" r="4"/><circle cx="82" cy="56" r="3.5"/></g>
    <g fill="#2E7D4F"><ellipse cx="72" cy="52" rx="6" ry="3" transform="rotate(-24 72 52)"/><ellipse cx="55" cy="80" rx="5.5" ry="2.8" transform="rotate(16 55 80)"/></g>
  </symbol>
  <symbol id="i-kunun" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#7A4A12"/><circle cx="60" cy="60" r="43" fill="#9A6318"/>
    <path d="M40 34h18l-3 54a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#F6EEDC"/>
    <path d="M41.4 48h15.2l-2.2 40a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#E6D3A8"/>
    <path d="M62 40h18l-3 48a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#FBF5E6"/>
    <path d="M63.4 54h15.2l-2.2 34a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#EFE0BC"/>
    <g fill="#C79A4C" opacity=".7"><circle cx="48" cy="66" r="2.6"/><circle cx="70" cy="68" r="2.6"/></g>
    <g stroke="#DF5F49" stroke-width="3.6" stroke-linecap="round"><path d="M50 34V22M72 40V27"/></g>
  </symbol>
  <symbol id="i-arch" viewBox="0 0 120 120">
    <rect x="14" y="52" width="92" height="56" rx="6" fill="#0F4132"/><path d="M60 16 96 52H24z" fill="#166049"/>
    <circle cx="60" cy="34" r="6" fill="#E9A93A"/>
    <path d="M48 108V80a12 12 0 0 1 24 0v28z" fill="#0A2E24"/>
    <g fill="#E9A93A" opacity=".9"><rect x="28" y="66" width="12" height="16" rx="6"/><rect x="80" y="66" width="12" height="16" rx="6"/></g>
  </symbol>
  <symbol id="i-balangu" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#33200C"/><circle cx="60" cy="60" r="43" fill="#4E3316"/>
    <g fill="#93411A"><ellipse cx="47" cy="50" rx="19" ry="14" transform="rotate(-16 47 50)"/><ellipse cx="74" cy="62" rx="17" ry="13" transform="rotate(12 74 62)"/><ellipse cx="53" cy="79" rx="18" ry="12" transform="rotate(-8 53 79)"/></g>
    <g fill="#BE6330" opacity=".75"><ellipse cx="45" cy="46" rx="9" ry="4.5" transform="rotate(-16 45 46)"/><ellipse cx="74" cy="58" rx="8" ry="4" transform="rotate(12 74 58)"/><ellipse cx="52" cy="75" rx="8" ry="4"/></g>
    <g fill="#E9A93A"><circle cx="41" cy="55" r="1.8"/><circle cx="66" cy="66" r="1.8"/><circle cx="58" cy="84" r="1.8"/><circle cx="80" cy="55" r="1.6"/></g>
  </symbol>
</defs></svg>

<!-- ===== SIDEBAR ===== -->
<aside class="sidebar">
  <a href="#" class="sb-logo" onclick="window.navToLanding();return false">kanoeats<i></i></a>
  <div class="sb-h">Discover</div>
  <button class="sb-item on" data-nav="explore">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M4 15h16M7 19h10"/></svg>
    Kitchens</button>
  <button class="sb-item" data-nav="orders">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
    Orders<span class="n">2</span></button>
  <button class="sb-item" data-nav="saved">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>
    Saved</button>
  <div class="sb-h">Account</div>
  <button class="sb-item" data-nav="addresses">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
    Addresses</button>
  <button class="sb-item" data-nav="support">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.4 2.5c-.6.2-.9.8-.9 1.4v.4M12 17v.1"/></svg>
    Support</button>

  <div class="sb-promo">
    <svg class="pattern" width="100%" height="100%" style="opacity:.1"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
    <b>Iftar delivery</b>
    <p>Schedule your box to land before Maghrib — timed for your city.</p>
    <button class="btn btn-gold" onclick="window.toast('Iftar scheduling opens during Ramadan')">Schedule</button>
  </div>
</aside>

<!-- ===== TOPBAR (desktop) ===== -->
<div class="topbar">
  <button class="addr" onclick="window.toast('Address picker — 3 saved addresses')">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
    <span><small>Deliver to</small><b>Nassarawa GRA, Kano</b></span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="tb-search">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9AA8A0" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    <input id="mainSearch" type="text" placeholder="Search kitchens, suya, masa, kunun…" aria-label="Search">
  </div>
  <div class="tb-right">
    <button class="icon-btn" aria-label="Notifications" onclick="window.toast('No new notifications')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4E46" stroke-width="2" stroke-linecap="round"><path d="M18 15V10a6 6 0 1 0-12 0v5l-2 3h16zM10 21h4"/></svg>
      <span class="dot-n"></span>
    </button>
    <button class="cart-btn" onclick="window.openCart()">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H7"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>
      Cart <span class="c" id="cartCountTop">0</span>
    </button>
    <button class="acct" onclick="window.toast('Account menu')">
      <span class="av"><svg viewBox="0 0 80 80" width="100%" height="100%"><rect width="80" height="80" fill="#166049"/><circle cx="40" cy="31" r="15" fill="#8A5A32"/><path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill="#E9A93A"/></svg></span>
      <span><b>Ebrahim</b><small>Kano</small></span>
    </button>
  </div>
</div>

<!-- ===== MOBILE TOP ===== -->
<div class="mob-top">
  <div class="mt-row">
    <a href="#" class="sb-logo" onclick="window.navToLanding();return false">kanoeats<i></i></a>
    <button class="addr" style="margin-left:auto;padding:6px 12px" onclick="window.toast('Address picker')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
      <span><b style="font-size:12px">Nassarawa, Kano</b></span>
    </button>
  </div>
  <div class="mt-row">
    <div class="mob-search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA8A0" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input id="mobSearch" type="text" placeholder="Search cuisine, kitchen, dish…" aria-label="Search">
    </div>
  </div>
</div>

<!-- ===== MAIN ===== -->
<main>
  <!-- ---------- DISCOVERY ---------- -->
  <section id="viewDiscover">
    <div class="page-h">
      <h1>Kitchen discovery</h1>
      <p>What authentic Arewa flavour are you craving today?</p>
    </div>

    <div class="promos" style="margin-top:22px">
      <article class="promo deal">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
        <svg class="art" viewBox="0 0 120 120"><use href="#i-suya"/></svg>
        <div class="scrim"></div>
        <span class="lbl">DEAL OF THE DAY</span>
        <h3>Experience authentic flavour</h3>
        <p>Get 20% off all suya and grills from Kano Suya Palace this weekend.</p>
        <button class="btn btn-gold" onclick="window.toast('Promo SUYA20 applied to your cart')">Claim offer</button>
      </article>
      <article class="promo free">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
        <svg class="art" viewBox="0 0 120 120" style="opacity:.35"><use href="#i-arch"/></svg>
        <span class="lbl" style="background:rgba(233,169,58,.2);color:var(--gold-soft)">FREE DISPATCH</span>
        <h3>Free delivery in Kano Metropolis</h3>
        <p>Order above ₦15,000 and we cover the rider.</p>
        <button class="btn btn-white" onclick="window.showDiscover()">Browse kitchens</button>
      </article>
    </div>

    <div class="row-h"><h3>Cuisines &amp; categories</h3></div>
    <div class="rail-fade">
      <div class="cats" id="cats"></div>
    </div>

    <div class="row-h">
      <h3>Order again</h3>
      <a href="#" onclick="window.toast('Full order history');return false">View all orders
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg></a>
    </div>
    <div class="rail-fade">
      <div class="again" id="again"></div>
    </div>

    <div class="row-h">
      <h3>Fastest near you</h3>
      <a href="#" onclick="return false">Under 20 minutes
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg></a>
    </div>
    <div class="trend" id="trend"></div>

    <div class="row-h"><h3>Browse all kitchens</h3></div>
    <div class="filters">
      <div class="seg" id="sortSeg">
        <button class="on" data-sort="featured">Featured</button>
        <button data-sort="rating">Top rated</button>
        <button data-sort="time">Fastest</button>
      </div>
      <button class="fchip" data-filter="halal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>Halal only</button>
      <button class="fchip" data-filter="vegan">Vegan</button>
      <button class="fchip" data-filter="rating">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>4.5+ rating</button>
      <span class="found" id="found"></span>
    </div>
    <div class="grid" id="grid"></div>
  </section>

  <!-- ---------- RESTAURANT ---------- -->
  <section id="viewRestaurant" style="display:none">
    <button class="back" onclick="window.showDiscover()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>
      Back to kitchens
    </button>

    <div class="r-hero" id="rHero">
      <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
      <svg class="art" id="rArt" viewBox="0 0 120 120"><use href="#i-suya"/></svg>
      <div class="scrim"></div>
      <span class="r-verify">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3A2A08" stroke-width="2.6" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
        Halal verified
      </span>
      <div class="r-id">
        <div class="r-mono" id="rMono">KS</div>
        <div>
          <h1 id="rName">Kano Suya Palace</h1>
          <div class="sub" id="rSub">Arewa flame BBQ</div>
        </div>
      </div>
    </div>

    <div class="r-info">
      <div class="r-cell">
        <div class="lb">Rating</div>
        <div class="vl" id="rRate">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
          4.8 <small>(1,204 reviews)</small>
        </div>
      </div>
      <div class="r-cell">
        <div class="lb">Delivery options</div>
        <div class="vl">Delivery &amp; pickup <small>· approx. 15 min</small></div>
      </div>
      <div class="r-cell">
        <div class="lb">Opening hours</div>
        <div class="vl">4:00pm – 11:00pm <small>daily</small></div>
      </div>
      <div class="r-cell">
        <div class="lb">Location</div>
        <div class="vl" style="font-weight:500;font-size:13.5px">Post Office Road, Fagge, Kano State</div>
      </div>
    </div>

    <div class="menu-bar">
      <div class="seg" id="menuSeg">
        <button class="on" data-cat="all">All</button>
        <button data-cat="starter">Starters</button>
        <button data-cat="main">Mains</button>
        <button data-cat="drink">Drinks</button>
        <button data-cat="snack">Snacks</button>
      </div>
      <div class="m-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA8A0" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="dishSearch" type="text" placeholder="Search dishes…" aria-label="Search dishes">
      </div>
    </div>
    <div class="dishes" id="dishes"></div>
  </section>
</main>

<!-- ===== BOTTOM NAV (mobile) ===== -->
<nav class="bottom-nav">
  <button class="bn on" onclick="window.showDiscover()">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2" stroke-linecap="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M4 15h16M7 19h10"/></svg>Explore</button>
  <button class="bn" onclick="window.toast('Your orders')">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Orders</button>
  <button class="bn" onclick="window.openCart()">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2" stroke-linecap="round"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H7"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>Cart
    <span class="badge" id="cartCountNav" style="display:none">0</span></button>
  <button class="bn" onclick="window.toast('Account')">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>Account</button>
</nav>

<!-- ===== STICKY CART BAR (mobile) ===== -->
<div class="cart-bar" id="cartBar">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2" stroke-linecap="round"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H7"/></svg>
  <div><b id="barTotal">₦0</b><small id="barCount">0 items</small></div>
  <button class="btn btn-gold" onclick="window.openCart()">View cart</button>
</div>

<!-- ===== CART DRAWER ===== -->
<div class="scrim-full" id="scrim" onclick="window.closeAll()"></div>
<aside class="drawer" id="drawer">
  <div class="dr-h">
    <div><h3>Your cart</h3><small id="drSub">Kano Suya Palace</small></div>
    <button class="x" onclick="window.closeAll()"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </div>
  <div class="dr-body" id="drBody"></div>
  <div class="dr-f">
    <div class="free-note" id="freeNote">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F4132" stroke-width="2.2" stroke-linecap="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6M6 14V9h5l3 5"/></svg>
      <span id="freeTxt">Add ₦15,000 more for free dispatch</span>
    </div>
    <div class="line"><span>Subtotal</span><span id="sumSub">₦0</span></div>
    <div class="line"><span>Delivery</span><span id="sumDel">₦1,200</span></div>
    <div class="line" id="discLine" style="display:none;color:#2C6B3A"><span>Discount (SUYA20)</span><span id="sumDisc">-₦0</span></div>
    <div class="line tot"><span>Total</span><b id="sumTot">₦0</b></div>
    <button class="btn btn-clay" style="width:100%;margin-top:14px;padding:14px" onclick="window.checkout()">
      Proceed to checkout
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  </div>
</aside>

<!-- ===== DISH MODAL ===== -->
<div class="modal" id="modal">
  <div class="modal-box">
    <div class="mb-art" id="mbArt">
      <svg class="d" id="mbIcon" viewBox="0 0 120 120"><use href="#i-suya"/></svg>
      <button class="x" onclick="window.closeAll()"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="mb-in">
      <h3 id="mbName">Dish</h3>
      <p id="mbDesc">Description</p>

      <div class="opt-h">Yaji heat level</div>
      <div class="heat" id="heat">
        <button data-h="mild">Mild</button>
        <button class="on" data-h="medium">Medium</button>
        <button data-h="hot">Hot</button>
        <button data-h="extra">Wuta! (extra hot)</button>
      </div>

      <div class="opt-h">Add-ons</div>
      <div id="addons"></div>

      <div class="mb-f">
        <div class="step">
          <button onclick="window.mQty(-1)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
          <span id="mbQty">1</span>
          <button onclick="window.mQty(1)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
        <button class="btn btn-clay" style="padding:14px" onclick="window.addFromModal()">Add to cart · <span id="mbTotal">₦0</span></button>
      </div>
    </div>
  </div>
</div>

<div class="toast" id="toast">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.6" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
  <span id="toastTxt">Added</span>
</div>
"""

js_script = r"""
const CATS = [
  {id:'all',   label:'All',        ic:'M3 11h18M5 11a7 7 0 0 1 14 0M4 15h16M7 19h10'},
  {id:'trad',  label:'Traditional',ic:'M12 3v18M5 8h14M7 13h10'},
  {id:'suya',  label:'Suya',       ic:'M4 8h16M4 12h16M4 16h16'},
  {id:'masa',  label:'Masa',       ic:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12h8'},
  {id:'grill', label:'Grills',     ic:'M13 2 4 14h7l-1 8 9-12h-7z'},
  {id:'drink', label:'Drinks',     ic:'M6 4h12l-2 16H8zM6 9h12'},
  {id:'snack', label:'Snacks',     ic:'M4 14a8 8 0 0 1 16 0zM3 18h18'},
  {id:'veg',   label:'Vegan',      ic:'M12 21c0-8 4-12 9-13-1 8-4 12-9 13zM12 21c0-6-3-9-7-10 1 6 3 9 7 10z'}
];

const RESTAURANTS = [
  {id:1, name:'Gidan Arewa (Arewa Palace)', mono:'GA', sub:'Traditional Hausa kitchen', rating:4.9, time:20, reviews:2140,
   tags:['halal','trad'], cats:['trad','masa'], icon:'i-arch', bg:'linear-gradient(150deg,#F2E8D7,#E4D5B8)',
   hero:'linear-gradient(150deg,#0F4132,#061C15)', addr:'Zoo Road, Nassarawa, Kano State', hours:'8:00am – 10:00pm'},
  {id:2, name:'Kano Suya Palace (Mai Suya)', mono:'KS', sub:'Arewa flame BBQ', rating:4.8, time:15, reviews:1204,
   tags:['halal','spicy'], cats:['suya','grill'], icon:'i-suya', bg:'linear-gradient(150deg,#F6E3D8,#EACBB6)',
   hero:'linear-gradient(150deg,#6E2410,#2E0C05)', addr:'Post Office Road, Fagge, Kano State', hours:'4:00pm – 11:00pm'},
  {id:3, name:'Bukkah Palace & Local Fusion', mono:'BP', sub:'Traditional Nigerian', rating:4.7, time:25, reviews:876,
   tags:['halal','spicy'], cats:['trad','grill'], icon:'i-tuwo', bg:'linear-gradient(150deg,#FAEBD3,#EFD8A9)',
   hero:'linear-gradient(150deg,#8A4C10,#3A1E05)', addr:'Murtala Mohammed Way, Bompai, Kano State', hours:'10:00am – 10:00pm'},
  {id:4, name:'Arewa Oasis Drinks & Cups', mono:'AO', sub:'Naturally nourishing', rating:4.6, time:18, reviews:512,
   tags:['halal','veg'], cats:['drink','veg'], icon:'i-kunun', bg:'linear-gradient(150deg,#E6F0E4,#CFE3D2)',
   hero:'linear-gradient(150deg,#0F4132,#08281E)', addr:'France Road, Sabon Gari, Kano State', hours:'7:00am – 9:00pm'},
  {id:5, name:'Mai Kilishi Heritage House', mono:'MK', sub:'Dried meat specialists', rating:4.8, time:22, reviews:640,
   tags:['halal','trad'], cats:['snack','suya'], icon:'i-kilishi', bg:'linear-gradient(150deg,#F3E5D2,#E3CFAE)',
   hero:'linear-gradient(150deg,#4A2410,#200F06)', addr:'Kofar Wambai Market, Kano State', hours:'9:00am – 8:00pm'},
  {id:6, name:'Waina Corner (Masa House)', mono:'WC', sub:'Pan-fired rice cakes', rating:4.5, time:14, reviews:388,
   tags:['halal','veg'], cats:['masa','snack'], icon:'i-masa', bg:'linear-gradient(150deg,#FBF0DA,#EEDCB4)',
   hero:'linear-gradient(150deg,#7A5216,#33200C)', addr:'Gwammaja Quarters, Dala, Kano State', hours:'6:00am – 12:00pm'},
  {id:7, name:'Balangu Spot Bompai', mono:'BS', sub:'Slow-roasted grills', rating:4.4, time:28, reviews:294,
   tags:['halal','spicy'], cats:['grill','suya'], icon:'i-balangu', bg:'linear-gradient(150deg,#F1E0D2,#DFC3A6)',
   hero:'linear-gradient(150deg,#5C3210,#261405)', addr:'Airport Road, Bompai, Kano State', hours:'12:00pm – 11:00pm'},
  {id:8, name:'Fura Fresh Dairy', mono:'FF', sub:'Millet & yoghurt bar', rating:4.7, time:16, reviews:455,
   tags:['halal','veg'], cats:['drink','veg'], icon:'i-fura', bg:'linear-gradient(150deg,#E9F1E6,#D3E4D6)',
   hero:'linear-gradient(150deg,#0B3327,#051A13)', addr:'Kabuga Road, Gwale, Kano State', hours:'7:00am – 8:00pm'}
];

const MENU = {
  2:[
    {id:'d1', n:'Signature Tsire Beef Skewer', c:'main',   p:3500, ic:'i-suya',    heat:3,
     d:'Tender thin slices of prime beef skewered and roasted over charcoal, lavishly rubbed with freshly milled groundnut yaji.'},
    {id:'d2', n:'Balangu Slow-Roasted Ram', c:'main',      p:4500, ic:'i-balangu', heat:2,
     d:'Authentic slow-smoked juicy chunks of seasoned ram grilled over logs, finished with local wild herbs and onion.'},
    {id:'d3', n:'Spicy Dried Kilishi Sheets', c:'snack',   p:4000, ic:'i-kilishi', heat:3,
     d:'Arewa-style jerky sheets coated in a spicy peanut paste infusion, naturally sun-dried and flame-flashed.'},
    {id:'d4', n:'Kunun Zaki (Spiced Millet)', c:'drink',   p:1000, ic:'i-kunun',   heat:0,
     d:'Sweet, smooth and nourishing beverage brewed carefully from fermented millet grain, sweet potatoes and cloves.'},
    {id:'d5', n:'Fluffy Rice Masa (6 pcs)', c:'starter',   p:1800, ic:'i-masa',    heat:0,
     d:'Fermented round rice cakes fired in traditional oil pan grillers, served with yaji or honey on the side.'},
    {id:'d6', n:'Tuwo Shinkafa & Miyan Taushe', c:'main',  p:3200, ic:'i-tuwo',    heat:2,
     d:'Soft pounded rice served with thick hand-pounded pumpkin soup, spinach and tender goat meat.'},
    {id:'d7', n:'Fura da Nono Cup', c:'drink',             p:1500, ic:'i-fura',    heat:0,
     d:'Millet grain cakes hand-rolled into thick cold fresh cow-milk yoghurt. Served chilled, no sugar added.'},
    {id:'d8', n:'Dambu Nama Shredded Beef', c:'starter',   p:2800, ic:'i-balangu', heat:2,
     d:'Finely shredded spiced beef floss, fried to a crisp and served with sliced onion and fresh tomato.'}
  ]
};
const ADDONS = [
  {id:'a1', n:'Extra yaji spice', p:200},
  {id:'a2', n:'Kilishi side portion', p:1200},
  {id:'a3', n:'Sliced onion & tomato', p:300},
  {id:'a4', n:'Chilled kunun aya (50cl)', p:800}
];

let cart = [], activeCat='all', activeSort='featured', activeFilters=new Set(), currentR=RESTAURANTS[1];
let modalDish=null, modalQty=1, modalHeat='medium', modalAdd=new Set();
const NGN = n => '₦' + n.toLocaleString('en-NG');

function renderCats(){
  const catsEl = document.getElementById('cats');
  if(!catsEl) return;
  catsEl.innerHTML = CATS.map(c=>`
    <button class="cat ${c.id==='all'?'on':''}" data-cat="${c.id}">
      <span class="ci"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${c.ic}"/></svg></span>
      <span>${c.label}</span>
    </button>`).join('');
  document.querySelectorAll('.cat').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.cat').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); activeCat=b.dataset.cat; renderGrid();
  }));
}

function renderAgain() {
  const againEl = document.getElementById('again');
  if(!againEl) return;
  againEl.innerHTML = [
    {n:'Tsire Beef Suya ×2', s:'Kano Suya Palace · ₦7,000', ic:'i-suya', r:2},
    {n:'Fluffy Rice Masa (6 pcs)', s:'Waina Corner · ₦1,800', ic:'i-masa', r:6},
    {n:'Fura da Nono Cup ×3', s:'Fura Fresh Dairy · ₦4,500', ic:'i-fura', r:8},
    {n:'Kilishi Sheets 250g', s:'Mai Kilishi House · ₦4,000', ic:'i-kilishi', r:5}
  ].map(o=>`
    <button class="ag" onclick="window.openRestaurant(${o.r})">
      <span class="thumb"><svg width="46" height="46" viewBox="0 0 120 120"><use href="#${o.ic}"/></svg></span>
      <span><b>${o.n}</b><small>${o.s}</small></span>
      <span class="go"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="2.6" stroke-linecap="round"><path d="M4 12h14M13 7l5 5-5 5"/></svg></span>
    </button>`).join('');
}

function renderTrend() {
  const trendEl = document.getElementById('trend');
  if(!trendEl) return;
  trendEl.innerHTML = [...RESTAURANTS].sort((a,b)=>a.time-b.time).slice(0,3).map(r=>`
    <button class="tr" onclick="window.openRestaurant(${r.id})">
      <div class="tr-art" style="background:${r.bg}">
        <span class="hot-b"><svg width="11" height="11" viewBox="0 0 24 24" fill="#DF5F49"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>${r.time} MIN</span>
        <svg class="d" viewBox="0 0 120 120"><use href="#${r.icon}"/></svg>
      </div>
      <div class="tr-b">
        <h4>${r.name}</h4>
        <div class="sub">${r.sub}</div>
        <div class="tr-f">
          <b><svg width="13" height="13" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>${r.rating}</b>
          <span style="color:var(--muted)">${r.time} mins</span>
        </div>
      </div>
    </button>`).join('');
}

function renderGrid(){
  const g = document.getElementById('grid');
  if(!g) return;
  const mainSearch = document.getElementById('mainSearch');
  const mobSearch = document.getElementById('mobSearch');
  const q = (mainSearch?.value || mobSearch?.value || '').toLowerCase();
  let list = RESTAURANTS.filter(r=>{
    if(activeCat!=='all' && !r.cats.includes(activeCat)) return false;
    if(activeFilters.has('halal') && !r.tags.includes('halal')) return false;
    if(activeFilters.has('vegan') && !r.tags.includes('veg')) return false;
    if(activeFilters.has('rating') && r.rating < 4.5) return false;
    if(q && !(r.name+' '+r.sub).toLowerCase().includes(q)) return false;
    return true;
  });
  if(activeSort==='rating') list.sort((a,b)=>b.rating-a.rating);
  if(activeSort==='time')   list.sort((a,b)=>a.time-b.time);

  const foundEl = document.getElementById('found');
  if(foundEl) foundEl.textContent = `${list.length} kitchen${list.length===1?'':'s'} found`;

  if(!list.length){
    g.innerHTML = `<div class="empty">
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8.5 12.5a3.5 3.5 0 0 0 5 0"/></svg>
      <h4>No kitchens match that</h4>
      <p>Try clearing a filter or widening your search — we're adding new Arewa kitchens every week.</p>
      <button class="btn btn-gold" onclick="window.clearFilters()">Clear all filters</button>
    </div>`;
    return;
  }

  const tagMap = {halal:['HALAL','t-halal'], spicy:['SPICY','t-spicy'], trad:['TRADITIONAL','t-trad'], veg:['VEGAN','t-veg']};
  g.innerHTML = list.map(r=>`
    <button class="card" onclick="window.openRestaurant(${r.id})">
      <div class="card-art" style="background:${r.bg}">
        <span class="heart" onclick="event.stopPropagation();this.classList.toggle('on');this.querySelector('svg').setAttribute('fill',this.classList.contains('on')?'#fff':'none');this.querySelector('svg').setAttribute('stroke',this.classList.contains('on')?'#fff':'#DF5F49')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>
        </span>
        <span class="verify" title="Halal verified">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A2A08" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <svg class="d" viewBox="0 0 120 120"><use href="#${r.icon}"/></svg>
      </div>
      <div class="card-b">
        <div class="tl">
          <h4>${r.name}</h4>
          <span class="st"><svg width="13" height="13" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>${r.rating}</span>
        </div>
        <div class="sub">${r.sub}</div>
        <div class="time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          ${r.time} min · ${r.reviews.toLocaleString()} reviews
        </div>
        <div class="tags">${r.tags.map(t=>`<span class="tag ${tagMap[t][1]}">${tagMap[t][0]}</span>`).join('')}</div>
      </div>
    </button>`).join('');
}

window.clearFilters = function(){
  activeFilters.clear(); activeCat='all';
  document.querySelectorAll('.fchip').forEach(x=>x.classList.remove('on'));
  document.querySelectorAll('.cat').forEach((x,i)=>x.classList.toggle('on', i===0));
  const m1 = document.getElementById('mainSearch'); if(m1) m1.value=''; 
  const m2 = document.getElementById('mobSearch'); if(m2) m2.value='';
  renderGrid();
}

window.openRestaurant = function(id){
  const r = RESTAURANTS.find(x=>x.id===id) || RESTAURANTS[1];
  currentR = r;
  document.getElementById('viewDiscover').style.display='none';
  document.getElementById('viewRestaurant').style.display='block';
  document.getElementById('rHero').style.background = r.hero;
  document.getElementById('rArt').innerHTML = `<use href="#${r.icon}"/>`;
  document.getElementById('rMono').textContent = r.mono;
  document.getElementById('rName').textContent = r.name;
  document.getElementById('rSub').textContent = r.sub;
  document.getElementById('rRate').innerHTML =
    `<svg width="15" height="15" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg> ${r.rating} <small>(${r.reviews.toLocaleString()} reviews)</small>`;
  document.querySelectorAll('.r-cell')[1].querySelector('.vl').innerHTML = `Delivery &amp; pickup <small>· approx. ${r.time} min</small>`;
  document.querySelectorAll('.r-cell')[2].querySelector('.vl').innerHTML = `${r.hours} <small>daily</small>`;
  document.querySelectorAll('.r-cell')[3].querySelector('.vl').textContent = r.addr;
  window.renderDishes();
  window.scrollTo({top:0,behavior:'smooth'});
}

window.showDiscover = function(skipScroll){
  const vd = document.getElementById('viewDiscover');
  if(!vd) return;
  document.getElementById('viewRestaurant').style.display='none';
  vd.style.display='block';
  if(!skipScroll) window.scrollTo({top:0,behavior:'smooth'});
}

let menuCat='all';
window.renderDishes = function(){
  const searchEl = document.getElementById('dishSearch');
  if(!searchEl) return;
  const q = searchEl.value.toLowerCase();
  const menu = MENU[2]; // shared demo menu
  const list = menu.filter(d=> (menuCat==='all'||d.c===menuCat) && (!q || (d.n+d.d).toLowerCase().includes(q)) );
  const el = document.getElementById('dishes');
  if(!list.length){
    el.innerHTML = `<div class="empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="1.6" stroke-linecap="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M4 15h16"/></svg>
      <h4>Nothing on this part of the menu yet</h4>
      <p>Try another category — the full menu is just a tap away.</p></div>`;
    return;
  }
  el.innerHTML = list.map(d=>`
    <article class="dish">
      <div class="dish-art" style="background:${currentR.bg}" onclick="window.openModal('${d.id}')">
        ${d.heat>0?`<span class="spice">${'🌶️'.repeat(d.heat)}</span>`:''}
        <svg class="d" viewBox="0 0 120 120"><use href="#${d.ic}"/></svg>
      </div>
      <div class="dish-b">
        <h4>${d.n}</h4>
        <p>${d.d}</p>
        <div class="price">${NGN(d.p)}</div>
        <button class="btn btn-clay" onclick="window.openModal('${d.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H7"/></svg>
          Add to cart
        </button>
      </div>
    </article>`).join('');
}

window.openModal = function(id){
  modalDish = MENU[2].find(d=>d.id===id);
  modalQty=1; modalHeat='medium'; modalAdd.clear();
  document.getElementById('mbName').textContent = modalDish.n;
  document.getElementById('mbDesc').textContent = modalDish.d;
  document.getElementById('mbIcon').innerHTML = `<use href="#${modalDish.ic}"/>`;
  document.getElementById('mbArt').style.background = currentR.bg;
  document.getElementById('mbQty').textContent = 1;
  document.querySelectorAll('#heat button').forEach(b=>b.classList.toggle('on', b.dataset.h==='medium'));
  document.getElementById('addons').innerHTML = ADDONS.map(a=>`
    <button class="addon" data-a="${a.id}">
      <span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg></span>
      <b>${a.n}</b><span class="ap">+${NGN(a.p)}</span>
    </button>`).join('');
  document.querySelectorAll('.addon').forEach(b=>b.addEventListener('click',()=>{
    b.classList.toggle('on');
    b.classList.contains('on') ? modalAdd.add(b.dataset.a) : modalAdd.delete(b.dataset.a);
    window.mbTotal();
  }));
  window.mbTotal();
  document.getElementById('modal').classList.add('on');
  document.getElementById('scrim').classList.add('on');
}

window.mQty = function(d){ modalQty=Math.max(1,modalQty+d); document.getElementById('mbQty').textContent=modalQty; window.mbTotal(); }
function addonSum(){ return [...modalAdd].reduce((s,id)=>s+ADDONS.find(a=>a.id===id).p,0); }
window.mbTotal = function(){ document.getElementById('mbTotal').textContent = NGN((modalDish.p+addonSum())*modalQty); }
window.addFromModal = function(){
  const extras = [...modalAdd].map(id=>ADDONS.find(a=>a.id===id).n);
  cart.push({
    key: modalDish.id+modalHeat+[...modalAdd].join(''),
    n: modalDish.n, ic: modalDish.ic, q: modalQty,
    unit: modalDish.p + addonSum(),
    note: [modalHeat==='extra'?'Wuta! extra hot':modalHeat.charAt(0).toUpperCase()+modalHeat.slice(1), ...extras].join(' · ')
  });
  window.closeAll(); window.renderCart(); window.toast(`${modalDish.n} added to cart`);
}

window.renderCart = function(){
  const body = document.getElementById('drBody');
  if(!body) return;
  const count = cart.reduce((s,i)=>s+i.q,0);
  const sub = cart.reduce((s,i)=>s+i.unit*i.q,0);

  document.getElementById('cartCountTop').textContent = count;
  const nav = document.getElementById('cartCountNav');
  nav.textContent = count; nav.style.display = count?'grid':'none';
  document.getElementById('cartBar').classList.toggle('on', count>0);
  document.getElementById('barTotal').textContent = NGN(sub);
  document.getElementById('barCount').textContent = `${count} item${count===1?'':'s'}`;
  document.getElementById('drSub').textContent = count? currentR.name : 'Nothing added yet';

  if(!count){
    body.innerHTML = `<div class="empty" style="border:none;background:none;padding:50px 10px">
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#6C7C73" stroke-width="1.6" stroke-linecap="round"><path d="M4 5h2l2.2 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L21 8H7"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>
      <h4>Your cart is empty</h4>
      <p>Pick something from a kitchen and it'll show up here.</p>
      <button class="btn btn-gold" onclick="window.closeAll();window.showDiscover()">Browse kitchens</button></div>`;
  } else {
    body.innerHTML = cart.map((it,i)=>`
      <div class="ci">
        <span class="thumb"><svg width="46" height="46" viewBox="0 0 120 120"><use href="#${it.ic}"/></svg></span>
        <div style="min-width:0">
          <b>${it.n}</b><small>${it.note}</small>
          <span class="pr">${NGN(it.unit*it.q)}</span>
        </div>
        <div class="rr">
          <button onclick="window.removeItem(${i})" aria-label="Remove" style="opacity:.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>
          </button>
          <div class="step">
            <button onclick="window.chg(${i},-1)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
            <span>${it.q}</span>
            <button onclick="window.chg(${i},1)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
          </div>
        </div>
      </div>`).join('') + `
      <div class="promo-in">
        <input id="promoCode" placeholder="Promo code (try SUYA20)">
        <button class="btn btn-ghost" onclick="window.applyPromo()">Apply</button>
      </div>`;
  }

  const del = sub>=15000 || sub===0 ? 0 : 1200;
  const disc = window.promoOn ? Math.round(sub*0.2) : 0;
  document.getElementById('sumSub').textContent = NGN(sub);
  document.getElementById('sumDel').textContent = del ? NGN(del) : 'Free';
  document.getElementById('discLine').style.display = disc?'flex':'none';
  document.getElementById('sumDisc').textContent = '-'+NGN(disc);
  document.getElementById('sumTot').textContent = NGN(Math.max(0, sub+del-disc));
  const note = document.getElementById('freeNote');
  if(sub>=15000){ note.style.background='var(--green-100)'; document.getElementById('freeTxt').textContent='Free dispatch unlocked — nice one.'; }
  else { note.style.background='var(--gold-100)'; document.getElementById('freeTxt').textContent=`Add ${NGN(15000-sub)} more for free dispatch`; }
}
window.chg = function(i,d){ cart[i].q+=d; if(cart[i].q<1) cart.splice(i,1); window.renderCart(); }
window.removeItem = function(i){ const n=cart[i].n; cart.splice(i,1); window.renderCart(); window.toast(n+' removed'); }
window.applyPromo = function(){
  const v=(document.getElementById('promoCode').value||'').trim().toUpperCase();
  if(v==='SUYA20'){ window.promoOn=true; window.toast('SUYA20 applied — 20% off'); }
  else window.toast('That code isn\'t valid');
  window.renderCart();
}
window.openCart = function(){ window.renderCart(); document.getElementById('drawer').classList.add('on'); document.getElementById('scrim').classList.add('on'); }
window.closeAll = function(){ document.getElementById('drawer').classList.remove('on'); document.getElementById('modal').classList.remove('on'); document.getElementById('scrim').classList.remove('on'); }
window.checkout = function(){ if(!cart.length){ window.toast('Add something first'); return; } window.toast('Taking you to checkout…'); }

let tT;
window.toast = function(msg){
  const t=document.getElementById('toast');
  if(!t) return;
  document.getElementById('toastTxt').textContent=msg;
  t.classList.add('on'); clearTimeout(tT); tT=setTimeout(()=>t.classList.remove('on'),2600);
}

export function initAppScript(setActiveTab) {
  window.navToLanding = function() {
    if (setActiveTab) setActiveTab('landing');
  };
  
  // bind listeners
  document.querySelectorAll('#sortSeg button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#sortSeg button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); activeSort=b.dataset.sort; renderGrid();
  }));
  document.querySelectorAll('.fchip').forEach(b=>b.addEventListener('click',()=>{
    b.classList.toggle('on');
    b.classList.contains('on') ? activeFilters.add(b.dataset.filter) : activeFilters.delete(b.dataset.filter);
    renderGrid();
  }));
  ['mainSearch','mobSearch'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('input',()=>{ window.showDiscover(true); renderGrid(); });
  });

  document.querySelectorAll('#menuSeg button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#menuSeg button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); menuCat=b.dataset.cat; window.renderDishes();
  }));
  
  const dishSearch = document.getElementById('dishSearch');
  if(dishSearch) dishSearch.addEventListener('input', window.renderDishes);

  document.querySelectorAll('#heat button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#heat button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); modalHeat=b.dataset.h;
  }));
  
  document.querySelectorAll('.sb-item').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.sb-item').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const nav=b.dataset.nav;
    if(nav==='explore') window.showDiscover();
    else if(nav==='support') window.toast('Opening WhatsApp support…');
    else window.toast(nav.charAt(0).toUpperCase()+nav.slice(1)+' — coming up');
  }));
  
  document.querySelectorAll('.bottom-nav .bn').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.bottom-nav .bn').forEach(x=>x.classList.remove('on')); b.classList.add('on');
  }));
  
  const escHandler = e=>{ if(e.key==='Escape') window.closeAll(); };
  document.addEventListener('keydown', escHandler);
  
  renderCats();
  renderAgain();
  renderTrend();
  renderGrid(); 
  window.renderDishes(); 
  window.renderCart();
  
  return () => {
    document.removeEventListener('keydown', escHandler);
  }
}
"""

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(f'''import React, {{ useEffect }} from 'react';
import '../styles/app.css';

const htmlContent = {repr(html_str)};

export default function Dashboard({{ setActiveTab }}: {{ setActiveTab: (tab: string) => void }}) {{
  useEffect(() => {{
    // We append the script code logic here
    const script = document.createElement('script');
    script.innerHTML = {repr(js_script)} + "\\n\\nwindow._cleanup = initAppScript(() => setActiveTab('landing'));";
    document.body.appendChild(script);
    return () => {{
      if (window._cleanup) window._cleanup();
      document.body.removeChild(script);
    }};
  }}, [setActiveTab]);

  return (
    <div className="app-wrap" dangerouslySetInnerHTML={{{{ __html: htmlContent }}}} />
  );
}}
''')
