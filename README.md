# GeaJS Library Scaffolder (`create-gea-lib`)

⚡ GeaJS için modern, reaktif kütüphaneler oluşturmayı kolaylaştıran hızlı ve esnek bir iskelet (scaffold) oluşturma aracıdır. Bu araç sayesinde TypeScript veya JavaScript tabanlı yeni bir GeaJS kütüphane projesini saniyeler içinde kurabilir, otomatik git ve bağımlılık kurulumu yapabilirsiniz.

## Özellikler

- 📦 **Hazır Şablonlar:** JavaScript (`js`) veya TypeScript (`ts`) desteği.
- ⚙️ **Etkileşimli Arayüz (CLI):** Proje adını, dili ve kurulum tercihlerini adım adım seçebilirsiniz.
- 🚀 **Hızlı Kurulum (Non-Interactive):** Parametreler yardımıyla soru sormadan hızlı kurulum yapabilme özelliği.
- 🛠️ **Otomatik Yapılandırma:** Git deposu oluşturma ve bağımlılıkları (`npm`, `yarn`, `pnpm`, `bun`) otomatik yükleme.

---

## Kullanım Yöntemleri

### 1. Etkileşimli (Interactive) Kurulum

Herhangi bir argüman vermeden başlatarak CLI sorularını takip edebilirsiniz:

```bash
# Projeyi başlatmak için:
npm start

# Veya doğrudan node ile:
node ./bin/index.js
```

**Sorulacak Sorular:**
1. **Project name:** Projenizin klasör ve paket adı (Varsayılan: `gea-library`).
2. **Select programming language:** TypeScript veya JavaScript.
3. **Initialize a git repository?** Git deposu başlatılsın mı? (Varsayılan: `Evet`).
4. **Install dependencies automatically?** Bağımlılıklar otomatik yüklensin mi? (Varsayılan: `Evet`).

---

### 2. Argümanlar ile Hızlı Kurulum

Belirli parametreler vererek etkileşimli soruları atlayabilir veya özelleştirebilirsiniz:

```bash
node ./bin/index.js <proje-adi> [secenekler]
```

#### Kullanılabilir Seçenekler:

| Seçenek | Açıklama |
| :--- | :--- |
| `<proje-adi>` | Oluşturulacak projenin ismi (örn: `my-awesome-lib`). |
| `--ts` / `--typescript` | TypeScript şablonunu kullanır. |
| `--js` / `--javascript` | JavaScript şablonunu kullanır. |
| `--git` | Git deposunu otomatik başlatır. |
| `--no-git` | Git deposu başlatma adımını atlar. |
| `--install` | Bağımlılıkları otomatik yükler. |
| `--no-install` | Bağımlılıkları yüklemeyi atlar. |
| `-y` / `--yes` | Tüm sorulara varsayılan cevapları vererek sessiz kurulum yapar. |

#### Örnekler:

**TypeScript kullanan ve otomatik bağımlılık yükleyen sessiz kurulum:**
```bash
node ./bin/index.js my-ts-lib --ts --git --install
# Veya daha kısa:
node ./bin/index.js my-ts-lib -y
```

**JavaScript kullanan ve bağımlılık yüklemesini atlayan kurulum:**
```bash
node ./bin/index.js my-js-lib --js --no-install
```

---

### 3. Yerel Paket Olarak Bağlama (Global Link)

Geliştirme aşamasında bu aracı terminalinizde global bir komut olarak kullanmak isterseniz:

```bash
# Proje kök dizinindeyken link oluşturun:
npm link

# Artık dilediğiniz klasörde şu komutla yeni proje açabilirsiniz:
create-gea-lib my-new-library
```

---

## Proje Oluşturulduktan Sonra Geliştirme

Yeni oluşturduğunuz kütüphane projesinin klasörüne giderek aşağıdaki komutları kullanabilirsiniz:

```bash
# Proje klasörüne geçiş yapın:
cd <proje-adi>

# İnteraktif oyun alanını (sandbox/demo) başlatır:
npm run dev

# Kütüphaneyi NPM dağıtımı için derler/derleme çıktılarını oluşturur:
npm run build
```
