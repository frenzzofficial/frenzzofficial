# Client Advisory & Technical Playbook: Lens Studio, AR Filters & E-Commerce VTO

> **Internal Use:** Sales discovery asset + technical operations manual. Use Section 1 and Section 4 in client-facing calls. Use Sections 2, 3, and 5 as internal engineering/PM reference and contract scaffolding.

---

## 1. Executive Summary & AR Platform Comparison

Clients approach AR with one of two mismatched expectations: they either want "a fun filter that goes viral" and get quoted for enterprise VTO complexity, or they want "customers to try on our product before buying" and get sold a Snapchat-only face filter with no path to their actual storefront. Our job in discovery is to separate the marketing-reach goal from the commerce-conversion goal — they call for genuinely different platforms, tracking fidelity, and budgets.

### AR Platform Comparison Matrix

| Criteria | **Snapchat Native Lenses** | **Meta (Instagram/Facebook) AR** | **WebAR (8th Wall / Snap Camera Kit)** | **Custom App AR SDK** (ARKit/ARCore) |
|---|---|---|---|---|
| **Target Audience Reach** | Massive Gen Z/Millennial reach via Lens Explorer, Snap Camera, and organic Story sharing; no app install required | Broad reach across IG Stories/Reels and FB Camera; strong for brand-awareness campaigns | Universal — runs in mobile Safari/Chrome via a link or QR code, no app or platform account required | Limited to users who already have (or will install) the client's own app — highest friction, highest control |
| **Tracking Accuracy (Face/Body/World)** | Excellent face tracking (SnapML-trained), solid body tracking via Lens Studio's Body Mesh, good world tracking via SnapML world markers | Good face tracking (Spark AR Face Tracker), body tracking historically weaker/deprecated in newer Meta tooling, decent world tracking via Meta's SLAM | Excellent world tracking via 8th Wall's SLAM (industry-leading for WebAR), face tracking via Camera Kit good but slightly behind native Lens Studio, body tracking limited | Best-in-class — native ARKit (LiDAR-assisted on supported iPhones) and ARCore give the highest-fidelity face/body/world tracking available on-device |
| **E-Commerce Conversion Potential** | High for impulse/social-driven purchases (Shoppable AR, Product Catalog integration) but requires exiting to Snapchat's ecosystem or a linked storefront | Moderate — strong for awareness, weaker direct-to-cart flow than native web checkout | Highest — sits directly on the client's own product page/checkout, zero platform hop, fully attributable in the client's own analytics/pixel | High but gated by app-install friction — only viable when the client already has strong app adoption |
| **File Size Limits** | 4MB hard cap per Lens (strict; enforced at publish) | ~4MB soft-recommended cap for Spark AR effects, similar strict enforcement on submission | No hard platform cap — bound by 8th Wall/hosting bandwidth and mobile load-time UX tolerance (we target well under 15MB for practical mobile load) | Bound by app binary/bundle size budgets set by the client's own app team, generally far more permissive |
| **Development Complexity** | Moderate — Lens Studio's node graph + TypeScript scripting, well-documented, fast iteration | Moderate — Spark AR Studio's patch editor, comparable complexity to Lens Studio but a shrinking toolchain (Meta has been consolidating AR investment) | High — requires JavaScript/Three.js/A-Frame or 8th Wall's proprietary APIs plus responsive web engineering and e-commerce platform integration | Highest — native iOS/Android development (Swift/Kotlin) with ARKit/ARCore SDKs, full app release cycle overhead |

**Client-facing framing:** *"If the goal is a shareable moment that spreads across social — Snapchat or Meta AR is the right call, and the 4MB limit is a creative constraint we design around, not a technical failure. If the goal is 'let a customer see the shoe on their foot and buy it right there on your product page' — that's a WebAR/Camera Kit build sitting on your own site, because every extra tap or app-switch between try-on and checkout measurably kills conversion."*

---

## 2. Top 5 Client AR Bottlenecks & Engineering Solutions

