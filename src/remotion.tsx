import { Composition } from 'remotion';
import { LoadingAnimation } from './components/LoadingAnimation';

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
    </>
  );
};