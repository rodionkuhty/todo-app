import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ModeToggle } from '@/components/mode-toggle.tsx';

// Mock the theme provider hook
const setTheme = vi.fn();
vi.mock('@/components/theme-provider', () => ({
  useTheme: () => ({ setTheme }),
}));

describe('ModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button with accessible name', () => {
    render(<ModeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme with correct theme when menu items are clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);

    const toggleThemeButton = screen.getByRole('button', {
      name: /toggle theme/i,
    });

    const cases = [
      { label: 'Light', theme: 'light' as const },
      { label: 'Dark', theme: 'dark' as const },
      { label: 'System', theme: 'system' as const },
    ];

    for (const { label, theme } of cases) {
      await user.click(toggleThemeButton);

      const menuItem = await screen.findByRole('menuitem', { name: label });
      await user.click(menuItem);

      expect(setTheme).toHaveBeenCalledWith(theme);
    }
  });
});
