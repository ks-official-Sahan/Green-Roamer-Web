// app/global-error.js
"use client"

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-4xl font-bold text-destructive">Something bad happened 😢</h2>
        <p className="mt-2 text-muted-foreground">The app encountered an unexpected error.</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
