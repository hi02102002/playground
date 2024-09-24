import { StaticImageData } from 'next/image';

import { EFFECTS, OGTRACKS_URLS, SCENES, WALLPAPERS_URLS } from './media';
import {
  artRoom,
  artRoomPreview,
  backseat,
  backseatPreview,
  bedRoom,
  bookCafe,
  bookIn,
  bookOut,
  brown,
  cafeInPreview,
  cafeOutPreview,
  cafeThumb,
  chillVibes,
  cottage,
  cottageIn,
  cottageOut,
  cozyStudio,
  cozyStudioPreview,
  dreamingScene,
  dreamyForest,
  dreamyForestPreview,
  floating,
  floatingPreview,
  forestInsidePreview,
  forestOutsidePreview,
  forestThumb,
  fuji,
  fujiPreview,
  futureBedroom,
  futureDesk,
  futurePreview,
  greenHouse,
  greenHousePreview,
  honoluluIn,
  honoluluOut,
  honoluluPW,
  inthewoodsInside,
  inthewoodsOutside,
  inthewoodsPreview,
  kyoto,
  kyotoPark,
  kyotoStreet,
  lakeHouseInside,
  lakeHouseOutside,
  lakeHousePreview,
  library,
  libraryPreview,
  livingRoom,
  lofi_desk,
  newYorkBedroom,
  newYorkCentralPark,
  newYorkPreview,
  noisePreview,
  oceanOutPreview,
  oceanPreview,
  oceanThumb,
  pink,
  plane,
  planePreview,
  seaSideInside,
  seaSideOutside,
  seaSidePreview,
  seoulInside,
  seoulOutside,
  seoulPreview,
  slowGarden,
  slowGardenPreview,
  spacePW,
  studyBeach,
  studyCity,
  studyMountain,
  summerOutPreview,
  summerPreview,
  summerThumb,
  sunsetCamping,
  sunsetCampingPreview,
  tokyoNightAlley,
  tokyoNightPreview,
  tokyoNightRamenShop,
  trainJourney,
  trainJourneyCity,
  trainJourneyCountry,
  treeHouse,
  treeHousePreview,
  underwaterPW,
  vanOutPreview,
  vanPreview,
  vanThumb,
  white,
  winterNight,
  winterNightPreview,
} from './thumbnails';

export type EffectType =
  | 'fire'
  | 'forest'
  | 'rain_forest'
  | 'waves'
  | 'fan'
  | 'city'
  | 'storm'
  | 'rain_street'
  | 'river'
  | 'birds'
  | 'people'
  | 'wind'
  | 'ocean'
  | 'fireplace'
  | 'snow'
  | 'keyboard'
  | 'underwater'
  | 'space'
  | 'window_rain'
  | 'train_noise'
  | 'thunders'
  | 'white_noise'
  | 'pink_noise'
  | 'brown_noise'
  | 'plane'
  | 'rain_window';

export interface SoundEffect {
  type: EffectType;
  name: string;
  url: string;
}

export const effects = [
  {
    type: 'fire',
    name: 'Campfire',
    url: EFFECTS.CAMPFIRE,
  },
  {
    type: 'forest',
    name: 'Forest',
    url: EFFECTS.FOREST_NIGHT,
  },
  {
    type: 'rain_forest',
    name: 'Forest Rain',
    url: EFFECTS.RAIN_FOREST,
  },
  {
    type: 'waves',
    name: 'Waves',
    url: EFFECTS.WAVES,
  },
  {
    type: 'fan',
    name: 'Fan',
    url: EFFECTS.FAN,
  },
  {
    type: 'city',
    name: 'City traffic',
    url: EFFECTS.CITY_TRAFFIC,
  },
  {
    type: 'storm',
    name: 'Summer Storm',
    url: EFFECTS.SUMMER_STORM,
  },
  {
    type: 'rain_street',
    name: 'City Rain',
    url: EFFECTS.RAIN_CITY,
  },
  {
    type: 'river',
    name: 'River',
    url: EFFECTS.RIVER,
  },
  {
    type: 'birds',
    name: 'Bird Chirping',
    url: EFFECTS.BIRDS,
  },
  {
    type: 'people',
    name: 'People Talking',
    url: EFFECTS.PEOPLE_TALK_INSIDE,
  },
  {
    type: 'wind',
    name: 'Wind',
    url: EFFECTS.WIND,
  },
  {
    type: 'ocean',
    name: 'Ocean',
    url: EFFECTS.OCEAN,
  },
  {
    type: 'fireplace',
    name: 'Fireplace',
    url: EFFECTS.FIREPLACE,
  },
  {
    type: 'snow',
    name: 'Blizzard',
    url: EFFECTS.SNOW,
  },
  {
    type: 'keyboard',
    name: 'Keyboard',
    url: EFFECTS.KEYBOARD,
  },
  {
    type: 'underwater',
    name: 'Underwater',
    url: EFFECTS.UNDERWATER,
  },
  {
    type: 'space',
    name: 'Deep Space',
    url: EFFECTS.DEEPSPACE,
  },
  {
    type: 'window_rain',
    name: 'Window Rain',
    url: EFFECTS.WINDOW_RAIN,
  },
  {
    type: 'train_noise',
    name: 'Train',
    url: EFFECTS.TRAIN,
  },
  {
    type: 'thunders',
    name: 'Thunders',
    url: EFFECTS.THUNDERS,
  },
  {
    type: 'white_noise',
    name: 'White noise',
    url: EFFECTS.WHITE_NOISE,
  },
  {
    type: 'pink_noise',
    name: 'Pink noise',
    url: EFFECTS.PINK_NOISE,
  },
  {
    type: 'brown_noise',
    name: 'Brown noise',
    url: EFFECTS.BROWN_NOISE,
  },
  {
    type: 'plane',
    name: 'Plane',
    url: EFFECTS.AIRPLANE,
  },
] satisfies SoundEffect[];

export const effectsMap = effects.reduce(
  (acc, effect) => {
    acc[effect.type] = effect;
    return acc;
  },
  {} as { [key in EffectType]: SoundEffect },
);

