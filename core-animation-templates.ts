// src/data/templates/core/index.ts
import { TemplateFactory } from '../../../services/templates/TemplateFactory';
import { TemplateCategory, GSAPPlugin } from '../../../types/template.types';

const factory = new TemplateFactory();

// ============================================
// FADE ANIMATIONS (ID-t1 to ID-t10)
// ============================================

export const fadeIn = factory.createTemplate({
  name: "Fade In",
  category: TemplateCategory.CORE,
  subcategory: "fade",
  description: "Smoothly fade in an element with customizable parameters",
  difficulty: "beginner",
  
  code: `gsap.from("[data-element-id='${params.elementId}']", {
  opacity: 0,
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay},
  scale: ${params.initialScale},
  y: ${params.yOffset},
  onStart: () => {
    ${params.onStartCallback || '// Animation started'}
  },
  onComplete: () => {
    ${params.onCompleteCallback || '// Animation completed'}
  }
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Fade In Effect</h2>
    <p>This element will fade in smoothly</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "duration",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Animation duration in seconds"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.out",
      options: [
        { label: "Linear", value: "none" },
        { label: "Power2 Out", value: "power2.out" },
        { label: "Power3 InOut", value: "power3.inOut" },
        { label: "Elastic", value: "elastic.out" },
        { label: "Back", value: "back.out" }
      ],
      description: "Easing function"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 10,
      description: "Delay before animation starts"
    },
    {
      name: "initialScale",
      type: "number",
      default: 1,
      min: 0,
      max: 2,
      description: "Starting scale of element"
    },
    {
      name: "yOffset",
      type: "number",
      default: 0,
      min: -200,
      max: 200,
      description: "Vertical offset for slide effect"
    }
  ],
  
  examplePrompts: [
    "fade in element",
    "make it appear smoothly",
    "gentle appearance animation",
    "fade in from bottom",
    "smooth entrance effect",
    "opacity animation",
    "reveal with fade"
  ],
  
  commonUseCases: ["Hero sections", "Content reveals", "Image galleries", "Modal entrances"]
});

export const fadeOut = factory.createTemplate({
  name: "Fade Out",
  category: TemplateCategory.CORE,
  subcategory: "fade",
  description: "Smoothly fade out an element",
  difficulty: "beginner",
  
  code: `gsap.to("[data-element-id='${params.elementId}']", {
  opacity: 0,
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay},
  scale: ${params.endScale},
  y: ${params.yOffset},
  onComplete: () => {
    ${params.hideOnComplete ? 'gsap.set("[data-element-id=\'" + params.elementId + "\']", {display: "none"});' : ''}
    ${params.onCompleteCallback || '// Animation completed'}
  }
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Fade Out Effect</h2>
    <p>This element will fade out</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "duration",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Animation duration in seconds"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.in",
      options: [
        { label: "Linear", value: "none" },
        { label: "Power2 In", value: "power2.in" },
        { label: "Power3 InOut", value: "power3.inOut" },
        { label: "Expo In", value: "expo.in" }
      ],
      description: "Easing function"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 10,
      description: "Delay before animation starts"
    },
    {
      name: "endScale",
      type: "number",
      default: 1,
      min: 0,
      max: 2,
      description: "Ending scale of element"
    },
    {
      name: "yOffset",
      type: "number",
      default: 0,
      min: -200,
      max: 200,
      description: "Vertical offset for slide effect"
    },
    {
      name: "hideOnComplete",
      type: "boolean",
      default: true,
      description: "Hide element after fade out"
    }
  ],
  
  examplePrompts: [
    "fade out element",
    "make it disappear smoothly",
    "fade away animation",
    "hide with fade",
    "smooth exit effect"
  ],
  
  commonUseCases: ["Modal dismissal", "Loading screens", "Content transitions", "Error messages"]
});

