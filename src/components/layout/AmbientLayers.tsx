export default function AmbientLayers() {
  return (
    <>
      <div className="mesh"></div>
      <div className="grain"></div>
      <div id="portal">
        <div className="portal-bg"></div>
        <div className="portal-ring ring-one"></div>
        <div className="portal-ring ring-two"></div>
        <div className="portal-orbit"></div>
        <div className="portal-copy">
          <span>Crossing into</span>
          <strong id="portal-label">The Other Side</strong>
        </div>
      </div>
    </>
  );
}
