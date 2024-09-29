export const BASE_URL =
  'https://firebasestorage.googleapis.com/v0/b/share-music-91d8a.appspot.com/o/';

export const getMediaUrl = (path: string) => {
  return `${BASE_URL}${
    path.startsWith('/') ? encodeURIComponent(path.slice(1)) : encodeURIComponent(path)
  }?alt=media`;
};

export const ALARMS_URLS = {
  DIGITAL: getMediaUrl('alarms/Digital.mp3'),
  EASY_TONE: getMediaUrl('alarms/Easy+Tone.mp3'),
  PIANO: getMediaUrl('alarms/Piano.mp3'),
  RINGTONE: getMediaUrl('alarms/Ringtone.mp3'),
  SOFT: getMediaUrl('alarms/Soft.mp3'),
};

export const WALLPAPERS_URLS = {
  AM_I_DREAMING: {
    SPACE_WP: getMediaUrl('wallpapers/am-i-dreaming/space-wp.png'),
    UNDERWATER_WP: getMediaUrl('wallpapers/am-i-dreaming/underwater-wp.png'),
  },
  ART_ROOM: getMediaUrl('wallpapers/artroom/artroom.jpg'),
  BACKSEAT: getMediaUrl('wallpapers/backseat/drive.png'),
  BOOK_CAFE: {
    EXT: getMediaUrl('wallpapers/book-cafe/ext.png'),
    INT: getMediaUrl('wallpapers/book-cafe/int.png'),
  },
  CHILL_VIBES: {
    LIVING_ROOM: getMediaUrl('wallpapers/chill-vibes/living-room.png'),
    OFFICE: getMediaUrl('wallpapers/chill-vibes/office.png'),
  },
  COTTAGE: {
    EXT: getMediaUrl('wallpapers/cottage/exterior.png'),
    INT: getMediaUrl('wallpapers/cottage/interior.png'),
  },
  COZY_STUDIO: getMediaUrl('wallpapers/cozy_studio/studio_day.png'),
  DREAMY_FOREST: getMediaUrl('wallpapers/dreamy-forest/forestimage.jpeg'),
  FLOATING: getMediaUrl('wallpapers/floating/floating.jpg'),
  FOREST_HOUSE: {
    FOREST_HOUSE_1: getMediaUrl('wallpapers/forest-house/forest1.jpg'),
    FOREST_HOUSE_2: getMediaUrl('wallpapers/forest-house/forest2.jpg'),
  },
  FUJI: getMediaUrl('wallpapers/fuji/fuji2.jpg'),
  FUTURE: {
    BEDROOM_GALAXY: getMediaUrl('wallpapers/future/bedroom-galaxy.png'),
    DESK_GALAXY: getMediaUrl('wallpapers/future/desk-galaxy.png'),
  },
  GREEN_HOUSE: getMediaUrl('wallpapers/green-house/garden.png'),
  HONOHULU: {
    BALCONY: getMediaUrl('wallpapers/honolulu/honolulu-balcony.png'),
    BEACH: getMediaUrl('wallpapers/honolulu/honolulu-beach.png'),
  },
  IN_THE_WOODS: {
    INSIDE: getMediaUrl('wallpapers/inthewoods/inside.jpg'),
    OUTSIDE: getMediaUrl('wallpapers/inthewoods/outside.jpg'),
  },
  KYOTO: {
    PARK: getMediaUrl('wallpapers/kyoto/kyoto-park.png'),
    STREET: getMediaUrl('wallpapers/kyoto/kyoto-street.png'),
  },
  LAKE_HOUSE: {
    INSIDE: getMediaUrl('wallpapers/lake-house/inside-day.jpg'),
    OUTSIDE: getMediaUrl('wallpapers/lake-house/outside-day.jpg'),
  },
  LIBRARY: getMediaUrl('wallpapers/library/library.png'),
  LOFI_CAFE: {
    CAFE_1: getMediaUrl('wallpapers/lofi-cafe/cafe1.jpg'),
    CAFE_2: getMediaUrl('wallpapers/lofi-cafe/cafe2.jpg'),
  },
  NEW_YORK: {
    DAY: getMediaUrl('wallpapers/new-york/bedroom-day.png'),
    PARK: getMediaUrl('wallpapers/new-york/central-park.png'),
  },
  NOISE: {
    BROWN: getMediaUrl('wallpapers/noise/brown.jpg'),
    WHITE: getMediaUrl('wallpapers/noise/white.jpg'),
    PINK: getMediaUrl('wallpapers/noise/white.jpg'),
  },
  OCEAN_TALES: {
    INSIDE: getMediaUrl('wallpapers/ocean-tales/inside.png'),
    OUTSIDE: getMediaUrl('wallpapers/ocean-tales/outside.png'),
  },
  PLANE: getMediaUrl('wallpapers/plane/plane.png'),
  SEASIDE: {
    OUTSIDE: getMediaUrl('wallpapers/seaside/outside.jpg'),
    INSIDE: getMediaUrl('wallpapers/seaside/room.jpg'),
  },
  SEOUL: {
    INDOOR: getMediaUrl('wallpapers/seoul/seoul-indoor.png'),
    OUTDOOR: getMediaUrl('wallpapers/seoul/seoul-outdoor.png'),
  },
  SLOW_GARDEN: getMediaUrl('wallpapers/slowgarden/slowgarden.jpeg'),
  STUDY: {
    BEACH: getMediaUrl('wallpapers/study/beach.jpg'),
    CITY: getMediaUrl('wallpapers/study/city.jpg'),
    SNOW: getMediaUrl('wallpapers/study/snow.jpg'),
  },
  SUMMER: {
    BEACH_1: getMediaUrl('wallpapers/summer/beach1.jpg'),
    BEACH_2: getMediaUrl('wallpapers/summer/beach2.jpg'),
  },
  SUNSET_CAMPING: getMediaUrl('wallpapers/sunset-camping/camping.png'),
  TOKYO_NIGHT: {
    ALLEY: getMediaUrl('wallpapers/tokyo-night/Alley.jpg'),
    RAMEN_SHOP: getMediaUrl('wallpapers/tokyo-night/RamenShop.jpg'),
  },
  TRAIN: {
    CITY: getMediaUrl('wallpapers/train/train-city.png'),
    COUNTRY: getMediaUrl('wallpapers/train/train-country.png'),
  },
  TREE_HOUSE: getMediaUrl('wallpapers/treehouse/treehouse.jpg'),
  VAN: {
    LOFI: getMediaUrl('wallpapers/van/lofi3.jpg'),
    ROOM: getMediaUrl('wallpapers/van/van.jpg'),
  },
  WINTER_NIGHT: getMediaUrl('wallpapers/winternight/winternight.png'),
};

