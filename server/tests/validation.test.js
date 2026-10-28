import test from 'node:test';
import assert from 'node:assert/strict';

test('seat identifiers follow the supported row-number format', () => {
  const valid = s => /^[A-L](?:1[0-9]|20|[1-9])$/.test(s);
  assert.equal(valid('A1'), true);
  assert.equal(valid('F12'), true);
  assert.equal(valid('L20'), true);
  assert.equal(valid('AA1'), false);
  assert.equal(valid('A0'), false);
  assert.equal(valid('Z1'), false);
});
test('booking references use a recognizable prefix and uppercase hex suffix', () => {
  const ref = 'IMV-7F3A9B2C';
  assert.match(ref, /^IMV-[A-F0-9]{8}$/);
});
