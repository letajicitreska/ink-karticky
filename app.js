(function () {
  "use strict";
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // jazyk: ?lang=en v adrese > uložená volba > jazyk telefonu
  var q = new URLSearchParams(location.search).get("lang");
  var lang = (q === "en" || q === "cs") ? q : (store.get("ink-lang") || ((navigator.language || "cs").slice(0, 2) === "cs" ? "cs" : (navigator.language || "").slice(0, 2) === "sk" ? "cs" : "en"));

  var sel = {};
  function loadSel() {
    try { sel = JSON.parse(store.get("ink-sel-" + lang) || "[]").reduce(function (o, k) { o[k] = 1; return o; }, {}); }
    catch (e) { sel = {}; }
  }
  function saveSel() { store.set("ink-sel-" + lang, JSON.stringify(Object.keys(sel))); }

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

  function selectedOf(kind) {
    return CARDS[lang][kind === "f" ? "feelings" : "needs"].filter(function (x) { return sel[kind + ":" + x]; });
  }

  function updateCount() {
    var n = Object.keys(sel).length;
    var c = document.querySelector(".tabs .count");
    if (c) { c.textContent = n ? n : ""; c.setAttribute("aria-label", n + " " + t().selected); }
  }

  function render() {
    var view = (location.hash || "#pocity").slice(1);
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

    var h = "";
    if (view === "pocity" || view === "potreby") {
      var kind = view === "pocity" ? "f" : "n";
      var list = CARDS[lang][kind === "f" ? "feelings" : "needs"];
      h = '<p class="hint">' + esc(u.hint) + '</p><div class="grid">' + list.map(function (x) { return cardHTML(x, kind, true); }).join("") + "</div>";
    } else if (view === "vyber") {
      var f = selectedOf("f"), n = selectedOf("n");
      if (!f.length && !n.length) h = '<p class="empty">' + esc(u.empty) + "</p>";
      else {
        if (f.length) h += '<h2 class="sec">' + esc(u.feelings) + '</h2><div class="grid">' + f.map(function (x) { return cardHTML(x, "f", true); }).join("") + "</div>";
        if (n.length) h += '<h2 class="sec">' + esc(u.needs) + '</h2><div class="grid">' + n.map(function (x) { return cardHTML(x, "n", true); }).join("") + "</div>";
        h += '<div class="actions"><button type="button" class="pill o" id="clear">' + esc(u.clear) + "</button></div>";
      }
    } else {
      h = '<div class="ex">' + EXERCISES[lang].replace("{{DRAW}}",
        '<div class="draw"><div id="drawn" hidden></div><button type="button" class="pill" id="draw">' + esc(u.draw) + "</button></div>") + "</div>";
    }
    main.innerHTML = h;
    window.scrollTo(0, 0);
  }

  var lastDraw = -1;
  main.addEventListener("click", function (e) {
    var c = e.target.closest(".card[data-key]");
    if (c) {
      var k = c.dataset.key;
      if (sel[k]) delete sel[k]; else sel[k] = 1;
      c.setAttribute("aria-pressed", sel[k] ? "true" : "false");
      saveSel(); updateCount();
      return;
    }
    if (e.target.id === "clear") {
      if (confirm(t().clearConfirm)) { sel = {}; saveSel(); render(); }
      return;
    }
    if (e.target.id === "draw") {
      var needs = CARDS[lang].needs, i;
      do { i = Math.floor(Math.random() * needs.length); } while (i === lastDraw && needs.length > 1);
      lastDraw = i;
      var d = document.getElementById("drawn");
      d.innerHTML = cardHTML(needs[i], "n", false); d.hidden = false;
      e.target.textContent = t().drawAgain;
    }
  });

  document.getElementById("lang").addEventListener("click", function () {
    lang = lang === "cs" ? "en" : "cs";
    store.set("ink-lang", lang);
    if (q) history.replaceState(null, "", location.pathname + location.hash);
    loadSel(); render();
  });

  window.addEventListener("hashchange", render);
  loadSel(); render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js");
  }
})();
