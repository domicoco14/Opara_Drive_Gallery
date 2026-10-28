'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { MessageCircle } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

const BUTTON_SIZE = 64;
const EDGE_GAP = 16;
const STORAGE_KEY = 'opara-whatsapp-button-position';

function clampPosition(position: Position): Position {
  return {
    x: Math.min(
      Math.max(position.x, EDGE_GAP),
      Math.max(EDGE_GAP, window.innerWidth - BUTTON_SIZE - EDGE_GAP),
    ),
    y: Math.min(
      Math.max(position.y, EDGE_GAP),
      Math.max(EDGE_GAP, window.innerHeight - BUTTON_SIZE - EDGE_GAP),
    ),
  };
}

function defaultPosition(): Position {
  return clampPosition({
    x: window.innerWidth - BUTTON_SIZE - EDGE_GAP,
    y: window.innerHeight - BUTTON_SIZE - EDGE_GAP,
  });
}

function loadPosition(): Position {
  try {
    const savedPosition = window.localStorage.getItem(STORAGE_KEY);
    if (savedPosition) {
      const [x, y] = savedPosition.split(',').map(Number);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        return clampPosition({ x, y });
      }
    }
  } catch (error) {
    console.error('Unable to read the WhatsApp button position.', error);
  }

  return defaultPosition();
}

function savePosition(position: Position) {
  try {
    window.localStorage.setItem(STORAGE_KEY, `${position.x},${position.y}`);
  } catch (error) {
    console.error('Unable to save the WhatsApp button position.', error);
  }
}

export default function DraggableWhatsAppButton() {
  const [position, setPosition] = useState<Position>(() => loadPosition());
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: Position;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setPosition((currentPosition) => {
        const nextPosition = clampPosition(currentPosition);
        savePosition(nextPosition);
        return nextPosition;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || !position) return;

    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: position,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 4) return;

    drag.moved = true;
    setIsDragging(true);
    event.preventDefault();
    setPosition(clampPosition({
      x: drag.origin.x + deltaX,
      y: drag.origin.y + deltaY,
    }));
  };

  const handlePointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.moved) {
      const nextPosition = clampPosition({
        x: drag.origin.x + event.clientX - drag.startX,
        y: drag.origin.y + event.clientY - drag.startY,
      });
      setPosition(nextPosition);
      savePosition(nextPosition);
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragRef.current = null;
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    const offsets: Record<string, Position> = {
      ArrowUp: { x: 0, y: -10 },
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 },
      ArrowRight: { x: 10, y: 0 },
    };
    const offset = offsets[event.key];
    if (!offset) return;

    event.preventDefault();
    const nextPosition = clampPosition({
      x: (position ?? defaultPosition()).x + offset.x,
      y: (position ?? defaultPosition()).y + offset.y,
    });
    setPosition(nextPosition);
    savePosition(nextPosition);
  };

  return (
    <a
      href="https://wa.me/2349032903453"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Opara Drive Gallery on WhatsApp. Drag to move, or use the arrow keys to reposition."
      title="Drag to move. Use arrow keys to reposition."
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault();
          suppressClickRef.current = false;
        }
      }}
      onKeyDown={handleKeyDown}
      className={`fixed z-[70] flex h-16 w-16 touch-none items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : undefined}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#25D366] bg-[#D4AF37]" />
      </span>
    </a>
  );
}
