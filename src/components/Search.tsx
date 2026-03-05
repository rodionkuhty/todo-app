import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Kbd } from '@/components/ui/kbd.tsx';
import SearchModal from '@/components/modals/Search.tsx';

type Props = {
  readonly withKbd?: boolean;
  readonly placeholder?: string;
  readonly value?: string;
  readonly onValueChange?: (next: string) => void;
  readonly defaultValue?: string;
  readonly onSubmit?: (value: string) => void;
};

function detectIsMac(): boolean {
  if (typeof navigator === 'undefined') return false;

  const platform =
    (navigator as any).userAgentData?.platform ?? navigator.platform ?? '';
  return /mac/i.test(platform);
}

export default function Search({
  withKbd = false,
  placeholder = 'Search',
  value,
  defaultValue,
  onValueChange,
  onSubmit,
}: Props) {
  const reactId = useId();
  const inputId = `search-${reactId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const isMac = useMemo(() => detectIsMac(), []);
  const shortcutLabel = useMemo(() => (isMac ? '⌘' : 'Ctrl'), [isMac]);

  const isControlled = value !== undefined;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.currentTarget.value);
    },
    [onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;

      const current = isControlled ? (value ?? '') : e.currentTarget.value;
      onSubmit?.(current);
    },
    [isControlled, onSubmit, value],
  );

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!withKbd) return;

    const onGlobalKeyDown = (e: KeyboardEvent) => {
      const isK = e.key === 'k' || e.key === 'K';
      const wantsShortcut = isMac ? e.metaKey : e.ctrlKey;

      if (!isK || !wantsShortcut) return;

      e.preventDefault();
      inputRef.current?.focus();
      setOpen(true);
    };

    document.addEventListener('keydown', onGlobalKeyDown);
    return () => document.removeEventListener('keydown', onGlobalKeyDown);
  }, [isMac, withKbd]);

  return (
    <div className='flex items-center'>
      <Field>
        <InputGroup>
          <InputGroupInput
            ref={inputRef}
            id={inputId}
            placeholder={placeholder}
            {...(isControlled ? { value } : { defaultValue })}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
          />

          {withKbd && (
            <InputGroupAddon align='inline-end'>
              <div className='flex items-center gap-1'>
                <Kbd>{shortcutLabel}</Kbd>
                <Kbd>K</Kbd>
              </div>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Field>
      <SearchModal open={open} setOpen={setOpen} />
    </div>
  );
}
