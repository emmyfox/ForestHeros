"use strict";

/* ==========================================
   NEW RPG — FOUR-MEMBER PARTY
========================================== */

const $ = id => document.getElementById(id);

const fox = $("fox");
const bunny = $("bunny");
const bear = $("bear");
const squirrel = $("squirrel");

const tree1 = $("tree1");
const tree2 = $("tree2");
const bush1 = $("bush1");
const bush2 = $("bush2");
const ground1 = $("ground1");
const ground2 = $("ground2");
const campfire = $("campfire");

const battleLayer = $("battle-layer");
const battleEnemies = $("battle-enemies");
const statusPanel = $("status-panel");

const foxHPFill = $("battle-fox-hp-fill");
const foxHPText = $("battle-fox-hp-text");
const bunnyHPFill = $("battle-bunny-hp-fill");
const bunnyHPText = $("battle-bunny-hp-text");
const bearHPFill = $("battle-bear-hp-fill");
const bearHPText = $("battle-bear-hp-text");
const squirrelHPFill = $("battle-squirrel-hp-fill");
const squirrelHPText = $("battle-squirrel-hp-text");

const limitFill = $("battle-limit-fill");
const limitText = $("battle-limit-text");
const bunnyLimitFill = $("battle-bunny-limit-fill");
const bunnyLimitText = $("battle-bunny-limit-text");
const bearLimitFill = $("battle-bear-limit-fill");
const bearLimitText = $("battle-bear-limit-text");
const squirrelLimitFill = $("battle-squirrel-limit-fill");
const squirrelLimitText = $("battle-squirrel-limit-text");

const foxStatus = $("fox-status");
const bunnyStatus = $("bunny-status");
const bearStatus = $("bear-status");
const squirrelStatus = $("squirrel-status");

const fireFoxSummon = $("fire-fox-summon");
const healingFluffSummon = $("healing-fluff-summon");
const bearAxeSummon = $("bear-axe-summon");
const lightningSquirrelSummon = $("lightning-squirrel-summon");

if (
    !fox || !bunny || !bear || !squirrel || !tree1 || !tree2 ||
    !bush1 || !bush2 || !ground1 || !ground2 ||
    !battleLayer || !battleEnemies
) {
    throw new Error("New RPG is missing required HTML elements.");
}

/* ==========================================
   ASSET PATHS
========================================== */

const foxFolder = "./assets/Characters/Fox/";
const bunnyFolder = "./assets/Characters/Rabbit/";
const bearFolder = "./assets/Characters/Bear/";
const squirrelFolder = "./assets/Characters/Squirrel/";
const skeletonFolder = "./assets/Characters/Skeleton/";
const demonKittyFolder = "./assets/Characters/Demon Kitty/";
const summonFolder = "./assets/Characters/summons/";
const backgroundFolder = "./assets/Characters/Backgrounds/";

function loadFrames(folder, subfolder, prefix, count) {
    const frames = [];
    for (let i = 1; i <= count; i++) {
        const img = new Image();
        img.src = `${folder}${subfolder}/${prefix} ${i}.png`;
        frames.push(img);
    }
    return frames;
}

/* ==========================================
   FOX ANIMATIONS
========================================== */

const foxArrowFrames = loadFrames(foxFolder, "Arrow", "Arrow", 8);

const foxAnimations = {
    idle: loadFrames(foxFolder, "idle", "idle", 17),
    walking: loadFrames(foxFolder, "walking", "walking", 36),
    Attack: loadFrames(foxFolder, "Attack", "Attack", 33),
    drinking: loadFrames(foxFolder, "drinking", "drinking", 21),
    Eating: loadFrames(foxFolder, "Eating", "Eating", 34),
    Healing: loadFrames(foxFolder, "Healing", "Healing", 28),
    KO: loadFrames(foxFolder, "KO", "KO", 17),
    Magic: loadFrames(foxFolder, "Magic", "Magic", 26),
    Sleep: loadFrames(foxFolder, "Sleep", "Sleep", 34),
    Stagger: loadFrames(foxFolder, "Stagger", "Stagger", 43),
    "wake up": loadFrames(foxFolder, "wake up", "wake", 28)
};

/* ==========================================
   BUNNY ANIMATIONS
========================================== */

// Bunny wake-up animation: use the exact Wake 1.png through Wake 28.png
// sequence, trying common folder names used by the Rabbit assets.
function loadBunnyWakeFrames() {
    const frames = [];
    const folders = [
        `${bunnyFolder}Wake up/`,
        `${bunnyFolder}Wake up_/`,
        `${bunnyFolder}Wake/`,
        bunnyFolder
    ];

    for (let i = 1; i <= 28; i++) {
        const img = new Image();
        const candidates = folders.map(folder => `${folder}Wake ${i}.png`);
        let candidateIndex = 0;

        const tryNextPath = () => {
            if (candidateIndex >= candidates.length) {
                img.onerror = null;
                console.warn(`Bunny wake-up frame ${i} could not be loaded. Checked:`, candidates);
                return;
            }
            img.src = candidates[candidateIndex++];
        };

        img.onerror = tryNextPath;
        img.src = candidates[candidateIndex++];
        frames.push(img);
    }
    return frames;
}

const bunnyAnimations = {
    idle: loadFrames(bunnyFolder, "idle", "idle", 17),
    walking: loadFrames(bunnyFolder, "walking", "walking", 24),
    Attack: loadFrames(bunnyFolder, "Attack", "Attack", 25),
    drinking: loadFrames(bunnyFolder, "drinking", "drinking", 21),
    Eating: loadFrames(bunnyFolder, "Eating", "Eating", 34),
    Healing: loadFrames(bunnyFolder, "healing", "healing", 29),
    KO: loadFrames(bunnyFolder, "KO", "KO", 17),
    Magic: loadFrames(bunnyFolder, "Magic", "Magic", 26),
    Sleep: loadFrames(bunnyFolder, "Sleep", "Sleep", 43),
    Stagger: loadFrames(bunnyFolder, "Stagger", "Stagger", 33),
    "wake up": loadBunnyWakeFrames()
};

/* ==========================================
   BEAR ANIMATIONS
========================================== */

// Bear throws Axe 1–7 toward the target, then Axe 8–13 returns to Bear.
const bearThrowAxeFrames = loadFrames(bearFolder, "Axe", "Axe", 13);

const bearAnimations = {
    idle: loadFrames(bearFolder, "idle", "idle", 16),
    Attack: loadFrames(bearFolder, "Attack", "Attack", 25),
    drinking: loadFrames(bearFolder, "Drinking", "Drinking", 17),
    Eating: loadFrames(bearFolder, "Eating", "Eating", 28),
    Healing: loadFrames(bearFolder, "Healing", "Healing", 25),
    KO: loadFrames(bearFolder, "KO", "KO", 17),
    Magic: loadFrames(bearFolder, "Magic", "Magic", 26),
    Sleep: loadFrames(bearFolder, "Sleep", "Sleep", 43),
    Stagger: loadFrames(bearFolder, "Stagger", "Stagger", 30),
    "wake up": loadFrames(bearFolder, "wake up", "wake", 28),
    walking: loadFrames(bearFolder, "Walking", "walking", 32)
};

/* ==========================================
   SQUIRREL BLACK MAGE ANIMATIONS
========================================== */

const squirrelLightningHitFrames = loadFrames(squirrelFolder, "Lightening", "Lightening", 9);
const bunnyLightBeamFrames = loadFrames(bunnyFolder, "Light Beam", "Light", 10);

const squirrelAnimations = {
    idle: loadFrames(squirrelFolder, "idle", "idle", 16),
    Attack: loadFrames(squirrelFolder, "Attack", "Attack", 23),
    drinking: loadFrames(squirrelFolder, "Drinking", "Drinking", 13),
    Eating: loadFrames(squirrelFolder, "Eating", "Eating", 25),
    Healing: loadFrames(squirrelFolder, "Healing", "Healing", 20),
    KO: loadFrames(squirrelFolder, "KO", "KO", 20),
    Magic: loadFrames(squirrelFolder, "Magic", "Magic", 20),
    Sleep: loadFrames(squirrelFolder, "Sleep", "Sleep", 43),
    Stagger: loadFrames(squirrelFolder, "Stagger", "Stagger", 15),
    "wake up": loadFrames(squirrelFolder, "wake up", "wake", 20),
    walking: loadFrames(squirrelFolder, "Walking", "walking", 15)
};

/* ==========================================
   SKELETON ANIMATIONS
========================================== */

const skeletonSonicBoomFrames = loadFrames(skeletonFolder, "Sonic Boom", "Sonic", 7);

const skeletonAnimations = {
    idle: loadFrames(skeletonFolder, "idle", "idle", 13),
    walking: loadFrames(skeletonFolder, "walking", "walking", 22),
    Attack: loadFrames(skeletonFolder, "Attack", "Attacking", 41),
    Stagger: loadFrames(skeletonFolder, "Stagger", "Stagger", 45),
    KO: loadFrames(skeletonFolder, "KO", "KO", 14)
};

/* DEMON KITTY BOSS ASSETS */
const demonKittyAnimations = {
    Attack: loadFrames(demonKittyFolder, "Attack", "Attack", 19),
    Healing: loadFrames(demonKittyFolder, "Healing", "Healing", 25),
    idle: loadFrames(demonKittyFolder, "idle", "idle", 14),
    KO: loadFrames(demonKittyFolder, "KO", "KO", 18),
    Magic: loadFrames(demonKittyFolder, "Magic", "Magic", 15),
    Stagger: loadFrames(demonKittyFolder, "Stagger", "Stagger", 14),
    walking: loadFrames(demonKittyFolder, "walking", "walking", 16),
    fireBall: loadFrames(demonKittyFolder, "Fire Ball", "Fire ball", 9)
};
// Preload all 17 Dark Flames frames in parallel so the summon animation is ready
// when Demon Kitty uses Magic instead of loading one frame at a time during battle.
const darkFlamesFrames = loadFrames(summonFolder, "Dark Flames", "Dark Flames", 17);

/* ==========================================
   BACKGROUNDS
========================================== */

const backgrounds = {
    day: {
        tree1: `${backgroundFolder}Forest day/tree 1.png`,
        tree2: `${backgroundFolder}Forest day/tree 2.png`,
        bush1: `${backgroundFolder}Forest day/bush 1.png`,
        bush2: `${backgroundFolder}Forest day/bush 2.png`,
        ground: `${backgroundFolder}Forest day/day.png`
    },
    night: {
        tree1: `${backgroundFolder}Forest night/tree dark 1.png`,
        tree2: `${backgroundFolder}Forest night/tree dark 2.png`,
        bush1: `${backgroundFolder}Forest night/dark bush 1.png`,
        bush2: `${backgroundFolder}Forest night/dark bush 2.png`,
        ground: `${backgroundFolder}Forest night/night.png`
    },
    camp: {
        tree1: `${backgroundFolder}Forest camp/camp tree dark 1.png`,
        tree2: `${backgroundFolder}Forest camp/camp tree dark 2.png`,
        bush1: `${backgroundFolder}Forest camp/camp bush dark 1.png`,
        bush2: `${backgroundFolder}Forest camp/camp bush dark 2.png`,
        ground: `${backgroundFolder}Forest camp/night.png`
    }
};

function setBackground(type) {
    const bg = backgrounds[type];
    if (!bg) return;
    tree1.src = bg.tree1;
    tree2.src = bg.tree2;
    bush1.src = bg.bush1;
    bush2.src = bg.bush2;
    ground1.src = bg.ground;
    ground2.src = bg.ground;
}

/* ==========================================
   GAME STATE
========================================== */

let gameState = "day";
let pendingWorldState = null;
let scrolling = true;

let dayTimer = null;
let nightTimer = null;
let battleChanceTimer = null;
let firstBattleTimer = null;

let foxWorldTimer = null;
let bunnyWorldTimer = null;
let bearWorldTimer = null;
let squirrelWorldTimer = null;
let foxBattleTimer = null;
let bunnyBattleTimer = null;
let bearBattleTimer = null;
let squirrelBattleTimer = null;
let campfireTimer = null;
let fireFoxTimer = null;
let healingFluffTimer = null;
let bearAxeTimer = null;
let lightningSquirrelTimer = null;

