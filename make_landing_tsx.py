html_str = r"""
<!-- ===== SVG SPRITE: custom Arewa food illustrations ===== -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<defs>
  <!-- Hausa "dagi" interlace pattern -->
  <pattern id="dagi" width="90" height="90" patternUnits="userSpaceOnUse">
    <g fill="none" stroke="#E9A93A" stroke-width="1.5">
      <rect x="22" y="22" width="46" height="46" transform="rotate(45 45 45)"/>
      <rect x="30" y="30" width="30" height="30"/>
      <circle cx="45" cy="45" r="6"/>
      <path d="M0 45h14M76 45h14M45 0v14M45 76v14"/>
    </g>
  </pattern>
  <pattern id="dagiDark" width="90" height="90" patternUnits="userSpaceOnUse">
    <g fill="none" stroke="#0A2E24" stroke-width="1.5">
      <rect x="22" y="22" width="46" height="46" transform="rotate(45 45 45)"/>
      <rect x="30" y="30" width="30" height="30"/>
      <circle cx="45" cy="45" r="6"/>
    </g>
  </pattern>

  <!-- SUYA: charcoal skewers -->
  <symbol id="i-suya" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#3C1108"/>
    <circle cx="60" cy="60" r="43" fill="#5A1E0C"/>
    <g stroke="#C8A16A" stroke-width="3.4" stroke-linecap="round">
      <path d="M26 44h70M26 62h70M26 80h70"/>
    </g>
    <g fill="#8E3415">
      <rect x="34" y="36" width="18" height="17" rx="5"/><rect x="57" y="36" width="18" height="17" rx="5"/><rect x="80" y="37" width="14" height="15" rx="5"/>
      <rect x="30" y="54" width="18" height="17" rx="5"/><rect x="53" y="54" width="18" height="17" rx="5"/><rect x="76" y="55" width="17" height="15" rx="5"/>
      <rect x="34" y="72" width="18" height="17" rx="5"/><rect x="57" y="72" width="18" height="17" rx="5"/><rect x="80" y="73" width="14" height="15" rx="5"/>
    </g>
    <g fill="#B85425" opacity=".85">
      <rect x="34" y="36" width="18" height="7" rx="3.5"/><rect x="57" y="36" width="18" height="7" rx="3.5"/>
      <rect x="30" y="54" width="18" height="7" rx="3.5"/><rect x="53" y="54" width="18" height="7" rx="3.5"/>
      <rect x="34" y="72" width="18" height="7" rx="3.5"/><rect x="57" y="72" width="18" height="7" rx="3.5"/>
    </g>
    <g fill="#E9A93A"><circle cx="42" cy="47" r="1.7"/><circle cx="66" cy="45" r="1.7"/><circle cx="38" cy="65" r="1.7"/><circle cx="62" cy="64" r="1.7"/><circle cx="45" cy="83" r="1.7"/><circle cx="70" cy="81" r="1.7"/><circle cx="86" cy="46" r="1.5"/><circle cx="84" cy="80" r="1.5"/></g>
  </symbol>

  <!-- MASA: rice cakes in pan -->
  <symbol id="i-masa" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#2A1B08"/>
    <circle cx="60" cy="60" r="44" fill="#3D2810"/>
    <g>
      <circle cx="43" cy="43" r="15" fill="#E0B25E"/><circle cx="43" cy="43" r="10.5" fill="#F2D294"/>
      <circle cx="77" cy="43" r="15" fill="#E0B25E"/><circle cx="77" cy="43" r="10.5" fill="#F2D294"/>
      <circle cx="43" cy="77" r="15" fill="#E0B25E"/><circle cx="43" cy="77" r="10.5" fill="#F2D294"/>
      <circle cx="77" cy="77" r="15" fill="#E0B25E"/><circle cx="77" cy="77" r="10.5" fill="#F2D294"/>
      <circle cx="60" cy="60" r="13" fill="#D9A44E"/><circle cx="60" cy="60" r="9" fill="#EFCB88"/>
    </g>
    <g fill="#C08A34" opacity=".6">
      <circle cx="40" cy="40" r="1.6"/><circle cx="47" cy="46" r="1.4"/><circle cx="74" cy="41" r="1.5"/><circle cx="80" cy="46" r="1.3"/>
      <circle cx="41" cy="79" r="1.5"/><circle cx="79" cy="75" r="1.4"/><circle cx="58" cy="58" r="1.4"/>
    </g>
  </symbol>

  <!-- FURA DA NONO: millet + yoghurt cup -->
  <symbol id="i-fura" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#0B3327"/>
    <path d="M38 36h44l-5 52a8 8 0 0 1-8 7H51a8 8 0 0 1-8-7z" fill="#F5F0E2"/>
    <path d="M38 36h44l-1.6 17H39.6z" fill="#FFFDF8"/>
    <path d="M41 58h38l-3.6 30a8 8 0 0 1-8 7H52.6a8 8 0 0 1-8-7z" fill="#EDE4CE"/>
    <g fill="#C99A4E"><circle cx="52" cy="70" r="6"/><circle cx="68" cy="76" r="6.5"/><circle cx="58" cy="86" r="5.5"/><circle cx="70" cy="62" r="4.5"/></g>
    <g fill="#B0803A" opacity=".5"><circle cx="50" cy="68" r="1.4"/><circle cx="70" cy="74" r="1.4"/><circle cx="57" cy="85" r="1.3"/></g>
    <rect x="34" y="30" width="52" height="8" rx="4" fill="#E9A93A"/>
    <g stroke="#E9A93A" stroke-width="2.6" stroke-linecap="round" opacity=".55" fill="none">
      <path d="M50 24c0-5 5-5 5-10M65 24c0-5 5-5 5-10"/>
    </g>
  </symbol>

  <!-- KILISHI: jerky sheets -->
  <symbol id="i-kilishi" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#4A2410"/>
    <circle cx="60" cy="60" r="43" fill="#F1E7D2"/>
    <g>
      <path d="M32 42c12-6 26-6 38-2s18 4 20 10-8 10-20 10-30 4-38-2-6-12 0-16z" fill="#8E3B18"/>
      <path d="M30 68c12-5 26-5 38-1s18 3 20 9-8 9-20 9-30 3-38-2-6-11 0-15z" fill="#A0491F"/>
      <g fill="#C96A32" opacity=".7">
        <ellipse cx="46" cy="49" rx="7" ry="3.4"/><ellipse cx="68" cy="52" rx="8" ry="3.4"/>
        <ellipse cx="44" cy="76" rx="7" ry="3.2"/><ellipse cx="70" cy="78" rx="7.5" ry="3.2"/>
      </g>
      <g fill="#E9A93A"><circle cx="40" cy="45" r="1.6"/><circle cx="60" cy="47" r="1.6"/><circle cx="78" cy="53" r="1.5"/><circle cx="50" cy="73" r="1.6"/><circle cx="76" cy="74" r="1.5"/></g>
    </g>
  </symbol>

  <!-- TUWO SHINKAFA + MIYAN TAUSHE -->
  <symbol id="i-tuwo" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#12291F"/>
    <circle cx="60" cy="60" r="44" fill="#1C3B2C"/>
    <ellipse cx="60" cy="66" rx="36" ry="27" fill="#D97B22"/>
    <ellipse cx="60" cy="63" rx="32" ry="23" fill="#EF9A34"/>
    <ellipse cx="48" cy="55" rx="18" ry="15" fill="#F7F2E4"/>
    <ellipse cx="48" cy="52" rx="15" ry="12" fill="#FFFDF6"/>
    <g fill="#A85416" opacity=".65"><circle cx="74" cy="66" r="4.5"/><circle cx="66" cy="78" r="4"/><circle cx="82" cy="56" r="3.5"/></g>
    <g fill="#2E7D4F"><ellipse cx="72" cy="52" rx="6" ry="3" transform="rotate(-24 72 52)"/><ellipse cx="55" cy="80" rx="5.5" ry="2.8" transform="rotate(16 55 80)"/></g>
  </symbol>

  <!-- KUNUN AYA: tigernut drinks -->
  <symbol id="i-kunun" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="52" fill="#7A4A12"/>
    <circle cx="60" cy="60" r="43" fill="#9A6318"/>
    <g>
      <path d="M40 34h18l-3 54a6 6 0 0 1-6 5.6h0a6 6 0 0 1-6-5.6z" fill="#F6EEDC"/>
      <path d="M41.4 48h15.2l-2.2 40a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#E6D3A8"/>
      <path d="M62 40h18l-3 48a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#FBF5E6"/>
      <path d="M63.4 54h15.2l-2.2 34a6 6 0 0 1-6 5.6 6 6 0 0 1-6-5.6z" fill="#EFE0BC"/>
    </g>
    <g fill="#C79A4C" opacity=".7"><circle cx="48" cy="66" r="2.6"/><circle cx="52" cy="78" r="2.2"/><circle cx="70" cy="68" r="2.6"/><circle cx="74" cy="80" r="2.2"/></g>
    <g stroke="#DF5F49" stroke-width="3.6" stroke-linecap="round"><path d="M50 34V22M72 40V27"/></g>
  </symbol>

  <!-- Kitchen / building arch -->
  <symbol id="i-arch" viewBox="0 0 120 120">
    <rect x="14" y="52" width="92" height="56" rx="6" fill="#0F4132"/>
    <path d="M60 16 96 52H24z" fill="#166049"/>
    <g fill="#E9A93A"><circle cx="60" cy="34" r="6"/></g>
    <g fill="#0A2E24"><path d="M48 108V80a12 12 0 0 1 24 0v28z"/></g>
    <g fill="#E9A93A" opacity=".9"><rect x="28" y="66" width="12" height="16" rx="6"/><rect x="80" y="66" width="12" height="16" rx="6"/></g>
    <g fill="#F6CE7C" opacity=".55"><rect x="30" y="90" width="10" height="10" rx="3"/><rect x="80" y="90" width="10" height="10" rx="3"/></g>
  </symbol>

  <!-- avatars -->
  <symbol id="a1" viewBox="0 0 80 80"><rect width="80" height="80" fill="#166049"/><circle cx="40" cy="31" r="15" fill="#8A5A32"/><path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill="#E9A93A"/><path d="M25 28c0-12 30-12 30 0 0 4-4-6-15-6s-15 10-15 6z" fill="#241608"/></symbol>
  <symbol id="a2" viewBox="0 0 80 80"><rect width="80" height="80" fill="#DF5F49"/><circle cx="40" cy="31" r="15" fill="#7B4E2B"/><path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill="#0F4132"/><path d="M22 32c0-16 36-16 36 0 0 6-3 8-4 4-3-11-25-11-28 0-1 4-4 2-4-4z" fill="#2A1A0C"/></symbol>
  <symbol id="a3" viewBox="0 0 80 80"><rect width="80" height="80" fill="#E9A93A"/><circle cx="40" cy="31" r="15" fill="#6E4426"/><path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill="#0A2E24"/><path d="M24 30c2-14 32-14 32 2 0 5-5-4-16-4s-14 8-16 2z" fill="#1C1006"/></symbol>
  <symbol id="a4" viewBox="0 0 80 80"><rect width="80" height="80" fill="#0F4132"/><circle cx="40" cy="31" r="15" fill="#8A5A32"/><path d="M40 50c16 0 26 10 26 30H14c0-20 10-30 26-30z" fill="#F6CE7C"/><path d="M23 34c-2-18 36-18 34 0-1 8-6-2-17-2s-16 10-17 2z" fill="#2A1A0C"/></symbol>
</defs>
</svg>

<!-- ===== NAV ===== -->
<header class="nav">
  <div class="wrap nav-in">
    <a href="#" class="logo">kanoeats<i></i></a>
    <nav class="nav-links">
      <a href="#how">How it works</a>
      <a href="#featured">Kitchens</a>
      <a href="#catering">Catering</a>
      <a href="#coverage">Coverage</a>
      <a href="#faq">FAQs</a>
    </nav>
    <div class="nav-cta">
      <a href="#" class="btn btn-ghost">Sign in</a>
      <a href="#" class="btn btn-clay" onclick="window.navToApp();return false;">Order now
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
    <button class="menu-btn" aria-label="Menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
</header>

<!-- ===== HERO ===== -->
<div class="hero">
  <div class="wrap">
    <div class="hero-panel">
      <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
      <svg class="steam s1" width="70" height="70" viewBox="0 0 60 60" fill="none" stroke="#E9A93A" stroke-width="2.2" stroke-linecap="round">
        <path d="M18 30c0-8 8-8 8-16M30 30c0-8 8-8 8-16M42 30c0-8 8-8 8-16"/><path d="M10 36h44a24 24 0 0 1-44 0z"/></svg>
      <svg class="steam s2" width="62" height="62" viewBox="0 0 60 60" fill="none" stroke="#E9A93A" stroke-width="2.2" stroke-linecap="round">
        <path d="M12 42 48 18M20 20l6 4M34 40l6 4"/><circle cx="15" cy="45" r="4"/><circle cx="45" cy="15" r="4"/></svg>

      <span class="hero-eyebrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
        Kano · Kaduna · Abuja · Lagos
      </span>
      <h1>Your favourite Northern<br>delicacies, served
        <span class="hot"><span>hot</span><span class="halal-tag">100% HALAL</span></span>
      </h1>
      <p>From fluffy pan-fired Masa to charcoal-roasted Tsire Suya and thick Miyan Taushe — real Arewa kitchens, delivered to your doorstep with pristine hospitality.</p>

      <form class="searchbar" onsubmit="return false">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#9AA8A0" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="text" placeholder="Search Masa, Suya, Tuwo Shinkafa, or Kilishi…" aria-label="Search dishes">
        <button class="btn btn-gold" onclick="window.navToApp();">Nemi Abinci</button>
      </form>
      <p class="hero-alt">or <a href="#" onclick="window.navToApp();return false;">explore all kitchens →</a></p>
    </div>

    <!-- Dish strip -->
    <div class="dish-strip">
      <article class="dish d1 rv">
        <span class="badge b-gold">Yaji spiced</span>
        <svg class="art" viewBox="0 0 120 120"><use href="#i-suya"/></svg>
        <span class="kick">Hot charcoal</span>
        <h3>Tsire Beef Suya</h3>
        <p>Aromatic charcoal-roasted beef dusted with freshly milled groundnut yaji.</p>
      </article>
      <article class="dish d2 rv" style="transition-delay:.09s">
        <span class="badge b-green">Arewa classic</span>
        <svg class="art" viewBox="0 0 120 120"><use href="#i-masa"/></svg>
        <span class="kick">Pumpkin feast</span>
        <h3>Fluffy Rice Masa</h3>
        <p>Fermented round rice cakes fired in authentic oil pan grillers.</p>
      </article>
      <article class="dish d3 rv" style="transition-delay:.18s">
        <span class="badge b-cream">Smooth &amp; chill</span>
        <svg class="art" viewBox="0 0 120 120"><use href="#i-fura"/></svg>
        <span class="kick">100% creamy</span>
        <h3>Fura da Nono</h3>
        <p>Millet grain cakes folded into thick, cold, fresh cow-milk yoghurt.</p>
      </article>
    </div>
  </div>
</div>

<!-- ===== HOW IT WORKS ===== -->
<section id="how">
  <div class="wrap">
    <div class="sec-head rv">
      <span class="kicker">Simple as it gets</span>
      <h2>From the grill to your <span class="mark">doorstep</span></h2>
      <p>Four steps between you and a plate that tastes like home.</p>
    </div>
    <div class="steps">
      <article class="step rv">
        <span class="step-n">1</span>
        <div class="step-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M4 15h16M7 19h10"/></svg></div>
        <h4>Choose a kitchen</h4>
        <p>Browse verified Arewa kitchens near you — Suya spots, Masa houses, Tuwo joints and more.</p>
      </article>
      <article class="step rv" style="transition-delay:.08s">
        <span class="step-n">2</span>
        <div class="step-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 8h14M7 13h10"/><circle cx="12" cy="12" r="9"/></svg></div>
        <h4>Customise your plate</h4>
        <p>Set your yaji heat level, add kilishi on the side, and pick portion sizes made just how you like.</p>
      </article>
      <article class="step rv" style="transition-delay:.16s">
        <span class="step-n">3</span>
        <div class="step-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M9 15h6"/></svg></div>
        <h4>Place your order</h4>
        <p>Pay by card, transfer or on delivery. Schedule ahead for Iftar or a Sallah gathering.</p>
      </article>
      <article class="step rv" style="transition-delay:.24s">
        <span class="step-n">4</span>
        <div class="step-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A5F10" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h6M6 14V9h5l3 5M14 9h3l1 5"/></svg></div>
        <h4>Delivered hot</h4>
        <p>Track your rider live from the grill to your gate. Insulated packs keep it steaming.</p>
      </article>
    </div>
  </div>
</section>

<!-- ===== FEATURED KITCHENS ===== -->
<section id="featured" style="padding-top:0">
  <div class="wrap">
    <div class="feat-top rv">
      <div>
        <span class="kicker">Trusted grills</span>
        <h2>Featured kitchens</h2>
      </div>
      <a href="#" class="btn btn-gold" onclick="window.navToApp();return false;">Explore all</a>
    </div>
    <div class="chips rv">
      <button class="chip on">All dishes</button>
      <button class="chip">Masa (Waina)</button>
      <button class="chip">Tsire Suya</button>
      <button class="chip">Tuwo Shinkafa</button>
      <button class="chip">Kilishi</button>
      <button class="chip">Kunun Aya</button>
      <button class="chip">Halal grill</button>
      <button class="chip">Arewa drinks</button>
    </div>
    <div class="rests">
      <article class="rest rv">
        <div class="rest-art" style="background:linear-gradient(150deg,#F2E8D7,#E4D5B8)">
          <span class="rate"><svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>4.9</span>
          <button class="heart" aria-label="Save"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg></button>
          <svg viewBox="0 0 120 120"><use href="#i-arch"/></svg>
        </div>
        <div class="rest-body">
          <h4>Gidan Arewa</h4>
          <div class="rest-meta">Traditional Hausa kitchen <span class="dot"></span> 20 min</div>
          <div class="tags"><span class="tag t-halal">HALAL</span><span class="tag t-trad">TRADITIONAL</span></div>
        </div>
      </article>
      <article class="rest rv" style="transition-delay:.07s">
        <div class="rest-art" style="background:linear-gradient(150deg,#F6E3D8,#EACBB6)">
          <span class="rate"><svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>4.8</span>
          <button class="heart" aria-label="Save"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg></button>
          <svg viewBox="0 0 120 120"><use href="#i-suya"/></svg>
        </div>
        <div class="rest-body">
          <h4>Kano Suya Palace</h4>
          <div class="rest-meta">Arewa flame BBQ <span class="dot"></span> 15 min</div>
          <div class="tags"><span class="tag t-halal">HALAL</span><span class="tag t-spicy">SPICY</span></div>
        </div>
      </article>
      <article class="rest rv" style="transition-delay:.14s">
        <div class="rest-art" style="background:linear-gradient(150deg,#FAEBD3,#EFD8A9)">
          <span class="rate"><svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>4.7</span>
          <button class="heart" aria-label="Save"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg></button>
          <svg viewBox="0 0 120 120"><use href="#i-tuwo"/></svg>
        </div>
        <div class="rest-body">
          <h4>Bukkah Palace</h4>
          <div class="rest-meta">Local fusion <span class="dot"></span> 25 min</div>
          <div class="tags"><span class="tag t-halal">HALAL</span><span class="tag t-spicy">SPICY</span></div>
        </div>
      </article>
      <article class="rest rv" style="transition-delay:.21s">
        <div class="rest-art" style="background:linear-gradient(150deg,#E6F0E4,#CFE3D2)">
          <span class="rate"><svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>4.6</span>
          <button class="heart on" aria-label="Save"><svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="2"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg></button>
          <svg viewBox="0 0 120 120"><use href="#i-kunun"/></svg>
        </div>
        <div class="rest-body">
          <h4>Arewa Oasis Drinks</h4>
          <div class="rest-meta">Naturally nourishing <span class="dot"></span> 18 min</div>
          <div class="tags"><span class="tag t-halal">HALAL</span><span class="tag t-veg">VEGAN</span></div>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ===== MEET THE KITCHENS ===== -->
<section class="kitchens-sec">
  <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
  <div class="wrap">
    <div class="sec-head rv">
      <span class="kicker">The people behind the pot</span>
      <h2>Meet the kitchens</h2>
      <p>Every kitchen on KanoEats is visited, verified and vouched for. These are the hands that cook your food.</p>
    </div>
    <div class="kitchens">
      <article class="kit rv">
        <div class="kit-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a1"/></svg></div>
        <h4>Malam Sani Yusuf</h4>
        <div class="role">Mai Suya · Kano Suya Palace</div>
        <p>Learned the yaji blend from his father at Sabon Gari market. He still grinds his groundnut spice fresh every single morning before the coals are lit.</p>
        <span class="yrs">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6CE7C" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          22 years at the grill
        </span>
      </article>
      <article class="kit rv" style="transition-delay:.09s">
        <div class="kit-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a2"/></svg></div>
        <h4>Hajiya Amina Bello</h4>
        <div class="role">Head cook · Gidan Arewa</div>
        <p>Her Miyan Taushe recipe has fed three generations. She insists on hand-pounded pumpkin — no blender touches her pot, and you can taste the difference.</p>
        <span class="yrs">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6CE7C" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          30 years cooking
        </span>
      </article>
      <article class="kit rv" style="transition-delay:.18s">
        <div class="kit-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a3"/></svg></div>
        <h4>Ibrahim Danjuma</h4>
        <div class="role">Founder · Arewa Oasis Drinks</div>
        <p>Sources tigernuts directly from farmers around Kano State and blends kunun aya the slow way — soaked overnight, never rushed, never powdered.</p>
        <span class="yrs">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F6CE7C" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          11 years brewing
        </span>
      </article>
    </div>
  </div>
</section>

<!-- ===== CATERING ===== -->
<section id="catering">
  <div class="wrap split">
    <div class="rv">
      <span class="kicker">Bulk &amp; events</span>
      <h2>Feeding two hundred guests? <span class="mark">We've done it.</span></h2>
      <p class="lead">Weddings, naming ceremonies, Sallah gatherings and corporate Iftar. Our kitchens cook at scale without losing what makes the food taste like home.</p>
      <div class="occ">
        <div class="occ-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2" stroke-linecap="round"><path d="M12 21s-7-4.8-7-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 16.2 12 21 12 21z"/></svg>
          Wedding fatiha
        </div>
        <div class="occ-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2" stroke-linecap="round"><path d="M12 3v18M5 8h14M7 13h10"/></svg>
          Naming ceremony
        </div>
        <div class="occ-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#166049" stroke-width="2" stroke-linecap="round"><path d="M17 8a5 5 0 1 1-5-5 4 4 0 0 0 5 5z"/><circle cx="18" cy="6" r="1.2" fill="#166049"/></svg>
          Sallah &amp; Iftar
        </div>
        <div class="occ-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F4132" stroke-width="2" stroke-linecap="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          Corporate lunch
        </div>
      </div>
      <a href="#" class="btn btn-clay" onclick="window.navToApp();return false;">Request a catering quote
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
    <div class="cater-art rv">
      <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagiDark)"/></svg>
      <div class="plate-stack">
        <svg width="230" height="230" viewBox="0 0 120 120"><use href="#i-masa"/></svg>
      </div>
      <div class="float-card fc1"><b>Serves 50–500</b><span>Trays, warmers &amp; servers included</span></div>
      <div class="float-card fc2"><b>72hr notice</b><span>Rush orders available on request</span></div>
    </div>
  </div>
</section>

<!-- ===== SEASONAL ===== -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="sec-head rv">
      <span class="kicker">Limited season</span>
      <h2>Boxes for the <span class="mark">holy days</span></h2>
      <p>Ramadan, Sallah and harvest season specials — order early, they always sell out.</p>
    </div>
    <div class="season">
      <article class="sea a rv">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
        <svg class="sea-art" viewBox="0 0 120 120"><use href="#i-fura"/></svg>
        <div>
          <h4>Iftar Family Box</h4>
          <p>Dates, kunun aya, fura da nono, masa and a warm main — timed to arrive before Maghrib.</p>
        </div>
        <div class="price"><b>₦18,500</b><s>₦22,000</s></div>
      </article>
      <article class="sea b rv" style="transition-delay:.09s">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
        <svg class="sea-art" viewBox="0 0 120 120"><use href="#i-kilishi"/></svg>
        <div>
          <h4>Sallah Kilishi Gift Set</h4>
          <p>Hand-cut kilishi sheets and dankwa, boxed in woven raffia with a personal note card.</p>
        </div>
        <div class="price"><b>₦12,000</b><s>₦15,000</s></div>
      </article>
      <article class="sea c rv" style="transition-delay:.18s">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagiDark)"/></svg>
        <svg class="sea-art" viewBox="0 0 120 120"><use href="#i-masa"/></svg>
        <div>
          <h4>Masa Morning Bundle</h4>
          <p>Two dozen fresh masa with yaji, honey and a flask of hot kunun zaki for the whole house.</p>
        </div>
        <div class="price"><b>₦9,800</b><s>₦11,500</s></div>
      </article>
    </div>
  </div>
</section>

<!-- ===== COVERAGE ===== -->
<section id="coverage" style="padding-top:0">
  <div class="wrap">
    <div class="cover rv">
      <div>
        <span class="kicker">Where we ride</span>
        <h2 style="font-size:clamp(26px,3.2vw,38px);color:var(--green-900)">Delivery coverage</h2>
        <p style="color:var(--muted);margin-top:14px;font-size:15px">Free dispatch on orders above ₦15,000 within Kano Metropolis. Riders run from 8:00am to 11:00pm daily.</p>
        <div class="zones">
          <div class="zone"><div><b>Kano Metropolis</b><br><span>Nassarawa, Fagge, Sabon Gari, Bompai</span></div><span class="live"><i class="pulse"></i>LIVE</span></div>
          <div class="zone"><div><b>Kaduna</b><br><span>Barnawa, Ungwan Rimi, Kawo</span></div><span class="live"><i class="pulse"></i>LIVE</span></div>
          <div class="zone"><div><b>Abuja</b><br><span>Wuse, Garki, Gwarinpa, Maitama</span></div><span class="live"><i class="pulse"></i>LIVE</span></div>
          <div class="zone"><div><b>Lagos</b><br><span>Lekki, Ikoyi, VI, Yaba</span></div><span style="font-size:11.5px;font-weight:700;color:#B08320">SOON</span></div>
        </div>
      </div>
      <div class="map-box">
        <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
        <svg viewBox="0 0 320 260" width="100%" style="position:relative;max-width:340px">
          <g stroke="rgba(233,169,58,.28)" stroke-width="1" fill="none">
            <path d="M0 70h320M0 130h320M0 190h320M80 0v260M160 0v260M240 0v260"/>
          </g>
          <path d="M60 180c30-40 60-20 90-60s70-30 100-10" stroke="#E9A93A" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="7 7">
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="indefinite"/>
          </path>
          <circle cx="60" cy="180" r="9" fill="#DF5F49"/><circle cx="60" cy="180" r="17" fill="#DF5F49" opacity=".24"/>
          <circle cx="250" cy="110" r="9" fill="#E9A93A"/>
          <g fill="#F6CE7C" opacity=".85">
            <circle cx="130" cy="140" r="4.5"/><circle cx="190" cy="90" r="4.5"/><circle cx="105" cy="200" r="4.5"/><circle cx="215" cy="175" r="4.5"/>
          </g>
          <text x="60" y="212" fill="#F6CE7C" font-family="Archivo,sans-serif" font-size="11" text-anchor="middle">Kitchen</text>
          <text x="250" y="142" fill="#F6CE7C" font-family="Archivo,sans-serif" font-size="11" text-anchor="middle">You</text>
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- ===== TESTIMONIALS ===== -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="sec-head rv">
      <span class="kicker">From our people</span>
      <h2>Talk of the <span class="mark">town</span></h2>
    </div>
    <div class="rail-wrap rv">
      <div class="rail" id="rail">
        <article class="quote">
          <div class="qm">"</div>
          <p>I moved to Lagos six years ago and nothing tasted like home until this. The masa arrived still warm and my mother said the taushe was seasoned properly — that's the highest praise in my family.</p>
          <div class="who">
            <div class="who-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a2"/></svg></div>
            <div>
              <div class="stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
              </div>
              <b>Fatima A.</b><span>Lekki, Lagos</span>
            </div>
          </div>
        </article>
        <article class="quote">
          <div class="qm">"</div>
          <p>Ordered the Iftar box for twelve people during Ramadan. It landed fifteen minutes before Maghrib exactly as promised. That kind of timing is the whole game — I've booked them for every remaining week.</p>
          <div class="who">
            <div class="who-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a1"/></svg></div>
            <div>
              <div class="stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
              </div>
              <b>Musa I.</b><span>Nassarawa, Kano</span>
            </div>
          </div>
        </article>
        <article class="quote">
          <div class="qm">"</div>
          <p>We catered our daughter's naming ceremony through KanoEats — two hundred guests, zero stress. The servers arrived early, the warmers actually worked, and there was still kilishi left for the drive home.</p>
          <div class="who">
            <div class="who-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a4"/></svg></div>
            <div>
              <div class="stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
              </div>
              <b>Zainab &amp; Kabir O.</b><span>Barnawa, Kaduna</span>
            </div>
          </div>
        </article>
        <article class="quote">
          <div class="qm">"</div>
          <p>The suya is the real thing — properly charred, groundnut spice ground fresh, not that sandy powder you get elsewhere. My office orders it every Friday now and it's become a small institution.</p>
          <div class="who">
            <div class="who-face"><svg viewBox="0 0 80 80" width="100%" height="100%"><use href="#a3"/></svg></div>
            <div>
              <div class="stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E9A93A"><path d="M12 2 15 9l7 .6-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.8L2 9.6 9 9z"/></svg>
              </div>
              <b>Halima B.</b><span>Wuse II, Abuja</span>
            </div>
          </div>
        </article>
      </div>
      <div class="rail-btns">
        <button class="rbtn" onclick="window.scrollRail(-1)" aria-label="Previous"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2.2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg></button>
        <button class="rbtn" onclick="window.scrollRail(1)" aria-label="Next"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#14201B" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg></button>
      </div>
    </div>
  </div>
</section>

<!-- ===== FAQ ===== -->
<section id="faq" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head rv">
      <span class="kicker">Good to know</span>
      <h2>Got questions? We've got <span class="mark">answers</span></h2>
    </div>
    <div class="faq rv">
      <div class="q open">
        <button class="q-btn">Is all food listed on KanoEats 100% halal?
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="q-a"><p>Yes. Every kitchen on the platform is physically visited and verified before listing, and each carries a halal certification we re-check annually. Meat is sourced from certified abattoirs only. Kitchens that cannot demonstrate compliance are not listed — there are no exceptions.</p></div>
      </div>
      <div class="q">
        <button class="q-btn">What traditional Hausa delicacies can I get here?
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="q-a"><p>Tsire and balangu suya, masa (waina), tuwo shinkafa with miyan taushe or miyan kuka, dambu nama, kilishi, dankwa, kunun aya, kunun zaki and fura da nono — plus grills, continental options and sides from our fusion kitchens.</p></div>
      </div>
      <div class="q">
        <button class="q-btn">Do you deliver to my neighbourhood?
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="q-a"><p>We currently ride across Kano Metropolis, Kaduna and Abuja, with Lagos opening soon. Enter your address in the app and you'll see live kitchens and honest delivery times for your exact location before you order.</p></div>
      </div>
      <div class="q">
        <button class="q-btn">What payment methods do you accept?
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="q-a"><p>Card, bank transfer, USSD and cash on delivery. Promo codes and KanoEats wallet credit can be applied at checkout. For catering orders above ₦150,000 we accept a 50% deposit with the balance on the day.</p></div>
      </div>
      <div class="q">
        <button class="q-btn">Can I schedule an order for Iftar or an event?
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="q-a"><p>Yes. Pick a delivery slot at checkout, and during Ramadan you can select "Deliver before Maghrib" — we calculate the timing for your city automatically. Catering orders need 72 hours' notice, though rush requests are often possible.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== PARTNER ===== -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="partner rv">
      <svg class="pattern" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
      <span class="kicker" style="color:var(--gold);position:relative">For kitchen owners</span>
      <h2>Cook well? Let's fill your grill.</h2>
      <p>Join the kitchens already serving thousands of Arewa food lovers every week. No setup fee, transparent commission, and payouts every Friday.</p>
      <div class="btns">
        <a href="#" class="btn btn-gold" onclick="window.navToApp();return false;">Partner with us</a>
        <a href="#" class="btn btn-ghost" style="background:transparent;border-color:rgba(255,255,255,.28);color:#fff" onclick="return false;">Download rate card</a>
      </div>
      <div class="stat-row">
        <div class="stat"><b>48+</b><span>VERIFIED KITCHENS</span></div>
        <div class="stat"><b>26k</b><span>ORDERS DELIVERED</span></div>
        <div class="stat"><b>18min</b><span>AVERAGE DELIVERY</span></div>
        <div class="stat"><b>4.8★</b><span>AVERAGE RATING</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== NEWSLETTER ===== -->
<div class="news">
  <div class="wrap news-in">
    <div class="rv" style="position:relative">
      <div class="phone">
        <div class="notch"></div>
        <div class="phone-scr">
          <div class="ph-top"><b>Order #KE-4821</b><span>Kano Suya Palace · 2 items</span></div>
          <div class="ph-card">
            <svg width="30" height="30" viewBox="0 0 120 120"><use href="#i-suya"/></svg>
            <div><b>Tsire Beef Suya</b><span>Extra yaji · ₦3,500</span></div>
          </div>
          <div class="ph-card">
            <svg width="30" height="30" viewBox="0 0 120 120"><use href="#i-kunun"/></svg>
            <div><b>Kunun Aya</b><span>Chilled · ₦1,000</span></div>
          </div>
          <div class="ph-track">
            <b>Rider on the way</b><span>Arriving in 9 minutes</span>
            <div class="ph-bar"><i></i></div>
          </div>
        </div>
      </div>
      <div class="pill-float pf1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF5F49" stroke-width="2.2" stroke-linecap="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>
        <div><b>Arrived hot</b><span>18 Jibowu St.</span></div>
      </div>
      <div class="pill-float pf2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166049" stroke-width="2.2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
        <div><b>Halal verified</b><span>Kitchen #12</span></div>
      </div>
    </div>
    <div class="rv" style="transition-delay:.1s">
      <span class="kicker">Weekly, never spammy</span>
      <h2>Subscribe for Gidan Arewa deals</h2>
      <p>Traditional recipes, discounts on flame-grilled Tsire Suya, first access to holiday Masa gift boxes, and invitations to our live kitchen events.</p>
      <form class="sub" onsubmit="return false">
        <input type="email" placeholder="Your email here" aria-label="Email address">
        <button class="btn btn-gold">Subscribe
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </form>
      <p class="note">One email a week. Unsubscribe any time — no hard feelings.</p>
    </div>
  </div>
</div>

<!-- ===== FOOTER ===== -->
<footer>
  <svg class="pattern" width="100%" height="100%" style="opacity:.07"><rect width="100%" height="100%" fill="url(#dagi)"/></svg>
  <div class="wrap">
    <div class="f-grid">
      <div>
        <a href="#" class="logo">kanoeats<i></i></a>
        <p class="f-about">KanoEats serves the vibrant Hausa community and Arewa food lovers with warm hospitality. From fluffy pan-fried Waina to charcoal-roasted Tsire Suya, we serve our heritage with pure trust.</p>
        <div class="socials">
          <a href="#" class="soc" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2"><path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" class="soc" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" class="soc" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.1M12 17v-3.5a2 2 0 0 1 4 0V17"/></svg></a>
          <a href="#" class="soc" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E9A93A" stroke-width="2" stroke-linecap="round"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
        </div>
      </div>
      <div>
        <div class="f-h">Navigation</div>
        <a class="f-link" href="#how">How it works</a>
        <a class="f-link" href="#featured">Kitchens</a>
        <a class="f-link" href="#catering">Catering</a>
        <a class="f-link" href="#coverage">Coverage</a>
        <a class="f-link" href="#faq">FAQs</a>
      </div>
      <div>
        <div class="f-h">Contact us</div>
        <p class="f-contact">
          <b>Gidan Arewa Mansion</b>
          Post Office Road, Fagge<br>Kano State, Nigeria<br><br>
          +234 812 345 6789<br>
          <a href="mailto:hello@kanoeats.com.ng">hello@kanoeats.com.ng</a><br>
          <a href="#" style="color:#7ED9A8">WhatsApp support →</a>
        </p>
      </div>
      <div>
        <div class="f-h">Company</div>
        <a class="f-link" href="#" onclick="window.navToApp();return false;">Partner with us</a>
        <a class="f-link" href="#">Ride with us</a>
        <a class="f-link" href="#">Careers</a>
        <a class="f-link" href="#">Privacy policy</a>
        <a class="f-link" href="#">Terms of service</a>
      </div>
    </div>
    <div class="f-bot">
      <span>© 2026 KanoEats. All rights reserved.</span>
      <span>Made with warmth in Kano 🇳🇬</span>
    </div>
  </div>
</footer>
"""

