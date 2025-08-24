import Image from 'next/image';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 32, showText = false, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <Image
          src="/logo.svg"
          alt="Teste Político 8 Valores"
          width={size}
          height={size}
          className="rounded-full"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight">
            Teste Político 8 Valores
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
            testepolitico8valores.com
          </span>
        </div>
      )}
    </div>
  );
}