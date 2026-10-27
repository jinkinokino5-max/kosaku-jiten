// 図解（すべて viewBox 0 0 160 100）。--a はその技法の動詞の色。紙＝白、手を入れる所＝色。
(() => {
const K = "#141414";
const S = `stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const W = `fill="#fff" ${S}`, C = `fill="var(--a)" ${S}`, N = `fill="none" ${S}`;
const T = `fill="none" stroke="${K}" stroke-width="1.6" stroke-linecap="round"`;
const DASH = `fill="none" stroke="${K}" stroke-width="2.5" stroke-dasharray="5 4"`;
const AR = `<path d="M70 50h16m-6-6 6 6-6 6" ${N}/>`;
const range = n => [...Array(n).keys()];
const f = n => n.toFixed(1);
const poly = pts => "M" + pts.map(p => f(p[0]) + " " + f(p[1])).join("L") + "Z";

// 紙の帯（太い線を白抜きで描く）
const strip = (d, w = 7) => `<path d="${d}" fill="none" stroke="${K}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const spiral = (cx, cy, r, turns) => "M" + range(turns * 24 + 1).map(i => {
  const t = i / (turns * 24), a = t * turns * 2 * Math.PI;
  return f(cx + r * t * Math.cos(a)) + " " + f(cy + r * t * Math.sin(a)); }).join("L");
const star = (cx, cy, r1, r2, n = 5) => poly(range(n * 2).map(i => {
  const r = i % 2 ? r2 : r1, a = Math.PI * i / n - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }));
// ちぎった縁のようなギザギザの形
const fuzzy = (cx, cy, r, amp = 2, n = 40) => poly(range(n).map(i => {
  const a = 2 * Math.PI * i / n, rr = r + (i % 2 ? amp : -amp * .6) + Math.sin(i * 1.7) * amp * .8;
  return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; }));
const hex = (cx, cy, s) => poly(range(6).map(k => [cx + s * Math.cos(Math.PI / 6 + k * Math.PI / 3), cy + s * Math.sin(Math.PI / 6 + k * Math.PI / 3)]));
const cube = (cx, cy, s, top = W, left = C, right = W) => {
  const h = s * .58;
  return `<path d="${poly([[cx, cy - h * 2], [cx + s, cy - h], [cx, cy], [cx - s, cy - h]])}" ${top}/>` +
    `<path d="${poly([[cx - s, cy - h], [cx, cy], [cx, cy + s * 1.15], [cx - s, cy + s * 1.15 - h]])}" ${left}/>` +
    `<path d="${poly([[cx, cy], [cx + s, cy - h], [cx + s, cy + s * 1.15 - h], [cx, cy + s * 1.15]])}" ${right}/>`;
};
const leaf = (cx, cy, s) => `M${cx - s} ${cy + s * .6}C${cx - s} ${cy - s * .4} ${cx} ${cy - s} ${cx + s} ${cy - s * .9}C${cx + s * .9} ${cy} ${cx} ${cy + s * .8} ${cx - s} ${cy + s * .6}Z`;
const fish = (cx, cy, dir) => { const d = dir; // dir=1 右向き, -1 左向き
  return `M${cx + 22 * d} ${cy}Q${cx} ${cy - 16} ${cx - 12 * d} ${cy}Q${cx} ${cy + 16} ${cx + 22 * d} ${cy}Z` +
    `M${cx - 10 * d} ${cy}L${cx - 24 * d} ${cy - 10}L${cx - 24 * d} ${cy + 10}Z`; };