let battleActive = false;
let battleActionRunning = false;
let limitAttackRunning = false;
let healingRunning = false;

let foxStaggered = false;
let bunnyStaggered = false;
let bearStaggered = false;
let squirrelStaggered = false;
// Keep a unit from replacing its own Stagger frames before they finish.
let foxStaggerPlaying = false;
let bunnyStaggerPlaying = false;
let bearStaggerPlaying = false;
let squirrelStaggerPlaying = false;

let battleEnemiesData = [];
let battleTimers = [];
let battleTurnIndex = 0;
let battlePartyTurn = 0;

let battleFoxHP = 100;
let battleBunnyHP = 100;
let battleBearHP = 100;
let battleSquirrelHP = 100;
const asleepTurns = { fox: 0, bunny: 0, bear: 0, squirrel: 0 };
let demonKittyLimit = 0;
// Track normal encounters so Demon Kitty appears after five normal battles.
let normalBattlesSinceDemonKitty = 0;
let demonKittyTimer = null;
let demonKittySummonTimer = null;
let demonKittyProjectileTimer = null;

let battleLimit = 0;
let bunnyLimit = 0;
let bearLimit = 0;
let squirrelLimit = 0;

let tree1X = 5;
let tree2X = 65;
let bush1X = 35;
let bush2X = 82;
let ground1X = 0;
let ground2X = 100;

/* ==========================================
   CHARACTER ANIMATION PLAYER
========================================== */

function holdWalkingFrame(character, animations) {
    const frames = animations.walking;
    if (frames && frames.length && character) character.src = frames[0].src;
}

function characterKey(character) {
    if (character === fox) return "fox";
    if (character === bunny) return "bunny";
    if (character === bear) return "bear";
    return "squirrel";
}

function clearCharacterTimer(key, battle, timer) {
    const timerKey = `${key}${battle ? "Battle" : "World"}Timer`;
    if (window.__rpgTimers && window.__rpgTimers[timerKey] === timer) window.__rpgTimers[timerKey] = null;
    if (key === "fox") { if (battle && foxBattleTimer === timer) foxBattleTimer = null; if (!battle && foxWorldTimer === timer) foxWorldTimer = null; }
    if (key === "bunny") { if (battle && bunnyBattleTimer === timer) bunnyBattleTimer = null; if (!battle && bunnyWorldTimer === timer) bunnyWorldTimer = null; }
    if (key === "bear") { if (battle && bearBattleTimer === timer) bearBattleTimer = null; if (!battle && bearWorldTimer === timer) bearWorldTimer = null; }
    if (key === "squirrel") { if (battle && squirrelBattleTimer === timer) squirrelBattleTimer = null; if (!battle && squirrelWorldTimer === timer) squirrelWorldTimer = null; }
}

function setCharacterTimer(key, battle, timer) {
    if (key === "fox") { if (battle) foxBattleTimer = timer; else foxWorldTimer = timer; }
    else if (key === "bunny") { if (battle) bunnyBattleTimer = timer; else bunnyWorldTimer = timer; }
    else if (key === "bear") { if (battle) bearBattleTimer = timer; else bearWorldTimer = timer; }
    else { if (battle) squirrelBattleTimer = timer; else squirrelWorldTimer = timer; }
}

function setStaggerPlaying(key, value) {
    if (key === "fox") foxStaggerPlaying = value;
    else if (key === "bunny") bunnyStaggerPlaying = value;
    else if (key === "bear") bearStaggerPlaying = value;
    else squirrelStaggerPlaying = value;
}

// Track each character's current animation independently in world and battle modes.
// The version token prevents a cancelled animation's queued interval callback from
// overwriting a newer animation or leaving Stagger state stuck on.
const activeCharacterAnimations = Object.create(null);
const characterAnimationVersions = Object.create(null);

function playCharacterAnimation(character, animations, name, loop = false, finished, battle = false) {
    const key = characterKey(character);
    const timerKey = `${key}${battle ? "Battle" : "World"}`;
    const currentTimer = key === "fox" ? (battle ? foxBattleTimer : foxWorldTimer) : key === "bunny" ? (battle ? bunnyBattleTimer : bunnyWorldTimer) : key === "bear" ? (battle ? bearBattleTimer : bearWorldTimer) : (battle ? squirrelBattleTimer : squirrelWorldTimer);
    // If a Stagger animation is interrupted, release its turn-blocking flag.
    if (activeCharacterAnimations[timerKey] === "Stagger" && name !== "Stagger") {
        if (battle) setStaggerPlaying(key, false);
    }
    clearInterval(currentTimer);
    setCharacterTimer(key, battle, null);
    const version = (characterAnimationVersions[timerKey] || 0) + 1;
    characterAnimationVersions[timerKey] = version;
    activeCharacterAnimations[timerKey] = name;
    const frames = animations[name];
    if (battle && name === "Stagger") setStaggerPlaying(key, true);
    if (!frames || !frames.length) {
        if (battle && name === "Stagger") setStaggerPlaying(key, false);
        activeCharacterAnimations[timerKey] = null;
        if (finished) finished();
        return;
    }

    const smallAnimation = name === "Eating" || name === "drinking";
    character.classList.toggle("eating-drinking-small", smallAnimation);
    character.classList.toggle("camp-small", smallAnimation);
    character.classList.toggle("sleeping", name === "Sleep");
    character.classList.toggle("battle-sleeping", battle && name === "Sleep");
    character.classList.toggle("battle-waking", battle && name === "wake up");
    character.classList.toggle("battle-healing", battle && key === "bear" && name === "Healing");
    const previousWidth = character.style.width;
    const previousHeight = character.style.height;
    const previousBottom = character.style.bottom;
    const previousWidthPriority = character.style.getPropertyPriority("width");
    const previousHeightPriority = character.style.getPropertyPriority("height");
    const previousBottomPriority = character.style.getPropertyPriority("bottom");
    const stabilizeBunnyAttack = battle && key === "bunny" && name === "Attack";
    const previousObjectFit = character.style.objectFit;
    const previousObjectPosition = character.style.objectPosition;
    const previousObjectFitPriority = character.style.getPropertyPriority("object-fit");
    const previousObjectPositionPriority = character.style.getPropertyPriority("object-position");
    const previousTransform = character.style.transform;
    const previousTransformOrigin = character.style.transformOrigin;
    const previousTransformPriority = character.style.getPropertyPriority("transform");
    const previousTransformOriginPriority = character.style.getPropertyPriority("transform-origin");
    if (stabilizeBunnyAttack) {
        // Scale and lift Bunny visually without changing her left/bottom anchor or image-box dimensions.
        // Keeping translateX(-50%) preserves the same horizontal anchor used by every other animation.
        character.style.setProperty("transform", "translateX(-50%) translateY(-12px) scale(0.96)", "important");
        character.style.setProperty("transform-origin", "bottom center", "important");
        character.style.setProperty("object-fit", "contain", "important");
        character.style.setProperty("object-position", "center bottom", "important");
    }
    if (smallAnimation) {
        const currentWidth = parseFloat(getComputedStyle(character).width);
        if (Number.isFinite(currentWidth) && currentWidth > 0) {
            character.style.setProperty("width", `${Math.round(currentWidth * 0.8)}px`, "important");
            character.style.setProperty("height", "auto", "important");
        }
    }
    const restore = () => {
        if (previousWidth) character.style.setProperty("width", previousWidth, previousWidthPriority); else character.style.removeProperty("width");
        if (previousHeight) character.style.setProperty("height", previousHeight, previousHeightPriority); else character.style.removeProperty("height");
        if (previousBottom) character.style.setProperty("bottom", previousBottom, previousBottomPriority); else character.style.removeProperty("bottom");
        if (previousObjectFit) character.style.setProperty("object-fit", previousObjectFit, previousObjectFitPriority); else character.style.removeProperty("object-fit");
        if (previousObjectPosition) character.style.setProperty("object-position", previousObjectPosition, previousObjectPositionPriority); else character.style.removeProperty("object-position");
        if (previousTransform) character.style.setProperty("transform", previousTransform, previousTransformPriority); else character.style.removeProperty("transform");
        if (previousTransformOrigin) character.style.setProperty("transform-origin", previousTransformOrigin, previousTransformOriginPriority); else character.style.removeProperty("transform-origin");
        character.classList.remove("eating-drinking-small", "camp-small", "sleeping", "battle-sleeping", "battle-waking", "battle-healing");
    };
    let frame = 0;
    const speed = battle ? (name === "Stagger" ? 70 : name === "Magic" ? 90 : 80) : 100;
    character.src = frames[0].src;
    const timer = setInterval(() => {
        if (characterAnimationVersions[timerKey] !== version) { clearInterval(timer); return; }
        if (battle && !battleActive) {
            clearInterval(timer); clearCharacterTimer(key, battle, timer);
            if (name === "Stagger") setStaggerPlaying(key, false);
            activeCharacterAnimations[timerKey] = null; restore(); return;
        }
        if (!battle && gameState !== "camp" && (name === "Sleep" || name === "wake up")) {
            clearInterval(timer); clearCharacterTimer(key, battle, timer);
            activeCharacterAnimations[timerKey] = null; restore(); return;
        }
        frame++;
        if (frame >= frames.length) {
            if (loop) frame = 0;
            else {
                clearInterval(timer);
                clearCharacterTimer(key, battle, timer);
                if (name === "Stagger") setStaggerPlaying(key, false);
                activeCharacterAnimations[timerKey] = null;
                restore();
                // A sleeping hero must go straight from the complete Sleep animation
                // into frames 26–31. Never insert an idle animation between them.
                if (battle && name === "Sleep" && asleepTurns[key] > 0 && battleActive && partyHP(key) > 0) {
                    playBattleSleepLoop(key);
                    if (finished) finished();
                    return;
                }
                // Return every other living party member to looping idle after a battle action.
                if (battle && name !== "idle" && name !== "KO" && name !== "Sleep" && battleActive && partyHP(key) > 0 && animations.idle && animations.idle.length) {
                    playCharacterAnimation(character, animations, "idle", true, undefined, true);
                }
                if (finished) finished();
                return;
            }
        }
        character.src = frames[frame].src;
        // Keep all remaining Bunny Attack frames at the same baseline.
        // Attack 26 has been removed, so do not apply a special adjustment to the new last frame.
        if (stabilizeBunnyAttack) {
            character.style.setProperty("transform", "translateX(-50%) translateY(-12px) scale(0.96)", "important");
        }
    }, speed);
    setCharacterTimer(key, battle, timer);
}

function playFox(name, loop = false, finished) { playCharacterAnimation(fox, foxAnimations, name, loop, finished); }
function playBunny(name, loop = false, finished) { playCharacterAnimation(bunny, bunnyAnimations, name, loop, finished); }
function playBear(name, loop = false, finished) { playCharacterAnimation(bear, bearAnimations, name, loop, finished); }
function playSquirrel(name, loop = false, finished) { playCharacterAnimation(squirrel, squirrelAnimations, name, loop, finished); }
function playFoxBattle(name, finished) { playCharacterAnimation(fox, foxAnimations, name, false, finished, true); }
function playBunnyBattle(name, finished) { playCharacterAnimation(bunny, bunnyAnimations, name, false, finished, true); }
function playBearBattle(name, finished) { playCharacterAnimation(bear, bearAnimations, name, false, finished, true); }
function playSquirrelBattle(name, finished) { playCharacterAnimation(squirrel, squirrelAnimations, name, false, finished, true); }

function stopWorldAnimations() {
    clearInterval(foxWorldTimer); clearInterval(bunnyWorldTimer); clearInterval(bearWorldTimer); clearInterval(squirrelWorldTimer);
    foxWorldTimer = null; bunnyWorldTimer = null; bearWorldTimer = null; squirrelWorldTimer = null;
}


/* ==========================================
   FOREST SCROLLING
========================================== */

function moveForest() {
    if (scrolling) {
        const speed = 0.08;
        tree1X -= speed; tree2X -= speed;
        bush1X -= speed; bush2X -= speed;
        ground1X -= speed; ground2X -= speed;

        tree1.style.left = tree1X + "%";
        tree2.style.left = tree2X + "%";
        bush1.style.left = bush1X + "%";
        bush2.style.left = bush2X + "%";
        ground1.style.left = ground1X + "%";
        ground2.style.left = ground2X + "%";

        if (tree1X < -35) tree1X = 100;
        if (tree2X < -35) tree2X = 100;
        if (bush1X < -20) bush1X = 100;
        if (bush2X < -20) bush2X = 100;
        if (ground1X <= -100) ground1X = 100;
        if (ground2X <= -100) ground2X = 100;
    }
    requestAnimationFrame(moveForest);
}

