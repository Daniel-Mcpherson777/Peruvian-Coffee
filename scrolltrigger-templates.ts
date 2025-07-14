// src/data/templates/scrollTrigger/index.ts
import { TemplateFactory } from '../../../services/templates/TemplateFactory';
import { TemplateCategory, GSAPPlugin } from '../../../types/template.types';

const factory = new TemplateFactory();

// ============================================
// PARALLAX EFFECTS (ID-t51 to ID-t75)
// ============================================

export const basicParallax = factory.createTemplate({
  name: "Basic Parallax",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "parallax",
  description: "Simple parallax scrolling effect",
  difficulty: "beginner",
  
  code: `gsap.registerPlugin(ScrollTrigger);

gsap.to("[data-element-id='${params.elementId}']", {
  yPercent: ${params.yPercent},
  ease: "none",
  scrollTrigger: {
    trigger: "[data-element-id='${params.elementId}']",
    start: "top bottom",
    end: "bottom top",
    scrub: ${params.scrubValue}
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh;">
  <div style="height: 50vh;"></div>
  <div class="preview-element" data-element-id="preview">
    <h2>Parallax Element</h2>
    <p>Scrolls at different speed</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "yPercent",
      type: "range",
      default: -50,
      min: -100,
      max: 100,
      step: 5,
      description: "Vertical movement percentage"
    },
    {
      name: "scrubValue",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Smoothness of parallax"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "parallax scroll",
    "background parallax",
    "depth scrolling",
    "layered scroll effect",
    "different scroll speed"
  ],
  
  commonUseCases: ["Hero backgrounds", "Section dividers", "Image galleries", "Landing pages"]
});

export const layeredParallax = factory.createTemplate({
  name: "Layered Parallax",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "parallax",
  description: "Multi-layer parallax with different speeds",
  difficulty: "intermediate",
  
  code: `gsap.registerPlugin(ScrollTrigger);

const layers = gsap.utils.toArray("[data-parallax-layer]");

layers.forEach((layer, index) => {
  const speed = layer.dataset.speed || 0.5;
  
  gsap.to(layer, {
    yPercent: -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: "${params.containerSelector}",
      start: "top bottom",
      end: "bottom top",
      scrub: ${params.scrubValue},
      invalidateOnRefresh: true
    }
  });
});`,
  
  preview: {
    html: `<div class="preview-container" style="height: 200vh; position: relative;">
  <div data-parallax-layer data-speed="0.3" style="position: absolute; top: 0; width: 100%; height: 100%; background: #3498db; opacity: 0.3;">
    <h3>Background Layer</h3>
  </div>
  <div data-parallax-layer data-speed="0.6" style="position: absolute; top: 20%; width: 100%; height: 80%; background: #e74c3c; opacity: 0.5;">
    <h3>Middle Layer</h3>
  </div>
  <div data-parallax-layer data-speed="0.9" style="position: absolute; top: 40%; width: 100%; height: 60%; background: #f39c12;">
    <h3>Foreground Layer</h3>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "containerSelector",
      type: "string",
      default: ".parallax-container",
      description: "Container element selector"
    },
    {
      name: "scrubValue",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Smoothness of parallax"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "layered parallax",
    "multi-layer scroll",
    "depth layers",
    "3d parallax effect",
    "stacked parallax"
  ],
  
  commonUseCases: ["Hero sections", "Storytelling", "Product showcases", "Portfolio sites"]
});

