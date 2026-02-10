import { Composition } from 'remotion';
import { LoadingAnimation } from './components/LoadingAnimation';
import { OgImageCard } from './components/OgImageCard';

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="LoadingAnimation"
        component={LoadingAnimation}
        durationInFrames={60} // 2 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="OgImageCard"
        component={OgImageCard}
        durationInFrames={1}
        fps={1}
        width={1200}
        height={630}
        defaultProps={{}}
      />
    </>
  );
};