/* ==========================================
   CAMPFIRE
========================================== */

const campfireFrames = loadFrames(backgroundFolder, "Forest camp", "camp fire", 9);

function startCampfire() {
    clearInterval(campfireTimer);
    if (!campfireFrames.length || !campfire) return;
    let frame = 0;
    campfire.style.display = "block";
    campfire.src = campfireFrames[0].src;
    campfireTimer = setInterval(() => {
        if (gameState !== "camp") return;
        campfire.src = campfireFrames[frame].src;
        frame = (frame + 1) % campfireFrames.length;
    }, 120);
}

function stopCampfire() {
    clearInterval(campfireTimer);
    campfireTimer = null;
    if (campfire) campfire.style.display = "none";
}

/* ==========================================
   CAMP ROUTINE
========================================== */

// Keep each character's element box anchored for the entire camp routine.
// Some animation frames have different image dimensions; fixed box dimensions
// prevent the character from visually jumping as the source frame changes.
if (!document.getElementById("camp-anchor-style")) {
    const campStyle = document.createElement("style");
    campStyle.id = "camp-anchor-style";
    campStyle.textContent = `
        #fox.camp-anchored, #bunny.camp-anchored, #bear.camp-anchored, #squirrel.camp-anchored {
            position: absolute !important;
            left: var(--camp-anchor-left) !important;
            bottom: var(--camp-anchor-bottom) !important;
            width: var(--camp-anchor-width) !important;
            height: var(--camp-anchor-height) !important;
            transform: var(--camp-anchor-transform) !important;
            object-fit: contain !important;
        }
    `;
    document.head.appendChild(campStyle);
}

function anchorCampCharacter(character) {
    const computed = getComputedStyle(character);
    character.style.setProperty("--camp-anchor-left", computed.left);
    character.style.setProperty("--camp-anchor-bottom", computed.bottom);
    character.style.setProperty("--camp-anchor-width", computed.width);
    // Resolve auto height once, before the animation starts changing frames.
    const rect = character.getBoundingClientRect();
    character.style.setProperty("--camp-anchor-height", `${rect.height}px`);
    character.style.setProperty("--camp-anchor-transform", computed.transform === "none" ? "none" : computed.transform);
    character.classList.add("camp-anchored");
}

function unanchorCampCharacter(character) {
    character.classList.remove("camp-anchored");
    character.style.removeProperty("--camp-anchor-left");
    character.style.removeProperty("--camp-anchor-bottom");
    character.style.removeProperty("--camp-anchor-width");
    character.style.removeProperty("--camp-anchor-height");
    character.style.removeProperty("--camp-anchor-transform");
}

function runCampCharacter(character, animations, done) {
    if (gameState !== "camp") { if (done) done(); return; }
    anchorCampCharacter(character);
    const activity = Math.random() < 0.5 ? "Eating" : "drinking";
    playCharacterAnimation(character, animations, activity, false, () => {
        if (gameState !== "camp") { unanchorCampCharacter(character); if (done) done(); return; }
        playCharacterAnimation(character, animations, "Sleep", false, () => {
            if (gameState !== "camp") { unanchorCampCharacter(character); if (done) done(); return; }
            playCharacterAnimation(character, animations, "wake up", false, () => {
                unanchorCampCharacter(character);
                if (done) done();
            });
        });
    });
}

function playCampActivities() {
    if (gameState !== "camp") return;
    // Camp positions: Rabbit behind Black Mage on the left; Black Mage takes Bear's old spot, and Bear moves farther right.
    const positions = [
        [bunny, "16%", "-2%", "95px", "8"],
        [squirrel, "35%", "-2%", "120px", "15"],
        [fox, "21%", "-2%", "120px", "20"],
        [bear, "45%", "-2%", "145px", "25"]
    ];
    for (const [character, left, bottom, width, z] of positions) {
        character.style.setProperty("left", left, "important");
        character.style.setProperty("bottom", bottom, "important");
        character.style.setProperty("width", width, "important");
        character.style.setProperty("z-index", z, "important");
    }
    let finished = 0;
    function characterFinished() {
        finished++;
        if (finished === 4 && gameState === "camp") startDay();
    }
    runCampCharacter(fox, foxAnimations, characterFinished);
    runCampCharacter(bunny, bunnyAnimations, characterFinished);
    runCampCharacter(bear, bearAnimations, characterFinished);
    runCampCharacter(squirrel, squirrelAnimations, characterFinished);
}

/* ==========================================
   BATTLE TIMER HELPERS
========================================== */

function addBattleTimer(timer) { battleTimers.push(timer); return timer; }

function clearBattleTimers() {
    for (const timer of battleTimers) { clearTimeout(timer); clearInterval(timer); }
    battleTimers = [];
}

/* ==========================================
   BATTLE STATUS BARS
========================================== */

function updateBattleBars() {
    battleFoxHP = Math.max(0, Math.min(100, battleFoxHP));
    battleBunnyHP = Math.max(0, Math.min(100, battleBunnyHP));
    battleBearHP = Math.max(0, Math.min(100, battleBearHP));
    battleSquirrelHP = Math.max(0, Math.min(100, battleSquirrelHP));
    battleLimit = Math.max(0, Math.min(100, battleLimit));
    bunnyLimit = Math.max(0, Math.min(100, bunnyLimit));
    bearLimit = Math.max(0, Math.min(100, bearLimit));
    squirrelLimit = Math.max(0, Math.min(100, squirrelLimit));
    if (foxHPFill) foxHPFill.style.width = battleFoxHP + "%";
    if (foxHPText) foxHPText.textContent = Math.round(battleFoxHP) + "%";
    if (bunnyHPFill) bunnyHPFill.style.width = battleBunnyHP + "%";
    if (bunnyHPText) bunnyHPText.textContent = Math.round(battleBunnyHP) + "%";
    if (bearHPFill) bearHPFill.style.width = battleBearHP + "%";
    if (bearHPText) bearHPText.textContent = Math.round(battleBearHP) + "%";
    if (squirrelHPFill) squirrelHPFill.style.width = battleSquirrelHP + "%";
    if (squirrelHPText) squirrelHPText.textContent = Math.round(battleSquirrelHP) + "%";
    if (limitFill) limitFill.style.width = battleLimit + "%";
    if (limitText) limitText.textContent = Math.round(battleLimit) + "%";
    if (bunnyLimitFill) bunnyLimitFill.style.width = bunnyLimit + "%";
    if (bunnyLimitText) bunnyLimitText.textContent = Math.round(bunnyLimit) + "%";
    if (bearLimitFill) bearLimitFill.style.width = bearLimit + "%";
    if (bearLimitText) bearLimitText.textContent = Math.round(bearLimit) + "%";
    if (squirrelLimitFill) squirrelLimitFill.style.width = squirrelLimit + "%";
    if (squirrelLimitText) squirrelLimitText.textContent = Math.round(squirrelLimit) + "%";
    for (const enemy of battleEnemiesData) { if (enemy.hpFill) enemy.hpFill.style.width = (Math.max(0, enemy.hp) / (enemy.maxHP || 100) * 100) + "%"; if (enemy.limitFill) enemy.limitFill.style.width = (enemy.limit || 0) + "%"; if (enemy.limitText) enemy.limitText.textContent = Math.round(enemy.limit || 0) + "%"; }
    if (foxStatus) foxStatus.style.opacity = battleFoxHP > 0 ? "1" : "0.4";
    if (bunnyStatus) bunnyStatus.style.opacity = battleBunnyHP > 0 ? "1" : "0.4";
    if (bearStatus) bearStatus.style.opacity = battleBearHP > 0 ? "1" : "0.4";
    if (squirrelStatus) squirrelStatus.style.opacity = battleSquirrelHP > 0 ? "1" : "0.4";
}


/* ==========================================
   BATTLE FLOATING TEXT — MISS!
========================================== */

function showBattleText(text, target) {
    if (!battleLayer) return;
    const label = document.createElement("div");
    label.textContent = text;
    Object.assign(label.style, {
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, 0)",
        color: text === "MISS!" ? "#ffffff" : "#ffdf70",
        fontSize: "25px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        textShadow: "2px 2px 3px #000, -1px -1px 2px #000",
        zIndex: "200",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        animation: "battleFloatUp 900ms ease-out forwards"
    });
    if (target && typeof target.getBoundingClientRect === "function") {
        const targetRect = target.getBoundingClientRect();
        const layerRect = battleLayer.getBoundingClientRect();
        label.style.left = (targetRect.left + targetRect.width / 2 - layerRect.left) + "px";
        label.style.top = (targetRect.top - layerRect.top - 30) + "px";
        label.style.transform = "translateX(-50%)";
    }
    battleLayer.appendChild(label);
    setTimeout(() => label.remove(), 950);
}

if (!document.getElementById("battle-float-style")) {
    const style = document.createElement("style");
    style.id = "battle-float-style";
    style.textContent = `@keyframes battleFloatUp { from { opacity: 1; margin-top: 0; } to { opacity: 0; margin-top: -35px; } }`;
    document.head.appendChild(style);
}

/* ==========================================
   CREATE SKELETON
========================================== */

function createBattleSkeleton(enemy) {
    const container = document.createElement("div");
    container.className = "battle-enemy";
    const hpBar = document.createElement("div");
    hpBar.className = "skeleton-hp";
    const hpFill = document.createElement("div");
    hpFill.className = "skeleton-hp-fill";
    hpBar.appendChild(hpFill);
    const image = document.createElement("img");
    image.src = skeletonAnimations.walking[0].src;
    image.alt = "Skeleton";
    container.append(hpBar, image);
    battleEnemies.appendChild(container);
    enemy.element = container;
    enemy.image = image;
    enemy.hpFill = hpFill;
}

function createBattleDemonKitty(enemy) {
    const container = document.createElement("div");
    container.className = "battle-enemy demon-kitty-enemy";
    const name = document.createElement("div"); name.className = "demon-kitty-name"; name.textContent = "Demon Kitty";
    const hpBar = document.createElement("div"); hpBar.className = "skeleton-hp demon-kitty-hp";
    const hpFill = document.createElement("div"); hpFill.className = "skeleton-hp-fill"; hpBar.appendChild(hpFill);
    const limitBar = document.createElement("div"); limitBar.className = "demon-kitty-limit";
    const limitFill = document.createElement("div"); limitFill.className = "demon-kitty-limit-fill";
    const limitText = document.createElement("span"); limitText.className = "demon-kitty-limit-text"; limitText.textContent = "0%";
    limitBar.append(limitFill, limitText);
    const image = document.createElement("img"); image.alt = "Demon Kitty"; image.src = demonKittyAnimations.walking[0].src;
    container.append(name, hpBar, limitBar, image); battleEnemies.appendChild(container);
    Object.assign(enemy, { element: container, image, hpFill, limitFill, limitText });
}

function playDemonKittyAnimation(enemy, name, finished, loop = false) {
    if (!enemy || !enemy.image) { if (finished) finished(); return; }
    clearInterval(enemy.animationTimer);
    enemy.animationVersion = (enemy.animationVersion || 0) + 1;
    const version = enemy.animationVersion;
    const frames = demonKittyAnimations[name] || [];
    if (!frames.length) { if (finished) finished(); return; }
    let frame = 0;
    // Explicitly start at Attack frame 1 every time; stale callbacks cannot replace it with idle.
    enemy.image.src = frames[0].src;
    const timer = setInterval(() => {
        if (enemy.animationVersion !== version) { clearInterval(timer); return; }
        if (!battleActive) { clearInterval(timer); if (enemy.animationTimer === timer) enemy.animationTimer = null; return; }
        frame++;
        if (frame >= frames.length) {
            if (loop) { frame = 0; enemy.image.src = frames[0].src; return; }
            clearInterval(timer);
            if (enemy.animationTimer === timer) enemy.animationTimer = null;
            if (name !== "KO" && enemy.alive && battleActive) playDemonKittyAnimation(enemy, "idle", null, true);
            if (finished) finished(); return;
        }
        enemy.image.src = frames[frame].src;
    }, name === "Magic" ? 90 : 80);
    enemy.animationTimer = timer;
}