export const OGTRACKS_URLS = {
  CHILL: new Array(24).fill(0).map((_, i) => {
    return getMediaUrl(`ogtracks/chill/chill_${i + 1}.mp3`);
  }),
  JAZZY: new Array(25).fill(0).map((_, i) => {
    return getMediaUrl(`ogtracks/jazzy/jazzy_${i + 1}.mp3`);
  }),
  SLEEPY: new Array(19).fill(0).map((_, i) => {
    return getMediaUrl(`ogtracks/sleepy/sleepy_${i + 1}.mp3`);
  }),
};

export const EFFECTS = {
  AIRPLANE: getMediaUrl('effects/airplane.mp3'),
  BIRDS: getMediaUrl('effects/birds.mp3'),
  BROWN_NOISE: getMediaUrl('effects/brown-noise.mp3'),
  CAMPFIRE: getMediaUrl('effects/campfire.mp3'),
  CITY_TRAFFIC: getMediaUrl('effects/city_traffic.mp3'),
  DEEPSPACE: getMediaUrl('effects/deepspace.mp3'),
  FAN: getMediaUrl('effects/fan.mp3'),
  FIREPLACE: getMediaUrl('effects/fireplace.mp3'),
  FOREST_NIGHT: getMediaUrl('effects/forest-night.mp3'),
  KEYBOARD: getMediaUrl('effects/keyboard.mp3'),
  OCEAN: getMediaUrl('effects/ocean.mp3'),
  PEOPLE_TALK_INSIDE: getMediaUrl('effects/people_talk_inside.mp3'),
  PINK_NOISE: getMediaUrl('effects/pink-noise.mp3'),
  RAIN_CITY: getMediaUrl('effects/rain_city.mp3'),
  RAIN_FOREST: getMediaUrl('effects/rain_forest.mp3'),
  RIVER: getMediaUrl('effects/river.mp3'),
  SNOW: getMediaUrl('effects/snow.mp3'),
  SUMMER_STORM: getMediaUrl('effects/summer_storm.mp3'),
  THUNDERS: getMediaUrl('effects/thunders.mp3'),
  TRAIN: getMediaUrl('effects/train.mp3'),
  UNDERWATER: getMediaUrl('effects/underwater.mp3'),
  WAVES: getMediaUrl('effects/waves.mp3'),
  WHITE_NOISE: getMediaUrl('effects/white-noise.mp3'),
  WIND: getMediaUrl('effects/wind.mp3'),
  WINDOW_RAIN: getMediaUrl('effects/window_rain.mp3'),
};

