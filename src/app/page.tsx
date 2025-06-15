'use client';


import React, { useEffect, useRef } from 'react';
import Head from 'next/head'; // Keep Head here for now as we migrate page content
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Anton, Dancing_Script, Dosis } from 'next/font/google';
// Remove top-level import for LocomotiveScroll

gsap.registerPlugin(ScrollTrigger);

// Define Google Fonts at the module scope
const anton = Anton({ subsets: ['latin'], weight: ['400', '400'] as any, variable: '--font-anton' });

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-dancing-script' }); // Added 700 weight
const dosis = Dosis({ subsets: ['latin'], weight: ['200', '400', '600', '700'], variable: '--font-dosis' });

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const page5H1Ref = useRef<HTMLHeadingElement>(null);
  const page1DogImageRef = useRef<HTMLImageElement>(null);
  const page1tagh1 = useRef<HTMLHeadingElement>(null);
  const page2ButtonRef = useRef<HTMLButtonElement>(null);
  const navTopButtonRef = useRef<HTMLButtonElement>(null);
  const page6ButtonRef = useRef<HTMLButtonElement>(null);
  const page2Part1Ref = useRef<HTMLDivElement>(null);
  const page2Part2Ref = useRef<HTMLDivElement>(null);
  const page5h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let locoScroll: any = null;

    // Dynamically import LocomotiveScroll on the client side
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;

      if (mainRef.current) {
        locoScroll = new LocomotiveScroll({
          el: mainRef.current,
          smooth: 1,
        });

        // Use an arrow function to call ScrollTrigger.update()
        locoScroll!.on('scroll', () => ScrollTrigger.update());

        ScrollTrigger.scrollerProxy(mainRef.current, {
          scrollTop(value) {
            if (typeof value === 'number') {
              return locoScroll?.scrollTo(value, { duration: 0, disableLerp: true });
            }
            // Safely access scroll position with optional chaining and type assertion
            return (locoScroll as any).scroll.instance.scroll.y; 
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: mainRef.current?.style?.transform ? 'transform' : 'fixed',
        });

        // Use an arrow function and optional chaining for locoScroll.update()
        ScrollTrigger.addEventListener('refresh', () => {
          locoScroll?.update();
        });
        ScrollTrigger.refresh();

        // GSAP Animation for the bottle image (rotate)
        if (bottleRef.current) {
          gsap.to(bottleRef.current, {
            rotate: -15,
            scrollTrigger: {
              trigger: bottleRef.current,
              scroller: mainRef.current,
              start: "top 5%",
              end: "top -=415%",
              scrub: 1,
              pin: true,
            }
          });
        }

        

         // GSAP Animation for the bottle image (scale)
        if (bottleRef.current) {
          gsap.to(bottleRef.current, {
            scale: .56,
            scrollTrigger: {
              trigger: page5H1Ref.current,
              scroller: mainRef.current,
              start: "top 70%",
              end: "+=80%",
              scrub: .1,
              pin: true,
              
            },
            xPercent: -55,
            yPercent: 4,
            duration: 1,
          });
        }

        // GSAP Timeline
        let t1 = gsap.timeline();
        if (page1tagh1.current) {
          t1.from(page1tagh1.current, {
            opacity: 0,
            duration: .5 ,
            scale: 0.2,
          });
        }

        if (bottleRef.current) {
          t1.from(bottleRef.current, {
            opacity: 0,
            duration: .85,
            scale: 0.2,
          });
        }

         if (page1DogImageRef.current) {
          t1.from(page1DogImageRef.current, {
            opacity: 0,
            duration: .2 ,
            scale: 5,
          });
        }

        if (navTopButtonRef.current) {
          t1.from(navTopButtonRef.current, { xPercent: 200 });
        }

        // GSAP Animation for the page 2 heading
        if (page2Part1Ref.current) {
          gsap.from(page2Part1Ref.current, {
            scrollTrigger: {
              trigger: page2Part1Ref.current,
              scroller: mainRef.current,
              start: "top 98%",
            },
            xPercent: -100,
            duration: 1,
          });
        }

        // GSAP Animation for the button in page 2
        if (page2ButtonRef.current) {
          gsap.from(page2ButtonRef.current, {
            scrollTrigger: {
              trigger: page2ButtonRef.current,
              scroller: mainRef.current,
              start: "top 105%",
            },
            xPercent: -100,
            duration: .6,
          });
        }
        // GSAP Animation for the page 2 part 2
        if (page2Part2Ref.current) {
          gsap.to(page2Part2Ref.current, {
            rotate: 5,
            scrollTrigger: {
              trigger: page2Part2Ref.current,
              scroller: mainRef.current,
              start: "top 40%",
              end: "top 95%",
              scrub: 1,
              pin: true,
            },
            yPercent: 40,
            xPercent: -5,
            duration: .1,
          });
        }

        // GSAP Animation for the button in page 6
        if (page6ButtonRef.current) {
          gsap.from(page6ButtonRef.current, {
            scrollTrigger: {
              trigger: page6ButtonRef.current,
              scroller: mainRef.current,
              start: "top 90%",
            },
            xPercent: 500,
            duration: .5,
          });
        }

        // Animate 'year round' to move left and stop below 'Legacy of Flavours'
        if (page5H1Ref.current && page5h2Ref.current && mainRef.current) {
          // Get the bounding rects for both elements
          const h1 = page5H1Ref.current;
          const h2 = page5h2Ref.current;
          // Use GSAP to animate h1 to the position below h2
          gsap.to(h1, {
            x: () => {
              // Calculate horizontal shift: align left edge of h2
              const h1Rect = h1.getBoundingClientRect();
              const h2Rect = h2.getBoundingClientRect();
              return h2Rect.left - h1Rect.left;
            },
            y: () => {
              // Calculate vertical shift: place just below h2
              const h1Rect = h1.getBoundingClientRect();
              const h2Rect = h2.getBoundingClientRect();
              return h2Rect.bottom - h1Rect.top + 13; // 13px gap
            },
            scrollTrigger: {
              trigger: h2,
              scroller: mainRef.current,
              start: 'top 40%', // When h2 hits center, start animating h1
              end: '+=100', // Animate over 100px scroll
              scrub: 1,
              pin: false,
              // markers: true, // Uncomment for debugging
            },
            ease: 'power1.inOut',
          });
        }
      }
    });}, []) // <-- Add dependency array to run only once

  
  return (
    <>
      <Head>
        <title>Lagunitas | Technical Mickey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav id="nav_top">
        <img src="/logo.png" alt="" />
        <button ref={navTopButtonRef}>Buy Beer</button>
        <i className="ri-menu-line"></i>
      </nav>
      <nav id="nav_left">
        <i className="ri-menu-line"></i>
        <i className="ri-search-line"></i>
      </nav>
      <div id="main" ref={mainRef}>
        <img id="bottle" src="/towerbridge.png" alt="" ref={bottleRef} />

        <div id="page1">
          <h1 style={{ fontFamily: anton.style.fontFamily }} ref={page1tagh1}>unlimited release</h1>
          <img id="page1_dog_image" src="/stamp.png" alt="" ref={page1DogImageRef} />
        </div>

          <div id="page2" >
          <div id="page2_part1">
            <h3>unlimited release</h3>
            <h1  ref={page2Part1Ref}>India Pale Ale</h1>
            <p style={{ fontFamily: dosis.style.fontFamily }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
              officia error? Totam unde nulla ea repudiandae, corporis optio
              recusandae repellat asperiores minima voluptate soluta laboriosam
              debitis architecto quaerat fugiat nostrum aliquam. Minima ratione
              sequi omnis ipsa beatae ab odio id ad, voluptates fuga incidunt
              nisi.
            </p>
            <button ref={page2ButtonRef}>Buy Now!</button>
          </div>
          <div id="page2_part2" ref={page2Part2Ref}>
            <h3 style={{ fontFamily: dosis.style.fontFamily }}>ABV</h3>
            <h5 style={{ fontFamily: dosis.style.fontFamily }}>Alcohole by valume</h5>
            <div id="box">
              <h2>
                6.2 <span>%</span>
              </h2>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis mollitia corporis facere
                ullam hic tempore unde quaerat quisquam
              </p>
            </div>
            <h3>IBU</h3>
            <h5>Isn\'t Reservation Units</h5>
            <div id="box">
              <h2>51 <span>.1</span></h2>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis mollitia corporis facere
                ullam hic tempore unde quaerat quisquam
              </p>
            </div>
            <div id="page2_part2_text1">
              <h3 style={{ fontFamily: dosis.style.fontFamily }}>ABV</h3>
              <h5 style={{ fontFamily: dosis.style.fontFamily }}>Alcohole by valume</h5>
              <div id="box">
                <h2>6.2 <span>%</span></h2>
                <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis mollitia corporis facere
                  ullam hic tempore unde quaerat quisquam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="page3">
          <h1>MounthFeels</h1>
          <div id="page3_text">
            <div id="page3_text_part1">
              <a href="">
                <img src="/banner2.png" alt="" />
              </a>
              <h5>Hear it from our beamonster jeremy marshall</h5>
            </div>
            <div id="page3_text_part2">
              <h5 style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi officiis omnis fuga ipsum, molestias voluptates rem vitae perferendis, illo sit aliquid tenetur nisi.</h5>
              <h2>STYLE</h2>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur est quaerat cumque veritatis, non nisi voluptatibus et veniam, excepturi illo neque! Quos, explicabo. Ad deserunt quos harum, ducimus explicabo doloribus.</p>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur est quaerat cumque veritatis, non nisi voluptatibus et veniam, excepturi illo neque! Quos, explicabo. Ad deserunt quos harum, ducimus explicabo doloribus.</p>
            </div>
          </div>
        </div>
        <div id="page4">
          <div id="page4_color1">
            <img id="page4_color_image1" src="/Green-LSS.png" alt="" />
            <div id="page4_color_image1_text">
              <h4 style={{ fontFamily: anton.style.fontFamily }}>tropical</h4>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia harum accusamus placeat distinctio iusto exercitationem labore nulla atque temporibus beatae?</p>
            </div>
          </div>
          <div id="page4_color2">
            <img id="page4_color_image2" src="/Green-LSS.png" alt="" />
            <div id="page4_color_image2_text">
              <h4 style={{ fontFamily: anton.style.fontFamily }}>pink</h4>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia harum accusamus placeat distinctio iusto exercitationem labore nulla atque temporibus beatae?</p>
            </div>
          </div>
          <div id="page4_color3">
            <img id="page4_color_image3" src="/splat-black.png" alt="" />
            <div id="page4_color_image3_text">
              <h4 style={{ fontFamily: anton.style.fontFamily }}>caramel-malt</h4>
              <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia harum accusamus placeat distinctio iusto exercitationem labore nulla atque temporibus beatae?</p>
            </div>
          </div>
          <img src="/beermug.png" alt="" id="page4_color_image4" />
        </div>
        <div id="page5">
          <h5 style={{ fontFamily: dosis.style.fontFamily }}>Availability</h5>
          <h1 ref={page5H1Ref} style={{ fontFamily: anton.style.fontFamily }}>year round</h1>
          <div id="page5_image_box">
            <div id="page5_h2">
              <h2 ref={page5h2Ref}>Legacy of Flavours</h2>
            </div>
            <div id="page5_bottel">
              <img id="image33" src="/towerbridge.png" alt=""  />
              <h4 style={{ fontFamily: dosis.style.fontFamily }}>22 oz Bottles</h4>
              <h6 style={{ fontFamily: dosis.style.fontFamily }}>6-PACK</h6>
            </div>
            <div id="page5_bottel">
              <img id="image22" src="/covent.png"  alt="" />
              <h4 style={{ fontFamily: dosis.style.fontFamily }}>22 oz Bottles</h4>
              <h6 style={{ fontFamily: dosis.style.fontFamily }}>6-PACK</h6>
            </div>
            <div id="page5_bottel">
              <img id="image44" src="/westminister.png" alt=""  />
              <h4 style={{ fontFamily: dosis.style.fontFamily }}>21 oz Bottles</h4>
            </div>
            <div id="page5_bottel">
              <img id="image55" src="/hyde.png" alt=""  />
              <h4 style={{ fontFamily: dosis.style.fontFamily }}>33 oz Bottles</h4>
            </div>
          </div>
        </div>
        <div id="page6">
          <div id="page6_part1">
            <img src="/Banner1.png" alt="" />
          </div>
          <div id="page6_part2">
            <h5 style={{ fontFamily: dosis.style.fontFamily }}>Recipes</h5>
            <h1 style={{ fontFamily: anton.style.fontFamily }}>Beer Speaks. Bellies Grumble.</h1>
            <p style={{ fontFamily: dosis.style.fontFamily }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum maiores saepe, ex magnam temporibus repellendus nobis doloremque voluptates quis ad fugit rem similique, porro, neque voluptate numquam quae? Repudiandae, ratione!</p>
            <button ref={page6ButtonRef}>Read More</button>
          </div>
        </div>
      </div> {/* Closing tag for #main */}
    </>
  );
};

export default Home;