function playDemonKittyFireBall(enemy, targetKey) {
    const frames = demonKittyAnimations.fireBall;
    if (!battleActive || !frames.length || partyHP(targetKey) <= 0) return;
    const target = partyElement(targetKey); const start = enemy.image.getBoundingClientRect(); const end = target.getBoundingClientRect(); const layer = battleLayer.getBoundingClientRect();
    const projectile = document.createElement("img"); projectile.className = "demon-kitty-fireball"; projectile.alt = "Demon Kitty Fire Ball";
    const startX = start.left + start.width * .32 - 30;
    const startY = start.top + start.height * .78 - 8;
    Object.assign(projectile.style, { left: (startX - layer.left) + "px", top: (startY - layer.top) + "px" });
    projectile.src = frames[0].src; battleLayer.appendChild(projectile); let frame = 0;
    // Aim a little left of the hero's center and slightly lower, near their feet.
    const dx = end.left + end.width * .5 - 46 - startX; const dy = end.top + end.height * .34 - 3 - startY;
    projectile.style.setProperty("--fireball-x", dx + "px"); projectile.style.setProperty("--fireball-y", dy + "px");
    requestAnimationFrame(() => projectile.classList.add("flying"));
    demonKittyProjectileTimer = setInterval(() => {
        if (!battleActive || !projectile.isConnected) { clearInterval(demonKittyProjectileTimer); projectile.remove(); return; }
        frame++;
        if (frame >= frames.length) {
            clearInterval(demonKittyProjectileTimer); projectile.remove();
            if (partyHP(targetKey) > 0) { setPartyHP(targetKey, Math.max(0, partyHP(targetKey) - 15)); addPartyGauge(targetKey, 7); updateBattleBars(); if (partyHP(targetKey) <= 0) playPartyBattle(targetKey, "KO"); else playPartyBattle(targetKey, "Stagger"); }
            return;
        }
        projectile.src = frames[frame].src;
    }, 55);
}

function playDemonKittyDarkFlames(enemy, targetKey, finished) {
    if (!battleActive) { if (finished) finished(); return; }
    // Use the exact preloaded custom PNG frames (1–17); don't substitute generated art.
    const targets = getAliveParty();
    if (!targets.length || !darkFlamesFrames.length) { if (finished) finished(); return; }
    const layerRect = battleLayer.getBoundingClientRect();
    const effects = [];
    for (const key of targets) {
        const target = partyElement(key);
        if (!target || partyHP(key) <= 0) continue;
        const rect = target.getBoundingClientRect();
        const flame = document.createElement("img");
        flame.className = "demon-kitty-dark-flames";
        flame.alt = "Dark Flames";
        flame.draggable = false;
        Object.assign(flame.style, {
            position: "absolute", display: "block", visibility: "visible", opacity: "1",
            zIndex: "9999", pointerEvents: "none", objectFit: "contain",
            width: "190px", height: "250px", maxWidth: "none", maxHeight: "none",
            left: (rect.left + rect.width / 2 - layerRect.left) + "px",
            top: (rect.bottom - layerRect.top + 2) + "px",
            transform: "translate(-50%, -100%)"
        });
        flame.src = darkFlamesFrames[0].src;
        flame.onerror = () => console.warn("Could not load Dark Flames custom frame:", flame.src);
        battleLayer.appendChild(flame);
        effects.push({ flame, frame: 1, timer: null });
        setPartyHP(key, Math.max(0, partyHP(key) - 25));
        if (partyHP(key) <= 0) playPartyBattle(key, "KO");
        else playPartyBattle(key, "Stagger");
    }
    updateBattleBars();
    if (!effects.length) { if (finished) finished(); return; }
    let active = effects.length;
    const completeEffect = effect => {
        if (effect.timer) clearInterval(effect.timer);
        effect.flame.remove();
        active--;
        if (active === 0 && finished) finished();
    };
    for (const effect of effects) {
        effect.timer = setInterval(() => {
            if (!battleActive || !effect.flame.isConnected) { completeEffect(effect); return; }
            if (effect.frame >= darkFlamesFrames.length) { completeEffect(effect); return; }
            effect.flame.src = darkFlamesFrames[effect.frame].src;
            effect.frame++;
        }, 70);
    }
}

function demonKittyAttack(enemy) {
    if (!battleActive || !enemy || !enemy.alive) return;
    const party = getAliveParty(); if (!party.length) { finishBattle(false); return; }
    battleActionRunning = true;
    const targetKey = party[Math.floor(Math.random() * party.length)];
    const move = Math.random() < 0.5 ? "fire" : "sleep";
    if (move === "fire") {
        // Attack frame 14 triggers the 9-frame fireball projectile.
        addBattleTimer(setTimeout(() => { if (battleActive && partyHP(targetKey) > 0) playDemonKittyFireBall(enemy, targetKey); }, 13 * 80));
        playDemonKittyAnimation(enemy, "Attack", () => finishDemonKittyTurn(enemy));
    } else {
        playDemonKittyAnimation(enemy, "Attack", () => {
            if (!battleActive) return;
            if (partyHP(targetKey) > 0) { asleepTurns[targetKey] = 1; playPartyBattle(targetKey, "Sleep"); showBattleText("SLEEP!", partyElement(targetKey)); }
            finishDemonKittyTurn(enemy);
        });
    }
}

function demonKittyMagic(enemy) {
    if (!battleActive || !enemy || !enemy.alive) return;
    battleActionRunning = true; enemy.limit = 0; updateBattleBars();
    const party = getAliveParty(); if (!party.length) { finishBattle(false); return; }
    const targetKey = party[Math.floor(Math.random() * party.length)];
    // Magic frame 10 is 9 x 90 ms after frame 1.
    addBattleTimer(setTimeout(() => playDemonKittyDarkFlames(enemy, targetKey, () => {
        if (partyHP(targetKey) <= 0) playPartyBattle(targetKey, "KO");
    }), 9 * 90));
    playDemonKittyAnimation(enemy, "Magic", () => finishDemonKittyTurn(enemy));
}

function finishDemonKittyTurn(enemy) {
    if (!battleActive) return;
    // Keep Demon Kitty's limit break from charging in only three turns.
    if (enemy && enemy.alive) enemy.limit = Math.min(100, (enemy.limit || 0) + 14);
    updateBattleBars(); battleActionRunning = false;
    if (!getAliveParty().length) { finishBattle(false); return; }
    if (!getAliveEnemies().length) { finishBattle(true); return; }
    addBattleTimer(setTimeout(runPartyTurn, 300));
}

/* ==========================================
   SKELETON ANIMATIONS
========================================== */

function playSkeletonAnimation(enemy, name, finished) {
    if (!enemy || !enemy.image) { if (finished) finished(); return; }
    clearInterval(enemy.animationTimer);
    if (enemy.isDemonKitty) { playDemonKittyAnimation(enemy, name, finished); return; }
    const frames = skeletonAnimations[name];
    if (!frames || !frames.length) { if (finished) finished(); return; }
    let frame = 0;
    enemy.image.src = frames[0].src;
    enemy.animationTimer = setInterval(() => {
        if (!battleActive) { clearInterval(enemy.animationTimer); enemy.animationTimer = null; return; }
        frame++;
        if (frame >= frames.length) {
            if (name === "idle") {
                frame = 0;
                enemy.image.src = frames[0].src;
                return;
            }
            clearInterval(enemy.animationTimer);
            enemy.animationTimer = null;
            if (name === "Stagger") enemy.staggerPlaying = false;
            // Skeletons idle after their entrance, attack, or stagger animation.
            // KO uses its own animation path and is never sent back to idle.
            if (name !== "KO" && enemy.alive && battleActive && skeletonAnimations.idle && skeletonAnimations.idle.length) {
                playSkeletonAnimation(enemy, "idle");
            }
            if (finished) finished();
            return;
        }
        enemy.image.src = frames[frame].src;
    }, name === "walking" ? 75 : 80);
}

function beginSkeletonEntrance(finished) {
    for (const enemy of battleEnemiesData) {
        // Play the entrance frames once; skeletons stay on the final frame afterward.
        if (enemy.isDemonKitty) playDemonKittyAnimation(enemy, "walking");
        else playSkeletonAnimation(enemy, "walking");
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (battleActive && enemy.element) enemy.element.classList.add("entered");
        }));
    }
    // Keep the original entrance timing for every enemy. The boss encounter is
    // scheduled reliably below; its walking animation itself is not sped up.
    const entranceDuration = 1850;
    addBattleTimer(setTimeout(() => {
        if (!battleActive) return;
        for (const enemy of battleEnemiesData) enemy.entered = true;
        if (finished) finished();
    }, entranceDuration));
}

/* ==========================================
   START BATTLE
========================================== */

function startBattle() {
    if (battleActive || gameState === "camp") return;
    if (battleFoxHP <= 0 && battleBunnyHP <= 0 && battleBearHP <= 0 && battleSquirrelHP <= 0) return;
    battleActive = true; battleActionRunning = false; limitAttackRunning = false; healingRunning = false; scrolling = false;
    stopWorldAnimations(); stopFireFox(); stopHealingFluff(); stopBearAxe(); stopLightningSquirrel(); clearBattleTimers();
    clearInterval(foxBattleTimer); clearInterval(bunnyBattleTimer); clearInterval(bearBattleTimer); clearInterval(squirrelBattleTimer);
    foxBattleTimer = bunnyBattleTimer = bearBattleTimer = squirrelBattleTimer = null;
    battleTurnIndex = 0; battlePartyTurn = 0;
    foxStaggered = bunnyStaggered = bearStaggered = squirrelStaggered = false;
    foxStaggerPlaying = bunnyStaggerPlaying = bearStaggerPlaying = squirrelStaggerPlaying = false;
    battleEnemiesData = [];
    battleLayer.style.display = "block"; if (statusPanel) statusPanel.style.display = "block";
    fox.style.display = battleFoxHP > 0 ? "block" : "none";
    bunny.style.display = battleBunnyHP > 0 ? "block" : "none";
    bear.style.display = battleBearHP > 0 ? "block" : "none";
    squirrel.style.display = battleSquirrelHP > 0 ? "block" : "none";
    battleEnemies.innerHTML = "";
    // Fight five normal battles, then guarantee Demon Kitty on the next battle.
    // Demon Kitty fights alone 85% of the time; 15% of boss encounters bring one or two skeletons.
    const demonKittyEncounter = normalBattlesSinceDemonKitty >= 5;
    if (demonKittyEncounter) {
        normalBattlesSinceDemonKitty = 0;
        const boss = { id: "demon-kitty", isDemonKitty: true, hp: 450, maxHP: 450, limit: 0, alive: true, entered: false, element: null, image: null, hpFill: null, animationTimer: null };
        battleEnemiesData.push(boss); createBattleDemonKitty(boss);
        if (Math.random() < 0.15) {
            const backupCount = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < backupCount; i++) {
                const enemy = { id: i, hp: 100, maxHP: 100, alive: true, entered: false, element: null, image: null, hpFill: null, animationTimer: null };
                battleEnemiesData.push(enemy); createBattleSkeleton(enemy);
            }
        }
    } else {
        normalBattlesSinceDemonKitty++;
        const enemyCount = 2 + Math.floor(Math.random() * 4);
        for (let i = 0; i < enemyCount; i++) {
            const enemy = { id: i, hp: 100, maxHP: 100, alive: true, entered: false, element: null, image: null, hpFill: null, animationTimer: null };
            battleEnemiesData.push(enemy); createBattleSkeleton(enemy);
        }
    }
    updateBattleBars();
    startPartyIdleAnimations();
    beginSkeletonEntrance(() => addBattleTimer(setTimeout(runPartyTurn, 300)));
}


/* ==========================================
   ALIVE PARTY AND ENEMIES
========================================== */

