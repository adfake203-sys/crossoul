
import ThreadsHero from './ThreadsHero';
import Chapter1 from './Chapter1';
import Chapter2 from './Chapter2';
import Psychology from './Psychology';
import Chapter4 from './Chapter4';
import Epilogue from './Epilogue';
import Gallery from './Gallery';

interface SideBProps {
  isVisible: boolean;
  onJoinWaitlist: () => void;
}

export default function SideB({ isVisible, onJoinWaitlist }: SideBProps) {
  return (
    <div id="sb" style={{ display: isVisible ? 'block' : 'none' }}>
      <ThreadsHero onJoinWaitlist={onJoinWaitlist} />
      <Chapter1 />
      <Chapter2 />
      <Psychology />
      <Chapter4 />
      <Epilogue />
      <Gallery />
    </div>
  );
}
