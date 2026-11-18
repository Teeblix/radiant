import { useState } from "react";
import CollectionBadge from "../components/CollectionBadge";
import WipeImage from "../components/WipeImage";
import ProceedButton from "../components/ProceedButton";
import ExploreLink from "../components/ExploreLink";
import useInView from "../lib/useInView";

import cartRound from "../assets/icons/cart-round.svg";
import qtyMinus from "../assets/icons/qty-minus.svg";
import qtyPlus from "../assets/icons/qty-plus.svg";
import arrowDown from "../assets/icons/arrow-down.svg";

/**
 * NEWEST / SUMMER COLLECTION (Figma node 3:92), desktop and laptop.
 *
 * The comp is drawn on a 1332px content width, but the shell is wider now that
 * the gutter is 40px, so horizontal positions are expressed as percentages of
 * that original width and the rules, images and copy keep their relationships
 * at any shell size. Vertical offsets stay fixed — the comp's own rhythm.
 *
 * Section-relative geometry:
 *   0    NEWEST block, badge, Explore
 *   209  SUMMER / COLLECTION, right aligned
 *   359  grid: left image, rules, product detail, right image
 *   1072 section ends
 */
const PCT = (px) => `${((px / 1332) * 100).toFixed(3)}%`;

export default function SummerCollection({ images }) {
  const [ref, inView] = useInView({ rootMargin: "-10% 0px" });
  const [qty, setQty] = useState(1);

  /** Merges the reveal onto an element's own classes and styles — spreading
      it would otherwise replace the positioning it is applied to. */
  const rise = (delay, className = "", style = {}) => ({
    className: [
      "transition-[opacity,transform] duration-[800ms] ease-out",
      inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      className,
    ].join(" "),
    style: { ...style, transitionDelay: `${delay}ms` },
  });

  return (
    <>
      {/* Clipped horizontally: the badge ring spins, so its bounding box reaches
        past the gutter at tablet even though the circle it draws does not. */}
      <section
        ref={ref}
        className="relative mt-[80px] overflow-x-clip md:mt-[100px] xl:mt-[120px]"
      >
        <div className="shell relative hidden xl:block">
          {/* ---------------- top row ---------------- */}
          <div className="relative">
            <div className="flex items-start justify-between">
              <div {...rise(0, "flex w-[371px] flex-col gap-[26px]")}>
                <div className="flex flex-col">
                  <h2 className="font-display text-[100px] leading-(--leading-display) text-ink">
                    NEWEST
                  </h2>
                  <p className="text-[20px] leading-[30px] text-body">
                    Step into the sun-kissed season with our latest arrival, the
                    Summer Serenity Collection.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Scroll to collection"
                  className="cursor-pointer"
                >
                  <img src={arrowDown} width="46" height="46" alt="" />
                </button>
              </div>

              <div {...rise(220, "pt-[49px]")}>
                <ExploreLink />
              </div>
            </div>

            <div {...rise(120, "absolute top-[47px]", { left: PCT(595) })}>
              <CollectionBadge />
            </div>
          </div>

          {/* ---------------- SUMMER COLLECTION ---------------- */}
          <h2
            {...rise(
              160,
              "mt-[-123px] text-right font-display text-[100px] leading-[135px] text-ink",
            )}
          >
            SUMMER
            <br />
            COLLECTION
          </h2>

          {/* ---------------- product grid ---------------- */}
          <div className="relative mt-[-120px] h-[713px]">
            {/* hairlines, placed exactly as the comp draws them */}
            <span
              aria-hidden
              className="absolute top-0 h-[545px] w-px bg-body/35"
              style={{ left: PCT(455) }}
            />
            <span
              aria-hidden
              className="absolute top-[168px] h-[545px] w-px bg-body/35"
              style={{ left: PCT(944) }}
            />
            <span
              aria-hidden
              className="absolute left-0 top-[545px] h-px bg-body/35"
              style={{ width: PCT(945) }}
            />
            <span
              aria-hidden
              className="absolute bottom-0 h-px bg-body/35"
              style={{ left: PCT(944), width: PCT(388) }}
            />

            {/* left image, with the cart button straddling its lower edge */}
            <div className="absolute left-0 top-0" style={{ width: PCT(423) }}>
              <WipeImage
                src={images?.left}
                delay={120}
                className="h-[510px] w-full"
              />
              <button
                type="button"
                aria-label="Add to bag"
                className="absolute left-1/2 top-[510px] -translate-x-1/2 -translate-y-[44.5px] cursor-pointer"
              >
                <img src={cartRound} width="89" height="89" alt="" />
              </button>
            </div>

            {/* product detail */}
            <div {...rise(320, "absolute top-[168px]", { left: PCT(487) })}>
              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[40px]">
                  <div className="flex flex-col gap-[20px] text-[20px] leading-none">
                    <p className="font-medium text-body">
                      Celestial Harmony Pendant
                    </p>
                    <p className="text-body/70">Made in Italy</p>
                  </div>

                  <div className="flex flex-col gap-[25px]">
                    <div className="flex flex-col leading-none">
                      <p className="text-[40px] font-bold text-accent">
                        $310.00
                      </p>
                      <p className="mt-[8px] text-[20px] text-body/70">
                        Per Item
                      </p>
                    </div>

                    <div className="flex items-center gap-[14px]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty((n) => Math.max(1, n - 1))}
                        className="cursor-pointer"
                      >
                        <img src={qtyMinus} width="37" height="37" alt="" />
                      </button>
                      <span
                        className="text-[15px] text-body/70"
                        aria-live="polite"
                      >
                        {qty} order{qty > 1 ? "s" : ""}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty((n) => n + 1)}
                        className="cursor-pointer"
                      >
                        <img src={qtyPlus} width="37" height="37" alt="" />
                      </button>
                    </div>
                  </div>
                </div>

                <ProceedButton />
              </div>
            </div>

            {/* right image */}
            <WipeImage
              src={images?.right}
              delay={280}
              className="absolute top-[168px] h-[510px]"
              style={{ left: PCT(976), width: PCT(356) }}
            />
          </div>
        </div>

        {/* Stacked below the desktop breakpoint: the comp's three-column grid of
          rules becomes a single column, so the hairlines are dropped rather
          than redrawn — they only describe relationships the stack no longer
          has. */}
        <div className="shell xl:hidden">
          <div className="flex items-start justify-between gap-[16px]">
            <div {...rise(0, "flex flex-col gap-[20px]")}>
              <h2 className="font-display text-[40px] leading-[1.15] text-ink md:text-[64px]">
                NEWEST
              </h2>
              <p className="text-[16px] leading-[24px] text-body md:text-[20px] md:leading-[30px]">
                Step into the sun-kissed season with our latest arrival, the
                Summer Serenity Collection.
              </p>
              <button
                type="button"
                aria-label="Scroll to collection"
                className="cursor-pointer"
              >
                <img
                  src={arrowDown}
                  width="40"
                  height="40"
                  alt=""
                  className="md:h-[46px] md:w-[46px]"
                />
              </button>
            </div>

            <div
              {...rise(
                140,
                "origin-top-right scale-[0.72] shrink-0 md:scale-100",
              )}
            >
              <CollectionBadge />
            </div>
          </div>

          <h2
            {...rise(
              200,
              "mt-[22px] text-right font-display text-[40px] leading-[1.15] text-ink md:mt-[30px] md:text-[64px]",
            )}
          >
            SUMMER
            <br />
            COLLECTION
          </h2>

          <div className="relative mt-[34px] md:mt-[48px]">
            <WipeImage
              src={images?.left}
              delay={120}
              className="aspect-[423/510] w-full"
            />
            <button
              type="button"
              aria-label="Add to bag"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer"
            >
              <img
                src={cartRound}
                width="72"
                height="72"
                alt=""
                className="md:h-[89px] md:w-[89px]"
              />
            </button>
          </div>

          <div
            {...rise(260, "mt-[66px] flex flex-col gap-[28px] md:mt-[80px]")}
          >
            <div className="flex flex-col gap-[16px] text-[18px] leading-none md:text-[20px]">
              <p className="font-medium text-body">Celestial Harmony Pendant</p>
              <p className="text-body/70">Made in Italy</p>
            </div>

            <div className="flex flex-col leading-none">
              <p className="text-[32px] font-bold text-accent md:text-[40px]">
                $310.00
              </p>
              <p className="mt-[8px] text-[16px] text-body/70 md:text-[20px]">
                Per Item
              </p>
            </div>

            <div className="flex items-center gap-[14px]">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="cursor-pointer"
              >
                <img src={qtyMinus} width="37" height="37" alt="" />
              </button>
              <span className="text-[15px] text-body/70" aria-live="polite">
                {qty} order{qty > 1 ? "s" : ""}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => n + 1)}
                className="cursor-pointer"
              >
                <img src={qtyPlus} width="37" height="37" alt="" />
              </button>
            </div>

            {/* 340 wide at full size, which overflows the narrowest phones */}
            <div className="origin-left scale-[0.9] md:scale-100">
              <ProceedButton />
            </div>
          </div>

          <WipeImage
            src={images?.right}
            delay={280}
            className="mt-[44px] aspect-[356/510] w-full md:mt-[60px]"
          />

          <div {...rise(320, "mt-[40px] md:mt-[56px]")}>
            <ExploreLink />
          </div>
        </div>
      </section>
    </>
  );
}
