import { describe, it, expect } from 'vitest';
import { slugify, getMatchPercentage, getClosestPolitician } from '../data';

describe('slugify', () => {
  it('should convert text to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(slugify('São Paulo')).toBe('sao-paulo');
    expect(slugify('José')).toBe('jose');
    expect(slugify('Ação')).toBe('acao');
  });

  it('should remove special characters', () => {
    expect(slugify('hello@world!')).toBe('helloworld');
    expect(slugify('test#123')).toBe('test123');
  });

  it('should replace multiple spaces with single hyphen', () => {
    expect(slugify('hello    world')).toBe('hello-world');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('should handle complex Brazilian text', () => {
    expect(slugify('Social Democracia')).toBe('social-democracia');
    expect(slugify('Anarco-Comunismo')).toBe('anarco-comunismo');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('getMatchPercentage', () => {
  it('should return 100 on exact match (0 distance)', () => {
    expect(getMatchPercentage(0)).toBe(100);
  });

  it('should return 0 on maximum distance (200 distance)', () => {
    expect(getMatchPercentage(200)).toBe(0);
  });

  it('should cap negative values at 0 using Math.max', () => {
    // Caso a distância passasse do máximo teórico, o limite garante 0%
    expect(getMatchPercentage(250)).toBe(0);
  });

  it('should return correct linear percentage for middle distance', () => {
    expect(getMatchPercentage(100)).toBe(50);
    expect(getMatchPercentage(50)).toBe(75);
  });
});

describe('getClosestPolitician', () => {
  it('should return closest politician and apply affinity to object', () => {
    // Alguém que pontuou [econ: 100, dipl: 100, govt: 100, scty: 100] perfeitamente
    // Teste para Stalin (da base: econ 90, dipl 70, govt 100, scty 15)
    // Distance de [100,100,100,100] pra Stalin (90,70,100,15)-> sqrt(100+900+0+7225) = sqrt(8225) ~ 90.69
    // Math logic test: não precisa testar stalin fixado, mas saber se a estrutura retorna um shape correto com affinity.
    const result = getClosestPolitician(100, 100, 100, 100);
    expect(result).not.toBeNull();
    expect(result?.name).toBeDefined();
    expect(result?.affinity).toBeDefined();
    expect(typeof result?.affinity).toBe('number');
  });

  it('affinity should be valid between 0 and 100', () => {
    const result = getClosestPolitician(50, 50, 50, 50); // centrista puro
    expect(result?.affinity).toBeGreaterThanOrEqual(0);
    expect(result?.affinity).toBeLessThanOrEqual(100);
  });
});
