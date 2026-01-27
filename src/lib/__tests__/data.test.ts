import { describe, it, expect } from 'vitest';
import { slugify } from '../data';

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
