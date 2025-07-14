// scripts/generateTemplates.ts
import { TemplateFactory } from '../src/services/templates/TemplateFactory';
import { TemplateCategory, Template } from '../src/types/template.types';
import { coreTemplates } from '../src/data/templates/core';
import { scrollTriggerTemplates } from '../src/data/templates/scrollTrigger';
import fs from 'fs';
import path from 'path';

/**
 * Template Variation Generator
 * Generates variations of base templates with different parameters
 */
class TemplateVariationGenerator {
  private factory: TemplateFactory;
  
  constructor() {
    this.factory = new TemplateFactory();
  }

  /**
   * Generate fade animation variations
   */
  generateFadeVariations(): Template[] {
    const variations: Template[] = [];
    
    // Directional fades
    const directions = ['Up', 'Down', 'Left', 'Right'];
    const offsets = { Up: { y: 50 }, Down: { y: -50 }, Left: { x: 50 }, Right: { x: -50 } };
    
    directions.forEach(direction => {
      const offset = offsets[direction];
      variations.push(
        this.factory.createTemplate({
          name: `Fade In ${direction}`,
          category: TemplateCategory.CORE,
          subcategory: "fade",
          description: `Fade in from ${direction.toLowerCase()}`,
          difficulty: "beginner",
          
          code: `gsap.from("[data-element-id='\${params.elementId}']", {
  opacity: 0,
  ${offset.x ? `x: ${offset.x},` : ''}
  ${offset.y ? `y: ${offset.y},` : ''}
  duration: \${params.duration},
  ease: "\${params.ease}",
  delay: \${params.delay}
})`,
          
          preview: {
            html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Fade In ${direction}</h2>
  </div>
</div>`
          },
          
          parameters: [
            {
              name: "duration",
              type: "range",
              default: 1,
              min: 0.1,
              max: 3,
              step: 0.1,
              description: "Animation duration"
            },
            {
              name: "ease",
              type: "select",
              default: "power2.out",
              options: [
                { label: "Power2 Out", value: "power2.out" },
                { label: "Power3 Out", value: "power3.out" },
                { label: "Expo Out", value: "expo.out" }
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
            `fade in from ${direction.toLowerCase()}`,
            `${direction.toLowerCase()} fade animation`,
            `slide fade ${direction.toLowerCase()}`
          ],
          
          commonUseCases: ["Content reveals", "Hero animations", "Card entrances"]
        })
      );
    });
    
    return variations;
  }

  /**
   * Generate scale animation variations
   */
  generateScaleVariations(): Template[] {
    const variations: Template[] = [];
    
    // Scale with rotation
    variations.push(
      this.factory.createTemplate({
        name: "Scale Rotate In",
        category: TemplateCategory.CORE,
        subcategory: "scale",
        description: "Scale and rotate entrance",
        difficulty: "intermediate",
        
        code: `gsap.from("[data-element-id='\${params.elementId}']", {
  scale: \${params.startScale},
  rotation: \${params.rotation},
  opacity: 0,
  duration: \${params.duration},
  ease: "\${params.ease}",
  transformOrigin: "\${params.origin}"
})`,
        
        preview: {
          html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Scale & Rotate</h2>
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
            name: "rotation",
            type: "number",
            default: 180,
            min: -360,
            max: 360,
            description: "Rotation degrees"
          },
          {
            name: "duration",
            type: "range",
            default: 0.5,
            min: 0.1,
            max: 2,
            step: 0.1,
            description: "Animation duration per character"
          },
          {
            name: "staggerTime",
            type: "range",
            default: 0.05,
            min: 0.01,
            max: 0.2,
            step: 0.01,
            description: "Stagger delay between characters"
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
            description: "Stagger direction"
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
          }
        ],
        
        requiredPlugins: [],
        
        examplePrompts: [
          "character wave animation",
          "text wave effect",
          "letter by letter animation",
          "wavy text reveal"
        ],
        
        commonUseCases: ["Headlines", "Logo animations", "Loading text", "Creative typography"]
      })
    );
    
    return variations;
  }

  /**
   * Generate all template variations
   */
  generateAllVariations(): Template[] {
    console.log('Generating template variations...');
    
    const allVariations = [
      ...this.generateFadeVariations(),
      ...this.generateScaleVariations(),
      ...this.generateTextVariations()
    ];
    
    console.log(`Generated ${allVariations.length} template variations`);
    return allVariations;
  }
}

/**
 * Template Batch Generator
 * Generates templates in batches for each category
 */
class TemplateBatchGenerator {
  private factory: TemplateFactory;
  private variationGenerator: TemplateVariationGenerator;
  
  constructor() {
    this.factory = new TemplateFactory();
    this.variationGenerator = new TemplateVariationGenerator();
  }

  /**
   * Generate templates for a specific category range
   */
  generateCategoryTemplates(
    category: TemplateCategory,
    startId: number,
    endId: number
  ): Template[] {
    const templates: Template[] = [];
    
    // Add base templates
    switch (category) {
      case TemplateCategory.CORE:
        templates.push(...coreTemplates);
        break;
      case TemplateCategory.SCROLL_TRIGGER:
        templates.push(...scrollTriggerTemplates);
        break;
      // Add other categories as they're created
    }
    
    // Generate variations to fill the range
    const variations = this.variationGenerator.generateAllVariations();
    const neededCount = endId - startId + 1 - templates.length;
    
    if (neededCount > 0) {
      templates.push(...variations.slice(0, neededCount));
    }
    
    return templates;
  }

  /**
   * Save templates to JSON files
   */
  saveTemplatesToFile(templates: Template[], filename: string): void {
    const outputDir = path.join(__dirname, '../output/templates');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(templates, null, 2));
    
    console.log(`Saved ${templates.length} templates to ${filePath}`);
  }

  /**
   * Generate template manifest for AI optimization
   */
  generateTemplateManifest(templates: Template[]): void {
    const manifest = {
      version: "1.0.0",
      totalTemplates: templates.length,
      categories: {} as Record<string, any>,
      keywords: new Set<string>(),
      prompts: [] as string[]
    };
    
    // Categorize templates
    templates.forEach(template => {
      if (!manifest.categories[template.category]) {
        manifest.categories[template.category] = {
          count: 0,
          subcategories: new Set<string>(),
          templateIds: []
        };
      }
      
      const categoryData = manifest.categories[template.category];
      categoryData.count++;
      categoryData.subcategories.add(template.subcategory);
      categoryData.templateIds.push(template.id);
      
      // Collect all keywords and prompts
      template.keywords.forEach(keyword => manifest.keywords.add(keyword));
      manifest.prompts.push(...template.examplePrompts);
    });
    
    // Convert sets to arrays for JSON serialization
    Object.keys(manifest.categories).forEach(category => {
      manifest.categories[category].subcategories = 
        Array.from(manifest.categories[category].subcategories);
    });
    manifest.keywords = Array.from(manifest.keywords) as any;
    
    // Remove duplicate prompts
    manifest.prompts = [...new Set(manifest.prompts)];
    
    const outputDir = path.join(__dirname, '../output/templates');
    const manifestPath = path.join(outputDir, 'template-manifest.json');
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Generated template manifest at ${manifestPath}`);
  }

  /**
   * Generate SQL insert statements for database
   */
  generateSQLInserts(templates: Template[]): void {
    const statements: string[] = [];
    
    templates.forEach(template => {
      const sql = `
INSERT INTO templates (
  template_id, name, category, subcategory, description, 
  code, preview_html, preview_css, thumbnail, 
  required_plugins, difficulty, performance_score, 
  mobile_optimized, example_prompts, keywords
) VALUES (
  '${template.id}',
  '${template.name.replace(/'/g, "''")}',
  '${template.category}',
  '${template.subcategory}',
  '${template.description.replace(/'/g, "''")}',
  '${template.code.replace(/'/g, "''")}',
  '${template.preview.html.replace(/'/g, "''")}',
  '${template.preview.css.replace(/'/g, "''")}',
  '${template.preview.thumbnail}',
  '${JSON.stringify(template.requiredPlugins)}',
  '${template.difficulty}',
  ${template.performanceScore},
  ${template.mobileOptimized},
  '${JSON.stringify(template.examplePrompts)}',
  '${JSON.stringify(template.keywords)}'
);`;
      
      statements.push(sql);
    });
    
    const outputDir = path.join(__dirname, '../output/templates');
    const sqlPath = path.join(outputDir, 'templates-insert.sql');
    
    fs.writeFileSync(sqlPath, statements.join('\n\n'));
    console.log(`Generated SQL inserts at ${sqlPath}`);
  }

  /**
   * Generate TypeScript constants file
   */
  generateTypeScriptConstants(templates: Template[]): void {
    const content = `// Auto-generated template constants
// Generated on ${new Date().toISOString()}

import { Template } from '../types/template.types';

export const TEMPLATE_IDS = {
${templates.map(t => `  ${t.name.replace(/\s+/g, '_').toUpperCase()}: '${t.id}'`).join(',\n')}
} as const;

export const TEMPLATE_MAP = new Map<string, Template>([
${templates.map(t => `  ['${t.id}', ${JSON.stringify(t, null, 2).split('\n').join('\n  ')}]`).join(',\n')}
]);

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATE_MAP.get(id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return Array.from(TEMPLATE_MAP.values()).filter(t => t.category === category);
};

export const searchTemplates = (query: string): Template[] => {
  const lowercaseQuery = query.toLowerCase();
  return Array.from(TEMPLATE_MAP.values()).filter(t => 
    t.name.toLowerCase().includes(lowercaseQuery) ||
    t.description.toLowerCase().includes(lowercaseQuery) ||
    t.keywords.some(k => k.includes(lowercaseQuery)) ||
    t.examplePrompts.some(p => p.toLowerCase().includes(lowercaseQuery))
  );
};
`;
    
    const outputDir = path.join(__dirname, '../output/templates');
    const tsPath = path.join(outputDir, 'template-constants.ts');
    
    fs.writeFileSync(tsPath, content);
    console.log(`Generated TypeScript constants at ${tsPath}`);
  }

  /**
   * Run the complete generation process
   */
  async runGeneration(): Promise<void> {
    console.log('Starting template generation process...\n');
    
    // Generate templates for each category
    const allTemplates: Template[] = [];
    
    // Core animations (ID-t1 to ID-t50)
    console.log('Generating Core Animation templates...');
    const coreTemplates = this.generateCategoryTemplates(
      TemplateCategory.CORE,
      1,
      50
    );
    allTemplates.push(...coreTemplates);
    this.saveTemplatesToFile(coreTemplates, 'core-templates.json');
    
    // ScrollTrigger animations (ID-t51 to ID-t150)
    console.log('Generating ScrollTrigger templates...');
    const scrollTemplates = this.generateCategoryTemplates(
      TemplateCategory.SCROLL_TRIGGER,
      51,
      150
    );
    allTemplates.push(...scrollTemplates);
    this.saveTemplatesToFile(scrollTemplates, 'scrolltrigger-templates.json');
    
    // Generate combined outputs
    console.log('\nGenerating combined outputs...');
    this.saveTemplatesToFile(allTemplates, 'all-templates.json');
    this.generateTemplateManifest(allTemplates);
    this.generateSQLInserts(allTemplates);
    this.generateTypeScriptConstants(allTemplates);
    
    console.log(`\n✅ Template generation complete!`);
    console.log(`Total templates generated: ${allTemplates.length}`);
    console.log(`Output directory: ${path.join(__dirname, '../output/templates')}`);
  }
}

// Run the generator if this file is executed directly
if (require.main === module) {
  const generator = new TemplateBatchGenerator();
  generator.runGeneration().catch(console.error);
}

export { TemplateVariationGenerator, TemplateBatchGenerator }; "range",
            default: 0.8,
            min: 0.2,
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
              { label: "Power3 Out", value: "power3.out" }
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
              { label: "Bottom Right", value: "bottom right" }
            ],
            description: "Transform origin"
          }
        ],
        
        examplePrompts: [
          "scale and rotate",
          "spinning scale animation",
          "rotate zoom effect"
        ],
        
        commonUseCases: ["Logo animations", "Icon reveals", "Interactive elements"]
      })
    );
    
    // Elastic scale
    variations.push(
      this.factory.createTemplate({
        name: "Elastic Scale",
        category: TemplateCategory.CORE,
        subcategory: "scale",
        description: "Elastic scaling effect",
        difficulty: "intermediate",
        
        code: `gsap.from("[data-element-id='\${params.elementId}']", {
  scaleX: \${params.scaleX},
  scaleY: \${params.scaleY},
  duration: \${params.duration},
  ease: "elastic.out(\${params.elasticity}, \${params.amplitude})",
  delay: \${params.delay}
})`,
        
        preview: {
          html: `<div class="preview-container">
  <div class="preview-element" data-element-id="preview">
    <h2>Elastic!</h2>
  </div>
</div>`
        },
        
        parameters: [
          {
            name: "scaleX",
            type: "range",
            default: 0,
            min: 0,
            max: 2,
            step: 0.1,
            description: "Starting X scale"
          },
          {
            name: "scaleY",
            type: "range",
            default: 0,
            min: 0,
            max: 2,
            step: 0.1,
            description: "Starting Y scale"
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
            name: "elasticity",
            type: "range",
            default: 1,
            min: 0.5,
            max: 2,
            step: 0.1,
            description: "Elastic strength"
          },
          {
            name: "amplitude",
            type: "range",
            default: 0.3,
            min: 0.1,
            max: 0.8,
            step: 0.1,
            description: "Elastic amplitude"
          },
          {
            name: "delay",
            type: "number",
            default: 0,
            min: 0,
            max: 2,
            description: "Animation delay"
          }
        ],
        
        examplePrompts: [
          "elastic scale",
          "bouncy scale",
          "spring scale effect"
        ],
        
        commonUseCases: ["Button interactions", "Playful UI", "Notification alerts"]
      })
    );
    
    return variations;
  }

  /**
   * Generate text animation variations
   */
  generateTextVariations(): Template[] {
    const variations: Template[] = [];
    
    // Character stagger
    variations.push(
      this.factory.createTemplate({
        name: "Character Wave",
        category: TemplateCategory.TEXT,
        subcategory: "split",
        description: "Wave animation through characters",
        difficulty: "advanced",
        
        code: `// Split text into characters
const text = document.querySelector("[data-element-id='\${params.elementId}']");
const chars = text.textContent.split('');
text.innerHTML = chars.map(char => 
  \`<span class="char">\${char === ' ' ? '&nbsp;' : char}</span>\`
).join('');

// Animate characters
gsap.from(text.querySelectorAll('.char'), {
  y: \${params.yOffset},
  opacity: 0,
  duration: \${params.duration},
  stagger: {
    each: \${params.staggerTime},
    from: "\${params.staggerFrom}"
  },
  ease: "\${params.ease}"
})`,
        
        preview: {
          html: `<div class="preview-container">
  <h1 data-element-id="preview">WAVE EFFECT</h1>
</div>`
        },
        
        parameters: [
          {
            name: "yOffset",
            type: "number",
            default: 30,
            min: 0,
            max: 100,
            description: "Vertical offset"
          },
          {
            name: "duration",
            type: