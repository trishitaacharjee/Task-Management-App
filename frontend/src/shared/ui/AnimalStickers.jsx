function StickerFrame({ size, children }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" className="animal-sticker-svg">
      <ellipse cx="60" cy="108" rx="32" ry="6" fill="rgba(75,48,62,.10)" />
      {children}
    </svg>
  );
}

function Face({ x = 60, y = 49, fur = '#fff7fa', ear = fur, cheek = '#ffb5c9' }) {
  return (
    <>
      <circle cx="37" cy={y - 18} r="13" fill={ear} />
      <circle cx="83" cy={y - 18} r="13" fill={ear} />
      <circle cx={x} cy={y} r="31" fill={fur} />
      <circle cx="49" cy={y - 3} r="3.2" fill="#3b3036" />
      <circle cx="71" cy={y - 3} r="3.2" fill="#3b3036" />
      <circle cx="50" cy={y - 4} r="1" fill="#fff" />
      <circle cx="72" cy={y - 4} r="1" fill="#fff" />
      <ellipse cx="40" cy={y + 12} rx="8" ry="4.5" fill={cheek} opacity=".8" />
      <ellipse cx="80" cy={y + 12} rx="8" ry="4.5" fill={cheek} opacity=".8" />
      <path d={`M55 ${y + 10} Q60 ${y + 15} 65 ${y + 10}`} fill="none" stroke="#49353d" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

export function CatSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <path d="M30 42 L31 14 L51 31 M90 42 L89 14 L69 31" fill="#f5c99c" stroke="#d99b6c" strokeWidth="2" />
      <ellipse cx="60" cy="82" rx="31" ry="22" fill="#f8d8b6" />
      <Face fur="#f8d8b6" ear="#edb887" />
      <path d="M29 55 L10 50 M29 61 L9 61 M91 55 L110 50 M91 61 L111 61" stroke="#c8895a" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 81 Q60 91 77 81" fill="none" stroke="#fff8f1" strokeWidth="7" strokeLinecap="round" />
    </StickerFrame>
  );
}

export function CatSparkleSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <path d="M30 42 L31 14 L51 31 M90 42 L89 14 L69 31" fill="#fff1e5" stroke="#e7a17c" strokeWidth="2" />
      <ellipse cx="60" cy="82" rx="31" ry="22" fill="#fff9f3" />
      <Face fur="#fff9f3" ear="#ffe5d5" />
      <path d="M34 86 Q60 101 86 86" fill="none" stroke="#f4b2c5" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 28 l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7ZM102 25 l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#ffc65c" />
    </StickerFrame>
  );
}

export function PandaLaptopSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <ellipse cx="60" cy="83" rx="34" ry="23" fill="#fff" />
      <circle cx="60" cy="48" r="32" fill="#fff" />
      <circle cx="37" cy="25" r="13" fill="#29272b" />
      <circle cx="83" cy="25" r="13" fill="#29272b" />
      <ellipse cx="46" cy="46" rx="10" ry="14" fill="#29272b" transform="rotate(-25 46 46)" />
      <ellipse cx="74" cy="46" rx="10" ry="14" fill="#29272b" transform="rotate(25 74 46)" />
      <circle cx="49" cy="47" r="3" fill="#fff" />
      <circle cx="71" cy="47" r="3" fill="#fff" />
      <circle cx="60" cy="55" r="4" fill="#3b3036" />
      <path d="M55 61 Q60 66 65 61" fill="none" stroke="#3b3036" strokeWidth="2" strokeLinecap="round" />
      <rect x="32" y="72" width="56" height="29" rx="4" fill="#8fc8e8" stroke="#5688a5" strokeWidth="2" />
      <rect x="38" y="77" width="44" height="20" rx="2" fill="#eaf7ff" />
      <path d="M25 102 H95 L86 108 H34Z" fill="#6e9db6" />
      <path d="M20 31 l4 8 8 3-8 3-4 8-4-8-8-3 8-3 4-8Z" fill="#ffc65c" />
    </StickerFrame>
  );
}

