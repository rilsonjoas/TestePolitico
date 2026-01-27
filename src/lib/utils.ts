import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { questions, ideologies, type Ideology } from "./data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate the score for a single axis
 * @param score - The raw score from answers
 * @param max - The maximum possible score for this axis
 * @returns Percentage score (0-100)
 */
export function calculateAxisScore(score: number, max: number): number {
  if (max === 0) return 50; // Neutral if no questions affect this axis
  return (100 * (max + score)) / (2 * max);
}

/**
 * Calculate all axis scores from quiz answers
 * @param answers - Array of answer multipliers (-1.0 to 1.0)
 * @returns Object with scores for each axis (econ, dipl, govt, scty)
 */
export function calculateScores(answers: number[]): {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
} {
  let econ = 0, dipl = 0, govt = 0, scty = 0;
  let maxEcon = 0, maxDipl = 0, maxGovt = 0, maxScty = 0;

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const answer = answers[i] || 0;

    econ += answer * question.effect.econ;
    dipl += answer * question.effect.dipl;
    govt += answer * question.effect.govt;
    scty += answer * question.effect.scty;

    maxEcon += Math.abs(question.effect.econ);
    maxDipl += Math.abs(question.effect.dipl);
    maxGovt += Math.abs(question.effect.govt);
    maxScty += Math.abs(question.effect.scty);
  }

  return {
    econ: calculateAxisScore(econ, maxEcon),
    dipl: calculateAxisScore(dipl, maxDipl),
    govt: calculateAxisScore(govt, maxGovt),
    scty: calculateAxisScore(scty, maxScty),
  };
}

/**
 * Calculate the distance between user scores and an ideology
 * @param userScores - User's scores for each axis
 * @param ideology - Ideology to compare against
 * @returns Distance value (lower is closer match)
 */
export function calculateIdeologyDistance(
  userScores: { econ: number; dipl: number; govt: number; scty: number },
  ideology: Ideology
): number {
  const econDist = Math.abs(userScores.econ - ideology.stats.econ);
  const diplDist = Math.abs(userScores.dipl - ideology.stats.dipl);
  const govtDist = Math.abs(userScores.govt - ideology.stats.govt);
  const sctyDist = Math.abs(userScores.scty - ideology.stats.scty);

  return econDist + diplDist + govtDist + sctyDist;
}

/**
 * Find the closest matching ideology for given scores
 * @param scores - User's scores for each axis
 * @returns The closest matching ideology
 */
export function findClosestIdeology(scores: {
  econ: number;
  dipl: number;
  govt: number;
  scty: number;
}): Ideology {
  let closestIdeology = ideologies[0];
  let minDistance = calculateIdeologyDistance(scores, closestIdeology);

  for (const ideology of ideologies) {
    const distance = calculateIdeologyDistance(scores, ideology);
    if (distance < minDistance) {
      minDistance = distance;
      closestIdeology = ideology;
    }
  }

  return closestIdeology;
}

/**
 * Validate if an answer is within valid range
 * @param answer - Answer multiplier
 * @returns True if valid, false otherwise
 */
export function isValidAnswer(answer: number): boolean {
  return answer >= -1.0 && answer <= 1.0;
}

/**
 * Check if quiz is complete
 * @param answers - Array of answers
 * @returns True if all questions are answered
 */
export function isQuizComplete(answers: number[]): boolean {
  if (answers.length !== questions.length) return false;
  
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === undefined || answers[i] === null) {
      return false;
    }
  }
  
  return true;
}