export const horizontalParallax = factory.createTemplate({
  name: "Horizontal Parallax",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "parallax",
  description: "Horizontal movement on vertical scroll",
  difficulty: "intermediate",
  
  code: `gsap.registerPlugin(ScrollTrigger);

gsap.to("[data-element-id='${params.elementId}']", {
  xPercent: ${params.xPercent},
  ease: "none",
  scrollTrigger: {
    trigger: "[data-element-id='${params.elementId}']",
    start: "top bottom",
    end: "bottom top",
    scrub: ${params.scrubValue},
    markers: ${params.showMarkers}
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh; overflow-x: hidden;">
  <div style="height: 50vh;"></div>
  <div class="preview-element" data-element-id="preview" style="width: 200px;">
    <h2>→</h2>
    <p>Horizontal movement</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "xPercent",
      type: "range",
      default: 100,
      min: -200,
      max: 200,
      step: 10,
      description: "Horizontal movement percentage"
    },
    {
      name: "scrubValue",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Smoothness of movement"
    },
    {
      name: "showMarkers",
      type: "boolean",
      default: false,
      description: "Show ScrollTrigger markers"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "horizontal parallax",
    "sideways scroll effect",
    "horizontal movement on scroll",
    "slide across on scroll"
  ],
  
  commonUseCases: ["Text animations", "Image reveals", "Timeline displays", "Feature sections"]
});

// ============================================
// REVEAL ANIMATIONS (ID-t76 to ID-t100)
// ============================================

export const fadeInOnScroll = factory.createTemplate({
  name: "Fade In On Scroll",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "reveal",
  description: "Fade in elements as they enter viewport",
  difficulty: "beginner",
  
  code: `gsap.registerPlugin(ScrollTrigger);

gsap.from("[data-element-id='${params.elementId}']", {
  opacity: 0,
  y: ${params.yOffset},
  duration: ${params.duration},
  scrollTrigger: {
    trigger: "[data-element-id='${params.elementId}']",
    start: "top ${params.startPosition}%",
    end: "bottom ${params.endPosition}%",
    toggleActions: "${params.toggleActions}",
    once: ${params.once}
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh;">
  <div style="height: 80vh;"></div>
  <div class="preview-element" data-element-id="preview">
    <h2>Scroll to Reveal</h2>
    <p>This fades in on scroll</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "yOffset",
      type: "number",
      default: 50,
      min: 0,
      max: 200,
      description: "Vertical offset for fade in"
    },
    {
      name: "duration",
      type: "range",
      default: 1,
      min: 0.3,
      max: 3,
      step: 0.1,
      description: "Fade duration"
    },
    {
      name: "startPosition",
      type: "number",
      default: 80,
      min: 0,
      max: 100,
      description: "Start trigger position (%)"
    },
    {
      name: "endPosition",
      type: "number",
      default: 20,
      min: 0,
      max: 100,
      description: "End trigger position (%)"
    },
    {
      name: "toggleActions",
      type: "select",
      default: "play none none reverse",
      options: [
        { label: "Play once", value: "play none none none" },
        { label: "Play/Reverse", value: "play none none reverse" },
        { label: "Play/Pause/Resume/Reverse", value: "play pause resume reverse" }
      ],
      description: "Animation toggle behavior"
    },
    {
      name: "once",
      type: "boolean",
      default: false,
      description: "Only animate once"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "fade in on scroll",
    "reveal on scroll",
    "scroll triggered fade",
    "appear when scrolling",
    "viewport animation"
  ],
  
  commonUseCases: ["Content sections", "Image galleries", "Feature lists", "Testimonials"]
});

export const staggerReveal = factory.createTemplate({
  name: "Stagger Reveal",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "reveal",
  description: "Staggered reveal of multiple elements",
  difficulty: "intermediate",
  
  code: `gsap.registerPlugin(ScrollTrigger);

gsap.from("${params.elementsSelector}", {
  opacity: 0,
  y: ${params.yOffset},
  scale: ${params.scale},
  duration: ${params.duration},
  stagger: {
    amount: ${params.staggerAmount},
    from: "${params.staggerFrom}"
  },
  scrollTrigger: {
    trigger: "${params.containerSelector}",
    start: "top ${params.startPosition}%",
    toggleActions: "play none none reverse",
    once: ${params.once}
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh;">
  <div style="height: 60vh;"></div>
  <div class="stagger-container">
    <div class="stagger-item">Item 1</div>
    <div class="stagger-item">Item 2</div>
    <div class="stagger-item">Item 3</div>
    <div class="stagger-item">Item 4</div>
  </div>
</div>`,
    css: `.stagger-item {
  padding: 20px;
  margin: 10px;
  background: #3498db;
  color: white;
  border-radius: 8px;
  text-align: center;
}`
  },
  
  parameters: [
    {
      name: "elementsSelector",
      type: "string",
      default: ".stagger-item",
      description: "Selector for elements to stagger"
    },
    {
      name: "containerSelector",
      type: "string",
      default: ".stagger-container",
      description: "Container trigger selector"
    },
    {
      name: "yOffset",
      type: "number",
      default: 30,
      min: 0,
      max: 100,
      description: "Vertical offset"
    },
    {
      name: "scale",
      type: "range",
      default: 0.8,
      min: 0,
      max: 1.5,
      step: 0.1,
      description: "Starting scale"
    },
    {
      name: "duration",
      type: "range",
      default: 0.6,
      min: 0.2,
      max: 2,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "staggerAmount",
      type: "range",
      default: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1,
      description: "Total stagger time"
    },
    {
      name: "staggerFrom",
      type: "select",
      default: "start",
      options: [
        { label: "Start", value: "start" },
        { label: "End", value: "end" },
        { label: "Center", value: "center" },
        { label: "Random", value: "random" }
      ],
      description: "Stagger origin"
    },
    {
      name: "startPosition",
      type: "number",
      default: 75,
      min: 0,
      max: 100,
      description: "Start trigger position (%)"
    },
    {
      name: "once",
      type: "boolean",
      default: false,
      description: "Only animate once"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "stagger reveal on scroll",
    "cascade elements on scroll",
    "sequential reveal",
    "staggered appearance",
    "wave reveal effect"
  ],
  
  commonUseCases: ["Feature lists", "Team grids", "Portfolio items", "Card layouts"]
});

export const textReveal = factory.createTemplate({
  name: "Text Reveal",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "reveal",
  description: "Reveal text with masking effect",
  difficulty: "advanced",
  
  code: `gsap.registerPlugin(ScrollTrigger);

// Set up the text with clip-path
gsap.set("[data-element-id='${params.elementId}']", {
  clipPath: "${params.initialClip}"
});

gsap.to("[data-element-id='${params.elementId}']", {
  clipPath: "${params.finalClip}",
  duration: ${params.duration},
  ease: "${params.ease}",
  scrollTrigger: {
    trigger: "[data-element-id='${params.elementId}']",
    start: "top ${params.startPosition}%",
    end: "bottom ${params.endPosition}%",
    scrub: ${params.scrub}
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh;">
  <div style="height: 60vh;"></div>
  <div class="preview-element" data-element-id="preview">
    <h1 style="font-size: 3em; margin: 0;">REVEAL TEXT</h1>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "initialClip",
      type: "select",
      default: "inset(0 100% 0 0)",
      options: [
        { label: "From Left", value: "inset(0 100% 0 0)" },
        { label: "From Right", value: "inset(0 0 0 100%)" },
        { label: "From Top", value: "inset(0 0 100% 0)" },
        { label: "From Bottom", value: "inset(100% 0 0 0)" },
        { label: "From Center", value: "inset(50% 50% 50% 50%)" }
      ],
      description: "Initial clip path"
    },
    {
      name: "finalClip",
      type: "string",
      default: "inset(0 0% 0 0)",
      description: "Final clip path"
    },
    {
      name: "duration",
      type: "range",
      default: 1.5,
      min: 0.5,
      max: 3,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.inOut",
      options: [
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Power4 Out", value: "power4.out" },
        { label: "Linear", value: "none" }
      ],
      description: "Easing function"
    },
    {
      name: "startPosition",
      type: "number",
      default: 80,
      min: 0,
      max: 100,
      description: "Start trigger position (%)"
    },
    {
      name: "endPosition",
      type: "number",
      default: 20,
      min: 0,
      max: 100,
      description: "End trigger position (%)"
    },
    {
      name: "scrub",
      type: "boolean",
      default: true,
      description: "Tie to scroll position"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "text reveal on scroll",
    "mask text animation",
    "reveal text effect",
    "text wipe animation",
    "scroll text reveal"
  ],
  
  commonUseCases: ["Headlines", "Hero text", "Section titles", "Quotes"]
});

// ============================================
// PIN ANIMATIONS (ID-t101 to ID-t125)
// ============================================

export const pinSection = factory.createTemplate({
  name: "Pin Section",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "pin",
  description: "Pin element while scrolling",
  difficulty: "intermediate",
  
  code: `gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "[data-element-id='${params.elementId}']",
  start: "top top",
  end: "+=\${params.pinDuration}",
  pin: true,
  pinSpacing: ${params.pinSpacing},
  anticipatePin: ${params.anticipatePin},
  markers: ${params.showMarkers}
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 300vh;">
  <div style="height: 100vh; background: #ecf0f1; display: flex; align-items: center; justify-content: center;">
    <h2>Scroll Down</h2>
  </div>
  <div class="preview-element" data-element-id="preview" style="height: 100vh; background: #3498db; display: flex; align-items: center; justify-content: center; color: white;">
    <h1>This Section Pins!</h1>
  </div>
  <div style="height: 100vh; background: #ecf0f1; display: flex; align-items: center; justify-content: center;">
    <h2>Continue Scrolling</h2>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "pinDuration",
      type: "number",
      default: 500,
      min: 100,
      max: 2000,
      description: "Pin duration in pixels"
    },
    {
      name: "pinSpacing",
      type: "boolean",
      default: true,
      description: "Add spacing for pinned element"
    },
    {
      name: "anticipatePin",
      type: "number",
      default: 1,
      min: 0,
      max: 1,
      step: 0.1,
      description: "Anticipate pin (0-1)"
    },
    {
      name: "showMarkers",
      type: "boolean",
      default: false,
      description: "Show ScrollTrigger markers"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "pin section on scroll",
    "sticky section",
    "fixed while scrolling",
    "pin element",
    "scroll pin effect"
  ],
  
  commonUseCases: ["Feature explanations", "Storytelling", "Product showcases", "Timeline sections"]
});

export const pinWithAnimation = factory.createTemplate({
  name: "Pin With Animation",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "pin",
  description: "Pin element and animate content while scrolling",
  difficulty: "advanced",
  
  code: `gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "[data-element-id='${params.containerid}']",
    start: "top top",
    end: "+=\${params.scrollDistance}",
    pin: true,
    scrub: ${params.scrubValue},
    anticipatePin: 1
  }
});

// Add animations to timeline
tl.to("[data-element-id='${params.element1}']", {
  xPercent: ${params.element1Move},
  opacity: ${params.fadeOut1 ? 0 : 1},
  duration: 1
})
.to("[data-element-id='${params.element2}']", {
  xPercent: ${params.element2Move},
  opacity: 1,
  duration: 1
}, "-=0.5")`,
  
  preview: {
    html: `<div class="preview-container" style="height: 400vh;">
  <div style="height: 100vh;"></div>
  <div class="pin-container" data-element-id="pin-container" style="height: 100vh; position: relative; overflow: hidden;">
    <div data-element-id="element1" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <h1>First Content</h1>
    </div>
    <div data-element-id="element2" style="position: absolute; top: 50%; left: 150%; transform: translate(-50%, -50%);">
      <h1>Second Content</h1>
    </div>
  </div>
  <div style="height: 100vh;"></div>
</div>`
  },
  
  parameters: [
    {
      name: "containerid",
      type: "string",
      default: "pin-container",
      description: "Container element ID"
    },
    {
      name: "element1",
      type: "string",
      default: "element1",
      description: "First element ID"
    },
    {
      name: "element2",
      type: "string",
      default: "element2",
      description: "Second element ID"
    },
    {
      name: "scrollDistance",
      type: "number",
      default: 2000,
      min: 500,
      max: 5000,
      description: "Scroll distance for pin"
    },
    {
      name: "scrubValue",
      type: "range",
      default: 1,
      min: 0.5,
      max: 3,
      step: 0.1,
      description: "Scrub smoothness"
    },
    {
      name: "element1Move",
      type: "number",
      default: -100,
      min: -200,
      max: 200,
      description: "Element 1 X movement %"
    },
    {
      name: "element2Move",
      type: "number",
      default: -100,
      min: -200,
      max: 200,
      description: "Element 2 X movement %"
    },
    {
      name: "fadeOut1",
      type: "boolean",
      default: true,
      description: "Fade out first element"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "pin and animate on scroll",
    "scroll controlled animation",
    "pinned slide animation",
    "scroll storytelling"
  ],
  
  commonUseCases: ["Product features", "Story progression", "Data visualization", "Interactive tutorials"]
});

// ============================================
// PROGRESS-BASED (ID-t126 to ID-t150)
// ============================================

export const progressBar = factory.createTemplate({
  name: "Progress Bar",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "progress",
  description: "Scroll progress indicator",
  difficulty: "beginner",
  
  code: `gsap.registerPlugin(ScrollTrigger);

gsap.to("[data-element-id='${params.elementId}']", {
  scaleX: 1,
  transformOrigin: "left center",
  ease: "none",
  scrollTrigger: {
    trigger: "${params.trackElement}",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// Set initial state
gsap.set("[data-element-id='${params.elementId}']", {
  scaleX: 0,
  transformOrigin: "left center"
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 300vh;">
  <div class="progress-bar" data-element-id="progress" style="position: fixed; top: 0; left: 0; width: 100%; height: 4px; background: #3498db; z-index: 1000;"></div>
  <div style="padding: 50px;">
    <h1>Scroll to see progress</h1>
    <p style="margin: 50vh 0;">Long content here...</p>
    <p style="margin: 50vh 0;">Keep scrolling...</p>
    <p>End of content</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "elementId",
      type: "string",
      default: "progress",
      description: "Progress bar element ID"
    },
    {
      name: "trackElement",
      type: "string",
      default: "body",
      description: "Element to track scroll"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "scroll progress bar",
    "reading progress indicator",
    "scroll percentage",
    "progress tracker"
  ],
  
  commonUseCases: ["Article progress", "Form progress", "Reading indicators", "Navigation helpers"]
});

export const counterAnimation = factory.createTemplate({
  name: "Counter Animation",
  category: TemplateCategory.SCROLL_TRIGGER,
  subcategory: "progress",
  description: "Animate numbers on scroll",
  difficulty: "intermediate",
  
  code: `gsap.registerPlugin(ScrollTrigger);

const counter = { value: ${params.startValue} };

gsap.to(counter, {
  value: ${params.endValue},
  duration: ${params.duration},
  ease: "${params.ease}",
  scrollTrigger: {
    trigger: "[data-element-id='${params.elementId}']",
    start: "top ${params.startPosition}%",
    toggleActions: "play none none reverse",
    once: ${params.once}
  },
  onUpdate: function() {
    document.querySelector("[data-element-id='${params.elementId}']").textContent = 
      ${params.formatNumber ? 'counter.value.toLocaleString("en-US", { maximumFractionDigits: 0 })' : 'Math.round(counter.value)'};
  }
})`,
  
  preview: {
    html: `<div class="preview-container" style="height: 150vh;">
  <div style="height: 60vh;"></div>
  <div class="preview-element" style="text-align: center;">
    <h1 data-element-id="counter" style="font-size: 4em; margin: 0;">0</h1>
    <p>Happy Customers</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "elementId",
      type: "string",
      default: "counter",
      description: "Counter element ID"
    },
    {
      name: "startValue",
      type: "number",
      default: 0,
      min: 0,
      max: 999999,
      description: "Starting value"
    },
    {
      name: "endValue",
      type: "number",
      default: 1000,
      min: 0,
      max: 999999,
      description: "Ending value"
    },
    {
      name: "duration",
      type: "range",
      default: 2,
      min: 0.5,
      max: 5,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.out",
      options: [
        { label: "Power2 Out", value: "power2.out" },
        { label: "Linear", value: "none" },
        { label: "Circ Out", value: "circ.out" }
      ],
      description: "Easing function"
    },
    {
      name: "startPosition",
      type: "number",
      default: 80,
      min: 0,
      max: 100,
      description: "Start trigger position (%)"
    },
    {
      name: "formatNumber",
      type: "boolean",
      default: true,
      description: "Format with commas"
    },
    {
      name: "once",
      type: "boolean",
      default: true,
      description: "Only animate once"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.SCROLL_TRIGGER],
  
  examplePrompts: [
    "count up animation",
    "number counter on scroll",
    "animate statistics",
    "counting animation",
    "number increment effect"
  ],
  
  commonUseCases: ["Statistics display", "Achievement counters", "Analytics dashboards", "Success metrics"]
});

// Export all ScrollTrigger templates
export const scrollTriggerTemplates = [
  basicParallax,
  layeredParallax,
  horizontalParallax,
  fadeInOnScroll,
  staggerReveal,
  textReveal,
  pinSection,
  pinWithAnimation,
  progressBar,
  counterAnimation
];