### 2.1 Heavy 3D Assets & File-Size Rejection (High Polycount, Unbaked Textures)

**(a) Root technical failure**
Clients hand over source CAD/product-visualization models built for renders, not real-time AR — often 500K+ polygons per object with 4K unbaked PBR texture sets per material slot. Lens Studio and Spark AR both enforce hard file-size caps (4MB), and even uncapped WebAR builds become unusable on mid-tier Android devices once total scene weight exceeds a mobile GPU's practical budget.

**(b) Impact on campaign metrics**
- **Bounce Rate** spikes when a Lens fails Snap's/Meta's file-size validation and the campaign misses its launch date entirely
- **Render Lag/frame drops** on real user devices (especially mid-range Android, which is the majority of global mobile share) cause users to close the camera before the AR moment lands
- Slow WebAR load times directly correlate with **drop-off before first interaction** — every additional second of asset load time bleeds session starts

**(c) Technical resolution steps**
1. Retopologize every hero asset to a real-time budget *before* texturing begins, not after — reworking topology post-texture wastes bake time
2. Standard polycount targets (see Section 3.1 for the full table): face-worn accessories (glasses, jewelry) at 8K-15K tris; footwear at 15K-25K tris per shoe; full-body wearables at 25K-40K tris
3. Bake high-poly detail into normal maps rather than shipping geometry — a 500K-poly source model becomes a 10K-poly real-time asset plus a baked normal map that preserves the visual detail
4. Compress and pack PBR textures: albedo/metallic/roughness/normal packed into as few texture channels as possible (e.g., ORM packing — Occlusion/Roughness/Metallic into a single RGB texture), exported as compressed `.ktx2`/Basis Universal for WebAR or Lens Studio's native compression for Snap builds
5. Run Lens Studio's built-in **Lens size/performance panel** before every submission — never submit blind and let the platform's validator be the first check

---

### 2.2 Inaccurate VTO Tracking & Drift (Floating Glasses, Misaligned Shoes/Wristwear)

**(a) Root technical failure**
VTO tracking failures almost always trace to one of three causes: (1) tracking anchor points placed using generic/default rig points instead of product-specific calibration, (2) insufficient training data for SnapML-based body/foot/wrist tracking on diverse body types and skin tones, or (3) a static rig with no per-frame corrective smoothing, so tracking jitter reads as the product "floating" or "sliding."

**(b) Impact on campaign metrics**
- Visibly misaligned try-on (glasses floating off the face, a shoe sliding independent of the foot) is the single fastest trust-killer in a VTO experience — users perceive it as "broken," not "AR is imprecise," and this directly tanks **add-to-cart conversion from the AR session**
- High **Drop-off** mid-session as users try to "fix" the tracking by repositioning and give up
- Negative social proof — a visibly glitchy VTO clip is far more likely to be screenshotted and shared as mockery than as marketing

**(c) Technical resolution steps**
1. For face-worn VTO (glasses, jewelry): rig to Lens Studio's Face Mesh with anchor points calibrated per-product against reference face scans spanning multiple face shapes and skin tones — never rely on the default anchor without recalibration
2. For footwear VTO: use Lens Studio's Foot Tracking (or 8th Wall's equivalent) with a two-point anchor (ankle + toe box) rather than a single anchor point, which is what causes rotational drift as the foot moves
3. Apply corrective temporal smoothing (a low-pass filter on position/rotation deltas frame-to-frame) to absorb tracking jitter without introducing perceptible lag — tune the smoothing factor per product category, since footwear needs more aggressive smoothing than static jewelry
4. Build and test against a **diverse device/body test matrix** before launch — minimum: 3 skin tones, 3 body/foot sizes, both iOS and Android reference devices, indoor and outdoor lighting — VTO tracking models trained/tested on a narrow demographic slice fail silently for everyone else
5. Include a manual "nudge/scale" fallback control in the UI (small on-screen arrows or pinch-to-adjust) so users can self-correct minor misalignment rather than abandoning the session