function getAliveEnemies() { return battleEnemiesData.filter(enemy => enemy.alive && enemy.entered); }
function getAliveParty() {
    const party = [];
    if (battleFoxHP > 0) party.push("fox");
    if (battleBunnyHP > 0) party.push("bunny");
    if (battleBearHP > 0) party.push("bear");
    if (battleSquirrelHP > 0) party.push("squirrel");
    return party;
}
function partyGauge(key) { return key === "fox" ? battleLimit : key === "bunny" ? bunnyLimit : key === "bear" ? bearLimit : squirrelLimit; }
function partyHP(key) { return key === "fox" ? battleFoxHP : key === "bunny" ? battleBunnyHP : key === "bear" ? battleBearHP : battleSquirrelHP; }
function setPartyHP(key, value) { if (key === "fox") battleFoxHP = value; else if (key === "bunny") battleBunnyHP = value; else if (key === "bear") battleBearHP = value; else battleSquirrelHP = value; }
function addPartyGauge(key, amount) { if (key === "fox") battleLimit = Math.min(100, battleLimit + amount); else if (key === "bunny") bunnyLimit = Math.min(100, bunnyLimit + amount * 0.6); else if (key === "bear") bearLimit = Math.min(100, bearLimit + amount); else squirrelLimit = Math.min(100, squirrelLimit + amount); }
function partyElement(key) { return key === "fox" ? fox : key === "bunny" ? bunny : key === "bear" ? bear : squirrel; }
function partyStaggerPlaying(key) { return key === "fox" ? foxStaggerPlaying : key === "bunny" ? bunnyStaggerPlaying : key === "bear" ? bearStaggerPlaying : squirrelStaggerPlaying; }
function playPartyBattle(key, name, finished) { if (key === "fox") playFoxBattle(name, finished); else if (key === "bunny") playBunnyBattle(name, finished); else if (key === "bear") playBearBattle(name, finished); else playSquirrelBattle(name, finished); }

// All four heroes have idle folders and loop while waiting during battle.
function startPartyIdleAnimations() {
    if (!battleActive) return;
    for (const key of getAliveParty()) {
        if (partyStaggerPlaying(key) || asleepTurns[key] > 0) continue;
        const character = partyElement(key);
        const animations = key === "fox" ? foxAnimations : key === "bunny" ? bunnyAnimations : key === "bear" ? bearAnimations : squirrelAnimations;
        if (animations.idle && animations.idle.length) {
            playCharacterAnimation(character, animations, "idle", true, undefined, true);
        }
    }
}
function playBattleSleepLoop(key) {
    const character = partyElement(key);
    const animations = key === "fox" ? foxAnimations : key === "bunny" ? bunnyAnimations : key === "bear" ? bearAnimations : squirrelAnimations;
    const frames = animations.Sleep || animations.sleeping || [];
    if (!battleActive || !character || frames.length < 31) return;
    const timerKey = `${key}Battle`;
    const oldTimer = key === "fox" ? foxBattleTimer : key === "bunny" ? bunnyBattleTimer : key === "bear" ? bearBattleTimer : squirrelBattleTimer;
    clearInterval(oldTimer);
    const version = (characterAnimationVersions[timerKey] || 0) + 1;
    characterAnimationVersions[timerKey] = version;
    activeCharacterAnimations[timerKey] = "Sleep";
    character.classList.add("sleeping", "battle-sleeping");
    let frame = 25; // array index 25 = Sleep frame 26
    character.src = frames[frame].src;
    const timer = setInterval(() => {
        if (!battleActive || characterAnimationVersions[timerKey] !== version) { clearInterval(timer); return; }
        frame++;
        if (frame > 30) frame = 25; // loop only frames 26–31
        character.src = frames[frame].src;
    }, 100);
    setCharacterTimer(key, true, timer);
}

function stopBattleSleepLoop(key) {
    const timerKey = `${key}Battle`;
    const timer = key === "fox" ? foxBattleTimer : key === "bunny" ? bunnyBattleTimer : key === "bear" ? bearBattleTimer : squirrelBattleTimer;
    clearInterval(timer);
    clearCharacterTimer(key, true, timer);
    characterAnimationVersions[timerKey] = (characterAnimationVersions[timerKey] || 0) + 1;
    activeCharacterAnimations[timerKey] = null;
    const character = partyElement(key);
    if (character) character.classList.remove("sleeping", "battle-sleeping");
}

function runPartyTurn() {
    if (!battleActive || battleActionRunning) return;
    startPartyIdleAnimations();
    if (!getAliveEnemies().length) { finishBattle(true); return; }
    const party = getAliveParty(); if (!party.length) { finishBattle(false); return; }
    if (limitAttackRunning) return;
    if (battleFoxHP > 0 && asleepTurns.fox <= 0 && battleLimit >= 100) { useLimit(); return; }
    if (battleBunnyHP > 0 && asleepTurns.bunny <= 0 && bunnyLimit >= 100) { useBunnyLimit(); return; }
    if (battleBearHP > 0 && asleepTurns.bear <= 0 && bearLimit >= 100) { useBearLimit(); return; }
    if (battleSquirrelHP > 0 && asleepTurns.squirrel <= 0 && squirrelLimit >= 100) { useLightningSquirrelLimit(); return; }
    let actor = null;
    for (let i = 0; i < party.length; i++) {
        if (battlePartyTurn >= party.length) battlePartyTurn = 0;
        const candidate = party[battlePartyTurn]; battlePartyTurn = (battlePartyTurn + 1) % party.length;
        if (partyStaggerPlaying(candidate)) continue;
        if (asleepTurns[candidate] > 0) {
            asleepTurns[candidate]--;
            battleActionRunning = true;
            // Stop the frame 26–31 loop only when this hero's turn arrives, then
            // play the complete wake-up animation before returning to battle.
            stopBattleSleepLoop(candidate);
            playPartyBattle(candidate, "wake up", () => {
                if (!battleActive) return;
                battleActionRunning = false;
                addBattleTimer(setTimeout(runPartyTurn, 100));
            });
            return;
        }
        actor = candidate; break;
    }
    if (!actor) { addBattleTimer(setTimeout(() => { if (battleActive && !battleActionRunning) runPartyTurn(); }, 100)); return; }
    const enemies = getAliveEnemies(); if (!enemies.length) { finishBattle(true); return; }
    const target = enemies[Math.floor(Math.random() * enemies.length)];
    if (actor === "fox") { if (battleFoxHP < 40) selfHeal("fox"); else partyAttack("fox", target); }
    else if (actor === "bunny") { if (battleBunnyHP < 40) selfHeal("bunny"); else bunnyMagicAttack(target); }
    else if (actor === "bear") { if (battleBearHP < 40) selfHeal("bear"); else partyAttack("bear", target); }
    else { if (battleSquirrelHP < 40) selfHeal("squirrel"); else squirrelMagicAttack(target); }
}
function partyAttack(key, target) {
    if (!battleActive || !target || !target.alive) return;
    battleActionRunning = true;
    const missed = Math.random() < 0.10;

    // Fox releases her arrow as Attack frame 26 appears (25 x 80 ms intervals).
    if (key === "fox" && !missed) {
        addBattleTimer(setTimeout(() => {
            if (battleActive && target.alive) playFoxArrowHit(target);
        }, 25 * 80));
    }

    // Bear throws the axe as Attack frame 14 appears (13 x 80 ms intervals).
    if (key === "bear" && !missed) {
        addBattleTimer(setTimeout(() => {
            if (battleActive && target.alive) playBearAxeBoomerang(target);
        }, 13 * 80));
    }

    playPartyBattle(key, "Attack", () => {
        if (!battleActive) return;
        if (missed) { showBattleText("MISS!", target.element); continueAfterPartyAttack(); return; }
        const damage = key === "bear" ? 32 : 25; target.hp = Math.max(0, target.hp - damage);
        addPartyGauge(key, 8);
        // Other party members build a little limit charge when an ally attacks.
        for (const ally of getAliveParty()) if (ally !== key) addPartyGauge(ally, 1);
        updateBattleBars();
        if (target.hp <= 0) skeletonKO(target, continueAfterPartyAttack); else skeletonStagger(target, continueAfterPartyAttack);
    });
}
function foxAttack(target) { partyAttack("fox", target); }

function playFoxArrowHit(target) {
    if (!battleActive || !target || !target.alive || !target.element || !foxArrowFrames.length) return;

    const layerRect = battleLayer.getBoundingClientRect();
    const foxRect = fox.getBoundingClientRect();
    const enemyRect = target.element.getBoundingClientRect();
    const startX = foxRect.left + foxRect.width * 0.72 - layerRect.left;
    const startY = foxRect.top + foxRect.height * 0.38 - layerRect.top;
    // Aim for the enemy's upper body so the arrow visibly lands on its target.
    const endX = enemyRect.left + enemyRect.width * 0.52 - layerRect.left;
    const endY = enemyRect.top + enemyRect.height * 0.60 - layerRect.top;

    const arrow = document.createElement("img");
    arrow.className = "fox-arrow-projectile";
    arrow.alt = "Fox arrow";
    arrow.src = foxArrowFrames[0].src;
    arrow.style.left = `${startX}px`;
    arrow.style.top = `${startY}px`;
    battleLayer.appendChild(arrow);

    let frame = 0;
    const frameTimer = setInterval(() => {
        if (!battleActive || !target.alive || !arrow.isConnected) {
            clearInterval(frameTimer);
            arrow.remove();
            return;
        }
        frame++;
        const progress = frame / (foxArrowFrames.length - 1);
        arrow.src = foxArrowFrames[Math.min(frame, foxArrowFrames.length - 1)].src;
        arrow.style.left = `${startX + (endX - startX) * progress}px`;
        arrow.style.top = `${startY + (endY - startY) * progress}px`;

        if (frame >= foxArrowFrames.length - 1) {
            clearInterval(frameTimer);
            // Keep the final arrow frame on the enemy briefly so it looks embedded.
            addBattleTimer(setTimeout(() => arrow.remove(), 550));
        }
    }, 65);
    addBattleTimer(frameTimer);
}
function playBearAxeBoomerang(target) {
    if (!battleActive || !target || !target.alive || !target.element || !bearThrowAxeFrames.length) return;

    const layerRect = battleLayer.getBoundingClientRect();
    const bearRect = bear.getBoundingClientRect();
    const enemyRect = target.element.getBoundingClientRect();
    const startX = bearRect.left + bearRect.width * 0.72 - layerRect.left;
    const startY = bearRect.top + bearRect.height * 0.38 - layerRect.top;
    // Aim the axe at the skeleton's chest, then return it to Bear.
    const endX = enemyRect.left + enemyRect.width * 0.52 - layerRect.left;
    const endY = enemyRect.top + enemyRect.height * 0.60 - layerRect.top;

    const axe = document.createElement("img");
    axe.className = "bear-axe-projectile";
    axe.alt = "Bear's returning axe";
    axe.src = bearThrowAxeFrames[0].src;
    axe.style.left = `${startX}px`;
    axe.style.top = `${startY}px`;
    battleLayer.appendChild(axe);

    // Axe 1–7 fly outward. Frame 7 reaches the skeleton and marks the hit.
    // Axe 8–13 then play while the projectile travels back to Bear.
    let outboundStep = 0;
    let returnStep = 0;
    let returning = false;
    const timer = setInterval(() => {
        if (!battleActive || !axe.isConnected || (!returning && !target.alive)) {
            clearInterval(timer);
            axe.remove();
            return;
        }

        if (!returning) {
            outboundStep++;
            const progress = Math.min(outboundStep / 6, 1);
            axe.src = bearThrowAxeFrames[Math.min(outboundStep, 6)].src;
            axe.style.left = `${startX + (endX - startX) * progress}px`;
            axe.style.top = `${startY + (endY - startY) * progress}px`;
            if (outboundStep >= 6) {
                // Keep Axe 7 at the target briefly so the impact is readable.
                returning = true;
                returnStep = 0;
            }
            return;
        }

        returnStep++;
        const progress = Math.min(returnStep / 6, 1);
        axe.src = bearThrowAxeFrames[Math.min(6 + returnStep, 12)].src;
        axe.style.left = `${endX + (startX - endX) * progress}px`;
        axe.style.top = `${endY + (startY - endY) * progress}px`;
        if (returnStep >= 6) {
            clearInterval(timer);
            axe.remove();
        }
    }, 65);
    addBattleTimer(timer);
}

