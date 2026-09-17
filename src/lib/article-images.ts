// Optimalizované varianty vlastních fotografií; rozměry pocházejí z obrazového manifestu.
const images: Record<string, { srcSet: string; width: number; height: number }> = {

  "https://kastrup.cz/images/clanky/dansky-design/designmuseum-danmark-kodan-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/dansky-design/designmuseum-danmark-kodan-750.webp 750w, https://kastrup.cz/images/clanky/dansky-design/designmuseum-danmark-kodan-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/dansky-design/illums-bolighus-kodan-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/dansky-design/illums-bolighus-kodan-750.webp 750w, https://kastrup.cz/images/clanky/dansky-design/illums-bolighus-kodan-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/dansky-design/knihovna-designmuseum-danmark-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/dansky-design/knihovna-designmuseum-danmark-750.webp 750w, https://kastrup.cz/images/clanky/dansky-design/knihovna-designmuseum-danmark-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  }
,
  "https://kastrup.cz/images/clanky/mosty-v-dansku/prejezd-mostu-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mosty-v-dansku/prejezd-mostu-750.webp 562w, https://kastrup.cz/images/clanky/mosty-v-dansku/prejezd-mostu-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/mosty-v-dansku/trajekt-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mosty-v-dansku/trajekt-750.webp 562w, https://kastrup.cz/images/clanky/mosty-v-dansku/trajekt-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/mons-klint/kridove-utesy-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mons-klint/kridove-utesy-750.webp 750w, https://kastrup.cz/images/clanky/mons-klint/kridove-utesy-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/mons-klint/plaz-pod-utesy-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mons-klint/plaz-pod-utesy-750.webp 750w, https://kastrup.cz/images/clanky/mons-klint/plaz-pod-utesy-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/ribe/domy-u-vody-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/ribe/domy-u-vody-750.webp 562w, https://kastrup.cz/images/clanky/ribe/domy-u-vody-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/ribe/reka-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/ribe/reka-750.webp 562w, https://kastrup.cz/images/clanky/ribe/reka-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/ribe/kostel-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/ribe/kostel-750.webp 562w, https://kastrup.cz/images/clanky/ribe/kostel-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/mosty-v-dansku/most-pylon-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mosty-v-dansku/most-pylon-750.webp 562w, https://kastrup.cz/images/clanky/mosty-v-dansku/most-pylon-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/mosty-v-dansku/more-z-trajektu-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mosty-v-dansku/more-z-trajektu-750.webp 562w, https://kastrup.cz/images/clanky/mosty-v-dansku/more-z-trajektu-1500.webp 1125w",
    "width": 1125,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/mons-klint/vyhled-zelen-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mons-klint/vyhled-zelen-750.webp 750w, https://kastrup.cz/images/clanky/mons-klint/vyhled-zelen-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/mons-klint/naplavene-drevo-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mons-klint/naplavene-drevo-750.webp 750w, https://kastrup.cz/images/clanky/mons-klint/naplavene-drevo-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/mons-klint/utesy-stromy-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/mons-klint/utesy-stromy-750.webp 565w, https://kastrup.cz/images/clanky/mons-klint/utesy-stromy-1500.webp 1129w",
    "width": 1129,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/ribe/lomme-ulrik-2024-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/ribe/lomme-ulrik-2024-750.webp 750w, https://kastrup.cz/images/clanky/ribe/lomme-ulrik-2024-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  }
};

export function getArticleImageProps(src: string, sizes = "(max-width: 768px) calc(100vw - 32px), 896px") {
  const image = images[src];
  return image ? { ...image, sizes } : {};
}