---

### 2.3 Dynamic Material & Catalog Scaling Failures (Hardcoding Assets vs. Scripted Material Pickers)

**(a) Root technical failure**
Freelancers under deadline pressure frequently hardcode each product variant (each colorway, each SKU) as a separate 3D object or duplicated material slot inside the Lens project. This works for a 3-color launch and completely collapses when the client's catalog grows to 40 SKUs — the Lens either blows the file-size cap loading every variant simultaneously, or the agency is stuck manually rebuilding the project for every catalog update.

**(b) Impact on campaign metrics**
- Catalog updates that should take an hour take days, delaying **campaign refresh cadence** and costing the client relevance during peak selling windows (new colorway drops, seasonal lines)
- Bloated multi-variant projects hit file-size caps, forcing a rushed re-optimization under launch-week time pressure
- No scalable data layer means the client can't self-serve catalog updates, creating permanent agency dependency that clients increasingly refuse to pay for at scale

**(c) Technical resolution steps**
1. Architect a single base mesh per product with a **scripted material/texture picker** driven by a data array, not one object per SKU:

```typescript
// Lens Studio TypeScript — scripted color/material picker
// @input Component.RenderMeshVisual productMesh
// @input Asset.Texture[] colorwayTextures
// @input Component.ScriptComponent uiController

let currentIndex: number = 0;

function applyColorway(index: number) {
  if (index < 0 || index >= script.colorwayTextures.length) return;
  const material = script.productMesh.mainMaterial.clone();
  material.mainPass.baseTex = script.colorwayTextures[index];
  script.productMesh.mainMaterial = material;
  currentIndex = index;
}

// Bound to on-screen swatch tap events
script.uiController.onSwatchTapped.add((swatchIndex: number) => {
  applyColorway(swatchIndex);
});
```

