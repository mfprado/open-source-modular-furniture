import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeCoffee, coffeeRows, coffeeSteps, COFFEE_DEFAULTS } from '../src/coffee.js';

test('defaults: CPlot’s 26" table, 4 legs, 8 rails, 16 brackets, 8 pan screws', () => {
  const d = computeCoffee({});
  assert.deepEqual(d.input, COFFEE_DEFAULTS);
  const count = (role) => d.parts.cuts.filter((c) => c.role.startsWith(role)).reduce((s, c) => s + c.qty, 0);
  assert.equal(count('Leg'), 4);
  assert.equal(count('Top rail'), 4);
  assert.equal(count('Bottom rail'), 4);
  assert.equal(count('Middle rail'), 0);
  assert.equal(d.parts.brackets, 16);
  assert.equal(d.parts.panScrews, 8);
  assert.equal(d.parts.feet, 4);
  assert.deepEqual(d.warnings, []);
});

test('rails and pan are the outside size less a 1" leg at each end', () => {
  const d = computeCoffee({ width: 1000, depth: 600 });
  assert.equal(d.railW, 949);
  assert.equal(d.railD, 549);
  assert.equal(d.parts.pan.width, 949);
  assert.equal(d.parts.pan.depth, 549);
  assert.equal(d.parts.cuts.find((c) => c.role === 'Leg').length, 360);
});

test('pan screws: one per 300 mm of each side, at least one', () => {
  assert.equal(computeCoffee({ width: 1220, depth: 660 }).parts.panScrews, 2 * 4 + 2 * 2);
  assert.equal(computeCoffee({ width: 160, depth: 160 }).parts.panScrews, 4);
});

test('middle rail: one more rail along the longer sides and 2 more brackets', () => {
  const d = computeCoffee({ width: 1200, depth: 700, middleRail: 'yes' });
  const mid = d.parts.cuts.find((c) => c.role.startsWith('Middle rail'));
  assert.equal(mid.length, d.railW);
  assert.equal(d.parts.brackets, 18);
  const deep = computeCoffee({ width: 700, depth: 1200, middleRail: 'yes' });
  assert.equal(deep.parts.cuts.find((c) => c.role.startsWith('Middle rail')).length, deep.railD);
});

test('warns when taller than 1.5 x the narrower side', () => {
  assert.equal(computeCoffee({ width: 600, depth: 400, height: 570 }).warnings.length, 0); // 595 mm with feet
  const tall = computeCoffee({ width: 600, depth: 400, height: 600 });
  assert.equal(tall.warnings.length, 1);
  assert.match(tall.warnings[0], /tip over/);
});

test('rows and steps follow the design', () => {
  const d = computeCoffee({ middleRail: 'yes' });
  const rows = coffeeRows(d);
  assert.equal(rows.find((r) => r[0] === 'Silver Corner Bracket')[2], 18);
  assert.equal(rows.find((r) => r[0] === 'Drop-in T-nut')[2], d.parts.panScrews);
  assert.equal(coffeeSteps(d).length, 8);
  assert.equal(coffeeSteps(computeCoffee({})).length, 7);
});
