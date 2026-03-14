# Whisk Labs Video Prompt — Full Portfolio Layout

## One Prompt (Copy & Paste This)

```
Professional portfolio scroll-background video of a person's face and upper body. The video plays behind a website as the user scrolls through Landing, About, What I Do, Career, Work, Tech Stack, and Contact sections. Start with the subject centered in frame for the hero moment, then smoothly shift them to the left third (25–30% from left edge) within the first few seconds. For the rest of the video, the subject must stay in the left 30% of the frame. The right 55% of every frame must remain completely empty—only a dark teal-to-navy gradient background (#0a0e17, #14b8a6)—because text, cards, timeline, project carousel, and contact info will overlay there. Soft professional lighting on the face, neutral or slight smile, smooth subtle motion, 16:9 aspect ratio. Modern developer portfolio aesthetic.
```

---

## How to Use in Whisk

1. **Reference photo:** Upload a clear headshot (face centered, good lighting, neutral or slight smile).
2. **Paste the full prompt** above.
3. **Whisk Animate (Veo 2):** Generate the video.
4. **Export frames:** Use ffmpeg or ezgif to split into 120 PNGs:
   ```bash
   ffmpeg -i whisk-video.mp4 -vf "fps=15" frame_%03d.png
   ```
5. **Extract frames** from your 7-second video:
   - For ~120 frames: `ffmpeg -i whisk-video.mp4 -vf "fps=17" frame_%03d.png` (≈119 frames)
   - For 105 frames (15fps): `ffmpeg -i whisk-video.mp4 -vf "fps=15" frame_%03d.png` — then set `frameCount = 105` in `ScrollSequence.tsx`

6. **Rename** to `frame_001_delay-0.066s.png`, etc. Place in `/public/ezgif-split/`.

---

## Layout Diagram (Reference)

```
┌─────────────────────────────────────────────────────────┐
│  LANDING          │  "Hello!" (left)  │  "Developer" (right) │
│  Subject: CENTER  │                   │                      │
├─────────────────────────────────────────────────────────┤
│  ABOUT            │  [YOUR FACE]     │  "About Me" + bio     │
│  Subject: LEFT 30%│                  │  (right 50%)         │
├─────────────────────────────────────────────────────────┤
│  WHAT I DO        │  [FACE]          │  Frontend/Backend     │
│                   │                  │  cards               │
├─────────────────────────────────────────────────────────┤
│  CAREER           │  [FACE]          │  Timeline + jobs      │
│                   │                  │  (center/right)       │
├─────────────────────────────────────────────────────────┤
│  WORK             │  [FACE]          │  Project info + img    │
├─────────────────────────────────────────────────────────┤
│  TECH STACK       │  [FACE]          │  3D spheres (center)  │
├─────────────────────────────────────────────────────────┤
│  CONTACT          │  [FACE]          │  Email, Social, etc.  │
└─────────────────────────────────────────────────────────┘

   ← LEFT 30% →     ← EMPTY / GRADIENT →   ← CONTENT OVERLAY →
```
