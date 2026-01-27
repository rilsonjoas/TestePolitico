import { describe, it, expect } from 'vitest';
import {
  calculateAxisScore,
  calculateScores,
  calculateIdeologyDistance,
  findClosestIdeology,
  isValidAnswer,
  isQuizComplete,
} from '../utils';
import { questions, ideologies } from '../data';

describe('calculateAxisScore', () => {
  it('should return 50 for neutral score (score = 0)', () => {
    const result = calculateAxisScore(0, 100);
    expect(result).toBe(50);
  });

  it('should return 100 for maximum positive score', () => {
    const result = calculateAxisScore(100, 100);
    expect(result).toBe(100);
  });

  it('should return 0 for maximum negative score', () => {
    const result = calculateAxisScore(-100, 100);
    expect(result).toBe(0);
  });

  it('should return 75 for half positive score', () => {
    const result = calculateAxisScore(50, 100);
    expect(result).toBe(75);
  });

  it('should return 25 for half negative score', () => {
    const result = calculateAxisScore(-50, 100);
    expect(result).toBe(25);
  });

  it('should return 50 when max is 0 (no questions for this axis)', () => {
    const result = calculateAxisScore(0, 0);
    expect(result).toBe(50);
  });
});

describe('calculateScores', () => {
  it('should return neutral scores (50) for all neutral answers', () => {
    const answers = new Array(questions.length).fill(0);
    const scores = calculateScores(answers);

    expect(scores.econ).toBeCloseTo(50, 1);
    expect(scores.dipl).toBeCloseTo(50, 1);
    expect(scores.govt).toBeCloseTo(50, 1);
    expect(scores.scty).toBeCloseTo(50, 1);
  });

  it('should return scores within valid range for all strongly agree answers', () => {
    const answers = new Array(questions.length).fill(1.0);
    const scores = calculateScores(answers);

    // Scores should be valid percentages (questions have mixed effects)
    expect(scores.econ).toBeGreaterThanOrEqual(0);
    expect(scores.econ).toBeLessThanOrEqual(100);
    expect(scores.dipl).toBeGreaterThanOrEqual(0);
    expect(scores.dipl).toBeLessThanOrEqual(100);
    expect(scores.govt).toBeGreaterThanOrEqual(0);
    expect(scores.govt).toBeLessThanOrEqual(100);
    expect(scores.scty).toBeGreaterThanOrEqual(0);
    expect(scores.scty).toBeLessThanOrEqual(100);
  });

  it('should return scores within valid range for all strongly disagree answers', () => {
    const answers = new Array(questions.length).fill(-1.0);
    const scores = calculateScores(answers);

    // Scores should be valid percentages (questions have mixed effects)
    expect(scores.econ).toBeGreaterThanOrEqual(0);
    expect(scores.econ).toBeLessThanOrEqual(100);
    expect(scores.dipl).toBeGreaterThanOrEqual(0);
    expect(scores.dipl).toBeLessThanOrEqual(100);
    expect(scores.govt).toBeGreaterThanOrEqual(0);
    expect(scores.govt).toBeLessThanOrEqual(100);
    expect(scores.scty).toBeGreaterThanOrEqual(0);
    expect(scores.scty).toBeLessThanOrEqual(100);
  });

  it('should handle partial answers (some undefined)', () => {
    const answers = new Array(questions.length);
    answers[0] = 1.0;
    answers[1] = -1.0;
    // Rest are undefined

    const scores = calculateScores(answers);

    // Should not throw and should return valid scores
    expect(scores.econ).toBeGreaterThanOrEqual(0);
    expect(scores.econ).toBeLessThanOrEqual(100);
    expect(scores.dipl).toBeGreaterThanOrEqual(0);
    expect(scores.dipl).toBeLessThanOrEqual(100);
    expect(scores.govt).toBeGreaterThanOrEqual(0);
    expect(scores.govt).toBeLessThanOrEqual(100);
    expect(scores.scty).toBeGreaterThanOrEqual(0);
    expect(scores.scty).toBeLessThanOrEqual(100);
  });

  it('should handle mixed answers correctly', () => {
    const answers = new Array(questions.length);
    // Fill with alternating pattern
    for (let i = 0; i < questions.length; i++) {
      answers[i] = i % 2 === 0 ? 1.0 : -1.0;
    }

    const scores = calculateScores(answers);

    // Scores should be valid percentages
    expect(scores.econ).toBeGreaterThanOrEqual(0);
    expect(scores.econ).toBeLessThanOrEqual(100);
    expect(scores.dipl).toBeGreaterThanOrEqual(0);
    expect(scores.dipl).toBeLessThanOrEqual(100);
    expect(scores.govt).toBeGreaterThanOrEqual(0);
    expect(scores.govt).toBeLessThanOrEqual(100);
    expect(scores.scty).toBeGreaterThanOrEqual(0);
    expect(scores.scty).toBeLessThanOrEqual(100);
  });
});

