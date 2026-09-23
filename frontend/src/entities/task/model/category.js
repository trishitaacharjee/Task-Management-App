// Each category maps to a chibi sticker (see shared/ui/AnimalStickers)
// + label, used on task cards and driven purely by CSS color variants
// (no emoji anywhere in this map).
export const CATEGORIES = ['personal', 'study', 'health', 'work', 'self-care'];

export const CATEGORY_META = {
  personal: { label: 'Personal', sticker: 'rabbit' },
  study: { label: 'Study', sticker: 'cat' },
  health: { label: 'Health', sticker: 'panda' },
  work: { label: 'Work', sticker: 'bear' },
  'self-care': { label: 'Self-care', sticker: 'fox' },
};
