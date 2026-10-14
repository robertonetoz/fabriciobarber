import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
  /** Texto do espaço reservado enquanto não há foto */
  hint?: string;
  /** Miniatura borrada (data URL) mostrada enquanto a foto carrega */
  blur?: string;
  /** Esconde o logo d'água do espaço reservado */
  plain?: boolean;
};

/**
 * Mostra a foto quando existe `src`; senão, um quadro reservado no mesmo
 * tamanho, com a marca d'água do logo — o layout já fica pronto para as fotos.
 */
export default function ImageSlot({ src, alt, sizes = "100vw", className = "", preload, hint, plain, blur }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-char ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grain relative flex items-center justify-center overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#262626_0%,#121212_55%,#070707_100%)] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #efede8 0 1px, transparent 1px 14px)",
        }}
      />
      {!plain && (
        <Image
          src="/images/logo-crop.png"
          alt=""
          width={397}
          height={121}
          className="pointer-events-none w-[70%] max-w-[260px] opacity-[0.14]"
        />
      )}
      <span className="absolute bottom-4 left-4 right-4 text-[13px] leading-snug text-steel/70">
        {hint ?? alt}
      </span>
    </div>
  );
}