2. Drive the color/material array from a lightweight external config (a JSON manifest referencing texture asset IDs) so new colorways can be added by updating data, not rebuilding scene graph logic
3. For catalogs exceeding what a single Lens's file-size budget can hold, implement **remote asset loading** — Lens Studio's Remote Media Module (or 8th Wall's equivalent for WebAR) streams additional texture variants on demand instead of bundling every SKU into the initial download
4. Document the catalog-update workflow for the client's own team where platform tooling allows self-service (e.g., a connected spreadsheet/CMS feeding the remote texture manifest), reducing the agency's role to periodic QA rather than every single SKU refresh

---

### 2.4 Platform Lock-in (Snapchat-Only vs. Web E-Commerce Store Integration)

**(a) Root technical failure**
A Lens built purely against Snapchat's native SDK and asset pipeline has no direct path to a client's Shopify/website checkout — the try-on experience and the purchase moment live in two completely different ecosystems, and the client either accepts a broken funnel (send users from Snap back out to a browser to buy) or pays for the entire experience to be rebuilt from scratch for web.

**(b) Impact on campaign metrics**
- Every ecosystem hop (Snapchat → browser → product page → cart) sheds a measurable percentage of users at each step — **funnel drop-off compounds multiplicatively**, not additively
- Attribution breaks — the client's own pixel/analytics can't see what happened inside Snapchat's ecosystem, so **conversion from AR session to purchase becomes unmeasurable**, undermining the ROI case for AR spend in the first place
- Duplicate build cost when the client later demands a web version, since a Snap-only architecture wasn't designed for portability

**(c) Technical resolution steps**
1. From project kickoff, build the *tracking and interaction logic* in a platform-agnostic way where possible: keep material-picker scripts, tracking-calibration data, and UI logic conceptually portable, even though the underlying SDK calls differ between Lens Studio and Camera Kit/8th Wall
2. Default to a **Camera Kit-first architecture** for any client with e-commerce intent — Snap's Camera Kit SDK lets a Lens built in Lens Studio run embedded directly inside a client's own web or native app, giving both the Snapchat distribution reach *and* the on-site commerce integration from a single asset pipeline (full setup in Section 3.3)
3. For campaigns that are genuinely social-only (no commerce intent — pure brand awareness/virality), platform lock-in is an acceptable, deliberate trade-off; flag this explicitly in the SOW so the client isn't surprised later when they want a web version
4. Where the client's real goal is commerce conversion, steer discovery (Section 4) toward WebAR/Camera Kit from the first call, not as a retrofit after a Snap-only build underperforms

---

### 2.5 Bad Occlusion & Unrealistic Lighting (Lack of PBR Shaders and Real-World Environment Mapping)

**(a) Root technical failure**
Default Lens Studio/Spark AR materials with flat unlit shading, or PBR materials with no environment map bound to real-world lighting conditions, produce a product render that looks visibly "pasted on" — too bright, too flat, or lit from a direction inconsistent with the user's actual environment. Additionally, without proper depth-based occlusion (hand-in-front-of-face, hair-over-glasses), the product renders *on top of* real-world elements it should be behind.

**(b) Impact on campaign metrics**
- A product that looks fake erodes purchase confidence at the exact moment VTO is supposed to build it — this is a direct hit to **add-to-cart conversion**, the core metric commerce-focused AR is sold on
- Poor occlusion (glasses rendering in front of a hand passing over the face) breaks immersion hard enough to cause immediate session abandonment
- Screenshots/shares of obviously fake-looking renders undermine brand perception more than having no AR experience at all

**(c) Technical resolution steps**
1. Build every product material as full PBR (albedo, metallic, roughness, normal, ambient occlusion channels) rather than relying on Lens Studio's default unlit or simplified Blinn-Phong materials
2. Bind a dynamic environment map using Lens Studio's World/Environment Texture nodes so reflective/metallic surfaces (eyewear frames, jewelry, metallic footwear accents) pick up ambient light and reflections from the user's actual camera feed rather than a static baked studio HDRI
3. Implement depth-based occlusion using Lens Studio's Face Mesh/Hand Mesh occluders (invisible geometry that only writes to the depth buffer) so real-world elements like hair, hands, and fingers correctly render in front of the virtual product when they should
4. Calibrate exposure/white-balance response in the shader against Lens Studio's device camera texture so the product's apparent brightness reacts to the user's actual lighting conditions instead of rendering at a fixed brightness regardless of environment
5. QA under a deliberately varied lighting test pass (bright daylight, indoor warm light, low light) as a mandatory pre-launch checklist item, not an afterthought

---

## 3. Production Architecture Blueprint & Optimization Workflow

### 3.1 3D Pipeline Standard: Polycount Targets, PBR Texture Packing, Animation Rigging Specs

**Polycount targets by product category (real-time triangle budget, post-retopology):**

| Product Category | Target Tri Count | Texture Resolution | Notes |
|---|---|---|---|
| Eyewear/Glasses | 8,000 - 15,000 | 1024×1024 (albedo/ORM), 1024×1024 (normal) | Lens transparency handled via shader alpha, not geometry |
| Jewelry (rings, earrings, necklaces) | 5,000 - 12,000 | 1024×1024 | Heavy reliance on normal maps for engraving/facet detail |
| Footwear (single shoe) | 15,000 - 25,000 | 2048×2048 (albedo/ORM), 2048×2048 (normal) | Sole and upper can share a texture atlas to save draw calls |
| Wristwear (watches, bracelets) | 10,000 - 18,000 | 1024×1024 | Watch face detail baked into normal/albedo, not separate geometry |
| Full garment (shirts, jackets) | 20,000 - 35,000 | 2048×2048, multi-material atlas | Cloth simulation avoided in real-time; use pre-baked drape pose |
| Full-body/world environment props | 25,000 - 50,000 total scene budget | Atlas-packed, 2048×2048 max per atlas | Aggressive instancing for repeated elements |

**PBR texture packing standard:**
- **Albedo (Base Color):** RGB channel, compressed to ASTC (mobile-native) or Basis Universal/KTX2 for WebAR cross-platform delivery
- **ORM Packing:** Occlusion (R), Roughness (G), Metallic (B) packed into a single texture to cut texture-slot count and total file weight roughly in half versus three separate maps
- **Normal Map:** Tangent-space, compressed via platform-appropriate normal compression (BC5/ATI2 equivalent where supported, otherwise standard ASTC)
- **Target total asset weight:** under 4MB for any Snap/Meta-native Lens; under 8-15MB for WebAR (balanced against 3-5 second load tolerance on 4G)

**Animation rigging specs:**
- Face-anchored products (glasses, jewelry): bound to Lens Studio's Face Mesh bind points, never a static rigid transform — must inherit micro-expression deformation (brow raise, cheek movement) at a low weight to avoid the "welded-on" look
- Body/foot-anchored products: two-point minimum rig (proximal + distal anchor) with inverse kinematic correction where the SDK supports it, to prevent single-anchor rotational drift (see Section 2.2)
- Idle/attract-mode animation (a subtle rotation or shimmer on first load) kept under 15 keyframes and baked, not procedural, to minimize runtime script overhead

### 3.2 Interactive Logic & UI: Lens Studio Scripting for Dynamic Selectors, Taps, and Gestures

Standard interaction patterns we implement on every commerce-focused Lens:

**Screen-tap color/variant cycling:**

```typescript
// @input Component.ScreenTransform tapTarget
// @input Component.RenderMeshVisual productMesh
// @input Asset.Texture[] variants

let variantIndex: number = 0;

script.tapTarget.getSceneObject()
  .createComponent("Component.TapComponent")
  .onTap.add(() => {
    variantIndex = (variantIndex + 1) % script.variants.length;
    const mat = script.productMesh.mainMaterial.clone();
    mat.mainPass.baseTex = script.variants[variantIndex];
    script.productMesh.mainMaterial = mat;
  });
```

**Pinch-to-scale gesture for manual VTO adjustment (fallback control from Section 2.2):**

```typescript
// @input Component.ScriptComponent gestureModule
// @input SceneObject productRoot

let baseScale: vec3 = script.productRoot.getTransform().getLocalScale();

script.gestureModule.onPinchUpdate.add((pinchDelta: number) => {
  const clampedDelta = Math.max(0.85, Math.min(1.15, 1 + pinchDelta));
  script.productRoot.getTransform().setLocalScale(
    baseScale.uniformScale(clampedDelta)
  );
});
```

**Swipe-to-browse catalog navigation (feeds the material picker from Section 2.3):**

```typescript
// @input Component.ScriptComponent swipeModule
// @input Component.ScriptComponent materialPicker

script.swipeModule.onSwipeLeft.add(() => {
  script.materialPicker.api.nextVariant();
});
script.swipeModule.onSwipeRight.add(() => {
  script.materialPicker.api.previousVariant();
});
```

**Design principle across all interaction scripting:** every gesture/tap handler should call into a single centralized state controller (product variant index, scale offset, active SKU) rather than mutating material/transform state directly from multiple scattered handlers — this keeps the "current state" debuggable and prevents race conditions between simultaneous gesture inputs.

### 3.3 WebAR Integration Architecture: Embedding a Lens Studio VTO Experience via Snap Camera Kit

Step-by-step architecture for embedding a Lens Studio-built VTO experience into a Shopify or custom web storefront:

1. **Build and publish the Lens in Lens Studio** as normal, targeting Camera Kit compatibility (avoid Snapchat-exclusive API calls not supported in Camera Kit's runtime — verify against Snap's Camera Kit compatibility list before finalizing scripts)

2. **Register a Camera Kit application** in the Snap Developer Portal to obtain an API token scoped to the client's project

3. **Install the Camera Kit Web SDK** into the storefront's frontend build:

```bash
npm install @snap/camera-kit
```

4. **Bootstrap the Camera Kit session** on the product page, loading the specific Lens ID published for that product/SKU family:

```javascript
import { bootstrapCameraKit, createMediaStreamSource } from '@snap/camera-kit';

async function initVTO(productLensId) {
  const cameraKit = await bootstrapCameraKit({
    apiToken: process.env.NEXT_PUBLIC_CAMERA_KIT_TOKEN,
  });

  const session = await cameraKit.createSession({
    liveRenderTarget: document.getElementById('vto-canvas'),
  });

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user' },
  });
  await session.setSource(createMediaStreamSource(stream));

  const lens = await cameraKit.lensRepository.loadLens(
    productLensId,
    'YOUR_LENS_GROUP_ID'
  );
  await session.applyLens(lens);
  await session.play();
}
```

5. **Bind the storefront's existing product-variant selector** (Shopify's native color/size swatches) to the Lens's internal material picker via Camera Kit's Lens messaging API, so a customer changing colorways on the page updates the live AR render in sync — this closes the loop between the commerce UI the client already has and the AR layer, avoiding a duplicate/disconnected UI