export const crossFade = factory.createTemplate({
  name: "Cross Fade",
  category: TemplateCategory.CORE,
  subcategory: "fade",
  description: "Cross-fade between two elements",
  difficulty: "intermediate",
  
  code: `const tl = gsap.timeline();

tl.to("[data-element-id='${params.elementOut}']", {
  opacity: 0,
  duration: ${params.duration},
  ease: "${params.ease}"
})
.from("[data-element-id='${params.elementIn}']", {
  opacity: 0,
  duration: ${params.duration},
  ease: "${params.ease}"
}, "-=${params.overlap}")`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="element1">
    <h2>Element 1</h2>
  </div>
  <div class="preview-element" data-element-id="element2" style="opacity: 0;">
    <h2>Element 2</h2>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "elementOut",
      type: "string",
      default: "element1",
      description: "ID of element to fade out"
    },
    {
      name: "elementIn",
      type: "string",
      default: "element2",
      description: "ID of element to fade in"
    },
    {
      name: "duration",
      type: "range",
      default: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1,
      description: "Fade duration"
    },
    {
      name: "overlap",
      type: "range",
      default: 0.3,
      min: 0,
      max: 1,
      step: 0.1,
      description: "Overlap amount"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.inOut",
      options: [
        { label: "Linear", value: "none" },
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Sine InOut", value: "sine.inOut" }
      ],
      description: "Easing function"
    }
  ],
  
  examplePrompts: [
    "cross fade between elements",
    "transition between two items",
    "fade swap animation",
    "smooth element exchange"
  ],
  
  commonUseCases: ["Image carousels", "Tab switches", "Content updates", "Slide transitions"]
});

// ============================================
// SLIDE ANIMATIONS (ID-t11 to ID-t20)
// ============================================

