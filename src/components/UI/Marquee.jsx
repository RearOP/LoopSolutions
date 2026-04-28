import { marqueeItems } from '../../data/content';

export default function Marquee() {
  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-section">
      <div className="marquee__track">
        {doubledItems.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </section>
  );
}