6. **Attach conversion tracking** at the Camera Kit session layer — fire the client's existing analytics/pixel events (`session_started`, `variant_changed`, `add_to_cart_from_ar`) so AR engagement becomes attributable inside the client's existing analytics stack, resolving the attribution gap from Section 2.4

7. **Fallback handling:** detect WebGL/camera-permission failures gracefully and degrade to static product imagery rather than a broken canvas — never let a tracking/permission failure block the underlying purchase path

---

## 4. Technical Audit & Discovery Intake Checklist (For New Clients)

Run this before quoting any estimate on an AR/VTO engagement. Each answer directly informs scope, platform selection, and risk pricing.

1. **What is the primary campaign goal — social virality/awareness, or direct e-commerce conversion?** (Determines Snapchat/Meta-native vs. WebAR/Camera Kit architecture from Section 1.)
2. **Can you provide source 3D models for each product, and in what format/polycount are they currently?** (Determines retopology/optimization scope per Section 3.1 — CAD-grade source files require significantly more prep than pre-optimized assets.)
3. **How many SKUs/colorways/variants need to be represented, and how frequently does the catalog change?** (Determines whether a hardcoded or scripted/remote-loaded material system, per Section 2.3, is required.)
4. **What tracking type does the product require — face, hand/wrist, foot, full-body, or world/environment?** (Different tracking types carry materially different accuracy risk and development time.)
5. **Do you have an existing e-commerce platform (Shopify, custom storefront, etc.), and does your team have engineering resources to support a web embed?** (Determines Camera Kit/8th Wall integration complexity and who owns the frontend integration work.)
6. **What is your target device/browser support matrix (iOS Safari, Android Chrome, specific OS version floors)?** (WebAR performance and camera API support vary meaningfully across this matrix — must be scoped, not assumed.)
7. **Do you have brand/product photography or reference imagery showing accurate real-world scale and color?** (Needed for texture color-accuracy and VTO scale calibration — mismatched scale is a common client complaint traceable to missing reference data.)
8. **What analytics/attribution platform do you currently use, and do you need AR session data to feed into it?** (Determines whether Camera Kit event-tracking integration, per Section 3.3, is in scope.)
9. **What is your target launch date, and is it tied to a fixed external event (product drop, seasonal campaign, brand partnership)?** (Fixed, immovable dates change risk pricing — platform review/approval timelines for Snap/Meta submissions are not fully within our control.)
10. **What is your budget range, and have you previously invested in AR/VTO work with another vendor?** (Prior vendor history often surfaces existing technical debt — hardcoded assets, missing source files, undocumented scripts — that materially affects scope.)

