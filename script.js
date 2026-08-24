// Mythos Client 官网 — 交互脚本
// 模块数据取自源码 Module.java / ModuleManager.java

const CATEGORIES = [
    { cat: "Combat",    icon: "🗡", order: 1 },
    { cat: "Misc",      icon: "◈", order: 2 },
    { cat: "Render",    icon: "▣", order: 3 },
    { cat: "Movement",  icon: "✦", order: 4 },
    { cat: "Player",    icon: "☻", order: 5 },
    { cat: "Exploit",   icon: "⚡", order: 6 },
    { cat: "Client",    icon: "⌘", order: 7 },
];

// i18n 翻译
const I18N = {
    zh: {
        nav_gui: "界面", nav_video: "视频", nav_features: "功能", nav_buy: "购买",
        nav_cta: "立即购买",
        hero_sub: "为混沌而生..",
        hero_desc: "新一代 Minecraft 增强客户端。为灵活性、性能与掌控而生。",
        btn_buy: "购买 / 咨询", btn_watch: "观看演示",
        btn_buy_now: "购买 / 咨询",
        chip_update: "包更新", chip_support: "包售后", chip_phantom: "幻影盾混淆验证",
        gui_title: "客户端UI",
        search_ph: "检索模块…",
        video_title: "视频演示", video_loading: "视频加载中…",
        video_source: "在哔哩哔哩打开 →",
        feat_title: "核心功能",
        feat_1_title: "3c3u 静默双挖", feat_1_desc: "秒挖敌人围脚，挖掘效率拉满。",
        feat_2_title: "玻璃塞脚 + 反玻璃", feat_2_desc: "SelfTrap 烟花占位自保，玻璃塞脚挤掉落物，反玻璃破除敌方陷阱。",
        feat_3_title: "空战喷药", feat_3_desc: "空中喷药续飞，自动扔敌人补给，空战续航无忧。",
        feat_4_title: "锤矛联动", feat_4_desc: "锤矛双爆 / AutoMace / AutoSpear，锤矛协同爆发，瞬间压制。",
        feat_5_title: "Skybox 渲染", feat_5_desc: "自定义天空盒渲染，沉浸式视觉，保持高性能。",
        feat_6_title: "跨服聊天", feat_6_desc: "跨服聊天、标点等便捷功能，多人协作如丝般顺滑。",
        feat_7_title: "幻影盾混淆验证", feat_7_desc: "采用幻影盾混淆验证，保障客户端安全，防止逆向与盗用。",
        buy_title: "购买 / 咨询",
        buy_text: "定位为 Minecraft 辅助增强类客户端\n支持独立运行或配合其他客户端使用\n持续优化中，欢迎反馈问题与建议",
        modal_eyebrow: "官方 QQ 群", modal_title: "加入群聊",
        modal_copy: "复制", modal_tip: "联系群主或管理员即可",
        lang_btn: "中文"
    },
    en: {
        nav_gui: "GUI", nav_video: "Video", nav_features: "Features", nav_buy: "Buy",
        nav_cta: "Get Now",
        hero_sub: "Built for the Chaos",
        hero_desc: "A New Generation of Minecraft Enhancement. Designed for flexibility, performance, and control.",
        btn_buy: "Purchase / Contact", btn_watch: "Watch Demo",
        btn_buy_now: "Purchase / Contact",
        chip_update: "Free Updates", chip_support: "Priority Support", chip_phantom: "Phantom Shield Verified",
        gui_title: "Client GUI",
        search_ph: "Search modules…",
        video_title: "Showcase", video_loading: "Loading video…",
        video_source: "Open on Bilibili →",
        feat_title: "Core Features",
        feat_1_title: "3c3u Silent Double-Mine", feat_1_desc: "Seamless auto-production with instant resupply. Maximize AFK efficiency.",
        feat_2_title: "SelfTrap + AntiGlass", feat_2_desc: "Glass trap self-defense, firework crystal block, enemy trap counter.",
        feat_3_title: "Aerial Potion", feat_3_desc: "Mid-air potion management, auto-supply for teammates, air superiority.",
        feat_4_title: "Mace-Spear Synergy", feat_4_desc: "DoublePop / AutoMace / AutoSpear — coordinated burst for instant pressure.",
        feat_5_title: "Skybox Rendering", feat_5_desc: "Custom skybox rendering, immersive visuals, high performance.",
        feat_6_title: "Cross-Server Chat", feat_6_desc: "Cross-server chat, punctuation utilities, seamless team coordination.",
        feat_7_title: "Phantom Shield Obfuscation", feat_7_desc: "Phantom Shield obfuscation verification. Anti-reverse-engineering protection.",
        buy_title: "Purchase / Contact",
        buy_text: "A Minecraft enhancement client\nStandalone or use alongside other clients\nContinuously optimized. Feedback welcome.",
        modal_eyebrow: "Official QQ Group", modal_title: "Join Group Chat",
        modal_copy: "Copy", modal_tip: "Contact the group owner or admin to get started",
        lang_btn: "EN"
    }
};