function playBunnyLightBeamHit(target) {
    if (!battleActive || !target || !target.alive || !target.element || !bunnyLightBeamFrames.length) return;

    // Overlay the 10-frame Light Beam effect on the enemy being attacked.
    const effect = document.createElement("img");
    effect.className = "white-mage-light-beam";
    effect.alt = "White Mage Light Beam";
    effect.src = bunnyLightBeamFrames[0].src;
    target.element.appendChild(effect);

    let frame = 0;
    const timer = setInterval(() => {
        if (!battleActive || !target.element || !effect.isConnected) {
            clearInterval(timer);
            effect.remove();
            return;
        }
        frame++;
        if (frame >= bunnyLightBeamFrames.length) {
            clearInterval(timer);
            effect.remove();
            return;
        }
        effect.src = bunnyLightBeamFrames[frame].src;
    }, 70);
    addBattleTimer(timer);
}

function bunnyMagicAttack(target) {
    if (!battleActive || !target || !target.alive) return;
    battleActionRunning = true;
    // White Mage uses her dedicated Attack 1–25 animation; Light Beam starts at Attack frame 16.
    const missed = Math.random() < 0.10;
    let beamTriggered = false;
    addBattleTimer(setTimeout(() => {
        if (!battleActive || !target.alive || beamTriggered || missed) return;
        beamTriggered = true;
        playBunnyLightBeamHit(target);
    }, 15 * 80));

    playBunnyBattle("Attack", () => {
        if (!battleActive) return;
        if (missed) { showBattleText("MISS!", target.element); continueAfterPartyAttack(); return; }
        target.hp = Math.max(0, target.hp - 35); addPartyGauge("bunny", 4);
        updateBattleBars(); if (target.hp <= 0) skeletonKO(target, continueAfterPartyAttack); else skeletonStagger(target, continueAfterPartyAttack);
    });
}

function playSquirrelLightningHit(target) {
    if (!battleActive || !target || !target.alive || !target.element || !squirrelLightningHitFrames.length) return;

    // Render the 9-frame lightning effect directly over the enemy being hit.
    const effect = document.createElement("img");
    effect.className = "squirrel-lightning-hit";
    effect.alt = "Lightning hit";
    effect.src = squirrelLightningHitFrames[0].src;
    target.element.appendChild(effect);

    let frame = 0;
    const timer = setInterval(() => {
        if (!battleActive || !target.element || !effect.isConnected) {
            clearInterval(timer);
            effect.remove();
            return;
        }
        frame++;
        if (frame >= squirrelLightningHitFrames.length) {
            clearInterval(timer);
            effect.remove();
            return;
        }
        effect.src = squirrelLightningHitFrames[frame].src;
    }, 70);
    addBattleTimer(timer);
}

function squirrelMagicAttack(target) {
    if (!battleActive || !target || !target.alive) return;
    battleActionRunning = true;
    // Use the dedicated Attack 1–23 animation for the Squirrel's normal attack.
    // Attack frame 15 appears after 14 intervals at 80 ms each.
    const missed = Math.random() < 0.10;
    let lightningTriggered = false;
    addBattleTimer(setTimeout(() => {
        if (!battleActive || !target.alive || lightningTriggered || missed) return;
        lightningTriggered = true;
        playSquirrelLightningHit(target);
    }, 14 * 80));

    playSquirrelBattle("Attack", () => {
        if (!battleActive) return;
        if (missed) { showBattleText("MISS!", target.element); continueAfterPartyAttack(); return; }
        target.hp = Math.max(0, target.hp - 38); addPartyGauge("squirrel", 5);
        updateBattleBars(); if (target.hp <= 0) skeletonKO(target, continueAfterPartyAttack); else skeletonStagger(target, continueAfterPartyAttack);
    });
}



/* ==========================================
   SKELETON STAGGER / KO
========================================== */

function skeletonStagger(enemy, finished) {
    if (!enemy || !enemy.alive) { if (finished) finished(); return; }
    if (enemy.isDemonKitty) {
        if (!enemy.staggerPlaying) { enemy.staggerPlaying = true; playDemonKittyAnimation(enemy, "Stagger", () => { enemy.staggerPlaying = false; }); }
        if (finished) addBattleTimer(setTimeout(() => { if (battleActive) finished(); }, 250));
        return;
    }

    // Play this skeleton's long stagger animation independently. Do NOT wait
    // for the animation to finish before allowing the battle turn to continue.
    // Its own animation timer keeps running while other heroes/skeletons act.
    enemy.staggered = false;
    if (!enemy.staggerPlaying) {
        enemy.staggerPlaying = true;
        playSkeletonAnimation(enemy, "Stagger");
    }

    if (finished) {
        addBattleTimer(setTimeout(() => {
            if (battleActive) finished();
        }, 250));
    }
}

function skeletonKO(enemy, finished) {
    if (!enemy) { if (finished) finished(); return; }
    enemy.hp = 0;
    enemy.alive = false;
    enemy.staggerPlaying = false;
    enemy.staggered = false;
    updateBattleBars();
    clearInterval(enemy.animationTimer);
    if (enemy.isDemonKitty) {
        playDemonKittyAnimation(enemy, "KO", () => { if (enemy.element) enemy.element.classList.add("defeated"); if (finished) finished(); });
        return;
    }
    const frames = skeletonAnimations.KO;
    let frame = 0;
    enemy.image.src = frames[0].src;
    const timer = setInterval(() => {
        if (!battleActive || !enemy.image || frame >= frames.length) {
            clearInterval(timer);
            if (enemy.element) enemy.element.classList.add("defeated");
            if (finished) finished();
            return;
        }
        enemy.image.src = frames[frame].src;
        frame++;
    }, 80);
    enemy.animationTimer = timer;
}

/* ==========================================
   AFTER PARTY ATTACK
========================================== */

function continueAfterPartyAttack() {
    if (!battleActive) return;
    if (!getAliveEnemies().length) { battleActionRunning = false; finishBattle(true); return; }
    if (!getAliveParty().length) { battleActionRunning = false; finishBattle(false); return; }
    battleActionRunning = false;
    if (battleFoxHP > 0 && battleLimit >= 100) addBattleTimer(setTimeout(useLimit, 180));
    else if (battleBunnyHP > 0 && bunnyLimit >= 100) addBattleTimer(setTimeout(useBunnyLimit, 180));
    else if (battleBearHP > 0 && bearLimit >= 100) addBattleTimer(setTimeout(useBearLimit, 180));
    else if (battleSquirrelHP > 0 && squirrelLimit >= 100) addBattleTimer(setTimeout(useLightningSquirrelLimit, 180));
    else addBattleTimer(setTimeout(runSkeletonTurn, 300));
}

/* ==========================================
   SKELETON TURN
========================================== */

function runSkeletonTurn() {
    if (!battleActive || battleActionRunning) return;
    startPartyIdleAnimations();
    const enemies = getAliveEnemies();
    const party = getAliveParty();
    if (!enemies.length) { finishBattle(true); return; }
    if (!party.length) { finishBattle(false); return; }

    // A staggered skeleton finishes all its frames while another skeleton acts.
    // Its turn remains in the rotation; if every living skeleton is staggered,
    // wait briefly rather than skipping anyone.
    let attacker = null;
    for (let i = 0; i < enemies.length; i++) {
        if (battleTurnIndex >= enemies.length) battleTurnIndex = 0;
        const candidate = enemies[battleTurnIndex];
        battleTurnIndex = (battleTurnIndex + 1) % enemies.length;
        if (candidate.staggerPlaying) continue;
        attacker = candidate;
        break;
    }
    if (!attacker) {
        addBattleTimer(setTimeout(() => { if (battleActive && !battleActionRunning) runSkeletonTurn(); }, 100));
        return;
    }
    attacker.staggered = false;
    if (attacker.isDemonKitty) {
        if ((attacker.limit || 0) >= 100) demonKittyMagic(attacker);
        else if (attacker.hp <= attacker.maxHP * 0.25) {
            battleActionRunning = true;
            playDemonKittyAnimation(attacker, "Healing", () => {
                if (!battleActive) return;
                attacker.hp = Math.min(attacker.maxHP, attacker.hp + 45);
                updateBattleBars(); finishDemonKittyTurn(attacker);
            });
        } else demonKittyAttack(attacker);
    } else skeletonAttack(attacker);
}

function skeletonAttack(enemy) {
    if (!battleActive || !enemy || !enemy.alive) return;
    const party = getAliveParty();
    if (!party.length) { finishBattle(false); return; }

    battleActionRunning = true;
    // Choose one hero for both Sonic Boom shots so both projectiles aim at the same target.
    const target = party[Math.floor(Math.random() * party.length)];
    const missed = Math.random() < 0.15;

    // Attack frame 25 launches the first Sonic 1–7 projectile.
    if (!missed) {
        addBattleTimer(setTimeout(() => {
            if (battleActive && target && partyHP(target) > 0) playSkeletonSonicBoom(enemy, target);
        }, 24 * 80));

        // Attack frame 34 launches a second Sonic 1–7 projectile after the first.
        addBattleTimer(setTimeout(() => {
            if (battleActive && target && partyHP(target) > 0) playSkeletonSonicBoom(enemy, target);
        }, 33 * 80));
    }

    playSkeletonAnimation(enemy, "Attack", () => {
        if (!battleActive) return;
        const targetElement = partyElement(target);
        if (missed) {
            showBattleText("MISS!", targetElement); battleActionRunning = false;
            if (battleFoxHP > 0 && battleLimit >= 100) addBattleTimer(setTimeout(useLimit, 180));
            else if (battleBunnyHP > 0 && bunnyLimit >= 100) addBattleTimer(setTimeout(useBunnyLimit, 180));
            else if (battleBearHP > 0 && bearLimit >= 100) addBattleTimer(setTimeout(useBearLimit, 180));
            else if (battleSquirrelHP > 0 && squirrelLimit >= 100) addBattleTimer(setTimeout(useLightningSquirrelLimit, 180));
            else addBattleTimer(setTimeout(runPartyTurn, 300));
            return;
        }
        setPartyHP(target, Math.max(0, partyHP(target) - 13));
        addPartyGauge(target, 5);
        for (const ally of party) if (ally !== target) addPartyGauge(ally, 1);
        updateBattleBars();
        if (partyHP(target) <= 0) {
            playPartyBattle(target, "KO", () => {
                if (!battleActive) return; battleActionRunning = false;
                if (!getAliveParty().length) finishBattle(false); else runPartyTurn();
            }); return;
        }
        if (!partyStaggerPlaying(target)) playPartyBattle(target, "Stagger");
        addBattleTimer(setTimeout(() => {
            if (!battleActive) return; battleActionRunning = false;
            if (!getAliveParty().length) finishBattle(false);
            else if (battleFoxHP > 0 && battleLimit >= 100) addBattleTimer(setTimeout(useLimit, 180));
            else if (battleBunnyHP > 0 && bunnyLimit >= 100) addBattleTimer(setTimeout(useBunnyLimit, 180));
            else if (battleBearHP > 0 && bearLimit >= 100) addBattleTimer(setTimeout(useBearLimit, 180));
            else if (battleSquirrelHP > 0 && squirrelLimit >= 100) addBattleTimer(setTimeout(useLightningSquirrelLimit, 180));
            else addBattleTimer(setTimeout(runPartyTurn, 300));
        }, 250));
    });
}

