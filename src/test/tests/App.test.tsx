import { render, screen } from '@testing-library/react';
import App from '@/App';
import { describe } from 'vitest';

describe('App', () => {
  it('renders the Vite + React heading', () => {
    render(<App />);
    expect(screen.getByText(/asdfsdfsdfasdfsdfsdf/i)).toBeInTheDocument();
  });
});