describe('calculateIdeologyDistance', () => {
  it('should return 0 for identical scores', () => {
    const userScores = { econ: 100, dipl: 50, govt: 100, scty: 90 };
    const ideology = ideologies.find(i => i.name === 'Anarco-Comunismo')!;

    const distance = calculateIdeologyDistance(userScores, ideology);
    expect(distance).toBe(0);
  });

  it('should return positive distance for different scores', () => {
    const userScores = { econ: 0, dipl: 0, govt: 0, scty: 0 };
    const ideology = ideologies.find(i => i.name === 'Anarco-Comunismo')!;

    const distance = calculateIdeologyDistance(userScores, ideology);
    expect(distance).toBeGreaterThan(0);
  });

  it('should calculate Manhattan distance correctly', () => {
    const userScores = { econ: 60, dipl: 40, govt: 70, scty: 50 };
    const ideology = { 
      name: 'Test',
      stats: { econ: 50, dipl: 50, govt: 50, scty: 50 },
      desc: '',
      politicians: [],
      books: []
    };

    const distance = calculateIdeologyDistance(userScores, ideology);
    // |60-50| + |40-50| + |70-50| + |50-50| = 10 + 10 + 20 + 0 = 40
    expect(distance).toBe(40);
  });
});

describe('findClosestIdeology', () => {
  it('should find exact match for Anarco-Comunismo scores', () => {
    const scores = { econ: 100, dipl: 50, govt: 100, scty: 90 };
    const ideology = findClosestIdeology(scores);

    expect(ideology.name).toBe('Anarco-Comunismo');
  });

  it('should find a valid ideology for neutral scores', () => {
    const scores = { econ: 50, dipl: 50, govt: 50, scty: 50 };
    const ideology = findClosestIdeology(scores);

    expect(ideology).toBeDefined();
    expect(ideology.name).toBeTruthy();
    expect(ideologies).toContain(ideology);
  });

  it('should find a valid ideology for extreme left scores', () => {
    const scores = { econ: 100, dipl: 100, govt: 100, scty: 100 };
    const ideology = findClosestIdeology(scores);

    expect(ideology).toBeDefined();
    expect(ideologies).toContain(ideology);
  });

  it('should find a valid ideology for extreme right scores', () => {
    const scores = { econ: 0, dipl: 0, govt: 0, scty: 0 };
    const ideology = findClosestIdeology(scores);

    expect(ideology).toBeDefined();
    expect(ideologies).toContain(ideology);
  });

  it('should always return an ideology from the list', () => {
    const scores = { econ: 75, dipl: 25, govt: 60, scty: 40 };
    const ideology = findClosestIdeology(scores);

    expect(ideologies).toContain(ideology);
  });
});

describe('isValidAnswer', () => {
  it('should return true for valid answers', () => {
    expect(isValidAnswer(1.0)).toBe(true);
    expect(isValidAnswer(0.5)).toBe(true);
    expect(isValidAnswer(0.0)).toBe(true);
    expect(isValidAnswer(-0.5)).toBe(true);
    expect(isValidAnswer(-1.0)).toBe(true);
  });

  it('should return false for invalid answers', () => {
    expect(isValidAnswer(1.5)).toBe(false);
    expect(isValidAnswer(-1.5)).toBe(false);
    expect(isValidAnswer(2.0)).toBe(false);
    expect(isValidAnswer(-2.0)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidAnswer(1.0)).toBe(true);
    expect(isValidAnswer(-1.0)).toBe(true);
    expect(isValidAnswer(1.0001)).toBe(false);
    expect(isValidAnswer(-1.0001)).toBe(false);
  });
});

describe('isQuizComplete', () => {
  it('should return true for complete quiz', () => {
    const answers = new Array(questions.length).fill(0);
    expect(isQuizComplete(answers)).toBe(true);
  });

  it('should return false for incomplete quiz (not enough answers)', () => {
    const answers = new Array(questions.length - 1).fill(0);
    expect(isQuizComplete(answers)).toBe(false);
  });

  it('should return false for quiz with undefined answers', () => {
    const answers = new Array(questions.length);
    answers[0] = 1.0;
    // Rest are undefined
    expect(isQuizComplete(answers)).toBe(false);
  });

  it('should return false for empty array', () => {
    expect(isQuizComplete([])).toBe(false);
  });

  it('should return true for all valid answers', () => {
    const answers = new Array(questions.length);
    for (let i = 0; i < questions.length; i++) {
      answers[i] = i % 2 === 0 ? 1.0 : -1.0;
    }
    expect(isQuizComplete(answers)).toBe(true);
  });
});
