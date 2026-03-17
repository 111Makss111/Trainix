type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Trainix logo"
      fill="none"
    >
      <defs>
        <linearGradient
          id="trainix-main"
          x1="78"
          y1="78"
          x2="262"
          y2="458"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#DDFB6D" />
          <stop offset="52%" stopColor="#9EE246" />
          <stop offset="100%" stopColor="#35C94B" />
        </linearGradient>

        <linearGradient
          id="trainix-bolt"
          x1="248"
          y1="86"
          x2="392"
          y2="282"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F0FF8A" />
          <stop offset="45%" stopColor="#8CFF63" />
          <stop offset="100%" stopColor="#18C75A" />
        </linearGradient>

        <filter id="trainix-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M82 102H338L286 160H226L188 444C186 457 176 466 163 466H98C82 466 70 452 73 436L111 160H64C48 160 36 146 39 130L43 116C46 108 54 102 64 102H82Z"
        fill="url(#trainix-main)"
      />

      <path
        d="M347 66L251 183H304L222 348L376 170H316L404 66H347Z"
        fill="url(#trainix-bolt)"
        filter="url(#trainix-glow)"
      />

      <path
        d="M405 186H436L462 128L486 202L507 166H520"
        stroke="url(#trainix-bolt)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#trainix-glow)"
      />
    </svg>
  );
}
