# 🎨 JAK STYLOVAT ČLÁNKY - NÁVOD

Váš web má **krásný design** a články se **automaticky stylují**! Ale můžete použít **speciální elementy** pro ještě lepší vzhled.

---

## ✨ CO SE DĚJE AUTOMATICKY:

### **Už teď máte krásné:**
- ✅ **První odstavec** - větší a zvýrazněný
- ✅ **Nadpisy H2** - velké, tučné, s linkou pod nimi
- ✅ **Nadpisy H3** - menší, ale stále výrazné
- ✅ **Obrázky** - zaoblené rohy, stíny, hover efekt
- ✅ **Seznamy** - červené odrážky/čísla (barva webu)
- ✅ **Odkazy** - podtržené, červené, hover efekt
- ✅ **Tabulky** - hezké s tečkovanými řádky
- ✅ **FAQ (details/summary)** - skládací boxy s šipkou

---

## 🎯 SPECIÁLNÍ ELEMENTY (můžete použít):

### **1. INFO BOX** 💡 (modrý)

**Kdy použít:** Pro důležité informace, tipy pro čtenáře

**Jak to udělat:**
```html
<div class="info-box">
  <p><strong>💡 Tip:</strong> Nejlepší čas navštívit Kodaň je květen až září.</p>
</div>
```

**Výsledek:** Modrý box se zaoblenými rohy

---

### **2. TIP BOX** ✅ (zelený)

**Kdy použít:** Pro rady, doporučení, "good to know"

**Jak to udělat:**
```html
<div class="tip-box">
  <p><strong>✅ Doporučení:</strong> Kupte si Copenhagen Card, ušetříte!</p>
</div>
```

**Výsledek:** Zelený box

---

### **3. WARNING BOX** ⚠️ (žlutý)

**Kdy použít:** Pro varování, "pozor na to"

**Jak to udělat:**
```html
<div class="warning-box">
  <p><strong>⚠️ Pozor:</strong> V neděli jsou obchody zavřené!</p>
</div>
```

**Výsledek:** Žlutý box

---

### **4. ZVÝRAZNĚNÍ TEXTU** 🖍️

**Kdy použít:** Důležité části textu

**Jak to udělat:**
```html
Tohle je normální text, ale <mark>tohle je zvýrazněné</mark>!
```

**Výsledek:** Žlutý "fix" jako ve školních učebnicích

---

### **5. CITÁT (Pull Quote)** 💬

**Kdy použít:** Důležitý citát, který chcete zvýraznit

**Jak to udělat:**
```html
<aside class="pull-quote">
  "Kodaň je nejšťastnější město na světě!"
</aside>
```

**Výsledek:** Velký, kurzívou, červený pruh vlevo

---

### **6. GALERIE FOTEK** 🖼️

**Kdy použít:** Když chcete ukázat 3-6 fotek vedle sebe

**Jak to udělat:**
```html
<div class="gallery-grid">
  <img src="foto1.jpg" alt="Nyhavn">
  <img src="foto2.jpg" alt="Tivoli">
  <img src="foto3.jpg" alt="Rundetårn">
</div>
```

**Výsledek:** Mřížka fotek, které se rozloží vedle sebe (responzivně)

---

### **7. DVA SLOUPCE TEXTU** 📰

**Kdy použít:** Když chcete text ve 2 sloupcích (jako v novinách)

**Jak to udělat:**
```html
<div class="two-columns">
  <p>Dlouhý text, který se rozdělí do dvou sloupců na širokých obrazovkách...</p>
</div>
```

**Výsledek:** Na desktopu 2 sloupce, na mobilu normálně

---

### **8. CALL TO ACTION BOX** 🎯

**Kdy použít:** Pro výzvu k akci (např. "Přečtěte si také...")

**Jak to udělat:**
```html
<div class="cta-box">
  <h3>Chcete vědět víc?</h3>
  <p>Přečtěte si náš průvodce po Nyhavnu!</p>
</div>
```

**Výsledek:** Velký, zvýrazněný box s gradientem

---

### **9. VLOŽENÍ VIDEA** 🎥 (YouTube, Vimeo)

**Kdy použít:** Když chcete vložit YouTube video

**Jak to udělat:**
```html
<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
```

**Výsledek:** Responzivní video (přizpůsobí se velikosti)

---

### **10. HORIZONTÁLNÍ ČÁRA** ➖

**Kdy použít:** Pro oddělení sekcí článku

**Jak to udělat:**
```html
<hr>
```

**Výsledek:** Tenká linka napříč stránkou

---

## 🎨 JAK TO POUŽÍT V EDITORU:

### **VARIANTA A: Visual Editor**
1. Klikněte na tlačítko **"</> HTML"** (přepnete do HTML režimu)
2. Vložte HTML kód (např. `<div class="info-box">...`)
3. Klikněte zpět na **"Visual"** - uvidíte formátovaný výsledek

### **VARIANTA B: Přímo HTML**
- Zkopírujte kód
- Vložte do editoru v HTML módu
- Přepněte na Visual a pokračujte

---

## 💡 PŘÍKLAD POUŽITÍ:

```html
<h2>Nejlepší kavárny v Kodani</h2>

<p>Kodaň nabízí skvělou kávu! Tady je můj průvodce.</p>

<div class="info-box">
  <p><strong>💡 Tip:</strong> Dánové pijí nejvíc kávy na světě!</p>
</div>

<h3>The Coffee Collective</h3>
<p>Nejlepší kavárna ve městě...</p>

<div class="gallery-grid">
  <img src="foto1.jpg" alt="Interiér kavárny">
  <img src="foto2.jpg" alt="Espresso">
  <img src="foto3.jpg" alt="Barista">
</div>

<aside class="pull-quote">
  "Nejlepší káva, co jsem kdy měl!"
</aside>

<hr>

<div class="cta-box">
  <h3>Chcete vědět víc o Kodani?</h3>
  <p>Přečtěte si naše další průvodce!</p>
</div>
```

---

## ✅ SHRNUTÍ:

**NEMUSÍTE PSÁT HTML!** Editor funguje jako Word.

**ALE pokud chcete:**
- Info boxy → `<div class="info-box">`
- Tip boxy → `<div class="tip-box">`
- Varování → `<div class="warning-box">`
- Zvýraznění → `<mark>`
- Citát → `<aside class="pull-quote">`
- Galerie → `<div class="gallery-grid">`

---

**Vaše články budou vypadat PROFESIONÁLNĚ!** ✨

Zkuste to a uvidíte! 😊
