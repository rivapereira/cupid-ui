
import '../app/globals.css'


// app/layout.tsx
export const metadata = {
    title: 'Cupid App',
    description: 'Find your match with AI ❤️',
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  
  