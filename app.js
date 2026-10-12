(function () {
  "use strict";
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var params = new URLSearchParams(location.search);
  // jazyk: ?lang=en v adrese > uložená volba > jazyk telefonu
  var q = params.get("lang");
  var navLang = (navigator.language || "cs").slice(0, 2);
  var lang = (q === "en" || q === "cs") ? q : (store.get("ink-lang") || (navLang === "cs" || navLang === "sk" ? "cs" : "en"));

  // Výběr = seřazený seznam klíčů "f:text karty" / "n:text karty"
  var order = [];
  var sel = {};
  function listOf(kind) { return CARDS[lang][kind === "f" ? "feelings" : "needs"]; }
  function exists(key) { return listOf(key.charAt(0)).indexOf(key.slice(2)) >= 0; }
  function setOrder(keys) {
    order = []; sel = {};
    keys.forEach(function (k) { if (!sel[k] && exists(k)) { order.push(k); sel[k] = 1; } });
  }
  function loadSel() {
    try { setOrder(JSON.parse(store.get("ink-sel-" + lang) || "[]")); } catch (e) { setOrder([]); }
  }
  function saveSel() { store.set("ink-sel-" + lang, JSON.stringify(order)); }
  function toggle(key) {
    if (sel[key]) { delete sel[key]; order = order.filter(function (k) { return k !== key; }); }
    else { sel[key] = 1; order.push(key); }
    saveSel(); updateCount();
  }

  // Sdílený odkaz: ?lang=cs&v=f.vztek~n.jistota — karta se pozná podle prvního řádku
  function encodeSel() {
    return order.map(function (k) { return k.charAt(0) + "." + k.slice(2).split("|")[0]; }).join("~");
  }
  function decodeSel(v) {
    return v.split("~").map(function (item) {
      var kind = item.charAt(0), first = item.slice(2);
      var card = listOf(kind).filter(function (x) { return x.split("|")[0] === first; })[0];
      return card ? kind + ":" + card : null;
    }).filter(Boolean);
  }
  function shareURL() {
    return location.origin + location.pathname + "?lang=" + lang + "&v=" + encodeURIComponent(encodeSel()) + "#vyber";
  }

  var main = document.getElementById("main");
  var t = function () { return UI[lang]; };

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function cardHTML(text, kind, interactive) {
    var key = kind + ":" + text;
    var lines = text.split("|").map(function (l) {
      return '<span' + (l.length > 22 ? ' class="long"' : "") + ">" + esc(l) + "</span>";
    }).join("");
    if (!interactive) return '<div class="card ' + kind + '">' + lines + "</div>";
    return '<button type="button" class="card ' + kind + '" data-key="' + esc(key) + '" aria-pressed="' + (sel[key] ? "true" : "false") + '">' + lines + "</button>";
  }

  function updateCount() {
    var n = order.length;
    var c = document.querySelector(".tabs .count");
    if (c) { c.textContent = n ? n : ""; c.setAttribute("aria-label", n + " " + t().selected); }
  }

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  var view = "pocity", sortable = null, justDragged = false;

  function render() {
    view = (location.hash || "#pocity").slice(1);
    if (["pocity", "potreby", "vyber", "cviceni"].indexOf(view) < 0) view = "pocity";
    var u = t();
    document.documentElement.lang = lang;
    document.title = u.title + " · INK";

    var tabs = document.querySelectorAll(".tabs a");
    tabs[0].textContent = u.feelings;
    tabs[1].textContent = u.needs;
    tabs[2].innerHTML = esc(u.selection) + ' <span class="count"></span>';
    tabs.forEach(function (a) { a.classList.toggle("on", a.dataset.view === view); a.setAttribute("aria-current", a.dataset.view === view ? "page" : "false"); });
    var ex = document.getElementById("ex-link");
    ex.textContent = u.exercises;
    ex.classList.toggle("on", view === "cviceni");
    var lb = document.getElementById("lang");
    lb.textContent = u.other; lb.title = u.otherTitle; lb.setAttribute("aria-label", u.otherTitle);
    updateCount();

    if (sortable) { sortable.destroy(); sortable = null; }
    var h = "";
    if (view === "pocity" || view === "potreby") {
      var kind = view === "pocity" ? "f" : "n";
      h = '<p class="hint">' + esc(u.hint) + '</p><div class="grid">' + listOf(kind).map(function (x) { return cardHTML(x, kind, true); }).join("") + "</div>";
    } else if (view === "vyber") {
      if (!order.length) h = '<p class="empty">' + esc(u.empty) + "</p>";
      else {
        h = '<p class="hint">' + esc(u.selHint) + '</p><div class="grid" id="selgrid">' +
          order.map(function (k) { return cardHTML(k.slice(2), k.charAt(0), true); }).join("") + "</div>" +
          '<div class="actions"><button type="button" class="pill m" id="share">' + esc(u.share) + '</button>' +
          '<button type="button" class="pill o" id="clear">' + esc(u.clear) + "</button></div>";
      }
    } else {
      h = '<div class="ex">' + EXERCISES[lang].replace("{{DRAW}}",
        '<div class="draw"><div id="drawn" hidden></div><button type="button" class="pill" id="draw">' + esc(u.draw) + "</button></div>") + "</div>";
    }
    main.innerHTML = h;
    window.scrollTo(0, 0);

    var grid = document.getElementById("selgrid");
    if (grid && window.Sortable) {
      sortable = Sortable.create(grid, {
        animation: 150, delay: 250, delayOnTouchOnly: true, touchStartThreshold: 6,
        ghostClass: "drag-ghost", chosenClass: "drag-chosen",
        onStart: function () { justDragged = true; },
        onEnd: function () {
          setOrder(Array.prototype.map.call(grid.querySelectorAll(".card[data-key]"), function (c) { return c.dataset.key; }));
          saveSel();
          setTimeout(function () { justDragged = false; }, 50);
        }
      });
    }
  }

  function removeFromSelection(card) {
    toggle(card.dataset.key);
    card.classList.add("leaving");
    setTimeout(function () {
      card.remove();
      if (!order.length) render();
    }, 160);
  }

  function share() {
    var u = t();
    var text = u.shareIntro + "\n\n" + order.map(function (k) { return "• " + k.slice(2).split("|").join(", "); }).join("\n");
    var url = shareURL();
    if (navigator.share) {
      navigator.share({ title: u.title, text: text, url: url }).catch(function () {});
      return;
    }
    var all = text + "\n\n" + url;
    var done = function () { toast(u.copied); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(all).then(done, function () { fallbackCopy(all); done(); });
    } else { fallbackCopy(all); done(); }
  }
  function fallbackCopy(s) {
    var ta = document.createElement("textarea");
    ta.value = s; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }

  var lastDraw = -1;
  main.addEventListener("click", function (e) {
    var c = e.target.closest(".card[data-key]");
    if (c) {
      if (view === "vyber") { if (!justDragged) removeFromSelection(c); return; }
      toggle(c.dataset.key);
      c.setAttribute("aria-pressed", sel[c.dataset.key] ? "true" : "false");
      return;
    }
    var b = e.target.closest("button");
    if (!b) return;
    if (b.id === "share") { share(); return; }
    if (b.id === "clear") {
      if (confirm(t().clearConfirm)) { setOrder([]); saveSel(); render(); }
      return;
    }
    if (b.id === "draw") {
      var needs = CARDS[lang].needs, i;
      do { i = Math.floor(Math.random() * needs.length); } while (i === lastDraw && needs.length > 1);
      lastDraw = i;
      var d = document.getElementById("drawn");
      d.innerHTML = cardHTML(needs[i], "n", false); d.hidden = false;
      b.textContent = t().drawAgain;
    }
  });

  document.getElementById("lang").addEventListener("click", function () {
    lang = lang === "cs" ? "en" : "cs";
    store.set("ink-lang", lang);
    if (q) history.replaceState(null, "", location.pathname + location.hash);
    loadSel(); render();
  });

  window.addEventListener("hashchange", render);
  loadSel();

  // otevřený sdílený odkaz
  var shared = params.get("v");
  if (q) store.set("ink-lang", lang);
  if (shared) {
    var keys = decodeSel(shared);
    var same = keys.join("~") === order.join("~");
    if (keys.length && !same && (!order.length || confirm(t().replaceConfirm))) { setOrder(keys); saveSel(); }
    history.replaceState(null, "", location.pathname + "#vyber");
  }
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js");
  }
})();
