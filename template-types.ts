// src/types/template.types.ts

export enum TemplateCategory {
  CORE = "Core Animations",
  SCROLL_TRIGGER = "ScrollTrigger",
  SVG = "SVG Animations",
  TEXT = "Text Effects",
  PHYSICS = "Physics & Interaction",
  ADVANCED = "Advanced Effects"
}

export type ParameterType = 'number' | 'string' | 'boolean' | 'select' | 'color' | 'range';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface TemplateParameter {
  name: string;
  type: ParameterType;
  default: any;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{label: string; value: any}>;
  description: string;
  affectsPerformance?: boolean;
}

export interface CodeVariation {
  name: string;
  code: string;
  description: string;
}

export interface Template {
  // Identification
  id: string;
  name: string;
  category: TemplateCategory;
  subcategory: string;
  description: string;
  tags: string[];
  difficulty: Difficulty;
  
  // Code related
  code: string;
  codeVariations?: CodeVariation[];
  requiredPlugins: GSAPPlugin[];
  dependencies?: string[];
  
  // Preview
  preview: {
    html: string;
    css: string;
    thumbnail: string;
    livePreviewUrl?: string;
  };
  
  // Parameters for customization
  parameters: TemplateParameter[];
  
  // AI/NLP optimization
  examplePrompts: string[];
  keywords: string[];
  relatedTemplates: string[];
  
  // Performance & compatibility
  performanceScore: number;
  mobileOptimized: boolean;
  browserSupport: string[];
  
  // Usage analytics
  popularityScore?: number;
  commonUseCases: string[];
}

export interface TemplateConfig {
  name: string;
  category: TemplateCategory;
  subcategory: string;
  description: string;
  code: string;
  preview: {
    html: string;
    css?: string;
    thumbnail?: string;
  };
  parameters?: TemplateParameter[];
  tags?: string[];
  difficulty?: Difficulty;
  codeVariations?: CodeVariation[];
  requiredPlugins?: GSAPPlugin[];
  dependencies?: string[];
  examplePrompts?: string[];
  keywords?: string[];
  relatedTemplates?: string[];
  performanceScore?: number;
  mobileOptimized?: boolean;
  browserSupport?: string[];
  commonUseCases?: string[];
}

export enum GSAPPlugin {
  SCROLL_TRIGGER = "ScrollTrigger",
  TEXT_PLUGIN = "TextPlugin",
  MORPH_SVG = "MorphSVGPlugin",
  DRAW_SVG = "DrawSVGPlugin",
  MOTION_PATH = "MotionPathPlugin",
  SCROLL_TO = "ScrollToPlugin",
  FLIP = "Flip",
  OBSERVER = "Observer",
  SCROLL_SMOOTHER = "ScrollSmoother",
  SPLIT_TEXT = "SplitText",
  INERTIA = "InertiaPlugin",
  PHYSICS_2D = "Physics2DPlugin",
  PIXI = "PixiPlugin",
  EASEL = "EaselPlugin",
  CSS_RULE = "CSSRulePlugin",
  CUSTOM_EASE = "CustomEase",
  ROUGH_EASE = "RoughEase",
  SLOW_MO = "SlowMo",
  CUSTOM_WIGGLE = "CustomWiggle",
  CUSTOM_BOUNCE = "CustomBounce"
}