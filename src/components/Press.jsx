import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./press.css";

/**
 * <Press />
 * A self-contained "Recent media coverage" press section.
 *
 * Drop this anywhere:
 *   import Press from "./Press";
 *   <Press />                          // uses the sample items below
 *   <Press items={myPressItems} />     // bring your own data
 *
 * Item shape:
 * {
 *   id: string | number,
 *   badge: "PRESS",                    // small pill label, optional (defaults to "PRESS")
 *   date: "AUG 2024",                  // date/label shown under the title
 *   title: "Architects and Interiors India",
 *   description: "The One Villa Residence by Harkaran Boparai featured in A+D, August 2024.",
 *   images: ["/press/one-villa.jpg"],  // 1 or more images -> multi-image items get a gallery in the modal
 *   href: "https://..."                // optional -> shown as "View article" in the modal, omit to show "Article link not available"
 * }
 */

const SAMPLE_ITEMS = [
  {
    id: "aid-2024",
    badge: "PRESS",
    date: "AUG 2024",
    title: "Architects and Interiors India",
    description: "The One Villa Residence by Harkaran Boparai featured in A+D, August 2024.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    ],
    href: "",
  },
  {
    id: "dialogues-2025",
    badge: "PRESS",
    date: "JUNE 2025",
    title: "Dialogues By Nirmals",
    description: "Sidney House / HBS Architecture",
    images: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    ],
    href: "https://example.com/dialogues-by-nirmals",
  },
  {
    id: "index-saudi-2024",
    badge: "PRESS",
    date: "2024",
    title: "Index Saudi",
    description: "Harkaran Boparai on the panel of Index Saudi at Riyadh, 2024.",
    images: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1600&auto=format&fit=crop",
    ],
    href: "",
  },
  {
    id: "good-homes-2022",
    badge: "PRESS",
    date: "JULY 2022",
    title: "Good Homes India",
    description: "The Cove House featured on Good Homes Magazine.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    ],
    href: "",
  },
];

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: direction === "right" ? "rotate(180deg)" : "none" }}
      aria-hidden="true"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 3H3V9M15 3H21V9M9 21H3V15M15 21H21V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageStackIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="15" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 15L10.2 11.5L13 14L16.5 10L18.5 12.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function Press({
  eyebrow = "(07) PRESS",
  heading = "Recent media coverage.",
  headingEmphasis = "media",
  description = "A selection of recent features, interviews and project publications from across the architecture press.",
  verticalLabel = "(BESPOKE LIVING SPACES — STUDIO)",
  items = SAMPLE_ITEMS,
  ctaLabel = "Get in touch",
  onCtaClick,
}) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState({ open: false, itemIndex: 0, imageIndex: 0 });

  const headingParts = useMemo(() => {
    if (!headingEmphasis) return [heading, "", ""];
    const idx = heading.indexOf(headingEmphasis);
    if (idx === -1) return [heading, "", ""];
    return [
      heading.slice(0, idx),
      heading.slice(idx, idx + headingEmphasis.length),
      heading.slice(idx + headingEmphasis.length),
    ];
  }, [heading, headingEmphasis]);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset =
      cardRect.left -
      trackRect.left +
      track.scrollLeft -
      (trackRect.width - cardRect.width) / 2;
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = Math.min(prev + 1, items.length - 1);
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex, items.length]);

  // Track which card is centered while the user scrolls/drags the strip.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = null;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const trackRect = track.getBoundingClientRect();
        const center = trackRect.left + trackRect.width / 2;
        let closest = 0;
        let closestDistance = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const openModal = useCallback((itemIndex, imageIndex = 0) => {
    setModal({ open: true, itemIndex, imageIndex });
  }, []);

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  const modalItem = items[modal.itemIndex];
  const modalImages = modalItem?.images ?? [];

  const modalPrevImage = useCallback(() => {
    setModal((m) => ({
      ...m,
      imageIndex: (m.imageIndex - 1 + modalImages.length) % modalImages.length,
    }));
  }, [modalImages.length]);

  const modalNextImage = useCallback(() => {
    setModal((m) => ({
      ...m,
      imageIndex: (m.imageIndex + 1) % modalImages.length,
    }));
  }, [modalImages.length]);

  // Keyboard controls while the modal is open.
  useEffect(() => {
    if (!modal.open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalPrevImage();
      if (e.key === "ArrowRight") modalNextImage();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modal.open, closeModal, modalPrevImage, modalNextImage]);

  return (
    <section className="press-section">
      {verticalLabel && <div className="press-vertical-label">{verticalLabel}</div>}

      <header className="press-header">
        <div className="press-header__left">
          <p className="press-eyebrow">{eyebrow}</p>
          <h2 className="press-heading">
            {headingParts[0]}
            <em>{headingParts[1]}</em>
            {headingParts[2]}
          </h2>
        </div>
        <p className="press-description">{description}</p>
      </header>

      <div className="press-carousel">
        <button
          type="button"
          className="press-nav press-nav--prev"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="press-track" ref={trackRef}>
          {items.map((item, i) => (
            <article
              key={item.id ?? i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`press-card${i === activeIndex ? " is-active" : ""}`}
            >
              <button
                type="button"
                className="press-card__media"
                onClick={() => openModal(i, 0)}
                aria-label={`Open ${item.title}`}
              >
                <img src={item.images?.[0]} alt={item.title} loading="lazy" />
                <span className="press-card__badge">
                  <span className="press-dot" />
                  {item.badge ?? "PRESS"}
                </span>
                {item.images?.length > 1 && (
                  <span className="press-card__count">
                    <ImageStackIcon />
                    {String(item.images.length).padStart(2, "0")}
                  </span>
                )}
              </button>

              <div className="press-card__body">
                <div className="press-card__title-row">
                  <h3 className="press-card__title">{item.title}</h3>
                  <button
                    type="button"
                    className="press-card__expand"
                    onClick={() => openModal(i, 0)}
                    aria-label={`Expand ${item.title}`}
                  >
                    <ExpandIcon />
                  </button>
                </div>
                <p className="press-card__date">{item.date}</p>
                <p className="press-card__desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="press-nav press-nav--next"
          onClick={handleNext}
          disabled={activeIndex === items.length - 1}
          aria-label="Next"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="press-dots" role="tablist" aria-label="Press items">
        {items.map((item, i) => (
          <button
            key={item.id ?? i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to ${item.title}`}
            className={`press-dots__dot${i === activeIndex ? " is-active" : ""}`}
            onClick={() => {
              setActiveIndex(i);
              scrollToIndex(i);
            }}
          />
        ))}
      </div>

      {ctaLabel && (
        <button type="button" className="press-cta" onClick={onCtaClick}>
          <span className="press-dot press-dot--cta" />
          {ctaLabel}
        </button>
      )}

      {modal.open && modalItem && (
        <div
          className="press-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="press-modal" role="dialog" aria-modal="true" aria-label={modalItem.title}>
            <div className="press-modal__header">
              <div>
                <p className="press-modal__eyebrow">
                  PRESS · {modalItem.date}
                </p>
                <h3 className="press-modal__title">{modalItem.title}</h3>
                {modalItem.description && (
                  <p className="press-modal__desc">{modalItem.description}</p>
                )}
              </div>
              <button
                type="button"
                className="press-modal__close"
                onClick={closeModal}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="press-modal__media">
              <img
                src={modalImages[modal.imageIndex]}
                alt={`${modalItem.title} ${modal.imageIndex + 1}`}
              />
              {modalImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="press-modal__arrow press-modal__arrow--left"
                    onClick={modalPrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    className="press-modal__arrow press-modal__arrow--right"
                    onClick={modalNextImage}
                    aria-label="Next image"
                  >
                    <ChevronIcon direction="right" />
                  </button>
                </>
              )}
            </div>

            <div className="press-modal__footer">
              <span>
                {modalImages.length} IMAGE{modalImages.length !== 1 ? "S" : ""} · ESC / ← / → KEYS SUPPORTED
              </span>
              {modalItem.href ? (
                <a href={modalItem.href} target="_blank" rel="noreferrer">
                  VIEW ARTICLE →
                </a>
              ) : (
                <span className="press-modal__no-link">ARTICLE LINK NOT AVAILABLE</span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}