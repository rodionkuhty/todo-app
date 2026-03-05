type ShortcutCallback = (event: KeyboardEvent) => void;

interface ShortcutOptions {
  preventDefault?: boolean;
}

export class ShortcutManager {
  private readonly shortcuts: Map<
    string,
    { callback: ShortcutCallback; options: ShortcutOptions }
  > = new Map();
  private readonly boundHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.boundHandler = this.handleKeyDown.bind(this);
    globalThis.addEventListener('keydown', this.boundHandler);
  }

  private normalizeShortcut(shortcut: string): string {
    return shortcut
      .toLowerCase()
      .split('+')
      .map((key) => key.trim())
      .sort()
      .join('+');
  }

  private getEventShortcut(event: KeyboardEvent): string {
    const keys: string[] = [];

    if (event.ctrlKey) keys.push('ctrl');
    if (event.metaKey) keys.push('meta');
    if (event.shiftKey) keys.push('shift');
    if (event.altKey) keys.push('alt');

    // Only add the main key if it's not a modifier itself
    const mainKey = event.key.toLowerCase();
    const modifiers = ['control', 'meta', 'shift', 'alt'];

    if (!modifiers.includes(mainKey)) {
      keys.push(mainKey);
    }

    return keys.sort().join('+');
  }

  public register(
    shortcut: string,
    callback: ShortcutCallback,
    options: ShortcutOptions = { preventDefault: true },
  ): void {
    const normalized = this.normalizeShortcut(shortcut);
    this.shortcuts.set(normalized, { callback, options });
  }

  public unregister(shortcut: string): void {
    const normalized = this.normalizeShortcut(shortcut);
    this.shortcuts.delete(normalized);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const eventShortcut = this.getEventShortcut(event);
    const registered = this.shortcuts.get(eventShortcut);

    const activeElement = document.activeElement;
    const isTyping =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement?.getAttribute('contenteditable') === 'true';

    if (isTyping) {
      return;
    }

    if (registered) {
      if (registered.options.preventDefault) {
        event.preventDefault();
      }
      registered.callback(event);
    }
  }

  public destroy(): void {
    globalThis.removeEventListener('keydown', this.boundHandler);
    this.shortcuts.clear();
  }
}

export const shortcutManager = new ShortcutManager();
