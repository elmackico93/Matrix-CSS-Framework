import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';

describe('Card Component', () => {
  test('renders card component correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('applies glow on hover effect by default', () => {
    render(<Card>Card with Glow</Card>);
    const card = screen.getByText('Card with Glow').closest('div');
    expect(card).toHaveClass('hover:translate-y-[-5px]');
    expect(card).toHaveClass('hover:shadow-[0_5px_15px_rgba(0,255,65,0.1)]');
  });

  test('can disable glow on hover effect', () => {
    render(<Card glowOnHover={false}>Card without Glow</Card>);
    const card = screen.getByText('Card without Glow').closest('div');
    expect(card).not.toHaveClass('hover:translate-y-[-5px]');
    expect(card).not.toHaveClass('hover:shadow-[0_5px_15px_rgba(0,255,65,0.1)]');
  });

  test('accepts and applies custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>);
    expect(screen.getByText('Custom Card').closest('div')).toHaveClass('custom-class');
  });

  test('forwards ref to DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('renders all card subcomponents correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  test('CardHeader applies correct classes', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveClass('border-b');
    expect(screen.getByText('Header')).toHaveClass('border-matrix-border');
  });

  test('CardTitle applies correct classes', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText('Title')).toHaveClass('text-xl');
    expect(screen.getByText('Title')).toHaveClass('text-matrix-text-bright');
  });

  test('CardDescription applies correct classes', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description')).toHaveClass('text-matrix-text-dim');
    expect(screen.getByText('Description')).toHaveClass('text-sm');
  });

  test('CardContent applies correct classes', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toHaveClass('p-6');
    expect(screen.getByText('Content')).toHaveClass('pt-0');
  });

  test('CardFooter applies correct classes', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('border-t');
    expect(screen.getByText('Footer')).toHaveClass('border-matrix-border');
  });
});