let currentLang = "en";

function applyLang(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.lang = lang;

    // 切换过渡
    document.body.classList.add("is-switching");

    setTimeout(() => {
        // 隐藏 tooltip（防止语言切换时残留）
        tooltipEl.classList.remove("is-show");

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) {
                const isMultiline = dict[key].includes("\n");
                if (isMultiline) {
                    el.innerHTML = dict[key].replace(/\n/g, "<br/>");
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        document.querySelectorAll("[data-i18n-ph]").forEach(el => {
            const key = el.getAttribute("data-i18n-ph");
            if (dict[key]) el.placeholder = dict[key];
        });

        // 更新语言按钮（单按钮切换，显示当前可切换到的语言）
        const langToggle = document.getElementById("langToggle");
        if (langToggle) {
            const otherLang = lang === "zh" ? "EN" : "中文";
            langToggle.textContent = otherLang;
        }

        // 更新复制按钮
        const copyBtn = document.getElementById("copyQq");
        if (copyBtn && copyBtn.dataset.copied !== "true") {
            copyBtn.textContent = dict.modal_copy;
        }

        document.body.classList.remove("is-switching");

        // 重新渲染模块面板（带动画）
        renderPanels(document.getElementById("cgSearch").value);
        observeReveals();
    }, 120);
}

// 单按钮语言切换
const langToggle = document.getElementById("langToggle");
if (langToggle) {
    langToggle.addEventListener("click", () => {
        const nextLang = currentLang === "zh" ? "en" : "zh";
        applyLang(nextLang);
    });
}

// 以下数据直接由源码 super() 调用提取，按字母序排列
const MODULE_DATA = {
    Combat: [
        { name: "AntiArmorBreak", desc: "Automatically removes armor when durability is low" },
        { name: "AntiCrawl", desc: "Prevents crawling" },
        { name: "AntiGlass", desc: "Blocks crystal placement with fireworks, mines enemy glass" },
        { name: "AntiPhase", desc: "Prevents phase through blocks" },
        { name: "AntiRegear", desc: "Prevents regear" },
        { name: "AntiWeakness", desc: "Auto swap to sword when weak" },
        { name: "Aura", desc: "Automatically attacks nearby entities" },
        { name: "AutoAnchor", desc: "Automatically anchors when low HP" },
        { name: "AutoCrystal", desc: "Automatically places crystals on obsidian" },
        { name: "AutoFiller", desc: "Auto place blocks when obsidian breaks" },
        { name: "AutoLog", desc: "Auto disconnects on low totems" },
        { name: "AutoMace", desc: "Auto mace smash attack with elytra" },
        { name: "AutoMine", desc: "Auto mines blocks" },
        { name: "AutoPotion", desc: "Auto drinks splash potions" },
        { name: "AutoSpear", desc: "Auto spear attack and teleport" },
        { name: "AutoTrap", desc: "Auto Trap Enemy" },
        { name: "AutoTrapDoor", desc: "Auto places trapdoors" },
        { name: "AutoWeb", desc: "Auto places web" },
        { name: "AutoXP", desc: "Auto mends items with XP bottles" },
        { name: "Blocker", desc: "Blocks incoming projectiles" },
        { name: "CevBreaker", desc: "Breaks cevs automatically" },
        { name: "Criticals", desc: "Always deals critical hits" },
        { name: "DoublePop", desc: "Auto release spear charge for double-pop combo" },
        { name: "Flatten", desc: "Flattens terrain for combat" },
        { name: "HoleFiller", desc: "Fills holes automatically" },
        { name: "Mainhand", desc: "Auto manages mainhand item" },
        { name: "NoHitDelay", desc: "Remove attack cooldown" },
        { name: "Offhand", desc: "Auto manages offhand item" },
        { name: "PistonCrystal", desc: "Uses pistons for crystals" },
        { name: "PistonKick", desc: "Auto pushes entities with pistons" },
        { name: "SelfTrap", desc: "Traps yourself on purpose" },
        { name: "SpearAttack", desc: "Spear kinetic attack and teleport" },
        { name: "Surround", desc: "Surrounds you with Obsidian" },
    ],
    Misc: [
        { name: "AntiAFK", desc: "Prevents AFK kick from server" },
        { name: "AutoLogin", desc: "Auto logs in to server" },
        { name: "AutoReconnect", desc: "Auto reconnects to server" },
        { name: "BedCrafter", desc: "Auto crafts beds" },
        { name: "ChatAppend", desc: "Appends text to chat messages" },
        { name: "Enemy", desc: "Enemy list management" },
        { name: "ExtraTab", desc: "Removes tab list entry limit" },
        { name: "FakePlayer", desc: "Spawns fake player entity" },
        { name: "Friend", desc: "Friend list management" },
        { name: "InventoryAlert", desc: "Alert when items are low or missing" },
        { name: "Kit", desc: "Auto equips kit on respawn" },
        { name: "LiquidFiller", desc: "Automatically fill fluid sources" },
        { name: "MiddleClick", desc: "Middle click utility actions" },
        { name: "NameProtect", desc: "Hides your nickname from others" },
        { name: "NoPacketKick", desc: "Prevents packet-based kick" },
        { name: "NoSound", desc: "Removes game sounds" },
        { name: "NoTerrainScreen", desc: "Hides terrain loading screen" },
        { name: "PearlNotify", desc: "Notifies when other players throw pearls" },
        { name: "PearlPredict", desc: "Predicts pearl landing position" },
        { name: "PotionAlert", desc: "Alert when enemy potion effects expire" },
        { name: "PotionTrack", desc: "Tracks enemy potion effects" },
        { name: "ShulkerViewer", desc: "Preview shulker box contents" },
        { name: "SkinBlink", desc: "Skin flicker effect" },
        { name: "Spammer", desc: "Chat message spammer" },
        { name: "Tips", desc: "Notifies on player range enter/leave" },
        { name: "UnfocusedFPS", desc: "Lowers FPS when Minecraft is in background" },
        { name: "VisualRange", desc: "Announces players entering/leaving visual range" },
    ],
    Render: [
        { name: "Ambience", desc: "Custom ambience" },
        { name: "AttackEffect", desc: "Attack visual effects" },
        { name: "BreadCrumbs", desc: "Draws trails behind projectiles and you" },
        { name: "BreakESP", desc: "Shows break progress ESP" },
        { name: "CameraClip", desc: "Clips camera through walls" },
        { name: "Chams", desc: "See entities through walls" },
        { name: "Crosshair", desc: "Custom crosshair display" },
        { name: "CrystalModel", desc: "Custom crystal model rendering" },
        { name: "ESP", desc: "Highlights entities through walls" },
        { name: "Fov", desc: "Adjusts field of view" },
        { name: "Glint", desc: "Changes enchantment glint color" },
        { name: "HeadESP", desc: "Highlights player heads" },
        { name: "HoleESP", desc: "Highlights hole positions" },
        { name: "ItemPhysics", desc: "Custom item physics" },
        { name: "KillEffect", desc: "Visual effects on player kill" },
        { name: "LogoutSpots", desc: "Shows logout spots of players" },
        { name: "MotionBlur", desc: "Motion blur visual effect" },
        { name: "MotionCamera", desc: "Motion camera effect" },
        { name: "NameTags", desc: "Renders info on player NameTags" },
        { name: "NoRender", desc: "Disables overlays and potion effects" },
        { name: "PhaseESP", desc: "Highlights phase-through blocks" },
        { name: "PlaceRender", desc: "Renders block placement preview" },
        { name: "PopChams", desc: "Pop-up chams effect on totem pop" },
        { name: "Shader+", desc: "Advanced ESP using shaders" },
        { name: "Shaders", desc: "Custom shader effects on entities" },
        { name: "SkyBox", desc: "Custom skybox shader" },
        { name: "TargetESP", desc: "Highlights target entity through walls" },
        { name: "TotemParticle", desc: "Custom totem particle effects" },
        { name: "Tracers", desc: "Draws lines to entities" },
        { name: "Trajectories", desc: "Predicts projectile paths" },
        { name: "ViewModel", desc: "Custom view model rendering" },
        { name: "Xray", desc: "X-ray vision for blocks" },
        { name: "Zoom", desc: "Zoom view effect" },
    ],
    Movement: [
        { name: "AutoWalk", desc: "Auto walks forward automatically" },
        { name: "Avoid", desc: "Allows flying over void blocks" },
        { name: "BlockStrafe", desc: "Strafe movement inside blocks" },
        { name: "EAccelerate", desc: "Elytra Grim Accelerate" },
        { name: "ElytraFly", desc: "Elytra flight enhancement" },
        { name: "EntityControl", desc: "Controls rideable entities" },
        { name: "FastFall", desc: "Miyagi son simulator" },
        { name: "FastSwim", desc: "Faster swimming in water" },
        { name: "Flight", desc: "Flight mode for player" },
        { name: "GuiMove", desc: "Allows movement while in GUIs" },
        { name: "HighJump", desc: "Boosts jump height" },
        { name: "HoleSnap", desc: "HoleSnap" },
        { name: "MovementSync", desc: "Syncs movement packets" },
        { name: "NoFall", desc: "Prevents fall damage" },
        { name: "NoJumpDelay", desc: "Removes jump cooldown delay" },
        { name: "NoSlow", desc: "Removes item use slowdown" },
        { name: "SafeWalk", desc: "Prevents walking off edges" },
        { name: "Speed", desc: "Boosts movement speed" },
        { name: "Sprint", desc: "Permanently keeps player in sprinting mode" },
        { name: "Step", desc: "Steps up blocks" },
        { name: "Strafe", desc: "Modifies sprinting" },
        { name: "VClip", desc: "Vertical clip through blocks" },
        { name: "Velocity", desc: "Modifies player velocity" },
    ],
    Player: [
        { name: "AirPlace", desc: "Place blocks in the air" },
        { name: "AirPotion", desc: "Auto throws potions upward" },
        { name: "AntiEffects", desc: "Prevents unwanted effects" },
        { name: "AutoArmor", desc: "Auto equips best armor" },
        { name: "AutoEat", desc: "Auto eats food when hungry" },
        { name: "AutoFish", desc: "Auto fishing" },
        { name: "AutoTool", desc: "Auto switches tools" },
        { name: "ChestStealer", desc: "Auto steals from chests" },
        { name: "ClearTitle", desc: "Clears screen titles" },
        { name: "EndermanAim", desc: "Looks at endermen to provoke" },
        { name: "FireworkBoost", desc: "Firework boost with acceleration" },
        { name: "Freecam", desc: "Free camera mode" },
        { name: "FreeLook", desc: "Free view angle" },
        { name: "HighlightSelf", desc: "Highlights your name in chat" },
        { name: "InteractTweaks", desc: "Interaction tweaks" },
        { name: "InventorySorter", desc: "Auto sorts inventory items" },
        { name: "InventoryTweaks", desc: "Improves inventory management" },
        { name: "PacketEat", desc: "Packet-based eating" },
        { name: "Replenish", desc: "Auto replenishes hotbar" },
        { name: "Scaffold", desc: "Auto scaffolding bridge placement" },
        { name: "ShulkerSpiller", desc: "Auto empty enemy shulker boxes" },
        { name: "SpeedMine", desc: "Packet-based fast mining" },
        { name: "SpeedMine+", desc: "Advanced packet-based mining" },
        { name: "Swing", desc: "Custom arm swing animation" },
        { name: "Timer", desc: "Game speed timer acceleration" },
        { name: "Yaw", desc: "Locks yaw and pitch rotation" },
    ],
    Exploit: [
        { name: "AntiHunger", desc: "Prevents hunger loss" },
        { name: "AntiPacket", desc: "Blocks incoming server packets" },
        { name: "Blink", desc: "Blink teleport exploit" },
        { name: "ChorusControl", desc: "Controls chorus fruit teleport" },
        { name: "Clip", desc: "Clip through blocks" },
        { name: "FastConsume", desc: "Fast item consumption" },
        { name: "InfiniteTrident", desc: "Infinite trident throw" },
        { name: "MaceSpoof", desc: "Spoofs mace attack packets" },
        { name: "MultiTask", desc: "Allows eating while mining/attacking" },
        { name: "NewChunks", desc: "Highlights newly loaded chunks" },
        { name: "NoResourcePack", desc: "Bypasses resource pack" },
        { name: "PacketControl", desc: "Controls movement packets" },
        { name: "Phase", desc: "Pearl phase through blocks" },
        { name: "PingSpoof", desc: "Spoofs player ping value" },
        { name: "RocketExtend", desc: "Extends rocket firework flight" },
        { name: "ServerLagger", desc: "Lags the server with packets" },
        { name: "TeleportLogger", desc: "Logs player teleport events" },
        { name: "XCarry", desc: "Carry items in crafting slots" },
        { name: "XCarry+", desc: "Auto move hovered item to crafting grid" },
    ],
    Client: [
        { name: "AntiCheat", desc: "Anti-cheat bypass settings" },
        { name: "Baritone", desc: "Pathfinder integration settings" },
        { name: "Capes", desc: "Custom cape selector" },
        { name: "ClickGui", desc: "Click GUI interface" },
        { name: "ClientSetting", desc: "Client settings" },
        { name: "Colors", desc: "Color settings" },
        { name: "Fonts", desc: "Font settings" },
        { name: "HUDSetting", desc: "HUD settings" },
        { name: "TextRadar", desc: "Text radar display" },
    ],
};

// 分类顺序严格按照 Category.values()：Combat, Misc, Render, Movement, Player, Exploit, Client
const CAT_ORDER = CATEGORIES.map(c => c.cat);

// 渲染
const panelsEl = document.getElementById("cgPanels");
const tooltipEl = document.getElementById("cgTooltip");

function renderPanels(filter = "") {
    panelsEl.innerHTML = "";
    const q = filter.toLowerCase();
    CAT_ORDER.forEach((catName, catIdx) => {
        const catData = CATEGORIES.find(c => c.cat === catName);
        const modules = MODULE_DATA[catName] || [];
        const filtered = modules.filter(m => m.name.toLowerCase().includes(q));
        if (filtered.length === 0) return;
        const panel = document.createElement("div");
        panel.className = "cg-panel reveal";
        panel.setAttribute("data-delay", String(catIdx + 1));
        panel.style.opacity = "0";
        panel.style.transform = "translateY(16px)";
        panel.style.filter = "blur(8px)";
        panel.style.transition = `opacity 0.5s ease ${catIdx * 0.06}s, transform 0.5s ease ${catIdx * 0.06}s, filter 0.5s ease ${catIdx * 0.06}s`;
        panel.innerHTML = `
            <div class="cg-panel__head">
                <span>${catName}</span>
                <span class="cg-ic">${catData.icon}</span>
            </div>
            <div class="cg-panel__body"></div>
        `;
        const body = panel.querySelector(".cg-panel__body");
        filtered.forEach(m => {
            const row = document.createElement("div");
            row.className = "cg-mod";
            row.dataset.desc = m.desc;
            row.dataset.name = m.name;
            row.innerHTML = `<span class="cg-mod__name">${m.name}</span>`;
            body.appendChild(row);
        });
        panelsEl.appendChild(panel);

        // 触发面板动画
        requestAnimationFrame(() => {
            panel.style.opacity = "1";
            panel.style.transform = "translateY(0)";
            panel.style.filter = "blur(0)";
        });
    });
    bindModuleEvents();
}

function bindModuleEvents() {
    panelsEl.querySelectorAll(".cg-mod").forEach(mod => {
        mod.addEventListener("click", () => mod.classList.toggle("is-on"));
        mod.addEventListener("mouseenter", () => {
            tooltipEl.textContent = mod.dataset.desc;
            tooltipEl.classList.add("is-show");
        });
        mod.addEventListener("mouseleave", () => tooltipEl.classList.remove("is-show"));
        mod.addEventListener("mousemove", (e) => {
            if (!tooltipEl.classList.contains("is-show")) return;
            const tw = tooltipEl.offsetWidth;
            const th = tooltipEl.offsetHeight;
            const pad = 12;
            let x = e.clientX + pad;
            let y = e.clientY - th - 6;
            if (x + tw > window.innerWidth - 4) x = e.clientX - tw - pad;
            if (y < 4) y = e.clientY + pad;
            if (y + th > window.innerHeight - 4) y = window.innerHeight - th - 4;
            tooltipEl.style.left = x + "px";
            tooltipEl.style.top = y + "px";
        });
    });
}

// ============ 滚动揭示动画（每次进出视口都触发） ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("is-visible");
            void entry.target.offsetWidth; // reflow
            entry.target.classList.add("is-visible");
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"
});