function playSkeletonSonicBoom(enemy, targetKey) {
    if (!battleActive || !enemy || !enemy.alive || !enemy.element || !skeletonSonicBoomFrames.length || partyHP(targetKey) <= 0) return;

    const target = partyElement(targetKey);
    if (!target) return;
    const layerRect = battleLayer.getBoundingClientRect();
    // The skeleton faces left toward the heroes. The projectile is positioned by its CENTER,
    // so move that center clearly beyond the skeleton's left edge; this compensates for the
    // large 225px projectile graphic and makes it look like it is thrown from the skeleton.
    const skeletonRect = enemy.image ? enemy.image.getBoundingClientRect() : enemy.element.getBoundingClientRect();
    const heroRect = target.getBoundingClientRect();
    const startX = skeletonRect.left - layerRect.left - 78;
    // Launch around the skeleton's mid-body/throwing arm, not above its head.
    const startY = skeletonRect.top + skeletonRect.height * 0.62 - layerRect.top;
    // Stop on the skeleton-facing side of the hero; the large projectile graphic overlaps the target without its center passing through.
    const endX = heroRect.right - layerRect.left + 42;
    const endY = heroRect.top + heroRect.height * 0.40 - layerRect.top;

    const sonic = document.createElement("img");
    sonic.className = "skeleton-sonic-boom";
    sonic.alt = "Skeleton Sonic Boom projectile";
    sonic.src = skeletonSonicBoomFrames[0].src;
    sonic.style.left = `${startX}px`;
    sonic.style.top = `${startY}px`;
    battleLayer.appendChild(sonic);

    let frame = 0;
    const timer = setInterval(() => {
        if (!battleActive || !sonic.isConnected || partyHP(targetKey) <= 0) {
            clearInterval(timer);
            sonic.remove();
            return;
        }
        frame++;
        const progress = frame / (skeletonSonicBoomFrames.length - 1);
        sonic.src = skeletonSonicBoomFrames[Math.min(frame, skeletonSonicBoomFrames.length - 1)].src;
        sonic.style.left = `${startX + (endX - startX) * progress}px`;
        sonic.style.top = `${startY + (endY - startY) * progress}px`;
        if (frame >= skeletonSonicBoomFrames.length - 1) {
            clearInterval(timer);
            // Hold the final frame on the hero briefly so the impact is visible.
            addBattleTimer(setTimeout(() => sonic.remove(), 300));
        }
    }, 60);
    addBattleTimer(timer);
}


function selfHeal(key) {
    if (!battleActive || battleActionRunning || partyHP(key) <= 0) return;
    battleActionRunning = true;
    playPartyBattle(key, "Healing", () => {
        if (!battleActive) return; setPartyHP(key, Math.min(100, partyHP(key) + 20));
        addPartyGauge(key, 2); updateBattleBars(); continueAfterPartyAttack();
    });
}
function foxSelfHeal() { selfHeal("fox"); }
function bunnySelfHeal() { selfHeal("bunny"); }
function bearSelfHeal() { selfHeal("bear"); }
function squirrelSelfHeal() { selfHeal("squirrel"); }

/* ==========================================
   FIRE FOX SUMMON — FOX LIMIT
========================================== */



/* ==========================================
   FIRE FOX SUMMON — FOX LIMIT
========================================== */

const fireFoxFrames = [];
for (let i = 1; i <= 59; i++) {
    const img = new Image();
    img.src = `${summonFolder}Fire Fox/Fire Fox ${i}.png`;
    fireFoxFrames.push(img);
}

function stopFireFox() {
    clearInterval(fireFoxTimer);
    fireFoxTimer = null;
    if (fireFoxSummon) fireFoxSummon.style.display = "none";
}

function playFireFoxOnce(finished) {
    clearInterval(fireFoxTimer);
    if (!fireFoxSummon || !fireFoxFrames.length) { if (finished) finished(); return; }
    let frame = 0;
    fireFoxSummon.style.display = "block";
    fireFoxSummon.style.left = "48%";
    fireFoxSummon.style.bottom = "1%";
    fireFoxSummon.style.zIndex = "70";
    fireFoxSummon.src = fireFoxFrames[0].src;
    fireFoxTimer = setInterval(() => {
        if (!battleActive) { stopFireFox(); return; }
        frame++;
        if (frame >= fireFoxFrames.length) { stopFireFox(); if (finished) finished(); return; }
        fireFoxSummon.src = fireFoxFrames[frame].src;
    }, 70);
}

const lightningSquirrelFrames = [];
for (let i = 1; i <= 15; i++) {
    const img = new Image();
    img.src = `${summonFolder}Lightening Squirrel/Lightening Squirrel ${i}.png`;
    lightningSquirrelFrames.push(img);
}

function stopLightningSquirrel() {
    clearInterval(lightningSquirrelTimer);
    lightningSquirrelTimer = null;
    if (lightningSquirrelSummon) lightningSquirrelSummon.style.display = "none";
}

function playLightningSquirrelOnce(finished) {
    stopLightningSquirrel();
    if (!lightningSquirrelSummon || !lightningSquirrelFrames.length) { if (finished) finished(); return; }
    let frame = 0;
    lightningSquirrelSummon.style.display = "block";
    lightningSquirrelSummon.style.left = "48%";
    lightningSquirrelSummon.style.bottom = "1%";
    lightningSquirrelSummon.style.zIndex = "70";
    lightningSquirrelSummon.src = lightningSquirrelFrames[0].src;
    lightningSquirrelTimer = setInterval(() => {
        if (!battleActive) { stopLightningSquirrel(); return; }
        frame++;
        if (frame >= lightningSquirrelFrames.length) { stopLightningSquirrel(); if (finished) finished(); return; }
        lightningSquirrelSummon.src = lightningSquirrelFrames[frame].src;
    }, 70);
}

function useLightningSquirrelLimit() {
    if (!battleActive || battleSquirrelHP <= 0 || limitAttackRunning || squirrelLimit < 100) return;
    limitAttackRunning = true;
    battleActionRunning = true;
    squirrelLimit = 0;
    updateBattleBars();
    const summon = () => playLightningSquirrelOnce(() => {
        if (!battleActive) return;
        const targets = getAliveEnemies();
        for (const enemy of targets) enemy.hp = Math.max(0, enemy.hp - 50);
        updateBattleBars();
        const dead = targets.filter(enemy => enemy.hp <= 0);
        if (!dead.length) { playLimitStaggers(getAliveEnemies()); return; }
        let finished = 0;
        for (const enemy of dead) skeletonKO(enemy, () => {
            finished++;
            if (finished === dead.length) playLimitStaggers(getAliveEnemies());
        });
    });
    if (squirrelStaggerPlaying) summon();
    else playSquirrelBattle("Magic", summon);
}

function useLimit() {
    if (!battleActive || battleFoxHP <= 0 || limitAttackRunning || battleLimit < 100) return;
    limitAttackRunning = true;
    battleActionRunning = true;
    battleLimit = 0;
    updateBattleBars();

    // Keep Fox's full Stagger animation visible if it is already playing.
    // Fire Fox is a separate overlay, so the summon can run independently.
    const beginFireFoxSummon = () => playFireFoxOnce(() => {
        if (!battleActive) return;
        const targets = getAliveEnemies();
        for (const enemy of targets) enemy.hp = Math.max(0, enemy.hp - 50);
        updateBattleBars();
        const dead = targets.filter(enemy => enemy.hp <= 0);
        const alive = getAliveEnemies();
        if (!dead.length) { playLimitStaggers(alive); return; }
        let finished = 0;
        for (const enemy of dead) skeletonKO(enemy, () => {
            finished++;
            if (finished === dead.length) playLimitStaggers(getAliveEnemies());
        });
    });

    if (foxStaggerPlaying) beginFireFoxSummon();
    else playFoxBattle("Magic", beginFireFoxSummon);
}

/* ==========================================
   BUNNY LIMIT — HEALING FLUFF
========================================== */

const healingFluffFrames = [];
for (let i = 1; i <= 26; i++) {
    const img = new Image();
    img.src = `${summonFolder}Healing Fluff/Healing Fluff ${i}.png`;
    healingFluffFrames.push(img);
}

function stopHealingFluff() {
    clearInterval(healingFluffTimer);
    healingFluffTimer = null;
    if (healingFluffSummon) healingFluffSummon.style.display = "none";
}

function playHealingFluff(finished) {
    stopHealingFluff();
    if (!healingFluffSummon || !healingFluffFrames.length) { if (finished) finished(); return; }
    let frame = 0;
    healingFluffSummon.style.display = "block";
    // CSS controls a responsive frame box so the summon never overflows the canvas.
    healingFluffSummon.style.position = "absolute";
    healingFluffSummon.style.left = "7%";
    healingFluffSummon.style.bottom = "0";
    healingFluffSummon.style.objectFit = "contain";
    healingFluffSummon.style.objectPosition = "center bottom";
    healingFluffSummon.style.zIndex = "75";
    healingFluffSummon.src = healingFluffFrames[0].src;
    healingFluffTimer = setInterval(() => {
        if (!battleActive) { stopHealingFluff(); return; }
        frame++;
        if (frame >= healingFluffFrames.length) { stopHealingFluff(); if (finished) finished(); return; }
        healingFluffSummon.src = healingFluffFrames[frame].src;
    }, 85);
}

function useBunnyLimit() {
    if (!battleActive || battleBunnyHP <= 0 || limitAttackRunning || bunnyLimit < 100) return;
    limitAttackRunning = true;
    battleActionRunning = true;
    bunnyLimit = 0;
    updateBattleBars();

    // Don't replace Bunny's full Stagger animation with Magic; Healing Fluff
    // plays in its own overlay and can still complete the limit action.
    const beginHealingFluffSummon = () => playHealingFluff(() => {
        if (!battleActive) return;
        if (battleFoxHP > 0) battleFoxHP = Math.min(100, battleFoxHP + 45);
        if (battleBunnyHP > 0) battleBunnyHP = Math.min(100, battleBunnyHP + 45);
        if (battleBearHP > 0) battleBearHP = Math.min(100, battleBearHP + 45);
        if (battleSquirrelHP > 0) battleSquirrelHP = Math.min(100, battleSquirrelHP + 45);
        updateBattleBars();
        if (!bunnyStaggerPlaying) holdWalkingFrame(bunny, bunnyAnimations);
        limitAttackRunning = false;
        battleActionRunning = false;
        addBattleTimer(setTimeout(runPartyTurn, 300));
    });

    if (bunnyStaggerPlaying) beginHealingFluffSummon();
    else playBunnyBattle("Magic", beginHealingFluffSummon);
}

/* ==========================================
   BEAR LIMIT — BEAR AXE
========================================== */

const bearAxeFrames = [];
for (let i = 1; i <= 26; i++) {
    const img = new Image(); img.src = `${summonFolder}Bear Axe/Bear Axe ${i}.png`; bearAxeFrames.push(img);
}
function stopBearAxe() { clearInterval(bearAxeTimer); bearAxeTimer = null; if (bearAxeSummon) bearAxeSummon.style.display = "none"; }
function playBearAxe(finished) {
    stopBearAxe(); if (!bearAxeSummon || !bearAxeFrames.length) { if (finished) finished(); return; }
    let frame = 0; bearAxeSummon.style.display = "block";
    Object.assign(bearAxeSummon.style, { position: "absolute", left: "48%", bottom: "1%", objectFit: "contain", objectPosition: "center bottom", zIndex: "76", pointerEvents: "none" });
    bearAxeSummon.src = bearAxeFrames[0].src;
    bearAxeTimer = setInterval(() => {
        if (!battleActive) { stopBearAxe(); return; }
        frame++; if (frame >= bearAxeFrames.length) { stopBearAxe(); if (finished) finished(); return; }
        bearAxeSummon.src = bearAxeFrames[frame].src;
    }, 80);
}
function useBearLimit() {
    if (!battleActive || battleBearHP <= 0 || limitAttackRunning || bearLimit < 100) return;
    limitAttackRunning = true; battleActionRunning = true; bearLimit = 0; updateBattleBars();
    const summon = () => playBearAxe(() => {
        if (!battleActive) return; const targets = getAliveEnemies();
        for (const enemy of targets) enemy.hp = Math.max(0, enemy.hp - 60);
        updateBattleBars(); const dead = targets.filter(enemy => enemy.hp <= 0); const alive = getAliveEnemies();
        if (!dead.length) { playLimitStaggers(alive); return; }
        let finished = 0; for (const enemy of dead) skeletonKO(enemy, () => { finished++; if (finished === dead.length) playLimitStaggers(getAliveEnemies()); });
    });
    if (bearStaggerPlaying) summon(); else playBearBattle("Magic", summon);
}

/* ==========================================
   LIMIT STAGGERS
========================================== */

function playLimitStaggers(enemies) {
    if (!battleActive) return;
    if (!enemies.length) { finishLimit(); return; }
    let finished = 0;
    for (const enemy of enemies) skeletonStagger(enemy, () => {
        finished++;
        if (finished === enemies.length) finishLimit();
    });
}

function finishLimit() {
    if (!battleActive) return;
    limitAttackRunning = false;
    battleActionRunning = false;
    if (!getAliveEnemies().length) { finishBattle(true); return; }
    addBattleTimer(setTimeout(runPartyTurn, 300));
}

/* ==========================================
   FINISH BATTLE
========================================== */