export const SCENES = {
  AM_I_DREAMING: {
    SPACE: getMediaUrl('scenes/am-i-dreaming/space.mp4'),
    UNDERWATER: getMediaUrl('scenes/am-i-dreaming/underwater.mp4'),
  },
  ARTROOM: {
    DAY_RAIN: getMediaUrl('scenes/artroom/day-rain.mp4'),
    DAY: getMediaUrl('scenes/artroom/day.mp4'),
    NIGHT: getMediaUrl('scenes/artroom/night.mp4'),
    NIGHT_RAIN: getMediaUrl('scenes/artroom/night-rain.mp4'),
  },
  BACKSEAT: {
    BACKSEAT_NIGHT_RAIN: getMediaUrl('scenes/backseat/backseat-night-rain.mp4'),
    BACKSEAT_NIGHT: getMediaUrl('scenes/backseat/backseat-night.mp4'),
  },
  BOOK_CAFE: {
    EXTERIOR_DAY: getMediaUrl('scenes/book-cafe/exterior-day.mp4'),
    EXTERIOR_NIGHT: getMediaUrl('scenes/book-cafe/exterior-night.mp4'),
    EXTERIOR_RAINY_DAY: getMediaUrl('scenes/book-cafe/exterior-rainy-day.mp4'),
    EXTERIOR_RAINY_NIGHT: getMediaUrl('scenes/book-cafe/exterior-rainy-night.mp4'),
    INTERIOR_NIGHT: getMediaUrl('scenes/book-cafe/interior-night.mp4'),
    INTERIOR_RAINY_NIGHT: getMediaUrl('scenes/book-cafe/interior-rainy-night.mp4'),
    INTERIOR_RAINY_DAY: getMediaUrl('scenes/book-cafe/interior-rainy-day.mp4'),
    INTERIOR_SUNNY_DAY: getMediaUrl('scenes/book-cafe/interior-sunny-day.mp4'),
  },
  CAFE: {
    INSDE_NIGHT_RAIN: getMediaUrl('scenes/cafe/inside-night-rain.mp4'),
    INSIDE_NIGHT: getMediaUrl('scenes/cafe/inside-night.mp4'),
    INSIDE_RAIN: getMediaUrl('scenes/cafe/inside-rain.mp4'),
    INSIDE: getMediaUrl('scenes/cafe/inside.mp4'),
    OUTSIDE_NIGHT_RAIN: getMediaUrl('scenes/cafe/outside-night-rain.mp4'),
    OUTSIDE_NIGHT: getMediaUrl('scenes/cafe/outside-night.mp4'),
    OUTSIDE_RAIN: getMediaUrl('scenes/cafe/outside-rain.mp4'),
    OUTSIDE: getMediaUrl('scenes/cafe/outside.mp4'),
  },
  CHILL_VIBES: {
    BED_DAY: getMediaUrl('scenes/chill-vibes/bed-day.mp4'),
    BED_RAINY_DAY: getMediaUrl('scenes/chill-vibes/bed-rainy-day.mp4'),
    BED_RAINY_NIGHT: getMediaUrl('scenes/chill-vibes/bed-rainy-night.mp4'),
    BED_STARRY_NIGHT: getMediaUrl('scenes/chill-vibes/bed-starry-night.mp4'),
    LIVING_DAY: getMediaUrl('scenes/chill-vibes/living-day.mp4'),
    LIVING_RAINY_DAY: getMediaUrl('scenes/chill-vibes/living-rainy-day.mp4'),
    LIVING_RAINY_NIGHT: getMediaUrl('scenes/chill-vibes/lving-rainy-night.mp4'),
    LIVING_STARRY_NIGHT: getMediaUrl('scenes/chill-vibes/living-strarry-night.mp4'),
  },
  COTTAGE: {
    EXTERIOR_FINAL: getMediaUrl('scenes/cottage/cottage-exterior-final.mp4'),
    EXTERIOR_SNOW: getMediaUrl('scenes/cottage/cottage-exterior-snow.mp4'),
    INTERIOR_FINAL: getMediaUrl('scenes/cottage/cottage-interior-final.mp4'),
    INTERIOR_SNOW: getMediaUrl('scenes/cottage/cottage-interior-snow.mp4'),
  },
  COZY_STUDIO: {
    DAY: getMediaUrl('scenes/cozy-studio/Studio_day.mp4'),
    NIGHT: getMediaUrl('scenes/cozy-studio/Studio_night.mp4'),
    DAY_RAIN: getMediaUrl('scenes/cozy-studio/Studio_day_rain.mp4'),
    NIGHT_RAIN: getMediaUrl('scenes/cozy-studio/Studio_night_rain.mp4'),
  },
  DREAMY_FOREST: {
    DAY: getMediaUrl('scenes/dreamy-forest/Forest-day.mp4'),
    NIGHT: getMediaUrl('scenes/dreamy-forest/Forest-night.mp4'),
  },
  FLOATING: {
    DAY: getMediaUrl('scenes/floating/day.mp4'),
    NIGHT: getMediaUrl('scenes/floating/night.mp4'),
  },
  FOREST: {
    INSIDE_PIX: getMediaUrl('scenes/forest/inside-pix.mp4'),
    INSIDE: getMediaUrl('scenes/forest/inside.mp4'),
    INSIDE_RAIN_PIX: getMediaUrl('scenes/forest/inside-rain-pix.mp4'),
    INSIDE_RAIN: getMediaUrl('scenes/forest/inside-rain.mp4'),
    OUTSIDE_PIX: getMediaUrl('scenes/forest/outside-pix.mp4'),
    OUTSIDE: getMediaUrl('scenes/forest/outside.mp4'),
    OUTSIDE_RAIN_PIX: getMediaUrl('scenes/forest/outside-rain-pix.mp4'),
    OUTSIDE_RAIN: getMediaUrl('scenes/forest/outside-rain.mp4'),
  },
  FUJI: {
    DAY: getMediaUrl('scenes/fuji/Day.mp4'),
    NIGHT: getMediaUrl('scenes/fuji/Night.mp4'),
  },
  FUTURE: {
    BEDROOM_CITY: getMediaUrl('scenes/future/bedroom-city.mp4'),
    BEDROOM_GALAXY: getMediaUrl('scenes/future/bedroom-galaxy.mp4'),
    DESK_CITY: getMediaUrl('scenes/future/desk-city.mp4'),
    DESK_GALAXY: getMediaUrl('scenes/future/desk-galaxy.mp4'),
  },
  GREEN_HOUSE: {
    GARDEN_DAY: getMediaUrl('scenes/green-house/garden-day.mp4'),
    GARDEN_NIGHT: getMediaUrl('scenes/green-house/garden-night.mp4'),
    GARDEN_DAY_RAIN: getMediaUrl('scenes/green-house/garden-day-rain.mp4'),
    GARDEN_NIGHT_RAIN: getMediaUrl('scenes/green-house/garden-night-rain.mp4'),
  },
  HONOHULU: {
    INSIDE_DAY_RAIN: getMediaUrl('scenes/honolulu/inside-day-rain.mp4'),
    INSIDE_DAY: getMediaUrl('scenes/honolulu/inside-day.mp4'),
    INSIDE_NIGHT_RAIN: getMediaUrl('scenes/honolulu/inside-night-rain.mp4'),
    INSIDE_NIGHT: getMediaUrl('scenes/honolulu/inside-night.mp4'),
    OUTSIDE_DAY_RAIN: getMediaUrl('scenes/honolulu/outside-day-rain.mp4'),
    OUTSIDE_DAY: getMediaUrl('scenes/honolulu/outside-day.mp4'),
    OUTSIDE_NIGHT_RAIN: getMediaUrl('scenes/honolulu/outside-night-rain.mp4'),
    OUTSIDE_NIGHT: getMediaUrl('scenes/honolulu/outside-night.mp4'),
  },
  IN_THE_WOODS: {
    INSIDE_RAIN: getMediaUrl('scenes/in-the-woods/inside-rain.mp4'),
    INSIDE_SUN: getMediaUrl('scenes/in-the-woods/inside-sun.mp4'),
    OUTSIDE_RAIN: getMediaUrl('scenes/in-the-woods/outside-rain.mp4'),
    OUTSIDE_SUN: getMediaUrl('scenes/in-the-woods/outside-sun.mp4'),
  },
  KYOTO: {
    PARK_DAY: getMediaUrl('scenes/kyoto/kyoto-park-day.mp4'),
    PARK_NIGHT: getMediaUrl('scenes/kyoto/kyoto-park-night.mp4'),
    STREET_DAY: getMediaUrl('scenes/kyoto/kyoto-street-day.mp4'),
    STREET_NIGHT: getMediaUrl('scenes/kyoto/kyoto-street-night.mp4'),
  },
  LAKE_HOUSE: {
    INSIDE_DAY: getMediaUrl('scenes/lake-house/Inside-Day.mp4'),
    INSIDE_DAY_RAIN: getMediaUrl('scenes/lake-house/Inside-Day-Rain.mp4'),
    INSIDE_NIGHT: getMediaUrl('scenes/lake-house/Inside-Night.mp4'),
    INSIDE_NIGHT_RAIN: getMediaUrl('scenes/lake-house/Inside-Night-Rain.mp4'),
    OUTSIDE_DAY: getMediaUrl('scenes/lake-house/Outside-Day.mp4'),
    OUTSIDE_DAY_RAIN: getMediaUrl('scenes/lake-house/Outside-Day-Rain.mp4'),
    OUTSIDE_NIGHT: getMediaUrl('scenes/lake-house/outside-night.mp4'),
    OUTSIDE_NIGHT_RAIN: getMediaUrl('scenes/lake-house/outside-night-rain.mp4'),
  },
  LIBRARY: {
    NO_RAIN: getMediaUrl('scenes/library/library-norain.mp4'),
    RAIN: getMediaUrl('scenes/library/library-rain.mp4'),
  },
  NEW_YORK: {
    BEDROOM_DAY: getMediaUrl('scenes/new-york/bedroom-day.mp4'),
    BEDROOM_NIGHT: getMediaUrl('scenes/new-york/bedroom-night.mp4'),
    BEDROOM_RAINY_DAY: getMediaUrl('scenes/new-york/bedroom-rainy-day.mp4'),
    BEDROOM_RAINY_NIGHT: getMediaUrl('scenes/new-york/bedroom-rainy-night.mp4'),
    CENTRAL_PARK_DAY: getMediaUrl('scenes/new-york/central-park-day.mp4'),
    CENTRAL_PARK_NIGHT: getMediaUrl('scenes/new-york/central-park-night.mp4'),
    CENTRAL_PARK_RAINY_DAY: getMediaUrl('scenes/new-york/central-park-rainy-day.mp4'),
    CENTRAL_PARK_RAINY_NIGHT: getMediaUrl('scenes/new-york/central-park-rainy-night.mp4'),
  },
  NOISE: {
    BROWN: getMediaUrl('scenes/noise/brown.mp4'),
    WHITE: getMediaUrl('scenes/noise/white.mp4'),
    PINK: getMediaUrl('scenes/noise/pink.mp4'),
  },
  OCEAN: {
    OCEAN_TALES_OUT_RAIN: getMediaUrl('scenes/ocean-tales/ocean-tales-out-rain.mp4'),
    OCEAN_TALES_OUT: getMediaUrl('scenes/ocean-tales/ocean-tales-out.mp4'),
    OCEAN_TALES_RAIN: getMediaUrl('scenes/ocean-tales/ocean-tales-rain.mp4'),
    OCEAN_TALES: getMediaUrl('scenes/ocean-tales/ocean-tales.mp4'),
  },
  PLANE: {
    DAY: getMediaUrl('scenes/plane/plane-day.mp4'),
    NIGHT: getMediaUrl('scenes/plane/plane-night.mp4'),
  },
  SEASIDE: {
    DAY_OUTSIDE: getMediaUrl('scenes/seaside/day-outside.mp4'),
    DAY_OUTSIDE_RAIN: getMediaUrl('scenes/seaside/day-outside-rain.mp4'),
    DAY_ROOM: getMediaUrl('scenes/seaside/day-room.mp4'),
    DAY_ROOM_RAIN: getMediaUrl('scenes/seaside/day-room-rain.mp4'),
    NIGHT_OUTSIDE: getMediaUrl('scenes/seaside/night-outside.mp4'),
    NIGHT_OUTSIDE_RAIN: getMediaUrl('scenes/seaside/night-outside-rain.mp4'),
    NIGHT_ROOM: getMediaUrl('scenes/seaside/night-room.mp4'),
    NIGHT_ROOM_RAIN: getMediaUrl('scenes/seaside/night-room-rain.mp4'),
  },
  SEOUL: {
    OUTSIDE_DAY_RAIN: getMediaUrl('scenes/seoul/Outside-day-rain.mp4'),
    INSIDE_DAY_RAIN: getMediaUrl('scenes/seoul/inside-day-rain.mp4'),
    INSIDE_DAY: getMediaUrl('scenes/seoul/inside-day.mp4'),
    INSIDE_NIGHT_RAIN: getMediaUrl('scenes/seoul/inside-night-rain.mp4'),
    INSIDE_NIGHT: getMediaUrl('scenes/seoul/inside-night.mp4'),
    OUTSIDE_DAY: getMediaUrl('scenes/seoul/outside-day.mp4'),
    OUTSIDE_NIGHT_RAIN: getMediaUrl('scenes/seoul/outside-night-rain.mp4'),
    OUTSIDE_NIGHT: getMediaUrl('scenes/seoul/outside-night.mp4'),
  },
  SLOW_GARDEN: {
    DAY: getMediaUrl('scenes/slowgarden/slow-garden-day.mp4'),
    NIGHT: getMediaUrl('scenes/slowgarden/slow-garden-night.mp4'),
  },
  STUDY: {
    BEACH_SCENE: getMediaUrl('scenes/study/beach-scene.mp4'),
    CITY_SCENE: getMediaUrl('scenes/study/city-scene.mp4'),
    SNOW_BLIZZARD_SCENE: getMediaUrl('scenes/study/snow-blizzard-scene.mp4'),
    SNOW_SCENE: getMediaUrl('scenes/study/snow-scene.mp4'),
  },
  SUMMER: {
    SUMMER_OUT_PIXEL: getMediaUrl('scenes/summer/summer-out-pixel.mp4'),
    SUMMER_OUT: getMediaUrl('scenes/summer/summer-out.mp4'),
    SUMMER_OUT_RAIN: getMediaUrl('scenes/summer/summer-out-rain.mp4'),
    SUMMER_OUT_RAIN_PIXEL: getMediaUrl('scenes/summer/summer-out-rain-pixel.mp4'),
    SUMMER_PIX: getMediaUrl('scenes/summer/summer-pix.mp4'),
    SUMMER: getMediaUrl('scenes/summer/summer.mp4'),
    SUMMER_RAIN_PIXEL: getMediaUrl('scenes/summer/summer-rain-pixel.mp4'),
    SUMMER_RAIN: getMediaUrl('scenes/summer/summer-rain.mp4'),
  },
  SUNSET_CAMPING: {
    SUNNY: getMediaUrl('scenes/sunset-camping/Sunny.mp4'),
    RAINY: getMediaUrl('scenes/sunset-camping/rainy.mp4'),
  },
  TOKYO_NIGHT: {
    ALLEY_RAIN: getMediaUrl('scenes/tokyo-night/Alley-Rain.mp4'),
    ALLEY: getMediaUrl('scenes/tokyo-night/Alley.mp4'),
    RAMEN_SHOP_RAIN: getMediaUrl('scenes/tokyo-night/RamenShop-Rain.mp4'),
    RAMEN_SHOP: getMediaUrl('scenes/tokyo-night/RamenShop.mp4'),
  },
  TRAIN: {
    CITY_DAY_RAIN: getMediaUrl('scenes/train/city-day-rain.mp4'),
    CITY_DAY: getMediaUrl('scenes/train/city-day.mp4'),
    CITY_NIGHT_RAIN: getMediaUrl('scenes/train/city-night-rain.mp4'),
    CITY_NIGHT: getMediaUrl('scenes/train/city-night.mp4'),
    COUNTRY_DAY_RAIN: getMediaUrl('scenes/train/country-day-rain.mp4'),
    COUNTRY_DAY: getMediaUrl('scenes/train/country-day.mp4'),
    COUNTRY_NIGHT_RAIN: getMediaUrl('scenes/train/country-night-rain.mp4'),
    COUNTRY_NIGHT: getMediaUrl('scenes/train/country-night.mp4'),
  },
  TREEHOUSE: {
    TREEHOUSE_DAY_RAIN: getMediaUrl('scenes/treehouse/treehouse_day_rain.mp4'),
    TREEHOUSE_DAY_SUN: getMediaUrl('scenes/treehouse/treehouse_day_sun.mp4'),
    TREEHOUSE_NIGHT_RAIN: getMediaUrl('scenes/treehouse/treehouse_night_rain.mp4'),
    TREEHOUSE_NIGHT: getMediaUrl('scenes/treehouse/treehouse_night.mp4'),
  },
  VAN: {
    VAN_OUT_FIRE: getMediaUrl('scenes/van/van-out-fire.mp4'),
    VAN_OUT: getMediaUrl('scenes/van/van-out.mp4'),
    VAN_RAIN: getMediaUrl('scenes/van/van-rain.mp4'),
    VAN: getMediaUrl('scenes/van/van.mp4'),
  },
  WINTERNIGHT: {
    WINTERNIGHT: getMediaUrl('scenes/winternight/winternight.mp4'),
    WINTERNIGHT_BLIZZARD: getMediaUrl('scenes/winternight/winternight_blizzard.mp4'),
  },
};