**Internal use:** Score each answer 0-2 (0 = absent/high risk, 1 = partial, 2 = solid). A total score under 10/20, or any "0" on questions 2, 4, or 6, flags the project as requiring a **paid discovery/asset-prep phase** before a fixed-bid estimate can responsibly be given — do not quote fixed scope against unknown source assets.

---

## 5. Scope of Work (SOW) Templates for Freelance/Agency Projects

### SOW Option A: Viral Marketing & Social Media AR Campaign (Interactive Face/World Filter)

**Objective:** Deliver a high-shareability Snapchat and/or Meta AR filter optimized for organic reach and brand engagement, within platform file-size constraints.

**Phase 1 — Creative Concept & Technical Feasibility (Week 1)**
- Concept development aligned to campaign goals (brand awareness, hashtag challenge, seasonal moment)
- Technical feasibility pass against the 4MB platform cap and target tracking type, flagging any creative asks that exceed platform limits before build begins

**Phase 2 — Asset Production & Tracking Setup (Week 1-3)**
- 3D asset creation/optimization per Section 3.1 polycount and texture targets
- Face/world tracking rig setup and calibration per Section 2.2 methodology

**Phase 3 — Interaction & Polish (Week 3-4)**
- Interactive scripting (tap/gesture triggers, animated states) per Section 3.2 patterns
- PBR shading and lighting pass per Section 2.5 to avoid the "pasted on" look
- Cross-device QA pass (minimum 3 device tiers, varied lighting conditions)

