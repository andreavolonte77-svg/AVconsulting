# Genera assets/img/hero-paesaggio.svg (uso: python3 tools/hero_svg.py assets/img/hero-paesaggio.svg)
import math, sys
W, H = 480, 600
out = sys.argv[1]

def ridge(base, amp, freqs, phase, step=6):
    pts = []
    for x in range(-10, W + 11, step):
        y = base
        for i, (f, a) in enumerate(freqs):
            y -= amp * a * math.sin(x / W * math.pi * f + phase * (i + 1))
        pts.append((x, y))
    d = f'M{pts[0][0]},{H} ' + ' '.join(f'L{x},{y:.1f}' for x, y in pts) + f' L{pts[-1][0]},{H} Z'
    return d, pts

layers = [
    # (base, ampiezza, frequenze, fase, colore, opacità)
    (300, 46, [(2.2, 1), (5.1, .35), (11, .12)], 0.6, '#454541', .22),
    (330, 38, [(1.6, 1), (4.3, .4), (9, .15)], 2.1, '#6E6C65', .30),
    (352, 26, [(2.8, 1), (6.5, .3), (13, .1)], 4.0, '#AE9A73', .30),
]
lake_y = 372
front = [
    (430, 40, [(1.3, 1), (3.7, .35), (8, .1)], 1.2, '#CDCAC0', 1),
    (505, 48, [(1.1, 1), (3.1, .3), (7, .12)], 3.3, '#D4D1C9', 1),
]

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t">',
       '<title id="t">Paesaggio collinare con un lago all\'alba, attraversato da un percorso digitale che conduce a una destinazione tranquilla</title>',
       '''<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#F2F1EF"/>
    <stop offset=".62" stop-color="#ECE6DA"/>
    <stop offset="1" stop-color="#E2D7C3"/>
  </linearGradient>
  <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#E2D7C3"/>
    <stop offset="1" stop-color="#D4D1C9"/>
  </linearGradient>
  <radialGradient id="sun" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#AE9A73" stop-opacity=".55"/>
    <stop offset=".55" stop-color="#AE9A73" stop-opacity=".18"/>
    <stop offset="1" stop-color="#AE9A73" stop-opacity="0"/>
  </radialGradient>
</defs>
<style>
  .route { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: draw 4.5s cubic-bezier(.45,.05,.25,1) .4s forwards; }
  .node { opacity: 0; animation: pop .5s ease forwards; }
  .pulse { transform-origin: 300px 368px; animation: pulse 3.2s ease-out 4.6s infinite; opacity: 0; }
  .label { opacity: 0; animation: pop 1s ease 4.8s forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @keyframes pop { to { opacity: 1; } }
  @keyframes pulse { 0% { opacity: .7; transform: scale(.4); } 100% { opacity: 0; transform: scale(2.4); } }
  @media (prefers-reduced-motion: reduce) {
    .route { animation: none; stroke-dashoffset: 0; }
    .node, .label { animation: none; opacity: 1; }
    .pulse { animation: none; opacity: 0; }
  }
</style>''',
       f'<rect width="{W}" height="{H}" fill="url(#sky)"/>',
       '<circle cx="300" cy="330" r="120" fill="url(#sun)"/>',
       '<circle cx="300" cy="330" r="34" fill="#AE9A73" fill-opacity=".35"/>',
       '<g fill="none" stroke="#CDCAC0" stroke-width="1.4" stroke-linecap="round">'
       '<path d="M60,120 h110 M90,132 h70"/><path d="M300,80 h130 M330,92 h80" stroke-opacity=".8"/><path d="M190,190 h60" stroke-opacity=".6"/></g>']
for base, amp, fr, ph, col, op in layers:
    d, _ = ridge(base, amp, fr, ph)
    svg.append(f'<path d="{d}" fill="{col}" fill-opacity="{op}"/>')
# lago con riflessi
svg.append(f'<rect x="0" y="{lake_y}" width="{W}" height="{H-lake_y}" fill="url(#lake)"/>')
for i, (y, x0, x1) in enumerate([(380, 250, 350), (388, 268, 334), (396, 284, 318), (404, 294, 306)]):
    svg.append(f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="#AE9A73" stroke-opacity="{.5 - i*.1:.2f}" stroke-width="1.2" stroke-linecap="round"/>')
for y in (414, 430, 450):
    svg.append(f'<line x1="40" y1="{y}" x2="{W-40}" y2="{y}" stroke="#F2F1EF" stroke-opacity=".5" stroke-width="1"/>')
# colline in primo piano con curve di livello
for k, (base, amp, fr, ph, col, op) in enumerate(front):
    d, pts = ridge(base, amp, fr, ph)
    svg.append(f'<path d="{d}" fill="{col}"/>')
    for j in range(1, 5):
        off = j * (16 if k else 14)
        line = 'M' + ' L'.join(f'{x},{y + off:.1f}' for x, y in pts)
        svg.append(f'<path d="{line}" fill="none" stroke="#AE9A73" stroke-opacity="{.35 - j*.05:.2f}" stroke-width=".8"/>')
# percorso digitale: dal primo piano alla riva del lago
route = 'M70,600 C90,560 150,560 170,530 S150,470 210,455 S300,450 285,420 S300,385 300,368'
svg.append(f'<path class="route" d="{route}" fill="none" stroke="#710519" stroke-width="2" stroke-linecap="round" stroke-dasharray="1400" pathLength="1400"/>')
svg.append(f'<path d="{route}" fill="none" stroke="#710519" stroke-opacity=".18" stroke-width="6" stroke-linecap="round"/>')
for i, (x, y) in enumerate([(170, 530), (210, 455), (285, 420)]):
    svg.append(f'<circle class="node" style="animation-delay:{1.4 + i*1.0:.1f}s" cx="{x}" cy="{y}" r="4.5" fill="#F2F1EF" stroke="#710519" stroke-width="1.6"/>')
svg.append('<circle class="pulse" cx="300" cy="368" r="10" fill="none" stroke="#710519" stroke-width="1.2"/>')
svg.append('<circle class="node" style="animation-delay:4.4s" cx="300" cy="368" r="6" fill="#710519"/>')
svg.append('<g class="label" font-family="Inter, system-ui, sans-serif" font-size="10" letter-spacing="1.4" fill="#6E6C65">'
           '<line x1="300" y1="356" x2="300" y2="236" stroke="#6E6C65" stroke-width=".8" stroke-dasharray="2 3"/>'
           '<circle cx="300" cy="236" r="2" fill="#6E6C65"/>'
           '<text x="308" y="240">45.99° N · 9.26° E</text></g>')
svg.append('</svg>')
open(out, 'w').write('\n'.join(svg))
print('ok', len('\n'.join(svg)) // 1024, 'KB')
