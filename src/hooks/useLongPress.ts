import { useCallback, useRef } from 'react';

export function useLongPress(onLongPress: () => void, ms = 3000) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    timerRef.current = setTimeout(() => {
      onLongPress();
    }, ms);
  }, [onLongPress, ms]);

  const stop = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}
