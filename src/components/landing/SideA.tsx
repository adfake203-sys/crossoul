
import Hero from './Hero';
import Manifesto from './Manifesto';
import Journey from './Journey';
import MVPGame from '../animations/MVPGame';
import Countdown from './Countdown';
import Founders from './Founders';

interface SideAProps {
  isVisible: boolean;
  onJoinWaitlist: () => void;
  onSwitchSide: () => void;
  onError: (msg: string) => void;
}

export default function SideA({ isVisible, onJoinWaitlist, onSwitchSide, onError }: SideAProps) {
  return (
    <div id="sa" style={{ display: isVisible ? 'block' : 'none' }}>
      <Hero onJoinWaitlist={onJoinWaitlist} onSwitchSide={onSwitchSide} />
      <Manifesto />
      <Journey />
      <MVPGame onJoinWaitlist={onJoinWaitlist} onError={onError} />
      <Countdown onJoinWaitlist={onJoinWaitlist} />
      <Founders />
    </div>
  );
}
