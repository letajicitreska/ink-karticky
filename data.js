// Obsah aplikace. Řádky na kartě odděluje znak |
// Pořadí v seznamu = pořadí v aplikaci. Karty lze libovolně přidávat, mazat i přesouvat.
// Pozor: když se změní text karty, lidem zmizí z uloženého výběru (výběr se pamatuje podle textu).

window.CARDS = {
  cs: {
    feelings: [
      "vztek|hněv", "naštvání|podráždění", "rozladění|rozhořčení", "netrpělivost",
      "lítost|zklamání", "smutek|beznaděj", "napětí", "strach|obavy", "únava|vyčerpání",
      "bezmoc", "bolest|zranění", "zmatek", "nervozita", "rozpaky|stud|trapnost", "hořkost",
      "zahlcení", "nuda", "osamělost", "otupělost|rezignace", "netečnost|odpojení",
      "úzkost|stísněnost", "frustrace", "znechucení", "mrzutost", "žal|zármutek", "marnost",
      "vděčnost", "naplnění", "inspirace", "fascinace|okouzlení|úžas", "energie|osvěžení",
      "vyrovnanost|rovnováha", "sebejistota", "klid", "radost|štěstí", "veselost|pobavení",
      "volnost|bezstarostnost", "překvapení", "zvědavost|zájem", "něha", "pohoda|spokojenost",
      "hrdost", "hravost|rozpustilost", "hřejivý pocit|vřelost", "povzbuzení|odhodlání",
      "nadšení|vášeň", "naděje", "dojetí", "úleva|uvolnění"
    ],
    needs: [
      "jistota", "bezpečí", "dobrodružství|výzva", "dotek", "jasnost|orientace",
      "integrita|soulad mezi tím, co říkám, co dělám a co si myslím", "důvěra", "harmonie|soulad",
      "krása", "láska", "možnost volby|autonomie", "odpočinek|klid", "empatie|soucit|být pochopen",
      "podpora|pomoc", "rozumět|chápat", "vědět|být informován", "pořádek", "pohyb",
      "ocenění|uznání", "přátelství", "dávání|přispění|obohacování života druhých",
      "progres|efektivita", "řád|předvídatelnost", "respekt|být brán vážně", "sexuální prožívání",
      "sdílení", "růst|rozvoj|učení se", "moc|vliv", "soustředění",
      "sounáležitost|vědomí, že někam patřím", "prostor", "spolupráce", "smysl", "oslava|truchlení",
      "spontánnost|autentičnost", "spravedlnost|férovost", "vzájemnost", "požitek|potěšení smyslů",
      "transparentnost|otevřenost|upřímnost", "zábava|humor", "intimita|blízkost",
      "volnost|svoboda|lehkost", "hra|hravost", "přijetí|být přijímán takový, jaký jsem",
      "tvořivost|sebevyjádření", "pozornost|být slyšen|být viděn", "zdraví|tělesná i duševní síla",
      "přesah|spiritualita|kontakt s něčím, co nás přesahuje", "kompetence|mistrovství"
    ]
  },
  en: {
    feelings: [
      "afraid|scared|shocked", "anxious|worried", "nervous|tense", "insecure",
      "angry|furious|resentful", "annoyed|irritated", "impatient", "frustrated", "disgusted",
      "sad|heavy", "disappointed|discouraged", "hurt", "lonely", "hopeless", "sorry",
      "confused|puzzled", "torn|hesitant", "lost|uncertain", "tired|exhausted|drained",
      "overwhelmed", "helpless", "bored|dull", "apathetic|indifferent", "numb|passive",
      "distant|withdrawn", "embarrassed|self-conscious", "ashamed|guilty", "uncomfortable|upset",
      "happy|glad", "delighted|cheerful", "excited|enthusiastic", "thrilled|joyful",
      "calm|relaxed", "peaceful|at ease", "comfortable|content", "relieved", "secure",
      "curious|interested", "fascinated", "inspired", "energised|alert", "surprised",
      "touched|moved", "tender|affectionate", "thankful|grateful", "friendly", "confident",
      "encouraged|determined", "hopeful", "proud", "free|empowered", "fulfilled|satisfied",
      "pleased|refreshed", "amused|playful", "amazed|in awe", "passionate"
    ],
    needs: [
      "acceptance", "affection|warmth", "appreciation", "belonging", "closeness|intimacy",
      "communication", "consideration", "cooperation", "empathy", "love", "respect", "support",
      "trust", "to matter", "to understand|and be understood", "to see|and be seen",
      "authenticity", "integrity", "openness|transparency", "clarity", "choice",
      "freedom|independence", "space", "rest|sleep", "safety", "food|shelter", "movement",
      "touch", "sexual expression", "ease|harmony", "order", "equality|fairness", "certainty",
      "beauty", "purpose", "contribution", "competence|effectiveness", "growth|learning",
      "challenge", "creativity|self-expression", "focus", "hope|inspiration", "knowledge",
      "celebration|mourning", "fun|joy", "adventure", "humour"
    ]
  }
};

