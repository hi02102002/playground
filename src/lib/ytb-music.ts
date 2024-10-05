import YTMusic from 'ytmusic-api';

let instance: YTMusic | null = null;

export const getYTBMusic = async () => {
  if (!instance) {
    const ytbMusic = new YTMusic();

    const init = await ytbMusic.initialize();

    if (init) {
      instance = ytbMusic;
    }

    return instance;
  }

  return instance;
};
