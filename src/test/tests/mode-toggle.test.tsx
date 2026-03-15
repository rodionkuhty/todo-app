import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ModeToggle } from '@/components/mode-toggle';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock the theme provider hook
const setTheme = vi.fn();
let currentTheme = 'light';
vi.mock('@/components/theme-provider', () => ({
  useTheme: () => ({ setTheme, theme: currentTheme }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
};

describe('ModeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentTheme = 'light';
  });

  it('renders button with accessible name', () => {
    renderWithProviders(<ModeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme with "dark" when light theme is active and clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ModeToggle />);

    const toggleThemeButton = screen.getByRole('button', {
      name: /toggle theme/i,
    });

    await user.click(toggleThemeButton);

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when dark theme is active and clicked', async () => {
    currentTheme = 'dark';
    const user = userEvent.setup();
    renderWithProviders(<ModeToggle />);

    const toggleThemeButton = screen.getByRole('button', {
      name: /toggle theme/i,
    });

    await user.click(toggleThemeButton);

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