export const slideIn = factory.createTemplate({
  name: "Slide In",
  category: TemplateCategory.CORE,
  subcategory: "slide",
  description: "Slide element in from specified direction",
  difficulty: "beginner",
  
  code: `gsap.from("[data-element-id='${params.elementId}']", {
  x: ${params.direction === 'left' ? '-100%' : params.direction === 'right' ? '100%' : 0},
  y: ${params.direction === 'top' ? '-100%' : params.direction === 'bottom' ? '100%' : 0},
  opacity: ${params.fadeIn ? 0 : 1},
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Slide In</h2>
    <p>Element slides in from edge</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "direction",
      type: "select",
      default: "left",
      options: [
        { label: "From Left", value: "left" },
        { label: "From Right", value: "right" },
        { label: "From Top", value: "top" },
        { label: "From Bottom", value: "bottom" }
      ],
      description: "Direction to slide from"
    },
    {
      name: "duration",
      type: "range",
      default: 0.8,
      min: 0.1,
      max: 3,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power3.out",
      options: [
        { label: "Power3 Out", value: "power3.out" },
        { label: "Back Out", value: "back.out(1.7)" },
        { label: "Expo Out", value: "expo.out" },
        { label: "Circ Out", value: "circ.out" }
      ],
      description: "Easing function"
    },
    {
      name: "fadeIn",
      type: "boolean",
      default: true,
      description: "Also fade in while sliding"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "slide in from left",
    "slide element in",
    "move in from side",
    "sliding entrance",
    "panel slide animation"
  ],
  
  commonUseCases: ["Navigation menus", "Sidebars", "Card reveals", "Mobile menus"]
});

export const slideBounce = factory.createTemplate({
  name: "Slide Bounce",
  category: TemplateCategory.CORE,
  subcategory: "slide",
  description: "Slide in with a bouncy effect",
  difficulty: "intermediate",
  
  code: `gsap.from("[data-element-id='${params.elementId}']", {
  x: ${params.direction === 'left' ? -200 : params.direction === 'right' ? 200 : 0},
  y: ${params.direction === 'top' ? -200 : params.direction === 'bottom' ? 200 : 0},
  opacity: 0,
  duration: ${params.duration},
  ease: "bounce.out",
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Bounce!</h2>
    <p>Playful entrance</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "direction",
      type: "select",
      default: "left",
      options: [
        { label: "From Left", value: "left" },
        { label: "From Right", value: "right" },
        { label: "From Top", value: "top" },
        { label: "From Bottom", value: "bottom" }
      ],
      description: "Direction to bounce from"
    },
    {
      name: "duration",
      type: "range",
      default: 1.2,
      min: 0.5,
      max: 3,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "bounce in animation",
    "playful slide effect",
    "bouncy entrance",
    "elastic slide in"
  ],
  
  commonUseCases: ["Fun UI elements", "Game interfaces", "Children's apps", "Notifications"]
});

// ============================================
// SCALE ANIMATIONS (ID-t21 to ID-t30)
// ============================================

export const scaleIn = factory.createTemplate({
  name: "Scale In",
  category: TemplateCategory.CORE,
  subcategory: "scale",
  description: "Scale element from zero to full size",
  difficulty: "beginner",
  
  code: `gsap.from("[data-element-id='${params.elementId}']", {
  scale: ${params.startScale},
  opacity: ${params.fadeIn ? 0 : 1},
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay},
  transformOrigin: "${params.origin}"
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Scale In</h2>
    <p>Growing animation</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "startScale",
      type: "range",
      default: 0,
      min: 0,
      max: 2,
      step: 0.1,
      description: "Starting scale"
    },
    {
      name: "duration",
      type: "range",
      default: 0.6,
      min: 0.1,
      max: 2,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "back.out(1.7)",
      options: [
        { label: "Back Out", value: "back.out(1.7)" },
        { label: "Elastic Out", value: "elastic.out(1, 0.3)" },
        { label: "Power3 Out", value: "power3.out" },
        { label: "Bounce Out", value: "bounce.out" }
      ],
      description: "Easing function"
    },
    {
      name: "origin",
      type: "select",
      default: "center",
      options: [
        { label: "Center", value: "center" },
        { label: "Top Left", value: "top left" },
        { label: "Top Right", value: "top right" },
        { label: "Bottom Left", value: "bottom left" },
        { label: "Bottom Right", value: "bottom right" }
      ],
      description: "Transform origin point"
    },
    {
      name: "fadeIn",
      type: "boolean",
      default: true,
      description: "Also fade in while scaling"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "scale in animation",
    "grow from center",
    "pop in effect",
    "zoom in animation",
    "expand element"
  ],
  
  commonUseCases: ["Modal appearances", "Button reveals", "Icon animations", "Card entrances"]
});

export const scalePulse = factory.createTemplate({
  name: "Scale Pulse",
  category: TemplateCategory.CORE,
  subcategory: "scale",
  description: "Pulsing scale effect",
  difficulty: "intermediate",
  
  code: `gsap.to("[data-element-id='${params.elementId}']", {
  scale: ${params.maxScale},
  duration: ${params.duration},
  ease: "${params.ease}",
  repeat: ${params.repeat},
  yoyo: true,
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview" style="width: 100px; height: 100px; background: #3498db; border-radius: 50%;">
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "maxScale",
      type: "range",
      default: 1.2,
      min: 1,
      max: 2,
      step: 0.05,
      description: "Maximum scale"
    },
    {
      name: "duration",
      type: "range",
      default: 0.8,
      min: 0.2,
      max: 2,
      step: 0.1,
      description: "Pulse duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.inOut",
      options: [
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Sine InOut", value: "sine.inOut" },
        { label: "Linear", value: "none" }
      ],
      description: "Easing function"
    },
    {
      name: "repeat",
      type: "number",
      default: -1,
      min: -1,
      max: 10,
      description: "Repeat count (-1 for infinite)"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "pulse animation",
    "heartbeat effect",
    "breathing animation",
    "scale pulse",
    "attention grabber"
  ],
  
  commonUseCases: ["Call-to-action buttons", "Notifications", "Loading indicators", "Active states"]
});

// ============================================
// ROTATE ANIMATIONS (ID-t31 to ID-t40)
// ============================================

export const rotate360 = factory.createTemplate({
  name: "Rotate 360",
  category: TemplateCategory.CORE,
  subcategory: "rotate",
  description: "Full 360-degree rotation",
  difficulty: "beginner",
  
  code: `gsap.to("[data-element-id='${params.elementId}']", {
  rotation: ${params.degrees},
  duration: ${params.duration},
  ease: "${params.ease}",
  repeat: ${params.repeat},
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview" style="width: 100px; height: 100px; background: #e74c3c;">
    <div style="font-size: 48px;">🔄</div>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "degrees",
      type: "number",
      default: 360,
      min: -720,
      max: 720,
      description: "Rotation degrees"
    },
    {
      name: "duration",
      type: "range",
      default: 1,
      min: 0.2,
      max: 5,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "none",
      options: [
        { label: "Linear", value: "none" },
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Back Out", value: "back.out(1.7)" }
      ],
      description: "Easing function"
    },
    {
      name: "repeat",
      type: "number",
      default: 0,
      min: -1,
      max: 10,
      description: "Repeat count (-1 for infinite)"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "rotate 360",
    "spin animation",
    "full rotation",
    "turn around",
    "spinning effect"
  ],
  
  commonUseCases: ["Loading spinners", "Icon animations", "Refresh buttons", "Game elements"]
});

export const rotateIn = factory.createTemplate({
  name: "Rotate In",
  category: TemplateCategory.CORE,
  subcategory: "rotate",
  description: "Rotate and fade in simultaneously",
  difficulty: "intermediate",
  
  code: `gsap.from("[data-element-id='${params.elementId}']", {
  rotation: ${params.startRotation},
  opacity: 0,
  scale: ${params.startScale},
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay},
  transformOrigin: "${params.origin}"
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Rotate In</h2>
    <p>Spinning entrance</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "startRotation",
      type: "number",
      default: -180,
      min: -360,
      max: 360,
      description: "Starting rotation"
    },
    {
      name: "startScale",
      type: "range",
      default: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      description: "Starting scale"
    },
    {
      name: "duration",
      type: "range",
      default: 0.8,
      min: 0.2,
      max: 3,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power3.out",
      options: [
        { label: "Power3 Out", value: "power3.out" },
        { label: "Back Out", value: "back.out(1.7)" },
        { label: "Elastic Out", value: "elastic.out(1, 0.3)" }
      ],
      description: "Easing function"
    },
    {
      name: "origin",
      type: "select",
      default: "center",
      options: [
        { label: "Center", value: "center" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" }
      ],
      description: "Transform origin"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "rotate in animation",
    "spinning entrance",
    "twist in effect",
    "rotate and appear"
  ],
  
  commonUseCases: ["Logo animations", "Feature reveals", "Card flips", "Dynamic entrances"]
});

// ============================================
// BASIC TRANSFORMS (ID-t41 to ID-t50)
// ============================================

export const moveAlongPath = factory.createTemplate({
  name: "Move Along Path",
  category: TemplateCategory.CORE,
  subcategory: "transform",
  description: "Move element along a curved path",
  difficulty: "advanced",
  
  code: `gsap.to("[data-element-id='${params.elementId}']", {
  duration: ${params.duration},
  ease: "${params.ease}",
  motionPath: {
    path: [{x: 0, y: 0}, {x: ${params.midX}, y: ${params.midY}}, {x: ${params.endX}, y: ${params.endY}}],
    curviness: ${params.curviness},
    autoRotate: ${params.autoRotate}
  },
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container" style="position: relative; height: 400px;">
  <div class="preview-element" data-element-id="preview" style="position: absolute; width: 50px; height: 50px; background: #9b59b6; border-radius: 50%;">
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "midX",
      type: "number",
      default: 100,
      min: -300,
      max: 300,
      description: "Mid-point X coordinate"
    },
    {
      name: "midY",
      type: "number",
      default: -100,
      min: -300,
      max: 300,
      description: "Mid-point Y coordinate"
    },
    {
      name: "endX",
      type: "number",
      default: 200,
      min: -300,
      max: 300,
      description: "End X coordinate"
    },
    {
      name: "endY",
      type: "number",
      default: 0,
      min: -300,
      max: 300,
      description: "End Y coordinate"
    },
    {
      name: "curviness",
      type: "range",
      default: 1.25,
      min: 0,
      max: 3,
      step: 0.25,
      description: "Path curviness"
    },
    {
      name: "autoRotate",
      type: "boolean",
      default: true,
      description: "Auto-rotate along path"
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
      default: "power1.inOut",
      options: [
        { label: "Power1 InOut", value: "power1.inOut" },
        { label: "Linear", value: "none" },
        { label: "Sine InOut", value: "sine.inOut" }
      ],
      description: "Easing function"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  requiredPlugins: [GSAPPlugin.MOTION_PATH],
  
  examplePrompts: [
    "move along curve",
    "curved path animation",
    "arc movement",
    "smooth path motion"
  ],
  
  commonUseCases: ["Particle effects", "Navigation animations", "Game movements", "Data visualizations"]
});

export const skewEffect = factory.createTemplate({
  name: "Skew Effect",
  category: TemplateCategory.CORE,
  subcategory: "transform",
  description: "Skew transformation effect",
  difficulty: "intermediate",
  
  code: `gsap.to("[data-element-id='${params.elementId}']", {
  skewX: ${params.skewX},
  skewY: ${params.skewY},
  duration: ${params.duration},
  ease: "${params.ease}",
  repeat: ${params.repeat},
  yoyo: ${params.yoyo},
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Skew Me!</h2>
    <p>Transform effect</p>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "skewX",
      type: "range",
      default: 20,
      min: -45,
      max: 45,
      step: 1,
      description: "Horizontal skew angle"
    },
    {
      name: "skewY",
      type: "range",
      default: 0,
      min: -45,
      max: 45,
      step: 1,
      description: "Vertical skew angle"
    },
    {
      name: "duration",
      type: "range",
      default: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.inOut",
      options: [
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Elastic Out", value: "elastic.out(1, 0.3)" },
        { label: "Back InOut", value: "back.inOut(1.7)" }
      ],
      description: "Easing function"
    },
    {
      name: "repeat",
      type: "number",
      default: 0,
      min: -1,
      max: 10,
      description: "Repeat count"
    },
    {
      name: "yoyo",
      type: "boolean",
      default: false,
      description: "Reverse on repeat"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "skew animation",
    "distort element",
    "tilt effect",
    "perspective transform"
  ],
  
  commonUseCases: ["Hover effects", "3D illusions", "Dynamic layouts", "Creative transitions"]
});

export const flipCard = factory.createTemplate({
  name: "Flip Card",
  category: TemplateCategory.CORE,
  subcategory: "transform",
  description: "3D card flip effect",
  difficulty: "advanced",
  
  code: `// Set initial 3D perspective
gsap.set("[data-element-id='${params.elementId}']", {
  transformStyle: "preserve-3d",
  transformPerspective: ${params.perspective}
});

// Flip animation
gsap.to("[data-element-id='${params.elementId}']", {
  rotationY: ${params.flipAngle},
  duration: ${params.duration},
  ease: "${params.ease}",
  delay: ${params.delay}
})`,
  
  preview: {
    html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview" style="width: 200px; height: 300px;">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white;">
      <h2>Flip Me!</h2>
    </div>
  </div>
</div>`
  },
  
  parameters: [
    {
      name: "flipAngle",
      type: "number",
      default: 180,
      min: -360,
      max: 360,
      description: "Flip angle in degrees"
    },
    {
      name: "perspective",
      type: "number",
      default: 1000,
      min: 200,
      max: 2000,
      description: "3D perspective distance"
    },
    {
      name: "duration",
      type: "range",
      default: 0.8,
      min: 0.3,
      max: 2,
      step: 0.1,
      description: "Animation duration"
    },
    {
      name: "ease",
      type: "select",
      default: "power2.inOut",
      options: [
        { label: "Power2 InOut", value: "power2.inOut" },
        { label: "Back InOut", value: "back.inOut(1.2)" },
        { label: "Sine InOut", value: "sine.inOut" }
      ],
      description: "Easing function"
    },
    {
      name: "delay",
      type: "number",
      default: 0,
      min: 0,
      max: 5,
      description: "Delay before animation"
    }
  ],
  
  examplePrompts: [
    "flip card animation",
    "3d flip effect",
    "card rotation",
    "flip transition"
  ],
  
  commonUseCases: ["Card games", "Product showcases", "Interactive galleries", "Info cards"]
});

// Export all core templates
export const coreTemplates = [
  fadeIn,
  fadeOut,
  crossFade,
  slideIn,
  slideBounce,
  scaleIn,
  scalePulse,
  rotate360,
  rotateIn,
  moveAlongPath,
  skewEffect,
  flipCard
];