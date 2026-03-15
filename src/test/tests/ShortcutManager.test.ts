import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ShortcutManager } from '@/utils/ShortcutManager';

describe('ShortcutManager', () => {
  let manager: ShortcutManager;

  beforeEach(() => {
    manager = new ShortcutManager();
  });

  afterEach(() => {
    manager.destroy();
  });

  it('should trigger callback when shortcut is pressed', () => {
    const callback = vi.fn();
    manager.register('meta+k', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should respect multiple modifiers', () => {
    const callback = vi.fn();
    manager.register('ctrl+shift+p', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'p',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should not trigger callback if modifiers do not match', () => {
    const callback = vi.fn();
    manager.register('meta+k', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true, // wrong modifier
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should unregister shortcut', () => {
    const callback = vi.fn();
    manager.register('meta+k', callback);
    manager.unregister('meta+k');

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle different order of keys during registration', () => {
    const callback = vi.fn();
    manager.register('k+meta', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });
});
