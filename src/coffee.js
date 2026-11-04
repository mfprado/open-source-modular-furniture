// Geometry and bill of materials for a T-slot aluminium coffee table with a stainless steel
// pan top, by CPlot (design brief: docs/designs/coffee-table.md). 1" 10-series extrusion:
// four legs, a ring of rails at the top holding the pan, a ring of rails flush with the
// leg ends, corner brackets at every joint and levelling mounts under the legs.
// All units mm. Layout: x along the width, y front to back, z up.

export const COFFEE_DEFAULTS = {
  width: 660, // outside of the frame (CPlot's table: 26")
  depth: 660, // outside of the frame (26")
  height: 360, // leg length, without the feet (CPlot's table: 14" = 356 mm)
  middleRail: 'no', // a rail under the pan, halving its shorter span
};

export const P = 25.4; // 1" 10-series extrusion (CPlot)
// Levelling mount for 1" rail (McMaster 47065T341), the desk's part; like the desk, taken
// as lifting the leg about one profile until measured.
export const FOOT_HEIGHT = P;
// Pan from a sheet metal shop (CPlot, 2026-11-04): 1/16" stainless, edges folded down 0.875"
export const PAN_THICKNESS = 1.6;
export const PAN_FOLD = 22.2;
const SCREW_SPACING = 300; // pan screws: one per 300 mm of each side (CPlot)
const TIP_RATIO = 1.5; // warn when the table is taller than 1.5 x its narrower side (CPlot)

// Silver Corner Bracket, McMaster 47065T236, read 2026-11-04: 1" long, for 1" high rail,
// $7.90 each, includes 2 x 1/4"-20 x 1/2" button head screws and 2 end-feed nuts.
const BRACKET = 'McMaster 47065T236, 1" for 1" rail, includes 2 screws + 2 end-feed nuts';

const mm = (v) => Math.round(v);

export function computeCoffee(input) {
  const q = { ...COFFEE_DEFAULTS, ...input };
  const W = Number(q.width);
  const D = Number(q.depth);
  const H = Number(q.height);
  const midRail = q.middleRail === 'yes';

  // Rails fit between the legs, so they are the outside size less a leg at each end.
  const railW = mm(W - 2 * P); // runs along x (front and back)
  const railD = mm(D - 2 * P); // runs along y (ends)
  // The pan fills the opening between the top rails.
  const panW = railW;
  const panD = railD;
  // Middle rail runs parallel to the longer sides, halving the shorter span. On a square
  // table it runs side to side (along x); which way is best is still to check.
  const midAlongX = W >= D;
  const midLength = midAlongX ? railW : railD;

  const cuts = [
    { role: 'Leg', length: mm(H), qty: 4 },
    { role: 'Top rail, front and back', length: railW, qty: 2 },
    { role: 'Top rail, ends', length: railD, qty: 2 },
    { role: 'Bottom rail, front and back', length: railW, qty: 2 },
    { role: 'Bottom rail, ends', length: railD, qty: 2 },
    ...(midRail ? [{ role: 'Middle rail, under the pan', length: midLength, qty: 1 }] : []),
  ];

  // 2 brackets wherever a rail meets a leg, one each side of the rail: 8 rails x 2 ends.
  // The middle rail adds 2 at each end, where it meets the top rails.
  const brackets = 8 * 2 * 2 + (midRail ? 4 : 0);
  // Pan screws through the folded edges into the inner slot of the top rails, one per
  // 300 mm of each side (CPlot's 610 mm pan: 2 a side, 8 in all).
  const screwsW = Math.max(1, Math.round(panW / SCREW_SPACING));
  const screwsD = Math.max(1, Math.round(panD / SCREW_SPACING));
  const panScrews = 2 * screwsW + 2 * screwsD;

  const totalHeight = mm(H + FOOT_HEIGHT);
  const warnings = [];
  const narrow = Math.min(W, D);
  if (totalHeight > TIP_RATIO * narrow)
    warnings.push(`At ${totalHeight} mm tall on a ${narrow} mm side, the table is more than ${TIP_RATIO} times as tall as it is wide and could tip over. Make it lower or wider.`);

  return {
    kind: 'coffee',
    input: q,
    p: P,
    railW,
    railD,
    legLength: mm(H),
    totalHeight,
    footHeight: FOOT_HEIGHT,
    midRail,
    midAlongX,
    warnings,
    parts: {
      cuts,
      profileTotal: cuts.reduce((s, c) => s + c.length * c.qty, 0),
      brackets,
      bracketScrews: brackets * 2,
      panScrews,
      screwsW,
      screwsD,
      feet: 4,
      pan: { width: panW, depth: panD, thickness: PAN_THICKNESS, fold: PAN_FOLD },
    },
  };
}

export function coffeeRows({ parts }) {
  const name = '1" 10-series T-slot profile';
  return [
    ...parts.cuts.map((c) => [name, `${c.length} mm · ${c.role}`, c.qty]),
    ['Silver Corner Bracket', BRACKET, parts.brackets],
    ['Levelling mount', 'McMaster 47065T341, for 1" rail, into the leg end', parts.feet],
    ['Stainless steel pan', `${parts.pan.width} × ${parts.pan.depth} mm, 1/16" (${parts.pan.thickness} mm) sheet, edges folded down 0.875" (${parts.pan.fold} mm); bent to order`, 1],
    ['Button head screw', '1/4"-20 × 3/8", pan to rails', parts.panScrews],
    ['Drop-in T-nut', '1/4"-20, 10 series (McMaster 6000N501)', parts.panScrews],
  ];
}

// The build in the order of the design brief. scene.js draws each step from
// coffeeStepTags, which must stay parallel.
export function coffeeSteps(d) {
  const { railW, railD, legLength, midRail, midAlongX, parts } = d;
  const slide = 'Slide the brackets’ end-feed nuts into the slots first.';
  return [
    `Cut 4 legs (${legLength} mm), 4 front and back rails (${railW} mm) and 4 end rails (${railD} mm)${midRail ? `, plus a middle rail (${midAlongX ? railW : railD} mm)` : ''}.`,
    'Screw a levelling mount into the bottom of each leg.',
    `Join the bottom rails to the legs, undersides flush with the leg ends, with 2 corner brackets per joint, one each side of the rail. ${slide}`,
    'Join the top rails to the legs the same way, tops flush with the leg tops.',
    ...(midRail ? [`Join the middle rail between the ${midAlongX ? 'end' : 'front and back'} rails at their centre, top flush with them, with 2 corner brackets at each end.`] : []),
    `Drop ${parts.panScrews} T-nuts into the inner slot of the top rails (${parts.screwsW} along each front and back rail, ${parts.screwsD} along each end), lined up with the pan’s screw holes.`,
    `Set the pan (${parts.pan.width} × ${parts.pan.depth} mm) into the opening and screw it to the rails through its folded edges.`,
    'Stand the table up and level it with the feet.',
  ];
}

// A few numbers for the top of the Your build panel: [label, value].
export function coffeeKeys(d) {
  return [
    ['Legs', `${d.legLength} mm`],
    ['Height', `${d.totalHeight} mm`],
    ['Pan', `${d.parts.pan.width} × ${d.parts.pan.depth} mm`],
    ['Brackets', `${d.parts.brackets}`],
  ];
}