**Phase 4 — Submission & Launch Support (Week 4-5)**
- Platform submission (Snap Lens Studio publish / Meta Spark AR submission) with size/performance validator sign-off before submission
- Launch-week monitoring for platform approval issues or performance reports from early users

**Exclusions:** Paid media placement/boosting (client-billed directly to platform), influencer partnership coordination, e-commerce/checkout integration (see Option B), post-launch iteration beyond one revision round.

**Payment structure:** 40% upfront / 40% at Phase 3 completion / 20% at successful platform publish.

---

### SOW Option B: Enterprise E-Commerce Virtual Try-On Pipeline (Multi-Variant Footwear/Eyewear VTO with Web Embed)

**Objective:** Build a production-grade, catalog-scalable VTO experience embedded directly into the client's e-commerce storefront via Snap Camera Kit, with full conversion attribution.

**Phase 1 — Discovery & Architecture (Week 1-2)**
- Run the 10-point Technical Audit Checklist (Section 4)
- Asset audit of all source 3D models; retopology/texture-prep scope finalized against Section 3.1 targets
- Tracking architecture and rig design signed off (two-point anchor for footwear, calibrated face mesh binding for eyewear, per Section 2.2)

**Phase 2 — Core VTO Build (Week 2-5)**
- Base mesh + scripted material picker architecture built per Section 2.3, validated against the full initial catalog size
- PBR shading, environment mapping, and occlusion implementation per Section 2.5
- Manual adjustment/fallback controls (pinch-to-scale, nudge) implemented per Section 3.2

**Phase 3 — Web Embed & Commerce Integration (Week 5-7)**
- Camera Kit Web SDK integration into the client's storefront per the Section 3.3 architecture
- Variant selector binding between the storefront's native UI and the Lens's internal state controller
- Analytics/attribution event wiring into the client's existing tracking stack

**Phase 4 — QA, Scale Testing & Launch (Week 7-8)**
- Full catalog load-testing (confirm remote asset loading holds up across entire SKU range, not just launch subset)
- Cross-device/cross-browser QA matrix execution per the Section 4 target support matrix
- Staged rollout with real-user monitoring before full storefront-wide launch

**Exclusions:** Net-new e-commerce platform development outside the AR embed itself, paid media, 3D asset creation from scratch if photorealistic source models are not provided (quoted separately as an asset-production add-on), ongoing catalog-update labor beyond the initial SKU set (available as a retainer).

**Payment structure:** 25% upfront (discovery & architecture) / 45% at Phase 3 completion / 30% at validated launch.

---

*This playbook is a living document — update the platform comparison matrix, file-size limits, and SDK integration steps as Snap, Meta, and 8th Wall ship new tooling and platform policy changes.*