function finishBattle(victory) {
    if (!battleActive) return;
    battleActive = false; battleActionRunning = false; limitAttackRunning = false; healingRunning = false;
    foxStaggered = bunnyStaggered = bearStaggered = squirrelStaggered = false; foxStaggerPlaying = bunnyStaggerPlaying = bearStaggerPlaying = squirrelStaggerPlaying = false;
    clearBattleTimers(); clearInterval(foxBattleTimer); clearInterval(bunnyBattleTimer); clearInterval(bearBattleTimer); clearInterval(squirrelBattleTimer);
    foxBattleTimer = bunnyBattleTimer = bearBattleTimer = squirrelBattleTimer = null;
    for (const enemy of battleEnemiesData) clearInterval(enemy.animationTimer);
    stopFireFox(); stopHealingFluff(); stopBearAxe(); stopLightningSquirrel();
    clearInterval(demonKittyTimer); clearInterval(demonKittySummonTimer); clearInterval(demonKittyProjectileTimer);
    demonKittyTimer = demonKittySummonTimer = demonKittyProjectileTimer = null;
    for (const key of Object.keys(asleepTurns)) asleepTurns[key] = 0;
    battleLayer.querySelectorAll(".demon-kitty-fireball, .demon-kitty-dark-flames").forEach(el => el.remove());
    if (statusPanel) statusPanel.style.display = "none"; battleLayer.style.display = "none"; battleEnemies.innerHTML = ""; battleEnemiesData = []; scrolling = true;
    console.log(victory ? "BATTLE WON" : "BATTLE LOST");
    if (pendingWorldState) { const nextState = pendingWorldState; pendingWorldState = null; setTimeout(() => { if (nextState === "night") startNight(); else if (nextState === "camp") startCamp(); else startDay(); }, 100); return; }
    if (gameState === "day" || gameState === "night") {
        if (battleFoxHP > 0) { fox.style.display = "block"; playFox("walking", true); } else fox.style.display = "none";
        if (battleBunnyHP > 0) { bunny.style.display = "block"; playBunny("walking", true); } else bunny.style.display = "none";
        if (battleBearHP > 0) { bear.style.display = "block"; playBear("walking", true); } else bear.style.display = "none";
        if (battleSquirrelHP > 0) { squirrel.style.display = "block"; playSquirrel("walking", true); } else squirrel.style.display = "none";
    }
}



/* Demon Kitty boss presentation: a little larger than Bear, with its own HP/Limit bars. */
if (!document.getElementById("demon-kitty-battle-style")) {
    const style = document.createElement("style"); style.id = "demon-kitty-battle-style";
    style.textContent = `
      .demon-kitty-enemy { flex-basis: 150px; width: 150px; height: 245px; }
      .demon-kitty-enemy img { height: 100%; width: 100%; object-fit: contain; object-position: bottom center; }
      .demon-kitty-name { position:absolute; bottom:100%; left:50%; transform:translateX(-50%); color:white; font:bold 12px sans-serif; text-shadow:1px 1px 3px #000; white-space:nowrap; margin-bottom:7px; }
      .demon-kitty-hp { position:absolute; left:8%; bottom:calc(100% + 1px); width:84%; height:7px; z-index:3; }
      .demon-kitty-limit { position:absolute; left:8%; bottom:calc(100% - 9px); width:84%; height:6px; background:rgba(20,20,20,.9); border:1px solid rgba(255,255,255,.75); box-sizing:border-box; z-index:3; }
      .demon-kitty-limit-fill { height:100%; width:0%; background:#a855f7; transition:width .2s ease; }
      .demon-kitty-limit-text { position:absolute; right:0; bottom:7px; color:white; font:9px sans-serif; text-shadow:1px 1px 2px black; }
      .demon-kitty-fireball { position:absolute; z-index:9998; width:168px; height:168px; object-fit:contain; transform:translate(-50%,-50%); pointer-events:none; user-select:none; }
      .demon-kitty-fireball.flying { animation:demon-kitty-fireball-flight 0.72s linear forwards; }
      @keyframes demon-kitty-fireball-flight { from { transform:translate(-50%,-50%); } to { transform:translate(calc(-50% + var(--fireball-x)),calc(-50% + var(--fireball-y))); } }
      .demon-kitty-dark-flames { position:absolute !important; display:block !important; visibility:visible !important; opacity:1 !important; z-index:9999 !important; width:190px !important; max-width:none !important; height:250px !important; max-height:none !important; object-fit:contain !important; object-position:center bottom !important; transform:translate(-50%,-100%) !important; pointer-events:none; user-select:none; filter:drop-shadow(0 0 5px rgba(95,20,180,.5)); }
      #bear.battle-healing, #bear.battle-waking { width:160px !important; height:auto !important; }
    `; document.head.appendChild(style);
}

/* ==========================================
   AUTOMATIC BATTLES
========================================== */

function scheduleBattle() {
    clearTimeout(firstBattleTimer);
    firstBattleTimer = setTimeout(() => {
        if (!battleActive && (gameState === "day" || gameState === "night")) startBattle();
    }, 10000);
}

function startBattleChecks() {
    clearInterval(battleChanceTimer);
    battleChanceTimer = setInterval(() => {
        if (battleActive || (gameState !== "day" && gameState !== "night")) return;
        // Once five normal battles are complete, do not leave the party wandering
        // while waiting for a random encounter roll: start the boss encounter.
        if (normalBattlesSinceDemonKitty >= 5 || Math.random() < 0.35) startBattle();
    }, 15000);
}

function resetWorldCharacterLayout() {
    for (const character of [fox, bunny, bear, squirrel]) {
        unanchorCampCharacter(character);
        for (const prop of ["left", "bottom", "width", "height", "z-index", "transform"]) character.style.removeProperty(prop);
    }
    setCharacterLayering();
}

/* ==========================================
   DAY
========================================== */

function startDay() {
    if (battleActive) { pendingWorldState = "day"; return; }
    gameState = "day";
    pendingWorldState = null;
    scrolling = true;
    stopCampfire();
    resetWorldCharacterLayout();
    setBackground("day");
    fox.style.display = battleFoxHP > 0 ? "block" : "none";
    bunny.style.display = battleBunnyHP > 0 ? "block" : "none";
    bear.style.display = battleBearHP > 0 ? "block" : "none";
    squirrel.style.display = battleSquirrelHP > 0 ? "block" : "none";
    if (battleFoxHP > 0) playFox("walking", true);
    if (battleBunnyHP > 0) playBunny("walking", true);
    if (battleBearHP > 0) playBear("walking", true);
    if (battleSquirrelHP > 0) playSquirrel("walking", true);
    console.log("DAY");
    clearTimeout(dayTimer);
    dayTimer = setTimeout(() => {
        if (battleActive) pendingWorldState = "night";
        else startNight();
    }, 120000);
    scheduleBattle();
}

/* ==========================================
   NIGHT
========================================== */

function startNight() {
    if (battleActive) { pendingWorldState = "night"; return; }
    gameState = "night";
    pendingWorldState = null;
    scrolling = true;
    stopCampfire();
    resetWorldCharacterLayout();
    setBackground("night");
    fox.style.display = battleFoxHP > 0 ? "block" : "none";
    bunny.style.display = battleBunnyHP > 0 ? "block" : "none";
    bear.style.display = battleBearHP > 0 ? "block" : "none";
    squirrel.style.display = battleSquirrelHP > 0 ? "block" : "none";
    if (battleFoxHP > 0) playFox("walking", true);
    if (battleBunnyHP > 0) playBunny("walking", true);
    if (battleBearHP > 0) playBear("walking", true);
    if (battleSquirrelHP > 0) playSquirrel("walking", true);
    console.log("NIGHT");
    clearTimeout(nightTimer);
    nightTimer = setTimeout(() => {
        if (battleActive) pendingWorldState = "camp";
        else startCamp();
    }, 120000);
    scheduleBattle();
}

/* ==========================================
   CAMP
========================================== */

function startCamp() {
    if (battleActive) { pendingWorldState = "camp"; return; }
    unanchorCampCharacter(fox); unanchorCampCharacter(bunny); unanchorCampCharacter(bear); unanchorCampCharacter(squirrel);
    gameState = "camp"; pendingWorldState = null; scrolling = false; stopWorldAnimations();
    battleFoxHP = battleBunnyHP = battleBearHP = battleSquirrelHP = 100;
    updateBattleBars(); setBackground("camp"); startCampfire();
    fox.style.display = bunny.style.display = bear.style.display = squirrel.style.display = "block";
    // Assign camp positions before the activity animations anchor their boxes.
    fox.style.setProperty("left", "21%", "important"); fox.style.setProperty("bottom", "-2%", "important"); fox.style.setProperty("width", "120px", "important");
    bunny.style.setProperty("left", "16%", "important"); bunny.style.setProperty("bottom", "-2%", "important"); bunny.style.setProperty("width", "95px", "important");
    squirrel.style.setProperty("left", "35%", "important"); squirrel.style.setProperty("bottom", "-2%", "important"); squirrel.style.setProperty("width", "120px", "important");
    bear.style.setProperty("left", "40%", "important"); bear.style.setProperty("bottom", "-2%", "important"); bear.style.setProperty("width", "145px", "important");
    console.log("CAMP"); setTimeout(() => { if (gameState === "camp") playCampActivities(); }, 500);
}


/* ==========================================
   OPTIONAL ANIMATION TEST BUTTONS
========================================== */

function showAnimationTests() {
    const foxSelect = $("fox-animation-test");
    const bunnySelect = $("bunny-animation-test");
    const testFox = $("test-fox-animation");
    const testBunny = $("test-bunny-animation");
    const bearSelect = $("bear-animation-test");
    const testBear = $("test-bear-animation");
    const squirrelSelect = $("squirrel-animation-test");
    const testSquirrel = $("test-squirrel-animation");
    if (testFox && foxSelect) testFox.addEventListener("click", () => {
        if (battleActive) return;
        stopWorldAnimations();
        playFox(foxSelect.value, false, () => {
            if (gameState === "day" || gameState === "night") playFox("walking", true);
        });
    });
    if (testBunny && bunnySelect) testBunny.addEventListener("click", () => {
        if (battleActive) return; stopWorldAnimations();
        playBunny(bunnySelect.value, false, () => { if (gameState === "day" || gameState === "night") playBunny("walking", true); });
    });
    if (testBear && bearSelect) testBear.addEventListener("click", () => {
        if (battleActive) return; stopWorldAnimations();
        playBear(bearSelect.value, false, () => { if (gameState === "day" || gameState === "night") playBear("walking", true); });
    });
    if (testSquirrel && squirrelSelect) testSquirrel.addEventListener("click", () => {
        if (battleActive) return; stopWorldAnimations();
        playSquirrel(squirrelSelect.value, false, () => { if (gameState === "day" || gameState === "night") playSquirrel("walking", true); });
    });
}

/* ==========================================
   CHARACTER LAYERING
========================================== */

function setCharacterLayering() {
    fox.style.setProperty("z-index", "20", "important");
    bunny.style.setProperty("z-index", "8", "important");
    bear.style.setProperty("z-index", "25", "important");
    squirrel.style.setProperty("z-index", "15", "important");
    squirrel.style.setProperty("left", "13%", "important");
    squirrel.style.setProperty("bottom", "-2%", "important");
    bear.style.setProperty("left", "27%", "important");
    bear.style.setProperty("bottom", "-2%", "important");
    // Nudge Bunny White Mage's name/status bar left without moving Bunny.
    if (bunnyStatus) bunnyStatus.style.transform = "translateX(-12px)";
}

/* ==========================================
   START GAME
========================================== */

setBackground("day");
fox.style.display = "block";
bunny.style.display = "block";
bear.style.display = "block";
squirrel.style.display = "block";
setCharacterLayering();
if (fireFoxSummon) fireFoxSummon.style.display = "none";
if (healingFluffSummon) healingFluffSummon.style.display = "none";
if (bearAxeSummon) bearAxeSummon.style.display = "none";
if (lightningSquirrelSummon) lightningSquirrelSummon.style.display = "none";
playFox("walking", true);
playBunny("walking", true);
playBear("walking", true);
playSquirrel("walking", true);
moveForest();
stopCampfire();
updateBattleBars();
startBattleChecks();
dayTimer = setTimeout(startNight, 120000);
scheduleBattle();