export function PandaBottleSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <ellipse cx="60" cy="83" rx="34" ry="23" fill="#fff" />
      <circle cx="60" cy="48" r="32" fill="#fff" />
      <circle cx="37" cy="25" r="13" fill="#29272b" />
      <circle cx="83" cy="25" r="13" fill="#29272b" />
      <ellipse cx="46" cy="46" rx="10" ry="14" fill="#29272b" transform="rotate(-25 46 46)" />
      <ellipse cx="74" cy="46" rx="10" ry="14" fill="#29272b" transform="rotate(25 74 46)" />
      <circle cx="49" cy="47" r="3" fill="#fff" />
      <circle cx="71" cy="47" r="3" fill="#fff" />
      <circle cx="60" cy="55" r="4" fill="#3b3036" />
      <path d="M55 61 Q60 66 65 61" fill="none" stroke="#3b3036" strokeWidth="2" strokeLinecap="round" />
      <rect x="76" y="61" width="17" height="39" rx="7" fill="#7fd0f2" stroke="#4f9ec3" strokeWidth="2" />
      <rect x="79" y="54" width="11" height="9" rx="3" fill="#5cabc9" />
      <path d="M80 78 H89" stroke="#dff6ff" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 33 l3 6 6 3-6 3-3 7-3-7-6-3 6-3 3-6Z" fill="#ffc65c" />
      <circle cx="100" cy="45" r="3" fill="#f5a4bf" />
      <circle cx="17" cy="62" r="3" fill="#f5a4bf" />
    </StickerFrame>
  );
}

export function CatBookSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <path d="M30 42 L31 14 L51 31 M90 42 L89 14 L69 31" fill="#f7d2ad" stroke="#d99b6c" strokeWidth="2" />
      <ellipse cx="60" cy="82" rx="31" ry="22" fill="#f8d8b6" />
      <Face fur="#f8d8b6" ear="#edb887" />
      <path d="M31 78 Q60 68 89 78 L83 103 Q60 92 37 103Z" fill="#8dbbe4" stroke="#648cae" strokeWidth="2" />
      <path d="M60 76 V96" stroke="#648cae" strokeWidth="2" />
      <path d="M42 82 Q50 79 57 82 M63 82 Q70 79 78 82" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 30 l3 6 6 3-6 3-3 7-3-7-6-3 6-3 3-6ZM103 57 l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#ffc65c" />
    </StickerFrame>
  );
}

export function BearSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <circle cx="37" cy="30" r="13" fill="#a9774f" />
      <circle cx="83" cy="30" r="13" fill="#a9774f" />
      <ellipse cx="60" cy="82" rx="31" ry="22" fill="#c99768" />
      <Face fur="#c99768" ear="#a9774f" cheek="#efb7a1" />
      <ellipse cx="60" cy="55" rx="12" ry="8" fill="#efd0ac" />
      <circle cx="60" cy="54" r="3" fill="#68462f" />
      <path d="M48 82 Q60 88 72 82" fill="none" stroke="#fff1df" strokeWidth="5" strokeLinecap="round" />
    </StickerFrame>
  );
}

export function FoxSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <path d="M29 41 L35 12 L57 30 M91 41 L85 12 L63 30" fill="#f39a51" stroke="#d87935" strokeWidth="2" />
      <ellipse cx="60" cy="82" rx="31" ry="22" fill="#f39a51" />
      <Face fur="#f39a51" ear="#e87f3d" cheek="#ffc5a0" />
      <path d="M32 67 Q60 101 88 67 Q81 91 60 97 Q39 91 32 67" fill="#fff9f2" />
    </StickerFrame>
  );
}

export function HamsterSticker({ size = 70 }) {
  return (
    <StickerFrame size={size}>
      <ellipse cx="60" cy="82" rx="34" ry="24" fill="#e7b47d" />
      <Face fur="#e7b47d" ear="#d99a61" cheek="#ffb0bb" />
      <ellipse cx="60" cy="68" rx="14" ry="10" fill="#fff0dc" />
      <circle cx="55" cy="67" r="2" fill="#6a4938" />
      <circle cx="65" cy="67" r="2" fill="#6a4938" />
    </StickerFrame>
  );
}

export function AnimalSticker({ type = 'cat', size = 70 }) {
  const map = {
    cat: CatSticker,
    'cat-sparkle': CatSparkleSticker,
    'cat-book': CatBookSticker,
    'panda-laptop': PandaLaptopSticker,
    'panda-bottle': PandaBottleSticker,
    bear: BearSticker,
    fox: FoxSticker,
    hamster: HamsterSticker,
  };
  const Sticker = map[type] || CatSticker;
  return <Sticker size={size} />;
}

// Stickers are visual decoration only. They are chosen from the task itself,
// never from Personal/Study/Health/Work/Self-care categories.
export function getTaskStickerType(task) {
  const title = String(task?.title || '').toLowerCase();
  if (/water|drink|hydrate|bottle/.test(title)) return 'panda-bottle';
  if (/report|project|presentation|assignment|laptop|code|coding|work/.test(title)) return 'panda-laptop';
  if (/read|paper|book|research|study/.test(title)) return 'cat-book';
  if (/wash|clean|shower|bath|hair/.test(title)) return 'cat-sparkle';

  const types = ['cat-sparkle', 'panda-laptop', 'panda-bottle', 'cat-book', 'bear', 'fox'];
  const index = Math.max(0, (Number(task?.id) || 1) - 1) % types.length;
  return types[index];
}
