import { Orbitron } from 'next/font/google';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export const Logo = () => {
  return (
    <Link
      href="/"
      style={{
        ...orbitron.style,
      }}
      className="font-bold text-xl"
    >
      Lofi
    </Link>
  );
};
