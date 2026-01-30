# Personal Mythology Weaver: Comprehensive Design & Implementation Strategy

## Executive Summary

**Project Name:** Axiom: The Weaver's Ledger  
**Category:** Digital Psychometric Experience / Existential Study Tool  
**Core Purpose:** A narrative-driven application that guides users through Jungian individuation by helping them discover their "personal mythology" through interactive inquiry, symbolic association, and integration rituals.

**Key Innovation:** This is not a personality test—it's an existential mirror that transforms psychological data into epic narrative, helping users understand themselves through the language of myth and archetype.

---

## Table of Contents

1. [Conceptual Foundation](#conceptual-foundation)
2. [User Journey Architecture](#user-journey-architecture)
3. [Taxonomy & Data Model](#taxonomy--data-model)
4. [Question Bank & Scoring Logic](#question-bank--scoring-logic)
5. [Visual Identity & Sigil Generation](#visual-identity--sigil-generation)
6. [Integration Rituals](#integration-rituals)
7. [Technical Implementation](#technical-implementation)
8. [UI/UX Narrative Design](#uiux-narrative-design)
9. [Development Roadmap](#development-roadmap)

---

## 1. Conceptual Foundation

### Philosophy

The app bridges clinical psychology and poetic truth by framing self-discovery as **Personal Mythology**. Unlike traditional personality tests that reduce users to percentages and labels, Axiom provides a narrative identity that resonates with the human psyche.

### Core Principles

1. **Jungian Individuation**: Movement from unconscious to conscious self-awareness
2. **Narrative Identity**: People are stories, not data points
3. **Shadow Integration**: True growth requires confronting repressed aspects
4. **Archetypal Resonance**: Universal symbols speak to the collective unconscious
5. **Active Participation**: The user doesn't just take a test—they perform a ritual

### Phases of Descent

The user journey mirrors the psychological process of individuation:

**Phase I: The Threshold** → Onboarding & atmospheric calibration  
**Phase II: The Descent** → Category-based inquiry (Persona → Ethics → Shadow)  
**Phase III: The Synthesis** → Mythos generation and reveal  
**Phase IV: The Integration** → Daily rituals and shadow work

---

## 2. User Journey Architecture

### The Complete Arc

```
Entry (Dark Screen)
    ↓
Atmospheric Calibration (3 sensory questions)
    ↓
The 20-Question Codex (7 Arcs)
    ↓
The Unveiling (Results reveal with Sigil)
    ↓
Integration Rituals (Daily work & Shadow dialogue)
    ↓
The Living Tapestry (Ongoing evolution)
```

### The First 5 Minutes

**Minute 1: The Dark Entry**
- App opens to pitch-black screen
- Low-frequency binaural beat hum
- Text appears: *"You have spent your life looking outward. For the next moment, look only at the glass."*
- User holds center of screen to "melt frost" revealing front-camera mirror

**Minute 2: Atmospheric Calibration**
Three rapid sensory questions set UI theme:
1. "Which sound completes the room?" (Fire/Water/Silence/Echoes)
2. "Choose a texture:" (Marble/Bark/Silk/Iron)
3. Based on responses, UI locks in color palette, typography, and ambient sound

**Minute 3: The First Inquiry**
- First question appears titled "The Threshold" (not "Question 1/20")
- Text fades in like being breathed onto screen
- Haptic heartbeat accompanies answer selection

**Minute 4: The Shadow Glimpse**
- Intentional screen "glitch" - inverts briefly
- Text: *"Your ego answered that. Now, let the one beneath speak."*
- Establishes psychological stakes

**Minute 5: Progression**
- User continues through inquiry arcs
- App tracks response latency (hesitation = internal conflict)
- Visual tapestry begins forming in background

---

## 3. Taxonomy & Data Model

### The Five Dimensions

The user's Mythos is a **Triadic Composition** with modifiers:

1. **Origin** (The Foundation) - Where values come from
2. **Archetype** (The Actor) - How they move through the world
3. **Shadow** (The Trial) - Repressed potential/unconscious gravity
4. **Affinity** (The Temperament) - Energetic signature
5. **Teleos** (The Goal) - Ultimate aim of individuation

### Complete Taxonomy Tables

#### 1. Origins (The Foundational Bedrock)

| Origin | Philosophical Root | Mythological Theme |
|--------|-------------------|-------------------|
| **The Primordial Void** | Nihilism/Emptiness | Meaning created from nothing; existence is a blank canvas |
| **The Eternal Order** | Determinism/Stoicism | Universe is a machine; everything has its place |
| **The Fecund Wild** | Vitalism/Animism | Life is an uncontrollable force; instinct over intellect |
| **The Celestial Spark** | Idealism/Platonism | Fragments of higher truth returning to source |
| **The Great Ancestry** | Traditionalism/Karma | Sum of those before; carrying debt to history |

#### 2. Archetypes (The Functional Identity)

| Archetype | Focus | Shadow Risk |
|-----------|-------|-------------|
| **The Sovereign** | Order, responsibility, boundaries | The Tyrant |
| **The Iconoclast** | Deconstruction, truth-telling, breaking cycles | The Destroyer |
| **The Alchemist** | Transformation, turning trauma into wisdom | The Manipulator |
| **The Sentinel** | Protection, loyalty, preservation | The Martyr |
| **The Wayfarer** | Knowledge acquisition, novelty, horizon-seeking | The Drifter |
| **The Weaver** | Connection, empathy, synthesis | The Escapist |

#### 3. Shadows (The Undercurrent)

| Shadow Type | Repressed Quality | Manifestation |
|-------------|------------------|---------------|
| **The Abyss** | Fear of Meaninglessness | Nihilistic paralysis, void-seeking, self-sabotage |
| **The Parasite** | Fear of Depletion | Emotional dependency, energy theft, inability to self-sustain |
| **The Tyrant** | Fear of Chaos | Desperate control, stifling self and others |
| **The Specter** | Fear of Being Seen | Invisible syndrome, hiding talents, shrinking |
| **The Beast** | Fear of Civilized Constraint | Explosive impulses, sabotaging long-term goals |

#### 4. Affinities (The Elemental Modifiers)

| Affinity | Traits | Correlates |
|----------|--------|-----------|
| **Solar** | Warm, visible, communal, radiant | Extraverted/Agreeable |
| **Lunar** | Reflective, hidden, intuitive, changing | Introverted/Open |
| **Stellar** | Distant, guiding, cold, precise | Conscientious/Analytical |
| **Volcanic** | Intense, transformative, volatile, raw | Neurotic/High Energy |

#### 5. Teleos (The Ultimate Aim)

| Teleos | Description |
|--------|-------------|
| **The Apotheosis** | Self-actualized "divine" self; total autonomy |
| **The Communion** | Dissolving ego to become one with collective/divine |
| **The Legacy** | Leaving structure/work/bloodline that outlasts self |
| **The Equilibrium** | Perfect inner stillness; Shadow and Light balanced |
| **The Transcendence** | Moving beyond physical into pure intellectual/spiritual clarity |

### Example Synthesis

**User Profile:** Stoicism + Introversion + Creative Transformation + Personal Autonomy

**Generated Mythos:** *"The Lunar Alchemist of the Eternal Order, seeking the Apotheosis"*

**Translation:** An introverted person who believes in a structured universe but uses internal creativity to transform reality toward total self-reliance.

### Calculation Potential

**Total Combinations:**
- 5 Origins × 6 Archetypes × 5 Teleos × 4 Affinities = **600 base types**
- Adding 5 Shadow variations = **3,000 narrative variations**

---

## 4. Question Bank & Scoring Logic

### Question Design Philosophy

Questions must be **oblique** to bypass the ego filter. Instead of "Are you a Stoic?", ask about feelings toward a crumbling statue.

### Three Question Types

**A. Moral Dilemmas** (The Logos & Shadow)
- Force choice between competing goods/evils
- Example: Book containing everyone's death dates

**B. Symbolic Associations** (The Affinity & Origin)  
- Visual/sensory, tapping into Anima and Primordial layers
- Example: Choose your spiritual landscape (Peak/Plaza/Ruin/Ocean)

**C. Relational Reflections** (The Archetype & Teleos)
- How user interacts with "The Other"
- Example: Reaction to witnessing wasted talent

### The Complete 20-Question Codex

#### Arc I: The Genesis (Origins & Bedrock)

**Q1. The Primordial State**
*"Before the first heartbeat of time, what was the nature of the universe?"*

- A: A perfect, silent blueprint waiting to be enacted. → **Order**
- B: A screaming, fertile chaos of pure potential. → **Wild**
- C: A single, conscious thought in the mind of the Divine. → **Spark**
- D: An echoing, hollow silence that owed nothing to no one. → **Void**

**Q2. The Childhood of the Spirit**
*"In your earliest memories, which mystery felt most like 'home' to you?"*

- A: The safety of the hearth and the stories of those who came before. → **Ancestry**
- B: The hidden path in the woods that no one else dared to take. → **Wayfarer**
- C: The feeling that you could build a world of your own out of dust. → **Weaver**
- D: The silver light of the moon on a quiet, empty street. → **Lunar**

**Q3. The Source of Truth**
*"When you seek the ultimate truth of a matter, where do you look?"*

- A: Toward the ancient laws and the wisdom of the ages. → **Ancestry**
- B: Toward the cold, mathematical precision of the stars. → **Stellar**
- C: Toward the heat of your own blood and the pull of instinct. → **Volcanic**
- D: Toward the wreckage of old ideas that must be cleared away. → **Iconoclast**

#### Arc II: The Ego & Persona (Archetype & Affinity)

**Q4. The Social Mask**
*"You stand in a crowded marketplace. What is your unspoken role?"*

- A: The silent guardian watching the perimeter for threats. → **Sentinel**
- B: The radiant presence that draws others into your orbit. → **Solar**
- C: The shadow on the wall, seeing all but remaining unseen. → **Lunar**
- D: The one whispered about for questioning the status quo. → **Iconoclast**

**Q5. The Internal Engine**
*"What is the primary force that moves you through a difficult day?"*

- A: The weight of my responsibilities and the crown I choose to wear. → **Sovereign**
- B: The knowledge that I can transmute this pain into wisdom. → **Alchemist**
- C: The connections I hold and the people who rely on my light. → **Weaver**
- D: The hunger for the next horizon and the fear of standing still. → **Wayfarer**

**Q6. The Definition of Power**
*"To you, true power is best described as..."*

- A: The ability to protect what is fragile. → **Sentinel**
- B: The freedom to walk away from anything. → **Wayfarer**
- C: The authority to bring order to chaos. → **Sovereign**
- D: The insight to see through the illusions of others. → **Alchemist**

#### Arc III: The Descent (The Shadow)

**Q7. The Great Fear**
*"If you were to be stripped of all your titles, what is the 'Ghost' that remains?"*

- A: A cold, demanding judge who says I am never enough. → **Shadow: Tyrant**
- B: A hollow vessel that fears it will never be filled. → **Shadow: Parasite**
- C: A silent void where a personality used to be. → **Shadow: Abyss**
- D: A snarling creature that wants to burn it all down. → **Shadow: Beast**

**Q8. The Hidden Impulse**
*"You are given a mask that grants you total impunity. What is your first act?"*

- A: I observe the secrets of my enemies to gain leverage. → **Shadow: Tyrant**
- B: I take what I have been denied and satisfy my hungers. → **Shadow: Beast**
- C: I simply walk away from my life and never return. → **Shadow: Abyss**
- D: I watch my loved ones to see if they truly care for me. → **Shadow: Parasite**

**Q9. The Reaction to Betrayal**
*"When someone you trust breaks their word, your immediate internal shift is..."*

- A: To tighten my grip and ensure they can never hurt me again. → **Shadow: Tyrant**
- B: To feel a deep, cold emptiness, as if nothing ever mattered. → **Shadow: Abyss**
- C: To wonder what I did wrong to deserve such abandonment. → **Shadow: Parasite**
- D: To strike back with a fury that leaves nothing but ash. → **Shadow: Beast**

#### Arc IV: The Crucible (Philosophy & Ethics)

**Q10. The Price of Progress**
*"A great innovation requires the destruction of a sacred tradition. You choose..."*

- A: To protect the tradition; we are nothing without our roots. → **Ancestry**
- B: To embrace the innovation; the past is a corpse. → **Iconoclast**
- C: To find a way to weave the old into the new. → **Alchemist**
- D: To let the conflict play out; the strongest will survive. → **Wild**

**Q11. The View of Suffering**
*"Is suffering a tool for growth or a cosmic mistake?"*

- A: It is the fire that tempers the soul. → **Stellar/Alchemist**
- B: It is a sign that the system is broken and must be rebelled against. → **Volcanic/Iconoclast**
- C: It is a burden to be shared and softened through empathy. → **Solar/Weaver**
- D: It is an inevitable part of the machine; one must endure it. → **Order/Sentinel**

#### Arc V: The Anima (Spiritualism & Symbolism)

**Q12. The Votive Choice**
*"You are asked to place one object on an altar. You choose..."*

- A: A heavy iron key. → **Order/Sovereign**
- B: A wild, unbloomed flower. → **Wild/Wayfarer**
- C: A vial of clear, still water. → **Spark/Equilibrium**
- D: A shard of a broken mirror. → **Void/Iconoclast**

**Q13. The Sacred Space**
*"When you seek a moment of profound connection, you find it in..."*

- A: A cathedral of stone and ancient echoes. → **Ancestry**
- B: The center of a storm where the wind howls. → **Volcanic**
- C: The quiet of a library at midnight. → **Lunar**
- D: A vibrant garden where everything is in bloom. → **Solar**

#### Arc VI: The Teleos (The Ultimate Aim)

**Q14. The Final Legacy**
*"When the tapestry of your life is finally finished, what should the central image be?"*

- A: A throne or a city that stands long after I am gone. → **Legacy**
- B: A mirror reflecting a perfectly clear and peaceful sky. → **Equilibrium**
- C: A figure stepping through a door into a blinding, new light. → **Apotheosis**
- D: A drop of water falling into a vast, shimmering ocean. → **Communion**

**Q15. The Nature of Death**
*"As you stand at the edge of the great transition, you view it as..."*

- A: A final rest after a long day's work. → **Equilibrium**
- B: The ultimate adventure into the unknown. → **Apotheosis**
- C: The dissolution of the self into the collective whole. → **Communion**
- D: A theft of the life I have built. → **Legacy**

**Q16. The Ultimate Success**
*"You will know you have 'arrived' when..."*

- A: You are no longer afraid of anything. → **Apotheosis**
- B: You have brought peace to those around you. → **Communion**
- C: You have mastered your craft and your mind. → **Equilibrium**
- D: Your name is spoken with reverence by the next generation. → **Legacy**

#### Arc VII: The Final Calibration (Synthesis)

**Q17. The Choice of Fate**
*"If you could rewrite one moment of your past, would you?"*

- A: Yes, to erase the pain I caused or felt. → **Shadow: Parasite/Abyss**
- B: No, for every scar is a part of my map. → **Alchemist/Sovereign**
- C: I would rewrite it all to see what else I could be. → **Wayfarer/Iconoclast**
- D: I would only rewrite the endings. → **Sentinel/Legacy**

**Q18. The Guiding Light**
*"When the path ahead is dark, what is your lantern?"*

- A: Logic and the cold facts of the world. → **Stellar**
- B: The warmth of my own conviction. → **Solar**
- C: The whispers of my ancestors and my intuition. → **Lunar**
- D: The sheer necessity of survival. → **Volcanic**

**Q19. The Concept of Freedom**
*"Freedom is..."*

- A: The ability to do what is right. → **Order**
- B: The ability to do what I want. → **Wild**
- C: The absence of desire. → **Spark**
- D: The recognition of necessity. → **Void**

**Q20. The Last Word**
*"The light goes out. What is your final thought?"*

- A: "It is finished." → **Legacy/Equilibrium**
- B: "What's next?" → **Apotheosis/Wayfarer**
- C: "I am here." → **Communion/Spark**
- D: "Finally, silence." → **Void/Equilibrium**

### Scoring Logic

#### The Weighting Matrix

Each response maps to multiple traits with different weights:

```javascript
{
  "question_id": "G_01_DAWN",
  "arc": "Genesis",
  "text": "Before the first heartbeat of time...",
  "responses": [
    {
      "id": "A",
      "text": "A perfect, silent blueprint...",
      "weights": {
        "origin_order": 10,
        "affinity_stellar": 2,
        "axis_order_chaos": +5
      }
    },
    {
      "id": "D",
      "text": "An echoing, hollow silence...",
      "weights": {
        "origin_void": 10,
        "affinity_lunar": 2,
        "axis_internal_external": -5
      }
    }
  ]
}
```

#### The 3D Coordinate System

Responses move user's "point" in psychological space:

- **X-Axis:** Individualism ↔ Collectivism
- **Y-Axis:** Chaos ↔ Order  
- **Z-Axis:** Materialism ↔ Mysticism

#### Shadow Trigger Logic

Shadow isn't just highest score—it's triggered by **extreme polarities**:

```python
def calculate_shadow(scores):
    # Tyrant: High control, low empathy
    if scores['sovereign'] > 15 and scores['empathy'] < 5:
        return "Tyrant"
    
    # Abyss: High void, low action drive
    if scores['void'] > 15 and scores['action_drive'] < 5:
        return "Abyss"
    
    # Parasite: High dependency signals
    if scores['communion'] > 15 and scores['self_sufficiency'] < 5:
        return "Parasite"
    
    # Beast: High volcanic, low restraint
    if scores['volcanic'] > 15 and scores['restraint'] < 5:
        return "Beast"
    
    # Specter: High lunar, extreme introversion
    if scores['lunar'] > 15 and scores['visibility'] < 3:
        return "Specter"
    
    # Default to highest shadow-coded answer
    return max(scores['shadow_pool'])
```

#### The Tension Score

Measures distance between Persona and Shadow:

```python
tension_score = abs(archetype_strength - shadow_strength)

if tension_score > 20:
    flag_as_crucial_turning_point = True
    # User is in state of "Existential Friction"
```

#### Response Latency Tracking

```javascript
const responseData = {
  questionId: "Q7_FEAR",
  selectedAnswer: "A",
  timeToAnswer: 8.4, // seconds
  answerChanged: true, // User changed their mind
  changeCount: 2
};

// Analysis
if (timeToAnswer > 10) {
  // Long hesitation = Ego vs Shadow conflict
  addWeight("internal_conflict", +3);
}

if (answerChanged) {
  // Second-guessing = "Sweet Spot" of individuation
  addWeight("threshold_awareness", +5);
}
```

---

## 5. Visual Identity & Sigil Generation

### The Artifact Aesthetic

The UI avoids modern "flat" design in favor of **skeuomorphic textures**:
- Parchment backgrounds
- Stone-carved typography
- Light-leak effects
- Constellation overlays

### The Sigil: Visual Synthesis

The Sigil is the **visual climax**—a sacred geometry representing the user's unique Mythos.

#### Layered Vector Construction

```
Layer 1 (Core/Inner)    → Origin
Layer 2 (Frame/Middle)  → Archetype
Layer 3 (Array/Outer)   → Affinity
Layer 4 (Fracture/Overlay) → Shadow
```

#### Visual Taxonomy for Generation

**The Core (Origin)**

| Origin | Visual Element |
|--------|---------------|
| Order | Perfectly centered solid Square |
| Void | Hollow Ring pulling eye inward |
| Wild | Spiral (organic, non-linear growth) |
| Spark | Single needle-point Dot with glow |
| Ancestry | Three Horizontal Lines (layers of time) |

**The Frame (Archetype)**

| Archetype | Visual Element |
|-----------|---------------|
| Sovereign | Crown-like Hexagon, sharp and structured |
| Wayfarer | Arrow or open-ended Chevron |
| Alchemist | Two Interlocking Triangles (union of opposites) |
| Sentinel | Thick defensive Vertical Bar / Shield-shape |
| Iconoclast | Scissor-like X cutting through center |
| Weaver | Interlocking Circles or Celtic knot |

**The Array (Affinity)**

| Affinity | Visual Element |
|----------|---------------|
| Solar | Symmetrical Rays extending to edge |
| Lunar | Soft Halo or Crescent Orbits |
| Stellar | Sharp Eight-pointed Crosses at cardinal directions |
| Volcanic | Unpredictable Jagged Shards of varying lengths |

**The Fracture (Shadow - Interference)**

| Shadow | Effect on Geometry |
|--------|-------------------|
| Tyrant | Lines become excessively thick/rigid, "crushing" core |
| Abyss | Center fades out, becomes blurred/distorted |
| Beast | Lines become shaky, hand-drawn, raw instead of perfect |
| Parasite | Small vine-like lines "drain" or cling to primary frame |
| Specter | Entire sigil has low opacity, barely visible |

#### The Generation Ritual

Instead of "Generate" button, use **Kinetic Interaction**:

1. **The Trace:** User draws circle on screen with finger
2. **The Manifestation:** App "snaps" messy line into perfect calculated Sigil
3. **The Final Pulse:** Sigil pulses with affinity color
   - Deep Gold → Solar
   - Silver → Lunar
   - Crimson → Volcanic
   - Ice Blue → Stellar

#### Implementation

```javascript
// Sigil Seed Format
const sigilSeed = `${originId}-${archetypeId}-${affinityId}-${shadowValue}`;
// Example: "1-3-2-5" = Order-Alchemist-Lunar-Beast

// SVG Layer Composition
function generateSigil(seed) {
  const [o, a, f, s] = seed.split('-');
  
  return `
    <svg viewBox="0 0 400 400">
      <g id="core">${loadOriginSVG(o)}</g>
      <g id="frame">${loadArchetypeSVG(a)}</g>
      <g id="array" filter="${getAffinityFilter(f)}">${loadAffinityPattern(f)}</g>
      <g id="fracture" opacity="${getShadowOpacity(s)}">${loadShadowDistortion(s)}</g>
    </svg>
  `;
}
```

#### Example Synthesis

**Profile:** Lunar Alchemist of the Primordial Void with Tyrant Shadow

**Sigil Composition:**
- Core: Hollow ring (Void)
- Frame: Interlocking triangles (Alchemist)
- Array: Soft crescent orbits (Lunar)
- Interference: Triangle lines weighted heavily, appearing oppressive (Tyrant)

---

## 6. Integration Rituals

### Philosophy

Moving from "test" to "existential study" requires **physical reality bridge**. Integration Rituals help users reconcile Archetype with Shadow through embodied practice.

### Three-Tiered System

#### Tier 1: The Daily Pulse (Micro-Actions)

Quick, low-friction habits based on Affinity:

**Solar - The Radiance**
- Stand in direct sun for 5 minutes
- Identify one truth being hidden that needs "illumination"

**Lunar - The Tidework**
- Spend 10 minutes in total darkness before sleep
- Record one "irrational" or "dream-logic" thought without judgment

**Stellar - The Alignment**
- Locate a single star or distant light
- Map three most logical priorities for next day with cold objectivity

**Volcanic - The Burn**
- Engage in high-intensity burst of movement (sprint, lift, shout)
- Use energy to release one specific frustration

#### Tier 2: The Threshold Rites (Deep Integration)

"Level Up" challenges triggered when app detects strong Archetype alignment:

**For The Alchemist - The Transmutation**
- Find physical object representing past trauma/failure
- Physically alter it (paint, break and fix Kintsugi-style, repurpose)
- Symbolize transformation into wisdom

**For The Sovereign - The Border Decree**
- Identify area of life where boundaries are being "colonized"
- Write clear "No" to deliver this week to reclaim territory

**For The Iconoclast - The Holy Cow**
- Identify "sacred" habit/belief held purely from social pressure
- Spend 24 hours intentionally doing opposite
- Observe if world actually ends (it won't)

**For The Sentinel - The Vigil**
- Identify what/who you're protecting that doesn't need protection
- Practice standing down for one day
- Notice what happens when you're not guarding

**For The Wayfarer - The Root**
- Spend entire day in single location without leaving
- Journal on discomfort of stillness
- Find one thing worth staying for

**For The Weaver - The Severance**
- Identify one relationship maintained purely from obligation
- Practice boundary-setting or graceful distance
- Notice relief vs guilt ratio

#### Tier 3: The Shadow Dialogue (The "Difficult" Work)

Triggered when Shadow Score is high. Uses **"Mirror UI"** where user types responses to repressed traits.

**The Tyrant's Mirror**
- *"Who are you trying to protect by being so controlling?"*
- *"Is your 'safety' worth their 'suffering'?"*
- *"What would you lose if you let go?"*

**The Abyss's Mirror**
- *"If nothing truly matters, why did you bother taking this test?"*
- *"Find the one thing you would still do even if the world ended tomorrow."*
- *"Your emptiness is protecting you from what?"*

**The Beast's Mirror**
- *"Your anger is a map to your boundaries."*
- *"What was stolen from you that makes you want to bite?"*
- *"If you could destroy one thing without consequences, what would it be? Now ask why."*

**The Parasite's Mirror**
- *"What would happen if no one needed you for a week?"*
- *"List three things you can give yourself that you usually demand from others."*
- *"Your hunger is real, but are you asking the right people to feed you?"*

**The Specter's Mirror**
- *"What is so terrible about being seen?"*
- *"Name one person who would genuinely celebrate your success."*
- *"Your invisibility is a superpower—but what is it costing you?"*

### The Apotheosis Path (Long-Term Arc)

App generates **Mythic Calendar** based on Teleos - 12-week journey:

**Phase 1: Excavation (Weeks 1-4)**
- Focus: Origin
- Prompts around family history, childhood patterns, philosophical bedrock
- Example: "Write about the first time you questioned authority"

**Phase 2: Embodiment (Weeks 5-8)**
- Focus: Archetype
- Challenges to act out functional role in community
- Example (Sovereign): "Organize something—an event, a cleanup, a dinner party"

**Phase 3: Transcendence (Weeks 9-12)**
- Focus: Teleos
- "Cap-Stone Project" aligned with ultimate aim:
  - **Legacy:** Create something tangible that outlasts you
  - **Communion:** Organize communal experience
  - **Apotheosis:** Complete solo mastery challenge
  - **Equilibrium:** Design personal meditation practice

### Visual Evolution: The Living Tapestry

As rituals complete, user's dashboard evolves:

**Incomplete State:**
- Tapestry appears frayed, faded in corners
- Monochromatic, lacks vibrancy

**Shadow Work Progress:**
- Deep rich "negative space" colors appear (purples, blacks)
- Other colors gain vibrance through contrast

**Teleos Progress:**
- Central "golden thread" weaves disparate Origin and Archetype together
- Constellation pattern emerges
- Full color saturation achieved

---

## 7. Technical Implementation

### Data Schema

#### Question Object

```json
{
  "question_id": "G_01_DAWN",
  "arc": "Genesis",
  "arc_index": 1,
  "text": "Before the first heartbeat of time, what was the nature of the universe?",
  "responses": [
    {
      "id": "A",
      "text": "A perfect, silent blueprint waiting to be enacted.",
      "weights": {
        "origin_order": 10,
        "affinity_stellar": 2,
        "axis_order_chaos": 5,
        "axis_internal_external": 0,
        "axis_material_mystical": 3
      }
    },
    {
      "id": "B",
      "text": "A screaming, fertile chaos of pure potential.",
      "weights": {
        "origin_wild": 10,
        "affinity_volcanic": 3,
        "axis_order_chaos": -5,
        "axis_internal_external": 0,
        "axis_material_mystical": -2
      }
    },
    {
      "id": "C",
      "text": "A single, conscious thought in the mind of the Divine.",
      "weights": {
        "origin_spark": 10,
        "affinity_stellar": 2,
        "axis_order_chaos": 0,
        "axis_internal_external": 3,
        "axis_material_mystical": 5
      }
    },
    {
      "id": "D",
      "text": "An echoing, hollow silence that owed nothing to no one.",
      "weights": {
        "origin_void": 10,
        "affinity_lunar": 3,
        "axis_order_chaos": 0,
        "axis_internal_external": -5,
        "axis_material_mystical": 2
      }
    }
  ],
  "metadata": {
    "shadow_indicators": [],
    "teleos_hints": [],
    "archetype_signals": []
  }
}
```

#### User Mythos Vector

```json
{
  "user_id": "uuid_789",
  "session_id": "session_abc123",
  "started_at": "2026-01-30T08:00:00Z",
  "completed_at": "2026-01-30T08:15:32Z",
  
  "scores": {
    "origins": {
      "order": 25,
      "void": 45,
      "wild": 10,
      "spark": 15,
      "ancestry": 5
    },
    "archetypes": {
      "sovereign": 15,
      "iconoclast": 35,
      "alchemist": 50,
      "sentinel": 10,
      "wayfarer": 20,
      "weaver": 15
    },
    "affinities": {
      "solar": 10,
      "lunar": 55,
      "stellar": 25,
      "volcanic": 10
    },
    "shadows": {
      "tyrant": 12,
      "parasite": 8,
      "abyss": 35,
      "beast": 5,
      "specter": 15
    },
    "teleos": {
      "apotheosis": 40,
      "communion": 10,
      "legacy": 15,
      "equilibrium": 25,
      "transcendence": 10
    }
  },
  
  "axes": {
    "individualism_collectivism": -15,
    "chaos_order": 8,
    "material_mystical": 12
  },
  
  "calculated_results": {
    "primary_origin": "void",
    "primary_archetype": "alchemist",
    "primary_affinity": "lunar",
    "primary_shadow": "abyss",
    "primary_teleos": "apotheosis",
    
    "shadow_trigger": "abyss",
    "tension_score": 22,
    "is_turning_point": true,
    
    "mythos_title": "The Lunar Alchemist of the Primordial Void",
    "mythos_subtitle": "Seeking the Apotheosis",
    "sigil_seed": "2-3-2-3"
  },
  
  "response_metadata": {
    "total_time_seconds": 932,
    "average_response_time": 46.6,
    "questions_with_changes": [7, 9, 14, 17],
    "longest_hesitations": [
      { "question": 7, "time": 124 },
      { "question": 9, "time": 89 }
    ]
  },
  
  "integration_progress": {
    "rituals_completed": 0,
    "last_ritual_date": null,
    "tapestry_state": 0.0,
    "shadow_dialogues_completed": 0,
    "apotheosis_week": 0
  }
}
```

#### Narrative Template System

```json
{
  "mythos_id": "VOID_ALCHEMIST_LUNAR_APOTHEOSIS",
  
  "narrative_components": {
    "proclamation": "The {{affinity}} {{archetype}} of the {{origin}}",
    
    "nature": {
      "template": "You {{archetype_verb}} where the {{affinity_metaphor}} meet the {{origin_metaphor}}. {{archetype_description}}",
      "variables": {
        "archetype_verb": "transform",
        "affinity_metaphor": "silver shadows",
        "origin_metaphor": "silence of the void",
        "archetype_description": "Your gift is the ability to turn absence into presence, to find meaning in the meaningless."
      }
    },
    
    "challenge": {
      "template": "{{shadow_warning}} Your {{archetype}} nature {{shadow_mechanism}}, creating {{shadow_consequence}}.",
      "variables": {
        "shadow_warning": "Beware the Abyss within.",
        "shadow_mechanism": "can collapse into nihilistic paralysis",
        "shadow_consequence": "a void where transformation once lived"
      }
    },
    
    "directive": {
      "template": "Your path to {{teleos}} requires you to {{action_directive}}. {{integration_hint}}",
      "variables": {
        "teleos": "Apotheosis",
        "action_directive": "recognize that the void is not emptiness, but potential",
        "integration_hint": "You must transmute your own darkness before you can guide others."
      }
    }
  },
  
  "full_narrative": "The Lunar Alchemist of the Primordial Void\n\nYou transform where the silver shadows meet the silence of the void. Your gift is the ability to turn absence into presence, to find meaning in the meaningless.\n\nBeware the Abyss within. Your alchemist nature can collapse into nihilistic paralysis, creating a void where transformation once lived.\n\nYour path to Apotheosis requires you to recognize that the void is not emptiness, but potential. You must transmute your own darkness before you can guide others."
}
```

### Technical Stack Recommendations

#### Frontend
- **Framework:** React Native or Flutter
  - High-quality haptics support
  - Cross-platform consistency (iOS/Android/Web)
  - Native performance for animations

#### Graphics & Animation
- **Sigil Generation:** 
  - Skia (React Native Skia) for vector graphics
  - Three.js for WebGL 3D constellation effects
  - Lottie for transition animations

#### Audio
- **Generative Soundscapes:**
  - Tone.js for score-based composition
  - Web Audio API for real-time synthesis
  - Different "sonic signatures" per affinity

#### Data & Backend
- **Database:** 
  - MongoDB (flexible schema for nested mythos data)
  - Redis for session caching
- **API:** 
  - GraphQL for complex nested queries
  - REST for simple endpoints

#### State Management
- **Client:** 
  - Redux Toolkit for complex state
  - React Context for theming
- **Persistence:**
  - AsyncStorage (React Native)
  - IndexedDB (Web)

### Algorithm Implementation

#### Vector Scoring Engine

```python
class MythosCalculator:
    def __init__(self):
        self.user_vector = {
            'origins': {},
            'archetypes': {},
            'affinities': {},
            'shadows': {},
            'teleos': {},
            'axes': {'x': 0, 'y': 0, 'z': 0}
        }
    
    def process_answer(self, question_id, answer_id, response_time):
        """Process single answer and update vector"""
        weights = self.get_weights(question_id, answer_id)
        
        for category, value in weights.items():
            if 'axis_' in category:
                axis = category.split('_')[1]
                self.user_vector['axes'][axis] += value
            else:
                category_type, trait = category.split('_', 1)
                if trait not in self.user_vector[category_type + 's']:
                    self.user_vector[category_type + 's'][trait] = 0
                self.user_vector[category_type + 's'][trait] += value
        
        # Factor in hesitation
        if response_time > 10:
            self.user_vector['metadata']['internal_conflict'] += 3
    
    def calculate_shadow(self):
        """Determine shadow based on polarities"""
        scores = self.user_vector
        
        # Tyrant: High control + Low empathy
        if (scores['archetypes'].get('sovereign', 0) > 15 and 
            scores['archetypes'].get('weaver', 0) < 5):
            return 'tyrant'
        
        # Abyss: High void + Low action
        if (scores['origins'].get('void', 0) > 15 and 
            scores['teleos'].get('apotheosis', 0) < 5):
            return 'abyss'
        
        # Parasite: High communion + Low self-sufficiency
        if (scores['teleos'].get('communion', 0) > 15 and 
            scores['archetypes'].get('sovereign', 0) < 5):
            return 'parasite'
        
        # Beast: High volcanic + Low restraint
        if (scores['affinities'].get('volcanic', 0) > 15 and 
            scores['origins'].get('order', 0) < 5):
            return 'beast'
        
        # Specter: High lunar + Extreme introversion
        if (scores['affinities'].get('lunar', 0) > 15 and 
            scores['axes']['x'] < -10):
            return 'specter'
        
        # Default to highest shadow score
        return max(scores['shadows'], key=scores['shadows'].get)
    
    def calculate_tension(self):
        """Measure Ego vs Shadow distance"""
        primary_archetype_score = max(self.user_vector['archetypes'].values())
        shadow_score = self.user_vector['shadows'][self.calculate_shadow()]
        
        tension = abs(primary_archetype_score - shadow_score)
        
        return {
            'tension_score': tension,
            'is_turning_point': tension > 20,
            'balance_state': 'critical' if tension > 25 else 'moderate' if tension > 15 else 'stable'
        }
    
    def generate_mythos(self):
        """Generate final mythos profile"""
        origins = self.user_vector['origins']
        archetypes = self.user_vector['archetypes']
        affinities = self.user_vector['affinities']
        teleos = self.user_vector['teleos']
        
        return {
            'primary_origin': max(origins, key=origins.get),
            'primary_archetype': max(archetypes, key=archetypes.get),
            'primary_affinity': max(affinities, key=affinities.get),
            'primary_shadow': self.calculate_shadow(),
            'primary_teleos': max(teleos, key=teleos.get),
            'tension': self.calculate_tension(),
            'sigil_seed': self.generate_sigil_seed()
        }
    
    def generate_sigil_seed(self):
        """Create unique sigil identifier"""
        origin_map = {'order': 1, 'void': 2, 'wild': 3, 'spark': 4, 'ancestry': 5}
        archetype_map = {'sovereign': 1, 'iconoclast': 2, 'alchemist': 3, 
                        'sentinel': 4, 'wayfarer': 5, 'weaver': 6}
        affinity_map = {'solar': 1, 'lunar': 2, 'stellar': 3, 'volcanic': 4}
        shadow_map = {'tyrant': 1, 'parasite': 2, 'abyss': 3, 'beast': 4, 'specter': 5}
        
        mythos = self.generate_mythos()
        
        return f"{origin_map[mythos['primary_origin']]}-{archetype_map[mythos['primary_archetype']]}-{affinity_map[mythos['primary_affinity']]}-{shadow_map[mythos['primary_shadow']]}"
```

---

## 8. UI/UX Narrative Design

### Voice & Tone

**The Neutral Witness** - blend of Jungian analyst and Greek oracle:

- **Persona:** Numinous, direct, weighty
- **Grammar:** Present imperative ("Observe the silence" not "Please wait")
- **Vocabulary:** Archetypal weight (Threshold, Crucible, Resonance, Echo, Weaver, Sentinel)
- **No:** Cheerleading, clinical language, hand-holding

### The Lexicon of Interaction

Replace standard UI terms with mythic equivalents:

| Standard | Mythic Replacement |
|----------|-------------------|
| Settings | The Forge |
| Profile/Progress | The Ledger |
| Notifications | Echoes |
| Loading | Sifting |
| Save | Inscribe |
| Back | Return |
| Next | Descend / Ascend |
| Menu | The Compass Rose |

### The Anti-Menu Navigation

Instead of hamburger menu, use **Compass Rose**:

```
         North
     (The Path - Current Rituals)
            |
West -------|------- East
(Teleos)    |      (Origin)
            |
         South
  (The Shadow - Unresolved)
```

### Color Palettes by Affinity

**Solar Theme**
- Primary: Deep Gold (#D4AF37)
- Secondary: Warm Terracotta (#E07A5F)
- Background: Cream Parchment (#F4E8D8)
- Text: Burnt Sienna (#8B4513)

**Lunar Theme**
- Primary: Silver (#C0C0C0)
- Secondary: Deep Indigo (#4B0082)
- Background: Midnight Blue (#191970)
- Text: Pale Moonlight (#E8E8E8)

**Stellar Theme**
- Primary: Ice Blue (#B0E0E6)
- Secondary: Platinum (#E5E4E2)
- Background: Deep Space Black (#0A0A0A)
- Text: Crystal White (#F0F8FF)

**Volcanic Theme**
- Primary: Crimson (#DC143C)
- Secondary: Obsidian (#3D3D3D)
- Background: Ash Gray (#5A5A5A)
- Text: Ember Orange (#FF4500)

### Typography Hierarchy

**Primary Font:** Cinzel (serif, classical proportions)
- Proclamations, Titles
- Weight: Regular (400), Bold (700)

**Secondary Font:** Raleway (sans-serif, geometric)
- Questions, Body Text
- Weight: Light (300), Regular (400)

**Accent Font:** Cormorant Garamond (high-contrast serif)
- Shadow dialogues, Important callouts
- Weight: Medium Italic (500)

### Interaction Patterns

**Minimalist Friction:**
- No "Next" buttons
- Swipe gestures for progression
- Long-press for "commitment" to answer
- Trace gestures for sigil generation

**Haptic Feedback:**
- Heartbeat pulse on answer selection
- Deeper pulse for shadow questions
- Gentle vibration on page transitions
- Sustained vibration during "glitch" moment

### Animation Principles

**Breathing UI:**
- Subtle scaling (98%-102%) on active elements
- Slow, organic easing functions
- Nothing static—everything "alive"

**Constellation Formation:**
- Stars appear one at a time
- Connect with golden threads
- Pulsing glow on formation
- Rotation on three axes (very slow)

**The Glitch:**
- Quick color inversion (100ms)
- CRT scanline effect
- Brief static noise
- Screen shake (subtle, 2px)

---

## 9. Development Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Core Architecture**
- Set up project structure (React Native)
- Implement data schemas
- Build scoring engine
- Create question bank JSON

**Week 2: Basic UI Flow**
- Onboarding screens
- Question presentation component
- Answer selection logic
- Progress tracking

**Week 3: Atmospheric Calibration**
- Sensory question system
- Theme switching logic
- Audio engine setup
- Haptic integration

**Week 4: Scoring & Testing**
- Complete vector calculation
- Shadow trigger logic
- Test all 3,000 combinations
- Refine weighting

### Phase 2: Mythos Generation (Weeks 5-8)

**Week 5: Narrative Engine**
- Template system
- String injection logic
- All 3,000 narrative variations
- Quality assurance on prose

**Week 6: Sigil Generator**
- SVG component library
- Layer composition logic
- Seed-to-visual algorithm
- Animation sequences

**Week 7: Results Reveal**
- Unveiling animation
- Proclamation typography
- Sigil generation ritual
- Export functionality

**Week 8: Polish & Testing**
- A/B testing reveal sequences
- Narrative refinement
- Performance optimization
- Bug fixes

### Phase 3: Integration System (Weeks 9-12)

**Week 9: Daily Rituals**
- Ritual tracking system
- Push notification scheduling
- Completion logging
- Streak mechanics

**Week 10: Shadow Dialogue**
- Mirror UI component
- Journaling interface
- Trigger logic refinement
- Privacy/encryption

**Week 11: Living Tapestry**
- Visual dashboard
- Progress visualization
- Constellation evolution
- Achievement system

**Week 12: Apotheosis Path**
- 12-week calendar generation
- Weekly prompt delivery
- Cap-stone project tracking
- Community features (optional)

### Phase 4: Polish & Launch (Weeks 13-16)

**Week 13: Audio & Atmosphere**
- Generative soundscapes
- Affinity-based compositions
- Sound mixing
- Performance optimization

**Week 14: User Testing**
- Beta testing with 50-100 users
- Collect feedback
- Iterate on UX friction points
- Refine narratives based on responses

**Week 15: Marketing Assets**
- Promo video
- Screenshot suite
- App Store copy
- Press kit

**Week 16: Launch**
- Final QA
- App Store submission
- Soft launch
- Monitor analytics

### Post-Launch Roadmap

**Month 2-3: Community Features**
- Optional profile sharing
- "Mythos Companions" (find similar users)
- Public tapestry gallery
- Shadow work circles (moderated groups)

**Month 4-6: Expansion Content**
- Additional question arcs (20 → 30 questions)
- New archetype: The Mystic, The Healer
- Expanded ritual library
- Guided meditation audio

**Month 7-12: Advanced Features**
- AI-powered journal analysis
- Personalized ritual generation
- Progress tracking over time
- "Mythos Evolution" (retake annually)

---

## Success Metrics

### Engagement Metrics
- **Completion Rate:** Target 70%+ (users who start finish all 20 questions)
- **Daily Active Users:** Target 40%+ (of total users engage with rituals daily)
- **Retention:** Target 60%+ at 30 days

### Quality Metrics
- **Shadow Work Completion:** Target 30%+ engage with shadow dialogues
- **Ritual Streak:** Target 20%+ maintain 7-day streak
- **Apotheosis Path:** Target 15%+ complete 12-week journey

### Revenue Metrics (If Monetized)
- **Free:** Core 20-question experience + basic rituals
- **Premium ($9.99/month):**
  - Extended question sets
  - Advanced ritual library
  - Personalized audio meditations
  - Private journal with AI analysis
  - Unlimited sigil exports

---

## Conclusion

**Axiom: The Weaver's Ledger** transforms personality testing from reductive data collection into mythological self-discovery. By combining Jungian depth psychology, narrative identity theory, and ritual integration, it offers users not just insight, but a framework for lifelong individuation.

The app succeeds by:
1. **Respecting complexity** - 3,000 narrative variations vs. 16 personality types
2. **Bridging digital and physical** - Integration rituals ground insights in reality
3. **Aesthetic immersion** - Every interaction feels sacred, not transactional
4. **Shadow integration** - Honest confrontation with repressed self
5. **Long-term engagement** - 12-week path vs. one-time test

This is a tool for those who want to understand themselves as characters in their own epic, complete with origin stories, trials, and apotheosis.

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Status:** Ready for Technical Implementation Phase
