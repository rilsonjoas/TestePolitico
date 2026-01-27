import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('should render logo image', () => {
    render(<Logo />);
    
    const image = screen.getByAltText('Teste Político 8 Valores');
    expect(image).toBeInTheDocument();
  });

  it('should render with default size of 32', () => {
    render(<Logo />);
    
    const image = screen.getByAltText('Teste Político 8 Valores');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });

  it('should render with custom size', () => {
    render(<Logo size={64} />);
    
    const image = screen.getByAltText('Teste Político 8 Valores');
    expect(image).toHaveAttribute('width', '64');
    expect(image).toHaveAttribute('height', '64');
  });

  it('should not show text by default', () => {
    render(<Logo />);
    
    expect(screen.queryByText('Teste Político 8 Valores')).not.toBeInTheDocument();
    expect(screen.queryByText('testepolitico.com.br')).not.toBeInTheDocument();
  });

  it('should show text when showText is true', () => {
    render(<Logo showText={true} />);
    
    expect(screen.getByText('Teste Político 8 Valores')).toBeInTheDocument();
    expect(screen.getByText('testepolitico.com.br')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Logo className="custom-class" />);
    
    const logoContainer = container.querySelector('.custom-class');
    expect(logoContainer).toBeInTheDocument();
  });
});
