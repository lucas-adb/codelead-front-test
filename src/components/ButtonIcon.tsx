import Image from 'next/image';
import { Button } from './ui/button';

function ButtonIcon({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-transparent hover:bg-transparent hover:cursor-pointer hover:scale-105 border-none p-0 max-w-6 relative"
      onClick={onClick}
    >
      <Image src={src} alt={alt} fill />
    </Button>
  );
}

export default ButtonIcon;