window.UI = {
  cs: {
    lang: "cs", other: "EN", otherTitle: "Switch to English",
    title: "Kartičky pocitů a potřeb",
    feelings: "Pocity", needs: "Potřeby", selection: "Výběr", exercises: "Cvičení",
    hint: "Klepnutím kartu vyberete.",
    empty: "Zatím nemáte nic vybráno. Klepněte na karty v záložkách Pocity a Potřeby.",
    clear: "Zrušit výběr", clearConfirm: "Opravdu zrušit celý výběr?",
    draw: "Vylosovat potřebu", drawAgain: "Vylosovat jinou",
    selected: "vybráno"
  },
  en: {
    lang: "en", other: "CZ", otherTitle: "Přepnout do češtiny",
    title: "Feelings and Needs Cards",
    feelings: "Feelings", needs: "Needs", selection: "Selection", exercises: "Exercises",
    hint: "Tap a card to select it.",
    empty: "Nothing selected yet. Tap cards in the Feelings and Needs tabs.",
    clear: "Clear selection", clearConfirm: "Clear the whole selection?",
    draw: "Draw a need", drawAgain: "Draw another",
    selected: "selected"
  }
};

// Texty cvičení. {{DRAW}} = místo pro tlačítko „Vylosovat potřebu“.
window.EXERCISES = {
  cs: `
<section class="intro">
  <h2>Jak aplikaci používat</h2>
  <p>Klepnutím kartu vyberete, dalším klepnutím výběr zrušíte. V záložce Výběr najdete všechny vybrané pocity a potřeby pohromadě. Výběr zůstane uložený i po zavření aplikace.</p>
  <h3>Přidání na plochu</h3>
  <ul>
    <li><b>iPhone (Safari):</b> klepněte na Sdílet a zvolte Přidat na plochu.</li>
    <li><b>Android (Chrome):</b> otevřete menu ⋮ a zvolte Přidat na plochu.</li>
  </ul>
  <p>Aplikace pak funguje i bez připojení k internetu.</p>
</section>

<h2 class="ex-head">Cvičení s kartičkami</h2>

<details>
<summary>1. Reflexe dne: pocity</summary>
<p><i>Postup:</i> Zeptejte se sami sebe: Jak jsem se dnes měl*a? S touto otázkou procházejte kartičky pocitů a vybírejte ty, které jste dnes zažili. Pak si je vyskládejte před sebe, třeba do časové osy, a chvíli se na své emoce v klidu dívejte. Všimněte si, co cítíte teď, když se na ně takhle díváte.</p>
<p class="app-note"><i>V aplikaci:</i> pocity vyberte klepnutím a prohlédněte si je v záložce Výběr.</p>
<p><i>Variace 1:</i> Místo celého dne můžete zvolit kratší úsek, například poslední hodinu, nebo delší, třeba týden či měsíc.</p>
<p><i>Variace 2, ve dvojici:</i> Jde vlastně o rozšířenou odpověď na otázku „Jak ses dnes měl*a?“. Věnujte druhému plnou pozornost. Když vypráví o svých zážitcích a pocitech, jen poslouchejte a nepřerušujte.</p>
<p><i>Co trénujete:</i> Kromě slovní zásoby pro pocity také sebeuvědomění a citlivost k sobě. Cvičení vám může pomoct získat od emocí odstup a uvědomit si, že vznikly v minulé situaci a nemusíte si je nést dál. Ve dvojici navíc trénujete, jak srozumitelně mluvit o sobě a svých pocitech a jak naslouchat druhému, když dělá totéž.</p>
</details>

<details>
<summary>2. Reflexe potřeb</summary>
<p><i>Postup:</i> Zeptejte se sami sebe: Které své touhy a potřeby mám v poslední době naplněné a které ne? S touto otázkou procházejte kartičky potřeb a třiďte je na čtyři hromádky: naplněné, nenaplněné, smíšené a ty, ke kterým teď nemáte zvláštní vztah.</p>
<p>Pak si je vyskládejte před sebe jako kontrolky. Užijte si pohled na ty, které svítí zeleně a dělají vám radost. U těch, které svítí červeně, si řekněte, jestli to tak chcete. Někdy třeba víte, proč odkládáte odpočinek nebo setkání s přáteli, a to, že tyto potřeby teď máte nenaplněné, vám nevadí.</p>
<p>Když zjistíte, že některé potřeby máte nenaplněné a chcete to změnit, můžete začít přemýšlet o strategiích.</p>
<p class="app-note"><i>V aplikaci:</i> nejlépe se to dělá s tištěnými kartičkami. V aplikaci si můžete vybrat aspoň potřeby, které máte nenaplněné.</p>
<p><i>Variace:</i> Reflexi můžete zúžit na jednu oblast života, například osobní nebo pracovní, nebo na určité období, třeba den či týden.</p>
<p><i>Tip:</i> Pokud vám v balíčku nějaká důležitá potřeba chybí, doplňte si ji.</p>
<p><i>Co trénujete:</i> Hlavně uvědomování si vlastních potřeb, tedy toho, po čem v životě toužíte. Nedivte se, když ve vás cvičení vyvolá emoce, i nepříjemné. Nevědět, co chci, je jeden ze způsobů, jak se otupit. Jenže necitlivost k sobě i k druhým je opakem živosti. Díky tomuto cvičení si tak můžete jasněji uvědomit, jak žijete, a že vůbec žijete. Když ho budete opakovat pravidelně, třeba jednou týdně, uvidíte i to, jak se váš život vyvíjí.</p>
</details>

<details>
<summary>3. Reflexe situace: pocity a potřeby</summary>
<p><i>Kontext:</i> Pracujte s jednou konkrétní situací. Někdo něco řekl nebo udělal a ve vás se objevily emoce, ať příjemné, nebo nepříjemné. Zaměřte se na jeden konkrétní okamžik. Nepřehrávejte si celý příběh jako sled mnoha zážitků, zpracovávejte jeden okamžik po druhém.</p>
<h4>Fáze 1</h4>
<ul>
  <li><b>Pozorování:</b> Co kdo řekl nebo udělal?</li>
  <li><b>Pocity:</b> Jak jste se v tu chvíli cítili? (kartičky pocitů)</li>
</ul>
<h4>Fáze 2</h4>
<ul>
  <li><b>Interpretace:</b> Vaše pocity souvisí s tím, jak chování druhého interpretujete a jaké mu přisuzujete motivy. To všechno jsou vaše myšlenky. Mohou být správné i mylné, nebo zachycovat jen část toho, co se skutečně děje. Hlavně ale: druhý nad nimi nemá moc, vy ano. Uvědomte si, jak situaci interpretujete a jakou roli to hraje v tom, jak se cítíte. Svou interpretaci si můžete ověřit tak, že se druhého zeptáte.</li>
  <li><b>Potřeby:</b> Vaše pocity souvisí také s vašimi touhami a potřebami. Pojmenujte je (kartičky potřeb) a podívejte se, jaké potřeby stojí za vašimi strategiemi.</li>
</ul>
<h4>Fáze 3</h4>
<ul>
  <li><b>Strategie:</b> Co jsem udělal*a a co bych příště mohl*a udělat jinak? Když znáte své potřeby, můžete hledat strategie, které vám poslouží lépe nebo budou přijatelnější pro ostatní, kterých se situace týká.</li>
</ul>
<p><i>Co trénujete:</i> Hlavně přebírání zodpovědnosti za své prožívání, pocity a potřeby. Učíte se jasně vidět příčiny a následky. Váš pocit nevzniká proto, že je druhý „pokažený“. Pramení z několika zdrojů: z chování druhého (pozorování), z toho, jak toto chování interpretujete, a z vašich potřeb v dané situaci. K tomu se učíte vnímat sami sebe.</p>
</details>

<details>
<summary>4. Rákosníček</summary>
<p><i>Hra ve dvojici:</i> Vyberte si náhodně jednu potřebu a zeptejte se druhého: „Kdy jsi v poslední době prožíval*a [potřebu] jako naplněnou?“ Nechte ho povídat a jen poslouchejte. Když skončí, vyměňte si role.</p>
{{DRAW}}
<p><i>Varianty otázky:</i></p>
<ul>
  <li>„Kdy jsi prožíval*a [potřebu] tak hutně, že by se to dalo krájet?“</li>
  <li>„Kdy jsi v životě nejvíc prožíval*a [potřebu] jako naplněnou?“</li>
</ul>
<p><i>Na co se zaměřit:</i> Nejde o přesné datum. Soustřeďte se na příběh, tedy co se dělo a jak to, že jste [potřebu] prožívali jako naplněnou, a na napojení na kvalitu této potřeby.</p>
<p><i>Co trénujete:</i> Napojení na potřeby a vědomí, že potřeby nemusíte prožívat jen jako nenaplněné touhy, ale i jako naplněné. Zároveň trénujete naslouchání a empatii, tedy porozumění světu druhého.</p>
</details>

<footer class="license">
  <p><b>Autorství a licence</b><br>Kartičky, cvičení a aplikace: Institut nenásilné komunikace, <a href="https://ink.cz">ink.cz</a></p>
  <p>Texty cvičení jsou pod licencí <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.cs">CC BY-SA 4.0</a>. Můžete je šířit i upravovat, pokud uvedete zdroj (Institut nenásilné komunikace) a zachováte stejnou licenci.</p>
</footer>`,

  en: `
<section class="intro">
  <h2>How to use the app</h2>
  <p>Tap a card to select it, tap it again to deselect it. The Selection tab shows all your selected feelings and needs together. Your selection stays saved even after you close the app.</p>
  <h3>Add to home screen</h3>
  <ul>
    <li><b>iPhone (Safari):</b> tap Share and choose Add to Home Screen.</li>
    <li><b>Android (Chrome):</b> open the ⋮ menu and choose Add to Home screen.</li>
  </ul>
  <p>The app then works offline too.</p>
</section>

<h2 class="ex-head">Exercises with the cards</h2>

<details>
<summary>1. Daily reflection: feelings</summary>
<p><i>How:</i> Ask yourself: How was my day? With this question in mind, go through the feelings cards and pick the ones you experienced today. Then lay them out in front of you, perhaps along a timeline, and spend a moment calmly looking at your emotions. Notice what you feel now as you look at them this way.</p>
<p class="app-note"><i>In the app:</i> tap to select the feelings and look at them in the Selection tab.</p>
<p><i>Variation 1:</i> Instead of the whole day, choose a shorter stretch, such as the last hour, or a longer one, such as a week or a month.</p>
<p><i>Variation 2, in pairs:</i> This is really an extended answer to the question “How was your day?” Give the other person your full attention. While they talk about their experiences and feelings, just listen and don’t interrupt.</p>
<p><i>What you practise:</i> Besides vocabulary for feelings, also self-awareness and sensitivity towards yourself. The exercise can help you gain some distance from your emotions and realise that they arose in a past situation and you don’t need to carry them any further. In pairs, you also practise speaking clearly about yourself and your feelings, and listening to the other person while they do the same.</p>
</details>

<details>
<summary>2. Reflecting on needs</summary>
<p><i>How:</i> Ask yourself: Which of my longings and needs have been met lately, and which haven’t? With this question in mind, go through the needs cards and sort them into four piles: met, unmet, mixed, and those you don’t feel particularly connected to right now.</p>
<p>Then lay them out in front of you like indicator lights. Enjoy looking at the green ones that bring you joy. For the red ones, ask yourself whether you want things this way. Sometimes you know why you are putting off rest or seeing friends, and the fact that these needs are unmet doesn’t bother you right now.</p>
<p>If you find that some needs are unmet and you want to change that, you can start thinking about strategies.</p>
<p class="app-note"><i>In the app:</i> this works best with printed cards. In the app, you can at least select the needs that are currently unmet.</p>
<p><i>Variation:</i> Narrow the reflection down to one area of life, such as personal or work, or to a specific period, such as a day or a week.</p>
<p><i>Tip:</i> If an important need is missing from the deck, add it.</p>
<p><i>What you practise:</i> Above all, awareness of your own needs, of what you long for in life. Don’t be surprised if the exercise brings up emotions, including unpleasant ones. Not knowing what you want is one way of numbing yourself. But insensitivity towards yourself and others is the opposite of aliveness. This exercise can help you see more clearly how you live, and that you are alive at all. If you repeat it regularly, say once a week, you will also see how your life develops.</p>
</details>

<details>
<summary>3. Reflecting on a situation: feelings and needs</summary>
<p><i>Context:</i> Work with one specific situation. Someone said or did something, and emotions came up in you, pleasant or unpleasant. Focus on one specific moment. Don’t replay the whole story as a sequence of many experiences; work through one moment at a time.</p>
<h4>Phase 1</h4>
<ul>
  <li><b>Observation:</b> Who said or did what?</li>
  <li><b>Feelings:</b> How did you feel at that moment? (feelings cards)</li>
</ul>
<h4>Phase 2</h4>
<ul>
  <li><b>Interpretation:</b> Your feelings are connected to how you interpret the other person’s behaviour and what motives you attribute to them. These are all your thoughts. They may be right or wrong, or capture only part of what is really going on. But above all, the other person has no power over them. You do. Notice how you interpret the situation and what role this plays in how you feel. You can check your interpretation by asking the other person.</li>
  <li><b>Needs:</b> Your feelings are also connected to your longings and needs. Name them (needs cards) and see which needs lie behind your strategies.</li>
</ul>
<h4>Phase 3</h4>
<ul>
  <li><b>Strategies:</b> What did I do, and what could I do differently next time? Once you know your needs, you can look for strategies that serve you better or are easier to accept for the others involved.</li>
</ul>
<p><i>What you practise:</i> Above all, taking responsibility for how you experience the situation, for your feelings and needs. You learn to see causes and consequences clearly. Your feeling doesn’t arise because the other person is “broken”. It comes from several sources: the other person’s behaviour (observation), how you interpret that behaviour, and your needs in that situation. Along the way, you learn to be more aware of yourself.</p>
</details>

<details>
<summary>4. Need Stories</summary>
<p><i>A game for two:</i> Pick a need at random and ask the other person: “When did you last experience [need] as met?” Let them talk and just listen. When they finish, swap roles.</p>
{{DRAW}}
<p><i>Question variations:</i></p>
<ul>
  <li>“When did you experience [need] so strongly you could almost touch it?”</li>
  <li>“When in your life did you most experience [need] as met?”</li>
</ul>
<p><i>What to focus on:</i> It’s not about the exact date. Focus on the story: what was happening, and how come you experienced [need] as met. Then focus on connecting with the quality of that need.</p>
<p><i>What you practise:</i> Connecting with needs, and realising that needs can be experienced not only as unmet longings but also as met. You also practise listening and empathy, which means understanding the other person’s world.</p>
</details>

<footer class="license">
  <p><b>About and licence</b><br>Cards, exercises and app: Institute of Nonviolent Communication, <a href="https://ink.cz">ink.cz</a></p>
  <p>The exercise texts are licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. You may share and adapt them as long as you credit the source (Institute of Nonviolent Communication) and keep the same licence.</p>
</footer>`
};
