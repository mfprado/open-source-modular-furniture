# Coffee table

A low table with a 1" 10-series T-slot aluminium frame and a stainless steel pan top, by
the designer of the Profile Desk Frame (CPlot). The default is the designer's own table:
26" × 26" outside, 14" legs, a 24" × 24" pan. No idea issue.

## Reference

- Designer's photos (shared in the session, not committed): the finished table, and the
  pan on its own showing the folded edges and the screw holes in them.
- Corner bracket: https://www.mcmaster.com/47065T236/

## Parts

| Part | Sizes available | Key dimensions | Source |
|---|---|---|---|
| T-slot extrusion, 10 series | 1" × 1", cut to length | 25.4 mm square; legs, top rails, bottom rails, middle rail | Designer (same as the Profile Desk Frame) |
| Silver Corner Bracket, McMaster 47065T236 | one size | 1" long, for 1" high rail, 90°, anodised 6063-T6 aluminium; includes 2 × 1/4"-20 × 1/2" black button head screws and 2 end-feed nuts; $7.90 each | McMaster product page, read 2026-11-04 |
| Levelling mount for 1" rail, McMaster 47065T341 | one size | screws into the end of the leg; the desk takes it as lifting the leg about 1" (25.4 mm) | Designer (same part as the desk); part number from `src/desk.js` |
| Stainless steel pan | bent to order by a sheet metal shop | 1/16" (1.6 mm) sheet; fits the opening between the top rails; edges folded down 0.875" (22.2 mm) | Designer |
| Pan screw | 1/4"-20 × 3/8" | through the pan's folded edges | Designer |
| Drop-in T-nut, 1/4"-20, 10 series, McMaster 6000N501 | one size | drops into the rail slot after the frame is built | Designer, https://www.mcmaster.com/6000N501/ (page did not load on 2026-11-04; details not read) |

## Settings on the site

All sizes in millimetres, like the rest of the site.

| Setting | Default | Min | Max | Step / choices |
|---|---|---|---|---|
| Width (outside of the frame) | 660 | 150 | 1220 | 10 |
| Depth (outside of the frame) | 660 | 150 | 1220 | 10 |
| Leg height (without the feet) | 360 | 150 | 1220 | 10 |
| Middle rail | No | | | No / Yes |

## Rules

- 4 legs, each the leg height long, standing at the corners. A levelling foot in the bottom
  of each.
- 4 top rails, fitted between the legs with their tops flush with the leg tops:
  2 width rails of width − 2 × 25.4 mm, 2 depth rails of depth − 2 × 25.4 mm.
- 4 bottom rails, the same lengths, fitted between the legs with their undersides flush
  with the leg ends.
- 2 corner brackets at every place a rail meets a leg, one each side of the rail:
  8 rails × 2 ends × 2 = 32 brackets.
- The pan fills the opening between the top rails: (width − 2 × 25.4) × (depth − 2 × 25.4),
  edges folded down 22.2 mm.
- Pan screws go through the folded edges into the inner slot of the top rails, one per
  300 mm of each side, with a drop-in T-nut each.
- Middle rail (when switched on): one rail under the pan, its top flush with the top rails,
  running parallel to the longer sides and halving the shorter span. It is joined to the
  rails at each end with 2 corner brackets, so 4 more brackets. The pan rests on it.

## Warnings

- **Tall table.** When the height is more than 1.5 × the narrower of width and depth:
  the table could tip over; make it lower or wider.

## Assembly

1. Cut 4 legs, 4 width rails and 4 depth rails (top and bottom) to length.
2. Screw a levelling foot into the bottom of each leg.
3. Join the bottom rails to the legs, flush with the leg ends, with 2 corner brackets per
   joint (slide the end-feed nuts into the slots first).
4. Join the top rails to the legs, flush with the leg tops, the same way.
5. If the middle rail is on: join it between the top rails with 2 corner brackets each end.
6. Drop the T-nuts into the inner slot of the top rails, lined up with the pan's screw holes.
7. Set the pan into the opening and screw it to the rails through its folded edges.
8. Stand the table up and level it with the feet.

## Unknown, to measure

- How much height the levelling mount really adds (the desk assumes about 1").
- The largest pan the sheet metal shop can bend.
- The drop-in T-nut listing (McMaster 6000N501): confirm it is 1/4"-20 for 10 series, and its price.
- A pan flex warning, left out of the first version. The agreed rule was: warn when 50 kg
  in the middle of the pan bends it more than span / 250. But the usual flat-plate formula
  (1.6 mm stainless held on four edges) gives about 30 mm for the default 610 mm pan, far
  more than the real pan does: it ignores the folded edges and the sheet stretching like
  a drum skin once it bends. Needs either a measurement of a real pan under a known
  weight, or a size rule for when to use the middle rail.
- Which way the middle rail should run on a square table, and whether the pan needs a screw
  into it.
