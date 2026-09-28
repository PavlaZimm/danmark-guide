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
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/wejscie-vesterbrogade-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/wejscie-vesterbrogade-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/wejscie-vesterbrogade-1500.webp 1500w",
    "width": 1500,
    "height": 1000
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/rutschebanen-snieg-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/rutschebanen-snieg-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/rutschebanen-snieg-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/halloween-dynie-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/halloween-dynie-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/halloween-dynie-1500.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/jarmark-swiateczny-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/jarmark-swiateczny-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/jarmark-swiateczny-1500.webp 1500w",
    "width": 1500,
    "height": 1000
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/jezioro-noca-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/jezioro-noca-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/jezioro-noca-1500.webp 1500w",
    "width": 1500,
    "height": 960
  },
  "https://kastrup.cz/images/clanky/tivoli-kopenhaga/himmelskibet-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/tivoli-kopenhaga/himmelskibet-750.webp 750w, https://kastrup.cz/images/clanky/tivoli-kopenhaga/himmelskibet-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/legoland-dania/wejscie-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/legoland-dania/wejscie-750.webp 750w, https://kastrup.cz/images/clanky/legoland-dania/wejscie-1500.webp 1500w",
    "width": 1500,
    "height": 1000
  },
  "https://kastrup.cz/images/clanky/legoland-dania/miniland-port-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/legoland-dania/miniland-port-750.webp 750w, https://kastrup.cz/images/clanky/legoland-dania/miniland-port-1500.webp 1050w",
    "width": 1050,
    "height": 700
  },
  "https://kastrup.cz/images/clanky/legoland-dania/miniland-lotnisko-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/legoland-dania/miniland-lotnisko-750.webp 750w, https://kastrup.cz/images/clanky/legoland-dania/miniland-lotnisko-1500.webp 1050w",
    "width": 1050,
    "height": 700
  },
  "https://kastrup.cz/images/clanky/legoland-dania/lego-house-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/legoland-dania/lego-house-750.webp 750w, https://kastrup.cz/images/clanky/legoland-dania/lego-house-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/legoland-dania/minifigure-speedway-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/legoland-dania/minifigure-speedway-750.webp 750w, https://kastrup.cz/images/clanky/legoland-dania/minifigure-speedway-1500.webp 1500w",
    "width": 1500,
    "height": 1125
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/den-bla-planet-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/den-bla-planet-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/den-bla-planet-1500.webp 1500w",
    "width": 1500,
    "height": 1001
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rundetaarn-rampa-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rundetaarn-rampa-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rundetaarn-rampa-1500.webp 1500w",
    "width": 1500,
    "height": 1000
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/zoo-wieza-wielblad-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/zoo-wieza-wielblad-750.webp 569w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/zoo-wieza-wielblad-1500.webp 1138w",
    "width": 1138,
    "height": 1500
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/experimentarium-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/experimentarium-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/experimentarium-1500.webp 1350w",
    "width": 1350,
    "height": 900
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/nationalmuseet-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/nationalmuseet-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/nationalmuseet-1500.webp 1350w",
    "width": 1350,
    "height": 900
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/islands-brygge-kapielisko-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/islands-brygge-kapielisko-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/islands-brygge-kapielisko-1500.webp 1200w",
    "width": 1200,
    "height": 898
  },
  "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rejs-kanalami-1500.webp": {
    "srcSet": "https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rejs-kanalami-750.webp 750w, https://kastrup.cz/images/clanky/kopenhaga-z-dziecmi/rejs-kanalami-1500.webp 1350w",
    "width": 1350,
    "height": 1013
  }
};

export function getArticleImageProps(src: string, sizes = "(max-width: 768px) calc(100vw - 32px), 896px") {
  const image = images[src];
  return image ? { ...image, sizes } : {};
}