export type SoundTrackMood = 'chill' | 'jazzy' | 'sleepy';

export const playlistsBase: { [key in SoundTrackMood]: string[] } = {
  chill: OGTRACKS_URLS.CHILL,
  jazzy: OGTRACKS_URLS.JAZZY,
  sleepy: OGTRACKS_URLS.SLEEPY,
};

export const playlistsSpotify = {
  chill: 'https://open.spotify.com/embed/playlist/0iepisLXvVe5RxB3owHjlj?utm_source=generator',
  jazzy: 'https://open.spotify.com/embed/playlist/4dJSLiR8n2ZQUccpyXYKvE?utm_source=generator',
  sleepy: 'https://open.spotify.com/embed/playlist/1lVoSF8Bd6bQJaoEHFGegX?utm_source=generator',
};

export interface Scene {
  thumbnail: string | StaticImageData;
  wallpaper: string;
  variants: { [key in string]: string };
  actions: ({
    position: [number, number];
    title: string;
  } & (
    | {
        type: 'sound';
        effect: EffectType;
      }
    | {
        type: 'next-set';
      }
  ))[];
}

export const scenes: { [key in string]: Scene } = {
  forestInside: {
    thumbnail: forestInsidePreview,
    wallpaper: WALLPAPERS_URLS.FOREST_HOUSE.FOREST_HOUSE_1,
    variants: {
      default: SCENES.FOREST.INSIDE,
      rain_forest: SCENES.FOREST.INSIDE_RAIN,
      default_pixel: SCENES.FOREST.INSIDE_PIX,
      rain_forest_pixel: SCENES.FOREST.INSIDE_RAIN_PIX,
    },
    actions: [
      {
        position: [70, 30],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [15, 20],
        title: 'Bird chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  forestOutside: {
    thumbnail: forestOutsidePreview,
    wallpaper: WALLPAPERS_URLS.FOREST_HOUSE.FOREST_HOUSE_2,
    variants: {
      default: SCENES.FOREST.OUTSIDE,
      rain_forest: SCENES.FOREST.OUTSIDE_RAIN,
      default_pixel: SCENES.FOREST.OUTSIDE_PIX,
      rain_forest_pixel: SCENES.FOREST.OUTSIDE_RAIN_PIX,
    },

    actions: [
      {
        position: [70, 70],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
      {
        position: [10, 50],
        title: 'Bird chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [67, 12],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
    ],
  },
  vanInside: {
    thumbnail: vanPreview,
    variants: {
      default: SCENES.VAN.VAN,
      rain_forest: SCENES.VAN.VAN_RAIN,
    },

    wallpaper: WALLPAPERS_URLS.VAN.ROOM,
    actions: [
      {
        position: [50, 30],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [55, 20],
        title: 'Forest',
        type: 'sound',
        effect: 'forest',
      },
    ],
  },
  vanOutside: {
    thumbnail: vanOutPreview,
    variants: {
      default: SCENES.VAN.VAN_OUT,
      fire: SCENES.VAN.VAN_OUT_FIRE,
    },
    wallpaper: WALLPAPERS_URLS.VAN.LOFI,
    actions: [
      {
        position: [10, 20],
        title: 'Forest sound',
        type: 'sound',
        effect: 'forest',
      },
      {
        position: [42, 78],
        title: 'Campfire sound',
        type: 'sound',
        effect: 'fire',
      },
    ],
  },
  library: {
    thumbnail: library,
    wallpaper: WALLPAPERS_URLS.LIBRARY,
    variants: {
      default: SCENES.LIBRARY.NO_RAIN,
      window_rain: SCENES.LIBRARY.RAIN,
    },
    actions: [
      {
        position: [55, 25],
        title: 'Thunders',
        type: 'sound',
        effect: 'thunders',
      },
      {
        position: [66, 24],
        title: 'Window Rain',
        type: 'sound',
        effect: 'window_rain',
      },
      {
        position: [60, 56],
        title: 'Fireplace',
        type: 'sound',
        effect: 'fireplace',
      },
    ],
  },
  artRoom: {
    thumbnail: artRoom,
    wallpaper: WALLPAPERS_URLS.ART_ROOM,
    variants: {
      default: SCENES.ARTROOM.DAY,
      rain_street: SCENES.ARTROOM.DAY_RAIN,
      default_night: SCENES.ARTROOM.NIGHT,
      rain_street_night: SCENES.ARTROOM.NIGHT_RAIN,
    },
    actions: [
      {
        position: [49, 36],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [56, 14],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [60, 29],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
    ],
  },
  cafeInside: {
    thumbnail: cafeInPreview,
    wallpaper: WALLPAPERS_URLS.LOFI_CAFE.CAFE_2,
    variants: {
      default: SCENES.CAFE.INSIDE,
      default_night: SCENES.CAFE.INSIDE_NIGHT,
      rain_street_night: SCENES.CAFE.INSDE_NIGHT_RAIN,
      rain_street: SCENES.CAFE.INSIDE_RAIN,
    },

    actions: [
      {
        position: [20, 38],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [50, 70],
        title: 'People Talks',
        type: 'sound',
        effect: 'people',
      },
    ],
  },
  cafeOutside: {
    thumbnail: cafeOutPreview,
    variants: {
      default: SCENES.CAFE.OUTSIDE,
      rain_street: SCENES.CAFE.OUTSIDE_RAIN,
      default_night: SCENES.CAFE.OUTSIDE_NIGHT,
      rain_street_night: SCENES.CAFE.OUTSIDE_NIGHT_RAIN,
    },
    wallpaper: WALLPAPERS_URLS.LOFI_CAFE.CAFE_1,
    actions: [
      {
        position: [75, 80],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [35, 35],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
    ],
  },
  summerInside: {
    thumbnail: summerPreview,
    variants: {
      default: SCENES.SUMMER.SUMMER,
      storm: SCENES.SUMMER.SUMMER_RAIN,
    },
    wallpaper: WALLPAPERS_URLS.SUMMER.BEACH_2,
    actions: [
      {
        position: [30, 25],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
      {
        position: [60, 45],
        title: 'Fan',
        type: 'sound',
        effect: 'fan',
      },
    ],
  },
  summerOutside: {
    thumbnail: summerOutPreview,
    variants: {
      default: SCENES.SUMMER.SUMMER_OUT,
      storm: SCENES.SUMMER.SUMMER_OUT_RAIN,
      default_pixel: SCENES.SUMMER.SUMMER_OUT_PIXEL,
      storm_pixel: SCENES.SUMMER.SUMMER_OUT_RAIN_PIXEL,
    },
    wallpaper: WALLPAPERS_URLS.SUMMER.BEACH_1,

    actions: [
      {
        position: [75, 80],
        title: 'Sea Waves',
        type: 'sound',
        effect: 'waves',
      },
      {
        position: [85, 15],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
    ],
  },
  oceanInside: {
    thumbnail: oceanPreview,
    variants: {
      default: SCENES.OCEAN.OCEAN_TALES,
      storm: SCENES.OCEAN.OCEAN_TALES_RAIN,
    },
    wallpaper: WALLPAPERS_URLS.OCEAN_TALES.INSIDE,

    actions: [
      {
        position: [8, 59],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
      {
        position: [59, 31],
        title: 'Summer Storm',
        type: 'sound',
        effect: 'storm',
      },
    ],
  },
  oceanOutside: {
    thumbnail: oceanOutPreview,
    variants: {
      default: SCENES.OCEAN.OCEAN_TALES_OUT,
      storm: SCENES.OCEAN.OCEAN_TALES_OUT_RAIN,
    },
    wallpaper: WALLPAPERS_URLS.OCEAN_TALES.OUTSIDE,

    actions: [
      {
        position: [8, 15],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
      {
        position: [42, 64],
        title: 'Ocean',
        type: 'sound',
        effect: 'ocean',
      },
      {
        position: [48, 13],
        title: 'Summer Storm',
        type: 'sound',
        effect: 'storm',
      },
    ],
  },
  lrBedRoom: {
    thumbnail: bedRoom,
    variants: {
      default: SCENES.CHILL_VIBES.BED_DAY,
      rain_street: SCENES.CHILL_VIBES.BED_RAINY_DAY,
      default_night: SCENES.CHILL_VIBES.LIVING_STARRY_NIGHT,
      rain_street_night: SCENES.CHILL_VIBES.LIVING_RAINY_NIGHT,
    },
    wallpaper: WALLPAPERS_URLS.CHILL_VIBES.OFFICE,
    actions: [
      {
        position: [82, 20],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [7, 18],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  lrLivingRoom: {
    thumbnail: livingRoom,
    variants: {
      default: SCENES.CHILL_VIBES.LIVING_DAY,
      rain_street: SCENES.CHILL_VIBES.LIVING_RAINY_DAY,
      default_night: SCENES.CHILL_VIBES.LIVING_STARRY_NIGHT,
      rain_street_night: SCENES.CHILL_VIBES.LIVING_RAINY_NIGHT,
    },
    wallpaper: WALLPAPERS_URLS.CHILL_VIBES.LIVING_ROOM,
    actions: [
      {
        position: [40, 14],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [4, 68],
        title: 'Fireplace',
        type: 'sound',
        effect: 'fireplace',
      },
    ],
  },
  deskCity: {
    variants: {
      default: SCENES.STUDY.CITY_SCENE,
    },
    thumbnail: studyCity,
    wallpaper: WALLPAPERS_URLS.STUDY.CITY,
    actions: [
      {
        position: [44, 52.5],
        title: 'Change place',
        type: 'next-set',
      },
      {
        position: [40, 15],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  deskBeach: {
    variants: {
      default: SCENES.STUDY.BEACH_SCENE,
    },
    thumbnail: studyBeach,
    wallpaper: WALLPAPERS_URLS.STUDY.BEACH,
    actions: [
      {
        position: [44, 52.5],
        title: 'Change place',
        type: 'next-set',
      },
      {
        position: [40, 15],
        title: 'Waves',
        type: 'sound',
        effect: 'waves',
      },
    ],
  },
  deskSnow: {
    variants: {
      default: SCENES.STUDY.SNOW_SCENE,
      snow: SCENES.STUDY.SNOW_BLIZZARD_SCENE,
    },
    thumbnail: studyMountain,
    wallpaper: WALLPAPERS_URLS.STUDY.SNOW,
    actions: [
      {
        position: [44, 52.5],
        title: 'Change place',
        type: 'next-set',
      },
      {
        position: [40, 15],
        title: 'Blizzard',
        type: 'sound',
        effect: 'snow',
      },
    ],
  },
  cottageIn: {
    variants: {
      default: SCENES.COTTAGE.INTERIOR_FINAL,
      snow: SCENES.COTTAGE.INTERIOR_SNOW,
    },
    thumbnail: cottageIn,
    wallpaper: WALLPAPERS_URLS.COTTAGE.INT,
    actions: [
      {
        position: [10, 70],
        title: 'Fireplace',
        type: 'sound',
        effect: 'fireplace',
      },
      {
        position: [30, 15],
        title: 'Blizzard',
        type: 'sound',
        effect: 'snow',
      },
      {
        position: [50, 50],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  cottageOut: {
    variants: {
      default: SCENES.COTTAGE.EXTERIOR_FINAL,
      snow: SCENES.COTTAGE.EXTERIOR_SNOW,
    },
    thumbnail: cottageOut,
    wallpaper: WALLPAPERS_URLS.COTTAGE.EXT,
    actions: [
      {
        position: [25, 45],
        title: 'Blizzard',
        type: 'sound',
        effect: 'snow',
      },
    ],
  },
  bookCafeIn: {
    variants: {
      default: SCENES.BOOK_CAFE.INTERIOR_SUNNY_DAY,
      default_night: SCENES.BOOK_CAFE.INTERIOR_NIGHT,
      rain_street: SCENES.BOOK_CAFE.INTERIOR_RAINY_DAY,
      rain_street_night: SCENES.BOOK_CAFE.INTERIOR_RAINY_NIGHT,
    },
    thumbnail: bookIn,

    wallpaper: WALLPAPERS_URLS.BOOK_CAFE.INT,
    actions: [
      {
        position: [17, 20],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [84, 72],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  bookCafeOut: {
    variants: {
      default: SCENES.BOOK_CAFE.EXTERIOR_DAY,
      default_night: SCENES.BOOK_CAFE.EXTERIOR_NIGHT,
      rain_street: SCENES.BOOK_CAFE.EXTERIOR_RAINY_DAY,
      rain_street_night: SCENES.BOOK_CAFE.EXTERIOR_RAINY_NIGHT,
    },
    thumbnail: bookOut,
    wallpaper: WALLPAPERS_URLS.BOOK_CAFE.EXT,
    actions: [
      {
        position: [6, 40],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [30, 65],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [60, 60],
        title: 'Enter',
        type: 'next-set',
      },
    ],
  },
  kyotoPark: {
    variants: {
      default: SCENES.KYOTO.PARK_DAY,
      default_night: SCENES.KYOTO.PARK_NIGHT,
    },
    thumbnail: kyotoPark,
    wallpaper: WALLPAPERS_URLS.KYOTO.PARK,
    actions: [
      {
        position: [30, 20],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [50, 70],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
    ],
  },
  kyotoStreet: {
    variants: {
      default: SCENES.KYOTO.STREET_DAY,
      default_night: SCENES.KYOTO.STREET_NIGHT,
    },
    thumbnail: kyotoStreet,
    wallpaper: WALLPAPERS_URLS.KYOTO.STREET,

    actions: [
      {
        position: [50, 27],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [30, 85],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  underwater: {
    variants: {
      default: SCENES.AM_I_DREAMING.UNDERWATER,
    },
    thumbnail: underwaterPW,
    wallpaper: WALLPAPERS_URLS.AM_I_DREAMING.UNDERWATER_WP,

    actions: [
      {
        position: [40, 27],
        title: 'Underwater',
        type: 'sound',
        effect: 'underwater',
      },
      {
        position: [67, 77],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  space: {
    variants: {
      default: SCENES.AM_I_DREAMING.SPACE,
    },
    thumbnail: spacePW,
    wallpaper: WALLPAPERS_URLS.AM_I_DREAMING.SPACE_WP,
    actions: [
      {
        position: [40, 27],
        title: 'Deep space',
        type: 'sound',
        effect: 'space',
      },
      {
        position: [67, 77],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  honoluluIN: {
    variants: {
      default: SCENES.HONOHULU.INSIDE_DAY,
      storm: SCENES.HONOHULU.INSIDE_DAY_RAIN,
      default_night: SCENES.HONOHULU.INSIDE_NIGHT,
      storm_night: SCENES.HONOHULU.INSIDE_NIGHT_RAIN,
    },
    thumbnail: honoluluIn,
    wallpaper: WALLPAPERS_URLS.HONOHULU.BALCONY,

    actions: [
      {
        position: [40, 27],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
      {
        position: [67, 82],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  honoluluOut: {
    variants: {
      default: SCENES.HONOHULU.OUTSIDE_DAY,
      storm: SCENES.HONOHULU.OUTSIDE_DAY_RAIN,
      default_night: SCENES.HONOHULU.OUTSIDE_NIGHT,
      storm_night: SCENES.HONOHULU.OUTSIDE_NIGHT_RAIN,
    },
    thumbnail: honoluluOut,
    wallpaper: WALLPAPERS_URLS.HONOHULU.BEACH,

    actions: [
      {
        position: [40, 27],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
      {
        position: [67, 60],
        title: 'Ocean',
        type: 'sound',
        effect: 'ocean',
      },
    ],
  },
  trainJourneyCity: {
    variants: {
      default: SCENES.TRAIN.CITY_DAY,
      window_rain: SCENES.TRAIN.CITY_DAY_RAIN,
      default_night: SCENES.TRAIN.CITY_NIGHT,
      window_rain_night: SCENES.TRAIN.CITY_NIGHT_RAIN,
    },
    thumbnail: trainJourneyCity,
    wallpaper: WALLPAPERS_URLS.TRAIN.CITY,

    actions: [
      {
        position: [25, 27],
        title: 'Window Rain',
        type: 'sound',
        effect: 'window_rain',
      },
      {
        position: [64, 68],
        title: 'Train',
        type: 'sound',
        effect: 'train_noise',
      },
      {
        position: [16, 85],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  trainJourneyCountry: {
    variants: {
      default: SCENES.TRAIN.COUNTRY_DAY,
      window_rain: SCENES.TRAIN.COUNTRY_DAY_RAIN,
      default_night: SCENES.TRAIN.COUNTRY_NIGHT,
      window_rain_night: SCENES.TRAIN.COUNTRY_NIGHT_RAIN,
    },
    thumbnail: trainJourneyCountry,
    wallpaper: WALLPAPERS_URLS.TRAIN.COUNTRY,

    actions: [
      {
        position: [25, 27],
        title: 'Window Rain',
        type: 'sound',
        effect: 'window_rain',
      },
      {
        position: [64, 68],
        title: 'Train',
        type: 'sound',
        effect: 'train_noise',
      },
      {
        position: [16, 85],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  newYorkBedroom: {
    variants: {
      default: SCENES.NEW_YORK.BEDROOM_DAY,
      default_night: SCENES.NEW_YORK.BEDROOM_NIGHT,
      rain_street: SCENES.NEW_YORK.BEDROOM_RAINY_DAY,
      rain_street_night: SCENES.NEW_YORK.BEDROOM_RAINY_NIGHT,
    },
    thumbnail: newYorkBedroom,
    wallpaper: WALLPAPERS_URLS.NEW_YORK.DAY,

    actions: [
      {
        position: [57, 27],
        title: 'City rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [8, 30],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  newYorkCentralPark: {
    variants: {
      default: SCENES.NEW_YORK.CENTRAL_PARK_DAY,
      default_night: SCENES.NEW_YORK.CENTRAL_PARK_NIGHT,
      rain_street: SCENES.NEW_YORK.CENTRAL_PARK_RAINY_DAY,
      rain_street_night: SCENES.NEW_YORK.CENTRAL_PARK_RAINY_NIGHT,
    },
    thumbnail: newYorkCentralPark,
    wallpaper: WALLPAPERS_URLS.NEW_YORK.PARK,
    actions: [
      {
        position: [52, 20],
        title: 'City rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [15, 32],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  greenHouse: {
    variants: {
      default: SCENES.GREEN_HOUSE.GARDEN_DAY,
      default_night: SCENES.GREEN_HOUSE.GARDEN_NIGHT,
      rain_forest: SCENES.GREEN_HOUSE.GARDEN_DAY_RAIN,
      rain_forest_night: SCENES.GREEN_HOUSE.GARDEN_NIGHT_RAIN,
    },
    thumbnail: greenHouse,
    wallpaper: WALLPAPERS_URLS.GREEN_HOUSE,
    actions: [
      {
        position: [20, 20],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [43, 55],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
      {
        position: [75, 20],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  seoulInside: {
    variants: {
      default: SCENES.SEOUL.INSIDE_DAY,
      default_night: SCENES.SEOUL.INSIDE_NIGHT,
      rain_street: SCENES.SEOUL.INSIDE_DAY_RAIN,
      rain_street_night: SCENES.SEOUL.INSIDE_NIGHT_RAIN,
    },
    thumbnail: seoulInside,
    wallpaper: WALLPAPERS_URLS.SEOUL.INDOOR,

    actions: [
      {
        position: [39, 82],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [59, 44],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
    ],
  },
  seoulOutside: {
    variants: {
      default: SCENES.SEOUL.OUTSIDE_DAY,
      default_night: SCENES.SEOUL.OUTSIDE_NIGHT,
      rain_street: SCENES.SEOUL.OUTSIDE_DAY_RAIN,
      rain_street_night: SCENES.SEOUL.OUTSIDE_NIGHT_RAIN,
    },
    thumbnail: seoulOutside,
    wallpaper: WALLPAPERS_URLS.SEOUL.OUTDOOR,

    actions: [
      {
        position: [36, 28],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [85, 70],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  backseat: {
    variants: {
      default: SCENES.BACKSEAT.BACKSEAT_NIGHT,
      window_rain: SCENES.BACKSEAT.BACKSEAT_NIGHT_RAIN,
    },
    thumbnail: backseat,
    wallpaper: WALLPAPERS_URLS.BACKSEAT,

    actions: [
      {
        position: [36, 20],
        title: 'Thunders',
        type: 'sound',
        effect: 'thunders',
      },
      {
        position: [36, 60],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [60, 20],
        title: 'Window Rain',
        type: 'sound',
        effect: 'window_rain',
      },
    ],
  },
  whiteNoise: {
    variants: {
      default: SCENES.NOISE.WHITE,
    },
    thumbnail: white,
    wallpaper: WALLPAPERS_URLS.NOISE.WHITE,

    actions: [
      {
        position: [36, 20],
        title: 'White noise',
        type: 'sound',
        effect: 'white_noise',
      },
    ],
  },
  pinkNoise: {
    variants: {
      default: SCENES.NOISE.PINK,
    },
    thumbnail: pink,
    wallpaper: WALLPAPERS_URLS.NOISE.PINK,

    actions: [
      {
        position: [36, 20],
        title: 'Pink noise',
        type: 'sound',
        effect: 'pink_noise',
      },
    ],
  },
  brownNoise: {
    variants: {
      default: SCENES.NOISE.BROWN,
    },
    thumbnail: brown,
    wallpaper: WALLPAPERS_URLS.NOISE.BROWN,

    actions: [
      {
        position: [36, 20],
        title: 'Brown noise',
        type: 'sound',
        effect: 'brown_noise',
      },
    ],
  },
  futureDesk: {
    variants: {
      default: SCENES.FUTURE.DESK_GALAXY,
      default_night: SCENES.FUTURE.DESK_CITY,
    },
    thumbnail: futureDesk,
    wallpaper: WALLPAPERS_URLS.FUTURE.DESK_GALAXY,

    actions: [
      {
        position: [78, 40],
        title: 'Deep space',
        type: 'sound',
        effect: 'space',
      },
      {
        position: [40, 65],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [78, 40],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  futureBedroom: {
    variants: {
      default: SCENES.FUTURE.BEDROOM_GALAXY,
      default_night: SCENES.FUTURE.BEDROOM_CITY,
    },
    thumbnail: futureBedroom,
    wallpaper: WALLPAPERS_URLS.FUTURE.BEDROOM_GALAXY,

    actions: [
      {
        position: [78, 40],
        title: 'Deep space',
        type: 'sound',
        effect: 'space',
      },
      {
        position: [60, 54],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [78, 40],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  slowGarden: {
    variants: {
      default: SCENES.SLOW_GARDEN.DAY,
      default_night: SCENES.SLOW_GARDEN.NIGHT,
    },
    thumbnail: slowGarden,
    wallpaper: WALLPAPERS_URLS.SLOW_GARDEN,

    actions: [
      {
        position: [40, 30],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [44, 80],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
      {
        position: [27, 50],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
    ],
  },
  plane: {
    variants: {
      default: SCENES.PLANE.DAY,
      default_night: SCENES.PLANE.NIGHT,
    },
    thumbnail: plane,
    wallpaper: WALLPAPERS_URLS.PLANE,

    actions: [
      {
        position: [70, 30],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [30, 50],
        title: 'Plane',
        type: 'sound',
        effect: 'plane',
      },
      {
        position: [60, 70],
        title: 'Brown noise',
        type: 'sound',
        effect: 'brown_noise',
      },
    ],
  },
  inTheWoodsInside: {
    variants: {
      default: SCENES.IN_THE_WOODS.INSIDE_SUN,
      rain_forest: SCENES.IN_THE_WOODS.INSIDE_RAIN,
    },
    thumbnail: inthewoodsInside,
    wallpaper: WALLPAPERS_URLS.IN_THE_WOODS.INSIDE,

    actions: [
      {
        position: [27, 20],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [58, 34],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  inTheWoodsOutside: {
    variants: {
      default: SCENES.IN_THE_WOODS.OUTSIDE_SUN,
      rain_forest: SCENES.IN_THE_WOODS.OUTSIDE_RAIN,
    },
    thumbnail: inthewoodsOutside,
    wallpaper: WALLPAPERS_URLS.IN_THE_WOODS.OUTSIDE,

    actions: [
      {
        position: [13, 47],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [44, 35],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [78, 40],
        title: 'Forest sound',
        type: 'sound',
        effect: 'forest',
      },
    ],
  },
  lakeHouseInside: {
    variants: {
      default: SCENES.LAKE_HOUSE.INSIDE_DAY,
      default_night: SCENES.LAKE_HOUSE.INSIDE_NIGHT,
      rain_forest: SCENES.LAKE_HOUSE.INSIDE_DAY_RAIN,
      rain_forest_night: SCENES.LAKE_HOUSE.INSIDE_NIGHT_RAIN,
    },
    thumbnail: lakeHouseInside,
    wallpaper: WALLPAPERS_URLS.LAKE_HOUSE.INSIDE,

    actions: [
      {
        position: [28, 47],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [58, 35],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [72, 78],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
    ],
  },
  lakeHouseOutside: {
    variants: {
      default: SCENES.LAKE_HOUSE.OUTSIDE_DAY,
      default_night: SCENES.LAKE_HOUSE.OUTSIDE_NIGHT,
      rain_forest: SCENES.LAKE_HOUSE.OUTSIDE_DAY_RAIN,
      rain_forest_night: SCENES.LAKE_HOUSE.OUTSIDE_NIGHT_RAIN,
    },
    thumbnail: lakeHouseOutside,
    wallpaper: WALLPAPERS_URLS.LAKE_HOUSE.OUTSIDE,

    actions: [
      {
        position: [13, 75],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [46, 45],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [80, 40],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  fuji: {
    variants: {
      default: SCENES.FUJI.DAY,
      default_night: SCENES.FUJI.NIGHT,
    },
    thumbnail: fuji,
    wallpaper: WALLPAPERS_URLS.FUJI,

    actions: [
      {
        position: [4, 50],
        title: 'Forest sound',
        type: 'sound',
        effect: 'forest',
      },
      {
        position: [44, 78],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
      {
        position: [77, 45],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  floating: {
    variants: {
      default: SCENES.FLOATING.DAY,
      default_night: SCENES.FLOATING.NIGHT,
    },
    thumbnail: floating,
    wallpaper: WALLPAPERS_URLS.FLOATING,

    actions: [
      {
        position: [10, 35],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
      {
        position: [25, 55],
        title: 'Ocean',
        type: 'sound',
        effect: 'ocean',
      },
      {
        position: [70, 60],
        title: 'Underwater',
        type: 'sound',
        effect: 'underwater',
      },
    ],
  },
  seaSideInside: {
    variants: {
      default: SCENES.SEASIDE.DAY_ROOM,
      default_night: SCENES.SEASIDE.NIGHT_ROOM,
      storm: SCENES.SEASIDE.DAY_ROOM_RAIN,
      storm_night: SCENES.SEASIDE.NIGHT_ROOM_RAIN,
    },
    thumbnail: seaSideInside,
    wallpaper: WALLPAPERS_URLS.SEASIDE.INSIDE,

    actions: [
      {
        position: [40, 50],
        title: 'Waves',
        type: 'sound',
        effect: 'waves',
      },
      {
        position: [25, 20],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
    ],
  },
  seaSideOutside: {
    variants: {
      default: SCENES.SEASIDE.DAY_OUTSIDE,
      default_night: SCENES.SEASIDE.NIGHT_OUTSIDE,
      storm: SCENES.SEASIDE.DAY_OUTSIDE_RAIN,
      storm_night: SCENES.SEASIDE.NIGHT_OUTSIDE_RAIN,
    },
    thumbnail: seaSideOutside,
    wallpaper: WALLPAPERS_URLS.SEASIDE.OUTSIDE,

    actions: [
      {
        position: [67, 60],
        title: 'Ocean',
        type: 'sound',
        effect: 'ocean',
      },
      {
        position: [40, 60],
        title: 'Waves',
        type: 'sound',
        effect: 'waves',
      },
      {
        position: [65, 25],
        title: 'Summer storm',
        type: 'sound',
        effect: 'storm',
      },
    ],
  },
  sunsetCamping: {
    variants: {
      default: SCENES.SUNSET_CAMPING.SUNNY,
      rain_forest: SCENES.SUNSET_CAMPING.RAINY,
    },
    thumbnail: sunsetCamping,
    wallpaper: WALLPAPERS_URLS.SUNSET_CAMPING,

    actions: [
      {
        position: [63, 76],
        title: 'Campfire sound',
        type: 'sound',
        effect: 'fire',
      },
      {
        position: [34, 38],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [77, 16],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  tokyoNightRamenShop: {
    variants: {
      default: SCENES.TOKYO_NIGHT.RAMEN_SHOP,
      rain_street: SCENES.TOKYO_NIGHT.RAMEN_SHOP_RAIN,
    },
    thumbnail: tokyoNightRamenShop,
    wallpaper: WALLPAPERS_URLS.TOKYO_NIGHT.RAMEN_SHOP,

    actions: [
      {
        position: [68, 28],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [18, 84],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
    ],
  },
  tokyoNightAlley: {
    variants: {
      default: SCENES.TOKYO_NIGHT.ALLEY,
      rain_street: SCENES.TOKYO_NIGHT.ALLEY_RAIN,
    },
    thumbnail: tokyoNightAlley,
    wallpaper: WALLPAPERS_URLS.TOKYO_NIGHT.ALLEY,

    actions: [
      {
        position: [76, 20],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
      {
        position: [30, 80],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [43, 14],
        title: 'Thunders',
        type: 'sound',
        effect: 'thunders',
      },
    ],
  },
  treeHouse: {
    variants: {
      default: SCENES.TREEHOUSE.TREEHOUSE_DAY_SUN,
      default_night: SCENES.TREEHOUSE.TREEHOUSE_NIGHT,
      rain_forest: SCENES.TREEHOUSE.TREEHOUSE_DAY_RAIN,
      rain_forest_night: SCENES.TREEHOUSE.TREEHOUSE_NIGHT_RAIN,
    },
    thumbnail: treeHouse,
    wallpaper: WALLPAPERS_URLS.TREE_HOUSE,

    actions: [
      {
        position: [32, 68],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [63, 45],
        title: 'Forest Rain',
        type: 'sound',
        effect: 'rain_forest',
      },
      {
        position: [72, 25],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
    ],
  },
  winterNight: {
    thumbnail: winterNight,
    wallpaper: WALLPAPERS_URLS.WINTER_NIGHT,
    variants: {
      default: SCENES.WINTERNIGHT.WINTERNIGHT,
      snow: SCENES.WINTERNIGHT.WINTERNIGHT_BLIZZARD,
    },
    actions: [
      {
        position: [37, 66],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [16, 16],
        title: 'Blizzard',
        type: 'sound',
        effect: 'snow',
      },
      {
        position: [49, 29],
        title: 'Wind',
        type: 'sound',
        effect: 'wind',
      },
    ],
  },
  cozyStudio: {
    thumbnail: cozyStudio,
    wallpaper: WALLPAPERS_URLS.COZY_STUDIO,
    variants: {
      default: SCENES.COZY_STUDIO.DAY,
      default_night: SCENES.COZY_STUDIO.NIGHT,
      rain_street: SCENES.COZY_STUDIO.DAY_RAIN,
      rain_street_night: SCENES.COZY_STUDIO.NIGHT_RAIN,
    },
    actions: [
      {
        position: [37, 48],
        title: 'City Traffic',
        type: 'sound',
        effect: 'city',
      },
      {
        position: [66.7, 76],
        title: 'Keyboard',
        type: 'sound',
        effect: 'keyboard',
      },
      {
        position: [64.5, 35.5],
        title: 'City Rain',
        type: 'sound',
        effect: 'rain_street',
      },
    ],
  },
  dreamyForest: {
    thumbnail: dreamyForest,
    wallpaper: WALLPAPERS_URLS.DREAMY_FOREST,
    variants: {
      default: SCENES.DREAMY_FOREST.DAY,
      default_night: SCENES.DREAMY_FOREST.NIGHT,
    },
    actions: [
      {
        position: [8, 25],
        title: 'Birds chirping',
        type: 'sound',
        effect: 'birds',
      },
      {
        position: [50, 73],
        title: 'River',
        type: 'sound',
        effect: 'river',
      },
      {
        position: [80, 27],
        title: 'Forest sound',
        type: 'sound',
        effect: 'forest',
      },
    ],
  },
} as const;

export interface SceneSet {
  _id: string;
  thumbnail: string | StaticImageData;
  name: string;
  scenes: Scene[];
  effects: EffectType[];
  premium?: boolean;
}

export const sets: SceneSet[] = [
  {
    _id: 'cozy_studio',
    thumbnail: cozyStudioPreview,
    name: 'Cozy Studio',
    scenes: [scenes.cozyStudio],
    effects: ['keyboard', 'city', 'rain_street'],
  },

  {
    _id: 'dreamy_forest',
    thumbnail: dreamyForestPreview,
    name: 'Dreamy Forest',
    scenes: [scenes.dreamyForest],
    effects: ['birds', 'forest', 'river'],
  },

  {
    _id: 'dreaming',
    thumbnail: dreamingScene,
    name: 'Am I Dreaming?',
    scenes: [scenes.space, scenes.underwater],
    effects: ['keyboard', 'space', 'underwater'],
  },

  {
    _id: 'winter_night',
    thumbnail: winterNightPreview,
    name: 'Winter Night',
    scenes: [scenes.winterNight],
    effects: ['city', 'wind', 'snow'],
    premium: true,
  },

  {
    _id: 'seoul',
    thumbnail: seoulPreview,
    name: 'Seoul',
    scenes: [scenes.seoulInside, scenes.seoulOutside],
    effects: ['keyboard', 'city', 'rain_street'],
    premium: true,
  },

  {
    _id: 'tree_house',
    thumbnail: treeHousePreview,
    name: 'Tree House',
    scenes: [scenes.treeHouse],
    effects: ['rain_forest', 'birds', 'keyboard'],
    premium: true,
  },

  {
    _id: 'lofi_cafe',
    thumbnail: cafeThumb,
    name: 'Lofi café',
    scenes: [scenes.cafeOutside, scenes.cafeInside],
    effects: ['city', 'rain_street', 'people', 'rain_window'],
    premium: true,
  },

  {
    _id: 'in_the_woods',
    thumbnail: inthewoodsPreview,
    name: 'In the Woods',
    scenes: [scenes.inTheWoodsInside, scenes.inTheWoodsOutside],
    effects: ['rain_forest', 'birds', 'forest'],
    premium: true,
  },

  {
    _id: 'tokyo_night',
    thumbnail: tokyoNightPreview,
    name: 'Tokyo Night',
    scenes: [scenes.tokyoNightRamenShop, scenes.tokyoNightAlley],
    effects: ['city', 'rain_street', 'thunders'],
    premium: true,
  },

  {
    _id: 'lake_house',
    thumbnail: lakeHousePreview,
    name: 'Lake House',
    scenes: [scenes.lakeHouseOutside, scenes.lakeHouseInside],
    effects: ['rain_forest', 'birds', 'keyboard'],
    premium: true,
  },

  {
    _id: 'sunset_camping',
    thumbnail: sunsetCampingPreview,
    name: 'Sunset Camping',
    scenes: [scenes.sunsetCamping],
    effects: ['rain_forest', 'birds', 'fire'],
    premium: true,
  },

  {
    _id: 'sea_side',
    thumbnail: seaSidePreview,
    name: 'Sea Side',
    scenes: [scenes.seaSideInside, scenes.seaSideOutside],
    effects: ['ocean', 'waves', 'storm'],
    premium: true,
  },

  {
    _id: 'floating',
    thumbnail: floatingPreview,
    name: 'Floating',
    scenes: [scenes.floating],
    effects: ['wind', 'ocean', 'underwater'],
    premium: true,
  },

  {
    _id: 'fuji',
    thumbnail: fujiPreview,
    name: 'Fuji',
    scenes: [scenes.fuji],
    effects: ['forest', 'river', 'birds'],
    premium: true,
  },

  {
    _id: 'plane',
    thumbnail: planePreview,
    name: 'Above the clouds',
    scenes: [scenes.plane],
    effects: ['keyboard', 'plane', 'brown_noise'],
    premium: true,
  },

  {
    _id: 'artroom',
    thumbnail: artRoomPreview,
    name: 'Art room',
    scenes: [scenes.artRoom],
    effects: ['birds', 'rain_street', 'wind'],
    premium: true,
  },

  {
    _id: 'library',
    thumbnail: libraryPreview,
    name: 'Library',
    scenes: [scenes.library],
    effects: ['thunders', 'window_rain', 'fireplace'],
    premium: true,
  },

  {
    _id: 'slowgarden',
    thumbnail: slowGardenPreview,
    name: 'Slow Garden',
    scenes: [scenes.slowGarden],
    effects: ['river', 'birds', 'wind'],
    premium: true,
  },

  {
    _id: 'noise',
    thumbnail: noisePreview,
    name: 'Noise',
    scenes: [scenes.whiteNoise, scenes.pinkNoise, scenes.brownNoise],
    effects: ['white_noise', 'pink_noise', 'brown_noise'],
    premium: true,
  },

  {
    _id: 'future',
    thumbnail: futurePreview,
    name: 'Future',
    scenes: [scenes.futureBedroom, scenes.futureDesk],
    effects: ['keyboard', 'city', 'space'],
    premium: true,
  },

  {
    _id: 'backseat',
    thumbnail: backseatPreview,
    name: 'Backseat',
    scenes: [scenes.backseat],
    effects: ['city', 'thunders', 'window_rain'],
    premium: true,
  },

  {
    _id: 'green_house',
    thumbnail: greenHousePreview,
    name: 'Green House',
    scenes: [scenes.greenHouse],
    effects: ['rain_forest', 'river', 'birds'],
    premium: true,
  },

  {
    _id: 'new_york',
    thumbnail: newYorkPreview,
    name: 'New York',
    scenes: [scenes.newYorkBedroom, scenes.newYorkCentralPark],
    effects: ['city', 'rain_street', 'birds'],
    premium: true,
  },

  {
    _id: 'honolulu',
    thumbnail: honoluluPW,
    name: 'Honolulu',
    scenes: [scenes.honoluluIN, scenes.honoluluOut],
    effects: ['keyboard', 'storm', 'ocean'],
    premium: true,
  },

  {
    _id: 'train_journey',
    thumbnail: trainJourney,
    name: 'Train Journey',
    scenes: [scenes.trainJourneyCity, scenes.trainJourneyCountry],
    effects: ['window_rain', 'train_noise', 'keyboard'],
    premium: true,
  },

  {
    _id: 'kyoto',
    thumbnail: kyoto,
    name: 'Kyoto',
    scenes: [scenes.kyotoStreet, scenes.kyotoPark],
    effects: ['city', 'birds', 'river'],
    premium: true,
  },
  {
    _id: 'chill_vibes',
    thumbnail: chillVibes,
    name: 'Chill Vibes',
    scenes: [scenes.lrBedRoom, scenes.lrLivingRoom],
    effects: ['city', 'rain_street', 'fireplace'],
    premium: true,
  },

  {
    _id: 'book_cafe',
    thumbnail: bookCafe,
    name: 'Book Cafe',
    scenes: [scenes.bookCafeOut, scenes.bookCafeIn],
    effects: ['city', 'rain_street', 'keyboard'],
    premium: true,
  },

  {
    _id: 'cottage',
    thumbnail: cottage,
    premium: true,
    name: 'Northern Lights',
    scenes: [scenes.cottageIn, scenes.cottageOut],
    effects: ['snow', 'keyboard', 'fireplace'],
  },
  {
    _id: 'desk_lofi',
    thumbnail: lofi_desk,
    name: 'Lofi Desk',
    scenes: [scenes.deskCity, scenes.deskBeach, scenes.deskSnow],
    effects: ['city', 'waves', 'snow'],
    premium: true,
  },
  {
    _id: 'forest_house',
    thumbnail: forestThumb,
    name: 'Forest House',
    scenes: [scenes.forestInside, scenes.forestOutside],
    effects: ['rain_forest', 'birds', 'river'],
    premium: true,
  },
  {
    _id: 'ocean_tale',
    thumbnail: oceanThumb,
    name: 'Ocean Tales',
    scenes: [scenes.oceanInside, scenes.oceanOutside],
    effects: ['ocean', 'wind', 'storm'],
    premium: true,
  },
  {
    _id: 'van_life',
    thumbnail: vanThumb,
    name: 'Van Life',
    scenes: [scenes.vanInside, scenes.vanOutside],
    effects: ['fire', 'forest', 'rain_forest'],
    premium: true,
  },

  {
    _id: 'summer_days',
    thumbnail: summerThumb,
    name: 'Summer Days',
    scenes: [scenes.summerInside, scenes.summerOutside],
    effects: ['storm', 'fan', 'waves'],
    premium: true,
  },
];