const F = {
  suji: `<rect x="8" y="22" width="54" height="58" ${W}/><path d="M33 22v58" ${DASH}/><rect x="35" y="12" width="10" height="78" ${C}/>
    <path d="M22 66 33 44" stroke="${K}" stroke-width="6" stroke-linecap="round"/>${AR}
    <path d="M98 84 120 22 124 90Z" ${W}/><path d="M120 22 152 80 124 90Z" ${C}/>`,

  jabara: `<rect x="6" y="28" width="58" height="44" ${W}/>${[20.5, 35, 49.5].map((x, i) => `<path d="M${x} 28v44" ${i % 2 ? T : DASH}/>`).join("")}${AR}
    ${range(4).map(i => { const x0 = 92 + 15 * i, x1 = x0 + 15, y0 = i % 2 ? 26 : 40, y1 = i % 2 ? 40 : 26;
      return `<path d="${poly([[x0, y0], [x1, y1], [x1, y1 + 36], [x0, y0 + 36]])}" ${i % 2 ? C : W}/>`; }).join("")}`,

  miura: range(4).map(i => range(4).map(j => { const xs = r => 26 + 28 * j + (r % 2 ? 8 : 0), y = r => 14 + 18 * r;
    return `<path d="${poly([[xs(i), y(i)], [xs(i) + 28, y(i)], [xs(i + 1) + 28, y(i + 1)], [xs(i + 1), y(i + 1)]])}" ${(i + j) % 2 ? C : W}/>`; }).join("")).join(""),

  unit: cube(80, 56, 32) + `<path d="M48 38 80 75M80 75 112 38M80 19 80 56" ${DASH}/>`,

  kyokusen: `${[34, 26, 18, 10].map((r, i) => `<circle cx="36" cy="50" r="${r}" ${i ? (i % 2 ? DASH : N) : W}/>`).join("")}${AR}
    <path d="M94 34Q122 66 152 34L150 76Q122 44 96 76Z" ${C}/><path d="M95 48Q122 70 151 48M95 62Q122 50 151 62" ${T}/>`,

  tsutsu: `<rect x="8" y="24" width="50" height="52" ${W}/><rect x="50" y="24" width="8" height="52" ${C}/>${AR}
    <path d="M98 30v44a22 8 0 0 0 44 0V30" ${W}/><ellipse cx="120" cy="30" rx="22" ry="8" ${C}/><path d="M131 37v44" ${T}/>`,

  curl: `<rect x="6" y="40" width="60" height="10" ${W}/><rect x="30" y="50" width="12" height="26" ${C}/><path d="M42 30H14m6-6-6 6 6 6" ${N}/>${AR}
    ${strip(spiral(124, 50, 30, 2) , 5)}`,

  momi: `<rect x="8" y="24" width="54" height="54" ${W}/>${AR}<path d="${fuzzy(122, 50, 26, 4.5, 18)}" ${C}/>
    <path d="M108 40l10 8 12-10M112 62l9-8 13 6M120 30l-2 18 6 16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,

  monkiri: `<path d="M10 82H62L10 22Z" ${W}/><path d="M24 82C28 60 46 62 46 70M10 50c10 0 14 10 8 16" ${DASH}/>${AR}
    ${range(6).map(k => `<ellipse cx="122" cy="32" rx="7" ry="15" transform="rotate(${k * 60} 122 50)" ${C}/>`).join("")}<circle cx="122" cy="50" r="6" ${W}/>`,

  kirie: `<rect x="30" y="14" width="100" height="72" fill="var(--a)"/>
    <path fill-rule="evenodd" fill="${K}" d="M30 14h100v72H30Z${star(80, 50, 24, 10)}M50 30m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M110 70m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M108 28h12v10h-12ZM40 64h12v10H40Z"/>`,

  popup: `<rect x="8" y="20" width="56" height="60" ${W}/><path d="M8 50h56" ${DASH}/><path d="M28 50V34M44 50V34" ${N}/><path d="M28 34h16" ${DASH}/>${AR}
    <path d="M92 18h58v42H92Z" ${W}/><path d="M92 60h58l-14 26H78Z" ${W}/><path d="M106 44l6-8h22l-6 8Z" ${W}/><path d="M106 44h22v16h-22Z" ${C}/>`,

  slit: `<rect x="8" y="22" width="26" height="56" ${W}/><path d="M21 22v28" ${N}/><rect x="40" y="22" width="26" height="56" ${C}/><path d="M53 78V50" ${N}/>${AR}
    <path d="M96 30h48v50H96Z" ${W}/><path d="M114 18l12 10v58l-12-10Z" ${C}/>`,

  nobiru: `<rect x="6" y="24" width="60" height="52" ${W}/>${range(9).map(i => { const x = 12 + 6 * i;
      return `<path d="M${x} ${i % 2 ? 24 : 34}V${i % 2 ? 66 : 76}" ${T}/>`; }).join("")}${AR}
    ${range(3).map(r => range(4).map(c => { const x = 101 + 15 * c + (r % 2 ? 7.5 : 0), y = 28 + 22 * r;
      return `<path d="M${x - 7.5} ${y}l7.5-11 7.5 11-7.5 11Z" fill="none" stroke="var(--a)" stroke-width="3.5" stroke-linejoin="round"/>`; }).join("")).join("")}`,

  chigirie: `<rect x="18" y="10" width="124" height="80" ${W}/><path d="${fuzzy(104, 34, 14, 1.6)}" ${C}/>
    <path d="M20 88C40 52 64 52 84 70S124 58 140 72V88Z" fill="${K}"/><path d="${fuzzy(50, 34, 9, 1.4)}" fill="#fff" stroke="${K}" stroke-width="2"/>
    <path d="${fuzzy(66, 30, 11, 1.4)}" fill="#fff" stroke="${K}" stroke-width="2"/>`,

  mizusen: `<rect x="6" y="24" width="60" height="54" ${W}/><path d="M36 24C24 40 46 56 32 78" fill="none" stroke="var(--a)" stroke-width="6" stroke-linecap="round" opacity=".75"/>${AR}
    <path d="M92 24H118${range(19).map(i => `L${118 - i * .3 + (i % 2 ? 3 : -2)} ${24 + i * 3}`).join("")}L112 80H92Z" ${W}/>
    <path d="M152 24H128${range(19).map(i => `L${128 - i * .3 + (i % 2 ? -3 : 2)} ${24 + i * 3}`).join("")}L122 80H152Z" ${C}/>`,

  pinhole: (() => { const pts = s => range(10).map(i => { const r = i % 2 ? 9 : 22, a = Math.PI * i / 5 - Math.PI / 2;
      return [s + r * Math.cos(a), 50 + r * Math.sin(a)]; });
    return `<rect x="6" y="18" width="60" height="64" ${W}/>${pts(36).map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="2" fill="${K}"/>`).join("")}${AR}
      <rect x="92" y="18" width="60" height="64" fill="${K}" ${S}/>${pts(122).map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="6" fill="var(--a)" opacity=".35"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="2.6" fill="var(--a)"/>`).join("")}`; })(),

  shishu: `<rect x="24" y="10" width="112" height="80" ${W}/>${range(11).map(i => `<path d="M40 ${18 + 6 * i}L${48 + 7.6 * i} 80" fill="none" stroke="var(--a)" stroke-width="1.8"/>`).join("")}
    ${range(11).map(i => `<circle cx="40" cy="${18 + 6 * i}" r="1.8" fill="${K}"/><circle cx="${48 + 7.6 * i}" cy="80" r="1.8" fill="${K}"/>`).join("")}`,

  hiraami: (() => { const xs = range(4).map(j => 46 + 18 * j), ys = range(4).map(i => 20 + 17 * i);
    return xs.map(x => `<rect x="${x}" y="12" width="14" height="76" ${W}/>`).join("") +
      ys.map(y => `<rect x="40" y="${y}" width="82" height="12" ${C}/>`).join("") +
      ys.map((y, i) => xs.map((x, j) => (i + j) % 2 ? "" : `<rect x="${x}" y="${y - 1.5}" width="14" height="15" ${W}/>`).join("")).join(""); })(),

  koyori: `<rect x="8" y="44" width="58" height="10" transform="rotate(-8 37 49)" ${W}/>${AR}
    ${strip("M94 78C108 20 134 82 150 24", 7)}<path d="M94 78C108 20 134 82 150 24" fill="none" stroke="var(--a)" stroke-width="7" stroke-dasharray="2.5 5"/>`,

  quilling: `<circle cx="36" cy="50" r="20" ${W}/><path d="${spiral(36, 50, 18, 5)}" ${T}/>
    <path d="M86 24Q106 54 98 66A14 14 0 0 1 74 66Q66 54 86 24Z" ${C}/><path d="${spiral(86, 60, 10, 3)}" ${T}/>
    <path d="M114 50Q132 24 150 50Q132 76 114 50Z" ${W}/><path d="${spiral(132, 50, 9, 3)}" ${T}/>`,

  beads: `<path d="M8 40V60" stroke="${K}" stroke-width="4" stroke-linecap="round"/><path d="M10 43 66 50 10 57Z" ${C}/>${AR}
    <path d="M90 50H156" ${N}/>${[104, 126, 148].map(x => `<ellipse cx="${x}" cy="50" rx="10" ry="14" ${C}/><path d="M${x - 9} 44Q${x} 48 ${x + 9} 44M${x - 9} 56Q${x} 52 ${x + 9} 56" ${T}/>`).join("")}`,

  bou: `<rect x="8" y="20" width="56" height="60" ${W}/>${strip("M14 74 58 26", 6)}${AR}
    ${strip("M94 82 122 24 150 82Z", 4)}${strip("M108 53H136", 4)}`,

  hariko: `<ellipse cx="36" cy="46" rx="24" ry="30" ${W}/><path d="M32 78l4-4 4 4" ${N}/>
    ${[[24, 34, 15], [40, 28, -20], [30, 54, 30], [46, 50, 5], [36, 42, -40]].map(([x, y, r]) => `<rect x="${x - 6}" y="${y - 5}" width="12" height="10" transform="rotate(${r} ${x} ${y})" ${C}/>`).join("")}${AR}
    <path d="M94 44A28 28 0 0 0 150 44Z" ${C}/><ellipse cx="122" cy="44" rx="28" ry="7" ${W}/>`,

  honeycomb: `${range(5).map(i => `<rect x="6" y="${26 + 10 * i}" width="58" height="6" ${W}/>${(i % 2 ? [24, 52] : [12, 38]).map(x => `<circle cx="${x}" cy="${32 + 10 * i}" r="3" fill="var(--a)"/>`).join("")}`).join("")}${AR}
    ${range(5).map(r => range(4).map(c => `<path d="${hex(100 + 15.6 * c + (r % 2 ? 7.8 : 0), 22 + 13.5 * r, 9)}" ${(r + c) % 3 ? W : C}/>`).join("")).join("")}`,

  shadow: [0, 1, 2, 3].map(i => `<rect x="${30 + i * 9}" y="${14 + i * 8}" width="${100 - i * 18}" height="${72 - i * 16}" ${i % 2 ? C : W}/>`).join("") +
    `<path d="M${33} ${17}l8 8" ${T}/>`,

  yotsume: `<rect x="40" y="12" width="84" height="78" ${W}/><rect x="40" y="12" width="20" height="78" fill="var(--a)" opacity=".25"/>
    ${[24, 42, 60, 78].map(y => `<circle cx="50" cy="${y}" r="2.6" fill="${K}"/>`).join("")}
    <path d="M50 24H40M50 42H40M50 60H40M50 78H40M50 24V78M50 24 50 12M50 78V90" fill="none" stroke="var(--a)" stroke-width="3" stroke-linecap="round"/>`,

  orihon: `<rect x="6" y="28" width="62" height="44" ${W}/><path d="M21.5 28v44M37 28v44M52.5 28v44M6 50h62" ${DASH}/>
    <path d="M21.5 50H52.5" stroke="var(--a)" stroke-width="5" stroke-linecap="round"/>${AR}
    <path d="M100 28L122 34V82L100 76Z" ${W}/><path d="M122 34L144 28V76L122 82Z" ${C}/><path d="M105 40l12 3M105 48l12 3M105 56l12 3" ${T}/>`,

  hako: `${[[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]].map(([c, r]) => `<rect x="${6 + 15 * c}" y="${28 + 15 * r}" width="15" height="15" ${c === 1 && r === 1 ? C : W}/>`).join("")}
    <path d="M51 43l3-4h9l3 4M51 58l3 4h9l3-4" ${T}/>${AR}${cube(122, 60, 24)}`,

  kamisuki: `<path d="M16 36 32 22 48 36V82H16Z" ${W}/><path d="M16 36H48" ${N}/><path d="M24 50h16M24 58h16" ${T}/>${AR}
    <path d="M92 52H152L146 86H98Z" ${C}/><path d="M92 52H152" ${N}/>
    <rect x="102" y="26" width="40" height="20" transform="rotate(-8 122 36)" ${W}/>
    <path d="M110 26v20M118 26v20M126 26v20M134 26v20M102 33h40M102 39h40" transform="rotate(-8 122 36)" ${T}/>`,

  nendo: `<ellipse cx="36" cy="50" rx="18" ry="24" ${W}/><ellipse cx="36" cy="50" rx="6" ry="9" ${W}/><path d="M36 74H58V60" ${N}/>${AR}
    <ellipse cx="124" cy="64" rx="22" ry="16" ${C}/><circle cx="124" cy="36" r="13" ${C}/><circle cx="114" cy="24" r="5" ${C}/><circle cx="134" cy="24" r="5" ${C}/>
    <circle cx="119" cy="35" r="1.8" fill="${K}"/><circle cx="129" cy="35" r="1.8" fill="${K}"/>`,

  emboss: `<path d="${star(36, 50, 24, 10)}" ${C}/><rect x="8" y="18" width="56" height="64" fill="#fff" fill-opacity=".55" stroke="${K}" stroke-width="2.5" stroke-dasharray="5 4"/>
    <path d="M52 14 40 30" stroke="${K}" stroke-width="5" stroke-linecap="round"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/><path d="${star(124, 52, 24, 10)}" fill="${K}" opacity=".18"/><path d="${star(122, 50, 24, 10)}" fill="#fff" stroke="${K}" stroke-width="1.6"/>`,

  frottage: `<path d="${leaf(36, 50, 24)}" ${C}/><path d="M12 64.4 52.8 34.4" ${T}/>
    <rect x="32" y="20" width="30" height="10" rx="2" transform="rotate(-30 47 25)" fill="${K}"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/><path d="${leaf(122, 50, 22)}" fill="var(--a)" opacity=".75"/>
    <path d="M100 63.2 137.4 35.7M112 54l-2-10M122 47l-2-12M118 50l8 6M128 43l8 6" fill="none" stroke="#fff" stroke-width="2"/>`,

  kamihan: `<rect x="6" y="22" width="60" height="56" ${W}/><path d="${fish(36, 50, 1)}" ${C}/><circle cx="48" cy="47" r="3" ${W}/>${AR}
    <rect x="92" y="22" width="60" height="56" ${W}/><path d="${fish(122, 50, -1)}" fill="${K}"/><circle cx="110" cy="47" r="3" fill="#fff"/>`,

  orizome: `<path d="M10 76H60L35 30Z" ${W}/><path d="M10 76H22L16 65Z M60 76H48L54 65Z M35 30l-5 9h10Z" fill="var(--a)"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/><path d="M112 18v64M132 18v64M92 39h60M92 60h60" fill="none" stroke="${K}" stroke-width="1" stroke-dasharray="3 3"/>
    ${[92, 112, 132, 152].map(x => [18, 39, 60, 82].map(y => `<circle cx="${x}" cy="${y}" r="7" fill="var(--a)" opacity=".8"/>`).join("")).join("")}
    ${[102, 122, 142].map(x => [28.5, 49.5, 71].map(y => `<circle cx="${x}" cy="${y}" r="3.5" fill="var(--a)" opacity=".45"/>`).join("")).join("")}`,

  suminagashi: `<rect x="10" y="10" width="140" height="80" rx="8" ${W}/>
    ${[36, 30, 24, 18, 12, 6].map((r, i) => `<ellipse cx="${78 + i}" cy="${50 - i * .5}" rx="${r * 1.25}" ry="${r}" fill="none" stroke="${i % 2 ? "var(--a)" : K}" stroke-width="3.2" transform="rotate(${-12 + i * 5} 78 50)"/>`).join("")}
    <path d="M150 8 128 30" stroke="${K}" stroke-width="5" stroke-linecap="round"/>`,

  marble: `<rect x="10" y="12" width="140" height="76" rx="6" ${W}/>
    ${range(7).map(i => { const y = 22 + 9.5 * i; return `<path d="M16 ${y}C40 ${y - 10} 60 ${y + 10} 84 ${y}S128 ${y - 10} 144 ${y}" fill="none" stroke="${i % 2 ? K : "var(--a)"}" stroke-width="${i % 2 ? 2 : 4}" stroke-linecap="round"/>`; }).join("")}`,

  stencil: `<path fill-rule="evenodd" d="M6 20h60v60H6Z${star(36, 50, 22, 9)}" ${C}/><rect x="40" y="10" width="24" height="16" rx="5" fill="#fff" stroke="${K}" stroke-width="3" transform="rotate(20 52 18)"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/>${[[108, 36], [136, 36], [122, 64]].map(([x, y]) => `<path d="${star(x, y, 12, 5)}" fill="var(--a)"/>`).join("")}`,

  mizubari: `<rect x="20" y="10" width="120" height="80" rx="3" fill="#e4c58f" ${S}/><rect x="32" y="20" width="96" height="60" ${W}/>
    <path d="M32 20h96M32 80h96M32 20v60M128 20v60" stroke="var(--a)" stroke-width="9" opacity=".85"/>
    ${[[64, 44], [86, 54], [100, 38]].map(([x, y]) => `<path d="M${x} ${y - 7}q6 8 0 12q-6-4 0-12Z" fill="${K}" opacity=".35"/>`).join("")}`,

  rou: `<rect x="6" y="30" width="60" height="44" ${W}/>${[["#e60012", 18, 44], ["#ffd400", 30, 56], ["#0068b7", 44, 42], ["#00a04a", 52, 60], ["#e4007f", 24, 64]].map(([c, x, y]) => `<path d="M${x} ${y}l6-3 3 5-7 2Z" fill="${c}"/>`).join("")}
    <path d="M14 30 24 14H56L62 30Z" fill="${K}"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/>${[["#e60012", 106, 34], ["#ffd400", 132, 40], ["#0068b7", 114, 62], ["#00a04a", 140, 66], ["#e4007f", 124, 50]].map(([c, x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}" opacity=".55"/>`).join("")}`,

  aburidashi: `<ellipse cx="32" cy="54" rx="22" ry="18" fill="#ffd400" ${S}/><path d="M32 36v-6" ${N}/><path d="M56 40q4 8 0 12q-4-4 0-12Z" fill="#ffd400" stroke="${K}" stroke-width="2"/>${AR}
    <rect x="92" y="18" width="60" height="64" ${W}/><path d="M122 70C100 54 104 36 114 36C119 36 122 41 122 44C122 41 125 36 130 36C140 36 144 54 122 70Z" fill="#8b5a2b"/>
    <path d="M100 30q3-4 0-8M144 30q3-4 0-8" fill="none" stroke="var(--a)" stroke-width="2.5" stroke-linecap="round"/>`
};

window.FIGS = key => F[key] ? `<svg viewBox="0 0 160 100" aria-hidden="true">${F[key]}</svg>` : "";
})();
