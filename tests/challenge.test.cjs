const test = require('node:test');
const assert = require('node:assert/strict');
const quiz = require('../quiz-engine.js');

function randomWithSeed(seed) {
  let n = seed >>> 0;
  return () => {
    n = (Math.imul(1664525, n) + 1013904223) >>> 0;
    return n / 4294967296;
  };
}

test('question bank contains 30 valid unique engineering scenarios', () => {
  assert.equal(quiz.QUESTIONS.length, 30);
  assert.equal(new Set(quiz.QUESTIONS.map(q => q.id)).size, 30);
  for (const q of quiz.QUESTIONS) {
    assert.ok(quiz.CATEGORIES.includes(q.category));
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4);
    assert.ok(q.q.length > 30 && q.why.length > 25);
  }
});

test('mixed rounds have five different subjects', () => {
  for (let seed = 1; seed <= 50; seed++) {
    const deck = quiz.makeRound('mixed', 5, randomWithSeed(seed));
    assert.equal(deck.length, 5);
    assert.equal(new Set(deck.map(q => q.id)).size, 5);
    assert.equal(new Set(deck.map(q => q.category)).size, 5);
  }
});

test('filtered rounds only contain the selected category', () => {
  for (const category of quiz.CATEGORIES) {
    for (let seed = 1; seed < 20; seed++) {
      const deck = quiz.makeRound(category, 5, randomWithSeed(seed));
      assert.equal(new Set(deck.map(q => q.id)).size, 5);
      assert.ok(deck.every(q => q.category === category));
    }
  }
});

test('answer shuffling keeps the correct explanation and option', () => {
  for (let seed = 1; seed <= 60; seed++) {
    for (const q of quiz.makeRound('mixed', 5, randomWithSeed(seed))) {
      const source = quiz.QUESTIONS.find(x => x.id === q.id);
      assert.equal(q.options[q.correct], source.options[source.correct]);
      assert.equal(q.why, source.why);
    }
  }
});

test('rounds vary by seed', () => {
  const first = quiz.makeRound('mixed', 5, randomWithSeed(11));
  const second = quiz.makeRound('mixed', 5, randomWithSeed(12));
  assert.notDeepEqual(first.map(q => q.id), second.map(q => q.id));
});

test('streak scores and resets', () => {
  assert.deepEqual(quiz.scoreAnswer(0, true), { points: 100, nextStreak: 1 });
  assert.deepEqual(quiz.scoreAnswer(1, true), { points: 125, nextStreak: 2 });
  assert.deepEqual(quiz.scoreAnswer(2, true), { points: 150, nextStreak: 3 });
  assert.deepEqual(quiz.scoreAnswer(4, true), { points: 200, nextStreak: 5 });
  assert.deepEqual(quiz.scoreAnswer(5, true), { points: 200, nextStreak: 6 });
  assert.deepEqual(quiz.scoreAnswer(3, false), { points: 0, nextStreak: 0 });
});

test('results are encouraging and do not claim certification', () => {
  assert.equal(quiz.resultLabel(5, 5), 'INCIDENT COMMANDER');
  assert.equal(quiz.resultLabel(4, 5), 'PRODUCTION DETECTIVE');
  assert.equal(quiz.resultLabel(3, 5), 'SYSTEMS THINKER');
  assert.equal(quiz.resultLabel(0, 5), 'CURIOUS DEBUGGER');
});

test('invalid categories cannot produce a round', () => {
  assert.throws(() => quiz.makeRound('unknown'), /Unknown category/);
  assert.throws(() => quiz.makeRound('mixed', 0), /Invalid round size/);
});
