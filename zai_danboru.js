// 段ボールの技法（v2）。書き方は zai_kami.js と同じ。
(() => {
const { K, S, W, C, N, T, DASH, AR, range, f, poly, strip, spiral, star, cube } = FIG;
// 段ボールの断面（表裏の紙と、あいだの波）
const wave = (x, y, w, h, step = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e4c58f" ${S}/>` +
  `<path d="M${x} ${y + h / 2}${range(Math.floor(w / step)).map(i => `Q${x + step * i + step / 2} ${i % 2 ? y + h - 2 : y + 2} ${x + step * (i + 1)} ${y + h / 2}`).join("")}" fill="none" stroke="${K}" stroke-width="2"/>`;
const BOARD = `fill="#e4c58f" ${S}`;

FIG.add({
  db_cut: `<rect x="10" y="30" width="80" height="50" ${BOARD}/><rect x="40" y="14" width="10" height="80" ${C}/><path d="M38 30v50" ${DASH}/>
    <path d="M30 78 38 44" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path d="M38 44l-3 -10" stroke="#9a9a9a" stroke-width="4"/>
    <text x="100" y="44" font-size="14" font-weight="900" fill="${K}">1回目 軽く</text><text x="100" y="66" font-size="14" font-weight="900" fill="${K}">2〜3回で</text><text x="100" y="84" font-size="14" font-weight="900" fill="${K}">切り落とす</text>`,
  db_maru: `<rect x="10" y="14" width="68" height="72" ${BOARD}/><circle cx="44" cy="50" r="22" fill="#fff" ${S} stroke-dasharray="6 4"/>${AR}
    <circle cx="124" cy="50" r="26" ${BOARD}/><circle cx="124" cy="50" r="5" ${C}/>`,
  db_noko: `<rect x="8" y="34" width="90" height="46" ${BOARD}/><path d="M24 34C40 60 64 46 80 80" fill="none" stroke="${K}" stroke-width="2.5" stroke-dasharray="5 4"/>
    <path d="M96 18 132 24 128 36 92 30Z" ${C}/><path d="M92 30l2 4 4-3 4 4 4-3 4 4 4-3 4 4 4-3 4 4" fill="none" stroke="${K}" stroke-width="2"/><rect x="128" y="16" width="26" height="14" rx="5" transform="rotate(10 140 23)" ${W}/>`,
  db_ana: `<rect x="10" y="30" width="62" height="50" ${BOARD}/><path d="M40 52 40 12" stroke="${K}" stroke-width="4"/><circle cx="40" cy="12" r="6" ${W}/><circle cx="40" cy="55" r="2.5" fill="${K}"/>${AR}
    <rect x="94" y="30" width="62" height="50" ${BOARD}/><circle cx="124" cy="55" r="9" fill="#fff" ${S}/><path d="M124 55 138 14" stroke="var(--a)" stroke-width="6" stroke-linecap="round"/>`,
  db_suji: `<rect x="8" y="24" width="60" height="52" ${BOARD}/><path d="M38 24v52" stroke="var(--a)" stroke-width="5"/>${AR}
    <path d="M96 84 120 30 124 88Z" ${BOARD}/><path d="M120 30 152 78 124 88Z" ${BOARD}/><path d="M120 30 124 88" stroke="var(--a)" stroke-width="4"/>`,
  db_me: `${wave(8, 26, 60, 14)}<text x="12" y="62" font-size="12" font-weight="900" fill="${K}">波と平行→</text><text x="12" y="78" font-size="12" font-weight="900" fill="${K}">よく丸まる</text>
    <path d="M100 74v-28a20 20 0 0 1 40 0v28" fill="none" stroke="${K}" stroke-width="11"/><path d="M100 74v-28a20 20 0 0 1 40 0v28" fill="none" stroke="#e4c58f" stroke-width="6"/>
    ${range(7).map(i => { const a = Math.PI - i * Math.PI / 6; return `<path d="M${f(120 + 15 * Math.cos(a))} ${f(46 - 15 * Math.sin(a))}L${f(120 + 25 * Math.cos(a))} ${f(46 - 25 * Math.sin(a))}" ${T}/>`; }).join("")}`,
  db_half: `${wave(8, 40, 64, 16)}<path d="M40 40v8" stroke="var(--a)" stroke-width="5"/><path d="M40 30l-4-8M40 30l4-8" ${N}/>${AR}
    <path d="M96 76h26l8-24-12-24" fill="none" stroke="${K}" stroke-width="13" stroke-linejoin="round"/><path d="M96 76h26l8-24-12-24" fill="none" stroke="#e4c58f" stroke-width="8" stroke-linejoin="round"/><circle cx="122" cy="76" r="3" fill="var(--a)"/>`,
  db_vcut: `${wave(8, 40, 64, 16)}<path d="M32 40 40 56 48 40Z" fill="var(--a)" stroke="${K}" stroke-width="2"/>${AR}
    <path d="M100 30v44h44" fill="none" stroke="${K}" stroke-width="15" stroke-linejoin="miter"/><path d="M100 30v44h44" fill="none" stroke="#e4c58f" stroke-width="10" stroke-linejoin="miter"/><path d="M100 74l7-7" stroke="var(--a)" stroke-width="3"/>`,
  db_slit: `<rect x="8" y="22" width="26" height="56" ${BOARD}/><path d="M21 22v28" stroke="var(--a)" stroke-width="4"/><rect x="40" y="22" width="26" height="56" ${BOARD}/><path d="M53 78V50" stroke="var(--a)" stroke-width="4"/>${AR}
    <path d="M96 30h48v50H96Z" ${BOARD}/><path d="M114 18l12 10v58l-12-10Z" ${C}/>`,
  db_koshi: `${range(3).map(i => `<path d="M${48 + 22 * i} 20l18 -10v60l-18 10Z" ${BOARD}/>`).join("")}${range(3).map(i => `<path d="M30 ${36 + 18 * i}h86l18-10H48Z" fill="var(--a)" ${S} opacity=".9"/>`).join("")}`,
  db_hako: `${cube(52, 62, 28, BOARD, BOARD, BOARD)}<path d="M52 29.5 80 45.8" stroke="var(--a)" stroke-width="4"/>${AR}
    <path d="M100 40h48v40h-48Z" ${BOARD}/><path d="M100 40l-10-18h48l10 18Z" ${C}/>`,
  db_sankaku: `<path d="M20 70 46 26 72 70Z" ${BOARD}/><path d="M46 26l60-4M72 70l60-4M106 22l26 44" ${N}/><path d="M106 22 132 66 152 64 126 20Z" ${BOARD}/>
    <path d="M90 6v12m-6-6 6 6 6-6" ${N}/><text x="20" y="92" font-size="12" font-weight="900" fill="${K}">三角の筒はつぶれにくい</text>`,
  db_sekisou: range(6).map(i => `<path d="${poly([[30 + i * 3, 74 - i * 9], [130 - i * 6, 74 - i * 9], [124 - i * 6, 84 - i * 9], [24 + i * 3, 84 - i * 9]])}" ${i % 2 ? C : BOARD}/>`).join(""),
  db_kouko: `${range(4).map(i => `<rect x="${20 + i * 4}" y="${20 + i * 12}" width="76" height="12" ${i % 2 ? C : BOARD}/>`).join("")}
    ${range(4).map(i => `<path d="M${22 + i * 4} ${26 + i * 12}h72" fill="none" stroke="${K}" stroke-width="1" stroke-dasharray="${i % 2 ? "2 4" : "10 2"}"/>`).join("")}
    <text x="104" y="40" font-size="12" font-weight="900" fill="${K}">波の向きを</text><text x="104" y="58" font-size="12" font-weight="900" fill="${K}">交互にして</text><text x="104" y="76" font-size="12" font-weight="900" fill="${K}">重ねる</text>`,
  db_hagu: `<rect x="8" y="30" width="64" height="44" ${BOARD}/><path d="M40 30 72 30 72 74 52 56Z" fill="#fff" ${S}/><path d="M52 56l20 18" ${N}/>${AR}
    <rect x="94" y="30" width="60" height="44" fill="#e4c58f" ${S}/>${range(8).map(i => `<path d="M${98 + i * 7} 30v44" stroke="${K}" stroke-width="3"/>`).join("")}`,
  db_nurasu: `<rect x="8" y="34" width="62" height="40" ${BOARD}/>${[[24, 22], [40, 18], [56, 24]].map(([x, y]) => `<path d="M${x} ${y - 8}q6 8 0 12q-6-4 0-12Z" fill="var(--a)"/>`).join("")}${AR}
    <path d="M94 74C112 62 132 64 152 52" fill="none" stroke="${K}" stroke-width="10" stroke-linecap="round"/><path d="M94 74C112 62 132 64 152 52" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <rect x="96" y="76" width="58" height="12" fill="#e4c58f" ${S}/>`,
  db_danmen: `<rect x="20" y="12" width="120" height="76" fill="#fff" ${S}/>${range(5).map(r => range(3).map(c => wave(28 + 36 * c + (r % 2 ? 18 : 0) - (r % 2 && c === 2 ? 108 : 0), 18 + 14 * r, 32, 12, 6)).join("")).join("")}`,
  db_roll: `${strip("M8 70H50", 8)}${AR}<path d="${spiral(122, 50, 32, 4)}" fill="none" stroke="${K}" stroke-width="7"/><path d="${spiral(122, 50, 32, 4)}" fill="none" stroke="#e4c58f" stroke-width="3.5"/><circle cx="122" cy="50" r="4" fill="var(--a)"/>`,
  db_tsutsu: `${wave(8, 34, 60, 30, 6)}${AR}<path d="M100 26v48a22 8 0 0 0 44 0V26" ${BOARD}/><ellipse cx="122" cy="26" rx="22" ry="8" fill="#fff" ${S}/>
    <path d="M118 72 100 66M126 74V26" stroke="var(--a)" stroke-width="4"/>`,
  db_glue: `<path d="M18 30h50l10 12-10 12H18Z" ${C}/><path d="M78 42h12" stroke="${K}" stroke-width="5"/><rect x="30" y="54" width="20" height="30" rx="4" ${W}/>
    <path d="M90 44q6 10 2 22" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M90 44q6 10 2 22" fill="none" stroke="${K}" stroke-width="2"/>
    <rect x="100" y="64" width="54" height="14" ${BOARD}/><rect x="120" y="22" width="14" height="42" ${BOARD}/><circle cx="92" cy="68" r="5" fill="#fff" ${S}/>`,
  db_pin: `<rect x="12" y="40" width="70" height="20" rx="10" ${BOARD}/><rect x="70" y="40" width="70" height="20" rx="10" transform="rotate(-35 76 50)" ${C}/>
    <circle cx="76" cy="50" r="6" fill="#d4a017" ${S}/><path d="M76 50l-8 22M76 50l8 22" stroke="#d4a017" stroke-width="3"/>
    <path d="M110 76a30 30 0 0 0 10-24" fill="none" stroke="${K}" stroke-width="2.5" stroke-dasharray="4 3"/>`,
  db_shajiku: `<rect x="30" y="26" width="100" height="34" ${BOARD}/><path d="M18 66H142" stroke="var(--a)" stroke-width="8" stroke-linecap="round"/><path d="M18 66H142" stroke="${K}" stroke-width="2"/>
    <circle cx="40" cy="66" r="16" ${W}/><circle cx="120" cy="66" r="16" ${W}/><circle cx="40" cy="66" r="4" fill="${K}"/><circle cx="120" cy="66" r="4" fill="${K}"/>`,
  db_gomu: `<path d="M20 70 70 70 70 40Z" ${BOARD}/><path d="M20 70 70 40" ${N}/><path d="M24 62 66 32" stroke="var(--a)" stroke-width="4" stroke-linecap="round"/>
    <path d="M92 76 136 76 128 30Z" ${BOARD}/><path d="M106 50q10-14 24-8" fill="none" stroke="var(--a)" stroke-width="4"/><path d="M140 24l8-8M144 34l10-2M132 18l2-10" ${N}/>`,
  db_tape: `<rect x="8" y="36" width="64" height="40" ${BOARD}/><rect x="74" y="36" width="64" height="40" ${BOARD}/><rect x="60" y="30" width="26" height="52" fill="var(--a)" opacity=".85" ${S}/>
    <circle cx="140" cy="20" r="14" ${W}/><circle cx="140" cy="20" r="6" fill="var(--a)" ${S}/>`,
  db_hariko: `<rect x="12" y="20" width="64" height="60" ${BOARD}/>${[[24, 32, 10], [44, 44, -15], [30, 62, 20], [58, 30, 5], [60, 64, -30]].map(([x, y, r]) => `<rect x="${x - 9}" y="${y - 7}" width="18" height="14" transform="rotate(${r} ${x} ${y})" fill="#fff" stroke="${K}" stroke-width="2"/>`).join("")}${AR}
    <rect x="94" y="20" width="60" height="60" ${C}/><path d="M104 36l14 10M130 30l12 14M108 62l18-4" stroke="#fff" stroke-width="2"/>`,
  db_jesso: `<rect x="10" y="22" width="60" height="56" ${BOARD}/><rect x="10" y="22" width="34" height="56" fill="#fff" ${S}/><path d="M44 10l12 30" stroke="${K}" stroke-width="6" stroke-linecap="round"/>${AR}
    <path d="M94 62Q122 34 152 62" fill="none" stroke="${K}" stroke-width="10"/><path d="M94 62Q122 34 152 62" fill="none" stroke="#fff" stroke-width="5"/><text x="96" y="86" font-size="12" font-weight="900" fill="${K}">片面だけ→反る</text>`
});

(window.ZAI = window.ZAI || []).push({
  key: "danboru", material: "段ボール",
  verbs: [
    { id:"kiru",  name:"切る",   sub:"切る・切り抜く・穴をあける" },
    { id:"mageru",name:"曲げる", sub:"折る・丸める・角をつくる" },
    { id:"kumu",  name:"組む",   sub:"差し込む・重ねる・強くする" },
    { id:"hagu",  name:"はがす", sub:"表の紙をはがして波を出す" },
    { id:"maku",  name:"巻く",   sub:"帯を巻く・筒にする" },
    { id:"tsunagu",name:"つなぐ",sub:"貼る・留める・動くようにする" },
    { id:"nuru",  name:"塗る",   sub:"下地・仕上げ" }
  ],
  items: [
    { id:"cut", v:"kiru", lv:1, name:"カッターでまっすぐ切る",
      one:"段ボールは一度で切ろうとしない。軽く1回目、2〜3回目で切り落とす。断面がつぶれず、まっすぐ切れる。",
      need:["段ボール","カッター（大きめ）","金属の定規","カッターマット"],
      steps:["切る線を引き、金属の定規を当てる","1回目は表の紙だけを切るつもりで軽く引く","同じ溝を2〜3回なぞって切り落とす"],
      tips:["刃をこまめに折る。段ボールは刃がすぐ鈍り、鈍い刃は断面をつぶす","定規は「残す側」に当てる。手がすべっても、作品の側は傷つかない"],
      fun:"箱、家、パネル、すべての段ボール工作の基本。",
      care:["刃の進む先に手を置かない","力を入れすぎない。何回かに分けるほうが安全"], fig:"db_cut" },
    { id:"maru", v:"kiru", lv:2, name:"丸く切り抜く",
      one:"円は、カッターを動かすより段ボールを回しながら、短く何回も切る。車輪や窓が作れる。",
      need:["段ボール","カッター","コンパス（なければコップやふた）"],
      steps:["円を描き、中心に印をつける","刃を立てて、円の線を短く区切りながら切る","段ボールのほうを少しずつ回し、一周する","2周目で切り落とす"],
      tips:["小さな円は、刃を寝かせず立てたほうが曲がりやすい","断面のガタガタは紙やすりで整える"],
      fun:"車輪、窓、時計の文字盤、丸い看板。",
      care:["回すときに手が刃の前に来ないよう、押さえる手の位置をこまめに変える"], fig:"db_maru" },
    { id:"noko", v:"kiru", lv:1, name:"段ボールカッター（のこぎり型）で切る",
      one:"プラスチックの刃がギザギザの段ボール専用のこぎり。手を切りにくく、曲線もゴリゴリ切れる。",
      need:["段ボールカッター（百円ショップや文具店にある）","段ボール"],
      steps:["線を描く","刃を段ボールに垂直に当て、前後に動かして切り進める","曲線は、少しずつ向きを変えながら進む"],
      tips:["カッターより断面が荒れるので、見える所は最後に紙やすりで整える","小さな子との工作では、最初の一本に向いている"],
      fun:"大きな作品（家、乗り物、着ぐるみ）の切り出し。", fig:"db_noko" },
    { id:"ana", v:"kiru", lv:1, name:"穴をあけて広げる",
      one:"目打ちで小さな穴をあけ、鉛筆やペンをねじこんで広げる。竹ぐしやストローを通す穴になる。",
      need:["目打ち（千枚通し）","鉛筆、太いペン","下に敷く段ボール"],
      steps:["穴の位置に印をつける","目打ちを回しながら刺して、小さな穴をあける","鉛筆をねじこんで、通したいものの太さまで広げる"],
      tips:["車軸の穴は、軸よりほんの少し大きくすると、よく回る"],
      fun:"車軸、ひも通し、ストローの柱、操り人形の関節。",
      care:["目打ちを持たない手を、刺す向きの先に置かない"], fig:"db_ana" },
    { id:"suji", v:"mageru", lv:1, name:"筋をつぶしてから折る",
      one:"折る線を、ペンや定規の角で強く押しつぶしておく。厚い段ボールでも、ぴしっと直角に折れる。",
      need:["段ボール","定規","インクの切れたボールペン、スプーンの柄など"],
      steps:["折る線に定規を当てる","ペンの先で、線を強く押しつぶす（切らない）","つぶした線を内側にして折る"],
      tips:["筋は、波の向きと直角に入れても、平行に入れてもよい。平行のほうが折りやすい"],
      fun:"箱、家の屋根、立てる看板、ブックスタンド。", fig:"db_suji" },
    { id:"me", v:"mageru", lv:1, name:"波の向きを読んで丸める",
      one:"段ボールには「目」がある。中の波と平行に曲げるとくるっと丸まり、直角に曲げるとびくともしない。",
      need:["段ボール"],
      steps:["断面を見て、波が走っている向きを確かめる","丸めたい向きと波が平行になるように切り出す","机の角に当ててしごくように曲げると、なめらかに丸まる"],
      tips:["強くしたい部品（柱や床）は、波と直角の向きに力がかかるようにする"],
      fun:"トンネル、筒、乗り物の丸い屋根、アーチ。", fig:"db_me" },
    { id:"half", v:"mageru", lv:2, name:"片面だけ切って曲げる（ハーフカット）",
      one:"表の紙と波だけを切り、裏の紙を残して曲げる。厚みのある角がきれいに出る。",
      need:["段ボール","カッター","定規"],
      steps:["曲げたい線に定規を当てる","刃を浅く当て、表の紙と波だけを切る（裏の紙は切らない）","切った側を外にして曲げる"],
      tips:["深く切りすぎたら、裏から紙テープで補強すれば大丈夫"],
      fun:"箱の角、本の背、曲がる関節、多角形の柱。", fig:"db_half" },
    { id:"vcut", v:"mageru", lv:2, name:"V字に切り込んで直角に折る",
      one:"V字の溝を切り取ってから折ると、厚い段ボールでもすき間のない、きっちりした角になる。",
      need:["段ボール","カッター","定規"],
      steps:["折る線をはさんで、平行な線を2本引く（幅は段ボールの厚みと同じくらい）","それぞれの線から、斜めに刃を入れて、V字の溝を切り取る。裏の紙は残す","溝を内側にして折り、ボンドで留める"],
      tips:["溝の角度を変えると、直角以外の角度にも折れる"],
      fun:"きっちりした箱、家具の模型、多角形の筒。", fig:"db_vcut" },
    { id:"slit", v:"kumu", lv:1, name:"切り込みを差し込んで組む",
      one:"板に切り込みを入れ、かみ合わせて組む。のりを使わずに立ち、ばらして平らにしまえる。",
      need:["段ボール","カッターか段ボールカッター"],
      steps:["板を2枚切り出す","1枚は上から、もう1枚は下から、高さの半分まで切り込みを入れる","差し込んで十字に組む"],
      tips:["切り込みの幅は、段ボールの厚みとぴったりに。ゆるいとぐらつく"],
      fun:"立つ動物、恐竜の骨格、ついたて、組み立て家具。", fig:"db_slit" },
    { id:"koshi", v:"kumu", lv:2, name:"格子に組む",
      one:"切り込みを入れた板を縦横に何枚も差し込むと、軽くて強い格子になる。",
      need:["段ボール","カッター","定規"],
      steps:["同じ長さの板を、縦用と横用に何枚か切り出す","同じ間隔で、縦用は上から、横用は下から半分まで切り込みを入れる","縦横に差し込んで格子にする"],
      tips:["格子の上に板を貼ると、人が乗れるほど強い台になる"],
      fun:"仕切り、棚、ビルの模型、強い台座。", fig:"db_koshi" },
    { id:"hako", v:"kumu", lv:2, name:"差し込みのふたで箱を組む",
      one:"展開図にふたの「差し込みベロ」をつけると、のりなしで開け閉めできる箱になる。",
      need:["段ボールか厚紙","定規","カッター","ペン（筋つけ用）"],
      steps:["箱の展開図を描き、ふたの先にベロ（差し込む部分）をつける","折り線に筋をつけてから切り出す","側面をのりや紙テープで留め、ふたのベロを差し込んで閉める"],
      tips:["市販の箱をほどいて、ベロの形をまねすると早い"],
      fun:"ギフトボックス、宝箱、収納、お店屋さんごっこ。", fig:"db_hako" },
    { id:"sankaku", v:"kumu", lv:2, name:"三角の筒で強くする",
      one:"段ボールを三角の筒に折ると、四角の筒よりずっとつぶれにくい柱や梁になる。",
      need:["段ボール","定規","ペン（筋つけ用）","ボンドか紙テープ"],
      steps:["細長い板に、等間隔で筋を3本つける（のりしろの分も入れる）","三角に折り、のりしろを貼って筒にする","柱や梁として、組み合わせて使う"],
      tips:["三角形は、力を加えても形が変わらない。橋や塔の骨組みにも、三角形がよく使われている"],
      fun:"橋、タワー、椅子の脚、大きな作品の骨組み。", fig:"db_sankaku" },
    { id:"sekisou", v:"kumu", lv:3, name:"同じ形を重ねて立体にする（積層）",
      one:"少しずつ形の違う板を何枚も重ねて貼る。等高線のように、なめらかな立体ができる。",
      need:["段ボール（たくさん）","カッター","木工用ボンド","紙やすり"],
      steps:["立体を、輪切りにした形を何枚か描く（等高線のイメージ）","それぞれを段ボールから切り出す","順番に重ねて、ボンドで貼る","段差を紙やすりでならすか、段差を模様として残す"],
      tips:["断面の波を見せると、段ボールらしい表情になる"],
      fun:"動物の頭、山の地形模型、椅子、オブジェ。", fig:"db_sekisou" },
    { id:"kouko", v:"kumu", lv:2, name:"波の向きを交互にして貼り重ねる",
      one:"段ボールを、波の向きが交互になるように何枚も貼り合わせると、人が座れるほど強い板になる。",
      need:["段ボール","木工用ボンド","重し"],
      steps:["同じ大きさの板を何枚か切り出す","1枚ごとに、波の向きを90度変えて重ねる","ボンドで貼り合わせ、重しをのせて乾かす"],
      tips:["合板（ベニヤ）が強いのも、薄い板を木目の向きを交互にして貼っているから。同じしくみ"],
      fun:"椅子、テーブル、棚板、踏み台。", fig:"db_kouko" },
    { id:"hagu", v:"hagu", lv:1, name:"表の紙をはがして波を見せる",
      one:"表の紙を1枚はがすと、中の波（段）が出てくる。そのしま模様を、模様や質感に使う。",
      need:["段ボール","カッター（きっかけを作る）"],
      steps:["角にカッターで切れ目を入れて、表の紙の端をめくる","ゆっくり、波の向きに沿ってはがしていく","はがれ残りは、そのまま味として残してもよい"],
      tips:["波の向きに沿ってはがすと、きれいにはがれやすい"],
      fun:"屋根の瓦、動物の毛並み、木の幹、ロボットのパーツ。", fig:"db_hagu" },
    { id:"nurasu", v:"hagu", lv:1, name:"濡らしてきれいにはがす",
      one:"段ボールを水で湿らせると、のりがゆるんで、表の紙と波がきれいに分かれる。波の帯も取り出せる。",
      need:["段ボール","霧吹きかスポンジ","水"],
      steps:["表の紙を、霧吹きやスポンジで湿らせる","数分おいて、のりがゆるむのを待つ","端から、ゆっくりはがす","はがした紙と波は、平らにして乾かす"],
      tips:["濡らしすぎると全体がふやける。表面だけ湿らせる"],
      fun:"波の帯を巻いて作る花、質感のある貼り絵の材料。", fig:"db_nurasu" },
    { id:"danmen", v:"hagu", lv:2, name:"断面を並べて模様にする",
      one:"段ボールを細い帯に切り、断面を上にして並べて貼る。波の断面が、レンガやうろこのような模様になる。",
      need:["段ボール","カッター","木工用ボンド","台紙"],
      steps:["段ボールを、同じ幅の細い帯に切る","断面が見える向きに立てて、台紙に並べて貼る","向きを変えたり、ずらしたりして模様を作る"],
      tips:["波と直角に切った帯と、斜めに切った帯では、断面の模様が違う"],
      fun:"壁、レンガ、魚のうろこ、額縁、コースター。", fig:"db_danmen" },
    { id:"roll", v:"maku", lv:1, name:"帯を巻いて渦巻きにする",
      one:"段ボールの細い帯を、ぐるぐる巻いてボンドで留める。断面が渦巻きの、丈夫な円盤になる。",
      need:["段ボール（片面段ボールだとよく曲がる）","カッター","木工用ボンド"],
      steps:["波と直角の向きに、細い帯を切る（よく曲がる）","端から、きつく巻いていく","巻き終わりをボンドで留める"],
      tips:["帯をつなぎ足していけば、いくらでも大きくできる","巻いたあと中心を押し出すと、器の形になる"],
      fun:"車輪、コースター、器、花、鍋敷き。", fig:"db_roll" },
    { id:"tsutsu", v:"maku", lv:1, name:"丸めて筒にする",
      one:"波と平行の向きに丸めて、端をテープで留める。柱、望遠鏡、ロケットの胴になる。",
      need:["段ボール","紙テープかガムテープ"],
      steps:["波が筒の高さ方向に走るように切り出す","机の角でしごいてクセをつけてから丸める","合わせ目をテープで留める"],
      tips:["丸めにくいときは、内側に細かく筋を入れておく"],
      fun:"柱、望遠鏡、ロケット、トンネル、ペン立て。", fig:"db_tsutsu" },
    { id:"glue", v:"tsunagu", lv:1, name:"グルーガンで速く留める",
      one:"溶かした樹脂で貼るので、数十秒で固まる。ボンドが乾くのを待てない、立体の組み立てに。",
      need:["グルーガン","グルースティック","段ボール"],
      steps:["グルーガンを温める（数分）","片方の面に、グルーを線か点で出す","すぐに相手を押しつけ、数十秒押さえる"],
      tips:["細く糸を引いたグルーは、冷めてから手でちぎれば取れる","低温タイプのグルーガンなら、やけどの危険が減る"],
      fun:"大きな立体、家具の模型、すばやく形を試したいとき。",
      care:["先端と出たばかりのグルーはとても熱い。指で触らない","使い終わったら、スタンドに立てて冷ます"], fig:"db_glue" },
    { id:"pin", v:"tsunagu", lv:1, name:"割りピンで回る関節を作る",
      one:"2枚の部品に穴をあけ、割りピン（足が2本に開く金具）で留める。くるくる回る関節になる。",
      need:["段ボールか厚紙","割りピン","目打ち"],
      steps:["つなぎたい部品を重ね、目打ちで同じ位置に穴をあける","割りピンを差し込む","裏で足を左右に開いて、平らに押さえる"],
      tips:["きつく締めすぎると回らない。少し余裕をもたせる"],
      fun:"手足が動く人形、ロボットの腕、回る時計の針、ショベルカーのアーム。", fig:"db_pin" },
    { id:"shajiku", v:"tsunagu", lv:2, name:"ストローと竹ぐしで車軸を作る",
      one:"ストローを車体に貼り、中に竹ぐしを通して両端にタイヤをつける。よく回る車輪になる。",
      need:["ストロー","竹ぐし","ペットボトルのキャップや段ボールの円（タイヤ）","グルーガンかボンド"],
      steps:["車体の底に、ストローをまっすぐ貼る（これが軸受けになる）","ストローに竹ぐしを通す","タイヤの中心に穴をあけ、竹ぐしの両端に差して固定する"],
      tips:["タイヤは竹ぐしに固定し、竹ぐしがストローの中で回るようにする。ストローは車体に平行に貼る"],
      fun:"ゴム動力の車、坂を下る車、トロッコ、レース大会。", fig:"db_shajiku" },
    { id:"gomu", v:"tsunagu", lv:2, name:"輪ゴムで動かす",
      one:"輪ゴムの引っぱる力を仕掛けにする。パクパク開く口、ぴょんと跳ぶカエル、ふたが閉まる箱。",
      need:["段ボールか厚紙","輪ゴム","割りピンやテープ"],
      steps:["動かしたい部品どうしを、蝶番（テープや筋）でつなぐ","閉じる向きに引っぱるように、輪ゴムをかける","指で開いて離すと、ゴムの力で閉じる・跳ねる"],
      tips:["ゴムの位置を蝶番から遠ざけるほど、動きは強くなる"],
      fun:"パクパク人形、跳ぶおもちゃ、びっくり箱、投石機。", fig:"db_gomu" },
    { id:"tape", v:"tsunagu", lv:1, name:"紙テープでつなぐ・補強する",
      one:"板と板の継ぎ目を、紙テープで表裏から貼る。大きな板がつくれ、角もじょうぶになる。",
      need:["段ボール","紙テープかクラフトテープ"],
      steps:["板をすき間なく突き合わせる","継ぎ目の上に、テープを表から貼る","裏返して、裏からも貼る"],
      tips:["紙テープは上から絵の具で塗れる。ビニールテープは絵の具をはじく"],
      fun:"大きな家、壁、迷路、着ぐるみ。", fig:"db_tape" },
    { id:"hariko", v:"nuru", lv:2, name:"紙を貼ってから塗る",
      one:"段ボールの上に、ちぎった半紙や新聞紙をのりで貼る。継ぎ目や断面が隠れ、絵の具ののりもよくなる。",
      need:["半紙や新聞紙","でんぷんのり（または水で薄めた木工用ボンド）","筆","絵の具"],
      steps:["紙を小さくちぎる","のりをつけて、継ぎ目と角をおおうように貼り重ねる","乾いたら、絵の具で塗る"],
      tips:["最後の1層を白い紙にすると、絵の具の色がきれいに出る"],
      fun:"お面、ロボット、張り子ふうのオブジェ、着ぐるみ。", fig:"db_hariko" },
    { id:"jesso", v:"nuru", lv:2, name:"白い下地を塗って反りを防ぐ",
      one:"段ボールに絵の具をたっぷり塗ると、水を吸って反る。下地は薄く、できれば両面に塗る。",
      need:["アクリル絵の具（白）か、ジェッソ（下地剤）","平筆"],
      steps:["白い絵の具かジェッソを、薄くのばして塗る","乾かしてから、もう一度薄く塗る","反りそうな板は、裏にも同じように塗る","乾いてから、好きな色を塗る"],
      tips:["水を多く含む塗り方をするほど反る。塗料はなるべく濃いめで、薄く"],
      fun:"看板、絵の具を使う大きな作品、模型の仕上げ。", fig:"db_jesso" }
  ]
});

// ── 追加分（2026-10-28〜）
const tx = (x, y, s, size = 12) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="${K}">${s}</text>`;
const rail = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
FIG.add({
  db_korokoro: `<rect x="20" y="6" width="120" height="88" ${BOARD}/>${rail(30, 26, 112, 36)}${rail(128, 50, 46, 60)}${rail(30, 74, 112, 84)}
    <path d="M44 18Q100 22 122 40Q118 52 50 56Q32 66 60 74" ${DASH}/><circle cx="38" cy="18" r="6" ${C}/>`,
  db_stand: `<rect x="12" y="24" width="8" height="56" ${BOARD}/><path d="M20 24v56" ${DASH}/><path d="M20 80H54L20 24Z" ${C}/>${AR}
    <path d="M110 40 142 88H104Z" ${C}/><path d="M96 88 108 12h8l-12 76Z" ${BOARD}/><path d="M92 88H150" stroke="${K}" stroke-width="3"/>`,
  db_mado: `<rect x="8" y="16" width="60" height="68" ${BOARD}/><path d="M24 30h28v40H24" fill="none" stroke="var(--a)" stroke-width="4"/><path d="M24 30v40" ${DASH}/>${AR}
    <rect x="94" y="16" width="60" height="68" ${BOARD}/><rect x="110" y="30" width="28" height="40" fill="#fff" ${S}/><path d="M110 30 98 24V76L110 70Z" ${C}/>`,
  db_choutsugai: `<rect x="16" y="20" width="58" height="64" ${BOARD}/><path d="M76 20 116 30V74L76 84Z" ${C}/>
    <rect x="68" y="20" width="14" height="64" fill="#fff" opacity=".85" ${S}/><path d="M126 46a26 26 0 0 1 18 22" ${N}/><path d="M144 68l-8-2m8 2 2-8" ${N}/>`,
  db_kushi: `<rect x="10" y="54" width="104" height="18" ${BOARD}/><rect x="42" y="12" width="16" height="42" ${BOARD}/>
    <path d="M50 92V72" stroke="${K}" stroke-width="6" stroke-linecap="round"/><path d="M50 92V72" stroke="#f0d29a" stroke-width="3" stroke-linecap="round"/><path d="M50 72V26" fill="none" stroke="var(--a)" stroke-width="3" stroke-dasharray="5 3"/>
    ${tx(108, 30, "下から")}${tx(108, 46, "刺して")}${tx(118, 92, "固定")}`,
  db_kiru: `<rect x="44" y="34" width="72" height="56" ${BOARD}/><circle cx="80" cy="20" r="11" ${W}/>
    <path d="M56 36C56 12 68 10 70 30M104 36C104 12 92 10 90 30" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M56 36C56 12 68 10 70 30M104 36C104 12 92 10 90 30" fill="none" stroke="var(--a)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="20" cy="62" r="7" ${W}/><circle cx="140" cy="62" r="7" ${W}/><path d="M27 62h17M116 62h17" stroke="${K}" stroke-width="5"/>`,
  db_stamp: `${wave(8, 34, 60, 18)}<rect x="8" y="52" width="60" height="6" ${C}/>${AR}
    <rect x="94" y="14" width="60" height="72" ${W}/>${range(4).map(r => `<path d="M98 ${30 + r * 16}${range(6).map(() => "q4.5 -7 9 0").join("")}" fill="none" stroke="var(--a)" stroke-width="3" stroke-linecap="round"/>`).join("")}`
});

window.ZAI.find(z => z.key === "danboru").items.push(
  { id:"korokoro", v:"kumu", lv:2, name:"板に坂を貼ってビー玉コースを作る",
    one:"大きな段ボール板に、細い帯を少し傾けて互い違いに貼る。上から落としたビー玉が、ジグザグに転がり降りる。",
    need:["大きな段ボール板","細く切った段ボールか厚紙の帯","グルーガンかボンド","ビー玉"],
    steps:["板を壁に立てかけるか、箱で立てる","帯を少し傾けて貼り、端に「落ち口」のすき間を残す","下の段は逆向きに傾けて貼る。これを何段かくり返す","いちばん下に、ビー玉の受け皿（小箱）を置く"],
    tips:["傾きはゆるいほどゆっくり転がる。帯の片側に低い壁をつけると、ビー玉が飛び出しにくい","トイレット芯を縦半分に切った「とい」を使うと、カーブも作れる"],
    fun:"ビー玉の転がりコース、ピタゴラ装置ふうの仕掛け、遊びながら傾きを試す。", fig:"db_korokoro" },
  { id:"stand", v:"kumu", lv:1, name:"裏に三角の支えをつけて立てる",
    one:"絵や看板の裏に、直角三角形の段ボールを「のりしろ」で貼る。ぺらぺらの板が、写真立てのように自立する。",
    need:["段ボール","カッター","木工用ボンドかグルーガン","定規"],
    steps:["板の高さの半分〜3分の2くらいの、直角三角形を切り出す","直角をはさむ一辺に、幅1〜2cmののりしろをつけて筋を入れて折る","のりしろを板の裏のまん中に貼り、三角を直角に立てる"],
    tips:["大きな板は、支えを左右に2枚つけると倒れにくい","のりしろを切り込みにして差し込む形にすると、たたんでしまえる"],
    fun:"看板、写真立て、紙芝居の舞台、立つ動物や人。", fig:"db_stand" },
  { id:"mado", v:"kiru", lv:1, name:"コの字に切って開く窓・扉",
    one:"四角の3辺だけを切り、残した1辺に筋をつけて折る。パタンと開く窓や扉ができる。",
    need:["段ボール","カッター","定規","ボールペン（筋つけ用）"],
    steps:["窓の四角を描き、開く側（蝶番の側）を決める","蝶番の辺を残して、ほかの3辺を切る","残した辺に筋をつけ、外に開くように折る"],
    tips:["開けた窓の奥に絵を貼っておくと、めくると中が見える仕掛けになる","何度も開け閉めする扉は、蝶番の辺を紙テープで裏打ちしておく"],
    fun:"家の窓、お店のシャッター、アドベントカレンダー、宝箱の小窓。",
    care:["切り込みの角は刃が止まりにくいので、角の手前で一度刃を止めてから切り直す"], fig:"db_mado" },
  { id:"choutsugai", v:"tsunagu", lv:1, name:"テープを蝶番にして扉をつける",
    one:"板と扉を少しすき間をあけて並べ、表裏からテープを貼る。テープが曲がって、何度でも開く蝶番になる。",
    need:["段ボール2枚（壁と扉）","布ガムテープか紙テープ"],
    steps:["壁と扉を、段ボールの厚みくらいのすき間をあけて並べる","すき間の上からテープを貼る","扉を閉じた状態で、裏側にもテープを貼る"],
    tips:["すき間がないと、閉じたときに角がぶつかって開ききらない","紙テープより、布ガムテープのほうがちぎれにくい"],
    fun:"段ボールハウスの扉、本の表紙、ふた付きの箱、ロッカー。", fig:"db_choutsugai" },
  { id:"kushi", v:"tsunagu", lv:2, name:"竹ぐしを刺して固定する",
    one:"段ボールの波の穴に竹ぐしを差し込むと、部品どうしをしっかり留められる。ボンドが乾くまでの仮留めにも。",
    need:["段ボール","竹ぐし","木工用ボンド","ニッパーかはさみ（竹ぐしを切る）"],
    steps:["つなぎたい部品を合わせる","下の板の断面から、上の部品の波の穴に向けて竹ぐしを差し込む","ボンドをつけて差すと、抜けなくなる","はみ出た竹ぐしを切る"],
    tips:["断面の波の穴は、竹ぐしがちょうど通る太さ。穴の向きに合わせて刺すと、まっすぐ入る","斜めに2本刺すと、ぐらつきが止まる"],
    fun:"立体の組み立て、首や手足をつなぐ、取り外しできる部品。",
    care:["竹ぐしの先は鋭い。切った端は紙やすりで丸めるか、テープで覆う"], fig:"db_kushi" },
  { id:"kiru_fuku", v:"tsunagu", lv:2, name:"肩ひもをつけて着られる段ボールにする",
    one:"箱の上と底を抜き、内側に肩ひもを渡す。肩で吊るすので、両手が空いて動き回れる。",
    need:["体が入る大きさの段ボール箱","布ガムテープ","平たいひもか、布の帯（肩ひも）","カッター"],
    steps:["箱の上と底のふたを切り取る（底は残して、体が入る穴をあけてもよい）","体の幅に合わせて、肩ひもの長さを決める","肩ひもを前後の内側に、布ガムテープで十字に貼る","腕の出る穴は、着てみてから印をつけて切る"],
    tips:["肩ひもはひもより、幅のある布のほうが肩に食い込まない","切り口に紙テープを巻くと、腕や首がこすれにくい"],
    fun:"ロボット、乗り物、着ぐるみ、お祭りの衣装、劇の小道具。",
    care:["前が見えるか、つまずかないかを確かめてから動く"], fig:"db_kiru" },
  { id:"stamp", v:"nuru", lv:1, name:"断面や波でスタンプする",
    one:"段ボールの切り口や、はがして出した波に絵の具をつけて押す。しま模様や波の線が、簡単に何度も押せる。",
    need:["段ボールの切れ端","絵の具","スポンジか皿","紙"],
    steps:["段ボールを、押したい形に切る（帯、丸めた筒、波の面など）","スポンジにしみこませた絵の具を、押す面につける","紙に押しつけて、まっすぐ持ち上げる"],
    tips:["帯を丸めて押すと渦巻き、くねらせて押すと曲線のスタンプになる","絵の具をつけすぎると、細かい波がつぶれる"],
    fun:"包装紙、背景の模様、木の幹や草、ポスター。", fig:"db_stamp" }
);
})();
