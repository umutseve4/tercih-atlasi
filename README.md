<h1 align="center">Tercih Atlası · 2026</h1>

<p align="center">
  Üniversite tercihi yaparken iki soruyu aynı ekranda cevaplayın:<br>
  <b>hangi kampüste okumak iyi</b> ve <b>hangi alan sizi nereye götürür.</b>
</p>

<p align="center">
  <a href="https://umutseve4.github.io/tercih-atlasi/"><img src="https://img.shields.io/badge/canl%C4%B1-demo-FF4D4F?style=flat-square" alt="Canlı demo"></a>
  <img src="https://img.shields.io/badge/kariyer%20alan%C4%B1-20-FF4D4F?style=flat-square" alt="20 kariyer alanı">
  <img src="https://img.shields.io/badge/ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0-FF4D4F?style=flat-square" alt="Sıfır bağımlılık">
</p>

<p align="center"><b><a href="https://umutseve4.github.io/tercih-atlasi/">▶ Atlası aç</a></b></p>

---

## 30 saniyede ne oluyor?

30 kaydı filtreleyip sıralıyorsunuz: 10 Eşit Ağırlık, 10 Sayısal kariyer alanı ve kampüs memnuniyet sıralaması. Her alanın bileşik puanı tıklayınca **açılıyor** — hangi eksenin kaç puan getirdiğini, avantajını ve riskini görüyorsunuz. Kapalı bir skor değil, sökülebilir bir hesap.

Bileşik puan şu ağırlıklarla kuruluyor:

```
Bileşik = 0.30 × Gelecek talebi
        + 0.25 × Küresel taşınabilirlik
        + 0.20 × Gelir potansiyeli
        + 0.15 × Kariyer esnekliği
        + 0.10 × Ekosistem
```

Kampüs sırası **ÜniAR TÜMA 2026** genel memnuniyet sıralamasını doğrudan gösterir — o kısımda editoryal müdahale yoktur.

## Neyi göreceksiniz

| Özellik | Ne işe yarar |
|---|---|
| Filtre + sıralama | 30 kaydı kendi önceliğinize göre yeniden dizin |
| Açılabilir alt skorlar | Bileşik puanın hangi eksenden geldiğini görün |
| Avantaj / risk kartları | Her alanın güçlü yanı ve açık riski yan yana |
| Klavye erişimi | ARIA sekme ok tuşu navigasyonu, görünür odak, dialog odak yönetimi |
| `prefers-reduced-motion` | Sistem ayarına saygı gösterir |
| 360 px'e kadar responsive | Telefonda da okunur |

## Sınırlar — önce bunu okuyun

**Bu resmî tercih danışmanlığı değildir ve maaş garantisi vermez.** Program adları, kontenjanlar, ücretler ve özel koşullar tercih anında güncel ÖSYM kılavuzundan doğrulanmalıdır.

**Alan puanları resmî bir sıralama değildir.** Kaynak sinyallerine dayalı, ağırlıkları açıkça yazılmış **editoryal** bir modeldir. Ağırlıkları beğenmezseniz hesabı elle yeniden yapabilirsiniz — formül yukarıda duruyor, gizli bir katsayı yok.

**Beraberlikler bozulmaz.** Bileşik puanlar eşitse veri setindeki editoryal sıra korunur; örneğin Psikoloji ve Sağlık Yönetimi ham hesapta 77.95 ile eşittir. Yapay bir ayrım uydurulmaz.

**Veri tarihlidir.** 2026 kaynaklarına dayanır; kılavuzlar güncellenince bu depo bunu kendiliğinden fark etmez.

## Kaynaklar

- [ÜniAR · TÜMA 2026](https://uniar.net/tr/siralama/tuma/)
- [World Economic Forum · Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/)
- [YÖK Atlas · 2026](https://yokatlas.yok.gov.tr/)
- [ÖSYM · 2026 YKS Kılavuzu](https://dokuman.osym.gov.tr/web/2026/8/2026-yuksekogretim-programlari-ve-kontenjanlari-kilavuzu-90wzzd-04155310.pdf)
- [MÜDEK · 2026 Akredite Programlar](https://www.mudek.org.tr/en/akredit/akredite2026.shtm)

## Yerelde çalıştırma

```bash
npm test
python -m http.server 4173
```

Bağımlılıksız statik dağıtım — derleme adımı yok.

---

MIT — bkz. [LICENSE](LICENSE).
