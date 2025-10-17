export const prepareAudio = url =>
  new Promise(resolve => {
    const audio = new Audio(url);
    audio.onloadedmetadata = () => resolve(audio);
  });
