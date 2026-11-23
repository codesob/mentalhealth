'use client';

// Formats in the visitor's own locale and time zone. The server can't know
// either, so the text is allowed to differ between server and client render.
export default function LocalTime({ iso }: { iso: string }) {
  const date = new Date(iso);
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {date.toLocaleDateString()} at {date.toLocaleTimeString()}
    </time>
  );
}