// 观察所有 reveal 元素（包括动态创建的）
function observeReveals() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (!el.dataset.observed) {
            el.dataset.observed = "true";
            revealObserver.observe(el);
        }
    });
}

// 初始化：默认英文（applyLang 内部会处理 renderPanels + observeReveals）
applyLang("en");

document.getElementById("cgSearch").addEventListener("input", (e) => {
    renderPanels(e.target.value);
    observeReveals();
    tooltipEl.classList.remove("is-show");
});

// 视频：滚动到位置自动播放
const videoFrame = document.getElementById("videoFrame");
const videoPlaceholder = document.getElementById("videoPlaceholder");
const BVID = "BV17Dbe6MEom";
let videoLoaded = false;

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !videoLoaded) {
            videoLoaded = true;
            const src = `https://player.bilibili.com/player.html?bvid=${BVID}&page=1&high_quality=1&danmaku=1&autoplay=1&muted=1`;
            videoFrame.innerHTML = `<iframe src="${src}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" allow="autoplay; encrypted-media; fullscreen" title="Mythos Client — 2B2T Showcase"></iframe>`;
            videoObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
videoObserver.observe(videoFrame);

// QQ 弹窗
const QQ_GROUP = "1071595115";
const modal = document.getElementById("qqModal");

document.getElementById("buyBtn").addEventListener("click", () => {
    document.getElementById("qqNum").textContent = QQ_GROUP;
    modal.classList.add("is-open");
});
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => modal.classList.remove("is-open")));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.remove("is-open"); });

document.getElementById("copyQq").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    try { await navigator.clipboard.writeText(QQ_GROUP); } catch {
        const ta = document.createElement("textarea");
        ta.value = QQ_GROUP; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
    }
    const dict = I18N[currentLang];
    btn.textContent = currentLang === "zh" ? "已复制 ✓" : "Copied ✓";
    btn.dataset.copied = "true";
    setTimeout(() => { btn.textContent = dict.modal_copy; btn.dataset.copied = ""; }, 1600);
});

// ============ 滚动时隐藏 tooltip（防止残留） ============
window.addEventListener("scroll", () => {
    tooltipEl.classList.remove("is-show");
}, { passive: true });

// 鼠标离开 GUI 区域时隐藏 tooltip
document.getElementById("clickgui").addEventListener("mouseleave", () => {
    tooltipEl.classList.remove("is-show");
});

// 平滑滚动锚点（点击导航链接）
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