js_script = r"""
export function initLandingScript(setActiveTab) {
  window.navToApp = function() {
    if(setActiveTab) setActiveTab('restaurants');
  };

  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12, rootMargin:'0px 0px -40px'});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));

  document.querySelectorAll('.q-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const q = btn.parentElement;
      const open = q.classList.contains('open');
      document.querySelectorAll('.q').forEach(x=>{x.classList.remove('open');x.querySelector('.q-a').style.maxHeight=null;});
      if(!open){ q.classList.add('open'); q.querySelector('.q-a').style.maxHeight = q.querySelector('.q-a').scrollHeight+'px'; }
    });
  });
  const first = document.querySelector('.q.open');
  if(first) first.querySelector('.q-a').style.maxHeight = first.querySelector('.q-a').scrollHeight+'px';

  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('on')); c.classList.add('on');
  }));

  document.querySelectorAll('.heart').forEach(h=>h.addEventListener('click',e=>{
    e.preventDefault(); h.classList.toggle('on');
    if(h.classList.contains('on')){ h.querySelector('svg').setAttribute('fill','#fff'); h.querySelector('svg').setAttribute('stroke','#fff'); }
    else { h.querySelector('svg').setAttribute('fill','none'); h.querySelector('svg').setAttribute('stroke','#DF5F49'); }
  }));

  window.scrollRail = function(dir){
    const r = document.getElementById('rail');
    if(r) r.scrollBy({left: dir * (r.querySelector('.quote').offsetWidth + 22), behavior:'smooth'});
  }
  
  return () => {
    io.disconnect();
  };
}
"""

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(f'''import React, {{ useEffect }} from 'react';
import '../styles/landing.css';

const htmlContent = {repr(html_str)};

export default function LandingPage({{ setActiveTab }}: {{ setActiveTab: (tab: string) => void }}) {{
  useEffect(() => {{
    const script = document.createElement('script');
    script.innerHTML = {repr(js_script)} + "\\n\\nwindow._cleanupLanding = initLandingScript(() => setActiveTab('restaurants'));";
    document.body.appendChild(script);
    return () => {{
      if (window._cleanupLanding) window._cleanupLanding();
      document.body.removeChild(script);
    }};
  }}, [setActiveTab]);

  return (
    <div className="landing-wrap" dangerouslySetInnerHTML={{{{ __html: htmlContent }}}} />
  );
}}
''')
