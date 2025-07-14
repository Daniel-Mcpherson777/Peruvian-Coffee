// src/services/templates/TemplateFactory.ts
import { Template, TemplateConfig, TemplateParameter, TemplateCategory } from '../../types/template.types';

export class TemplateFactory {
  private templateCounter: Map<TemplateCategory, number> = new Map();
  private templates: Map<string, Template> = new Map();

  constructor() {
    // Initialize counters for each category
    Object.values(TemplateCategory).forEach(category => {
      this.templateCounter.set(category, 0);
    });
  }

  /**
   * Generate a unique template ID based on category
   */
  private generateTemplateId(category: TemplateCategory): string {
    const categoryRanges = {
      [TemplateCategory.CORE]: { start: 1, end: 50 },
      [TemplateCategory.SCROLL_TRIGGER]: { start: 51, end: 150 },
      [TemplateCategory.SVG]: { start: 151, end: 250 },
      [TemplateCategory.PHYSICS]: { start: 251, end: 350 },
      [TemplateCategory.TEXT]: { start: 351, end: 450 },
      [TemplateCategory.ADVANCED]: { start: 451, end: 550 }
    };

    const range = categoryRanges[category];
    const currentCount = this.templateCounter.get(category) || 0;
    const id = range.start + currentCount;
    
    if (id > range.end) {
      throw new Error(`Template limit reached for category ${category}`);
    }

    this.templateCounter.set(category, currentCount + 1);
    return `ID-t${id}`;
  }

  /**
   * Create a new template from configuration
   */
  createTemplate(config: TemplateConfig): Template {
    const id = this.generateTemplateId(config.category);
    
    const template: Template = {
      id,
      name: config.name,
      category: config.category,
      subcategory: config.subcategory,
      description: config.description,
      tags: config.tags || [],
      difficulty: config.difficulty || 'beginner',
      
      // Code generation
      code: this.processTemplateCode(config.code),
      codeVariations: config.codeVariations,
      requiredPlugins: config.requiredPlugins || [],
      dependencies: config.dependencies,
      
      // Preview
      preview: {
        html: config.preview.html,
        css: config.preview.css || this.generateDefaultCSS(),
        thumbnail: config.preview.thumbnail || this.generateThumbnailPath(id)
      },
      
      // Parameters
      parameters: this.processParameters(config.parameters || []),
      
      // AI/NLP optimization
      examplePrompts: config.examplePrompts || this.generateDefaultPrompts(config),
      keywords: config.keywords || this.extractKeywords(config),
      relatedTemplates: config.relatedTemplates || [],
      
      // Performance & compatibility
      performanceScore: config.performanceScore || 85,
      mobileOptimized: config.mobileOptimized !== false,
      browserSupport: config.browserSupport || ['chrome', 'firefox', 'safari', 'edge'],
      
      // Usage
      commonUseCases: config.commonUseCases || []
    };

    // Validate and store template
    this.validateTemplate(template);
    this.templates.set(id, template);
    
    return template;
  }

  /**
   * Process template code to ensure proper formatting
   */
  private processTemplateCode(code: string): string {
    // Ensure code uses proper parameter placeholders
    return code.trim()
      .replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return `\${params.${param}}`;
      });
  }

  /**
   * Process and validate parameters
   */
  private processParameters(params: TemplateParameter[]): TemplateParameter[] {
    return params.map(param => ({
      ...param,
      // Ensure all parameters have required fields
      type: param.type,
      default: param.default,
      description: param.description || '',
      // Add validation based on type
      ...(param.type === 'number' || param.type === 'range' ? {
        min: param.min ?? 0,
        max: param.max ?? 100,
        step: param.step ?? 1
      } : {}),
      ...(param.type === 'select' ? {
        options: param.options || []
      } : {})
    }));
  }

  /**
   * Generate default CSS for previews
   */
  private generateDefaultCSS(): string {
    return `.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.preview-element {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}`;
  }

  /**
   * Generate thumbnail path
   */
  private generateThumbnailPath(id: string): string {
    return `/thumbnails/${id.toLowerCase()}.png`;
  }

  /**
   * Generate default prompts based on template configuration
   */
  private generateDefaultPrompts(config: TemplateConfig): string[] {
    const prompts: string[] = [];
    
    // Add name-based prompts
    prompts.push(config.name.toLowerCase());
    prompts.push(`${config.name.toLowerCase()} animation`);
    prompts.push(`animate with ${config.name.toLowerCase()}`);
    
    // Add action-based prompts
    if (config.name.includes('Fade')) {
      prompts.push('make it fade in', 'fade animation', 'opacity animation');
    }
    if (config.name.includes('Slide')) {
      prompts.push('slide in', 'move in from side', 'sliding animation');
    }
    if (config.name.includes('Scale')) {
      prompts.push('grow animation', 'shrink animation', 'size animation');
    }
    if (config.name.includes('Rotate')) {
      prompts.push('spin animation', 'rotation effect', 'turning animation');
    }
    
    return prompts;
  }

  /**
   * Extract keywords from template configuration
   */
  private extractKeywords(config: TemplateConfig): string[] {
    const keywords = new Set<string>();
    
    // Extract from name
    config.name.split(/(?=[A-Z])/).forEach(word => 
      keywords.add(word.toLowerCase())
    );
    
    // Extract from description
    config.description.split(' ').forEach(word => {
      if (word.length > 3) {
        keywords.add(word.toLowerCase());
      }
    });
    
    // Add category keywords
    keywords.add(config.category.toLowerCase());
    keywords.add(config.subcategory.toLowerCase());
    
    return Array.from(keywords);
  }

  /**
   * Validate template structure
   */
  private validateTemplate(template: Template): void {
    const errors: string[] = [];
    
    if (!template.id.match(/^ID-t\d+$/)) {
      errors.push('Invalid template ID format');
    }
    
    if (!template.name || template.name.length < 3) {
      errors.push('Template name too short');
    }
    
    if (!template.code || template.code.length < 10) {
      errors.push('Template code too short');
    }
    
    if (template.parameters.length > 0) {
      template.parameters.forEach((param, index) => {
        if (!param.name || !param.type || param.default === undefined) {
          errors.push(`Parameter ${index} missing required fields`);
        }
      });
    }
    
    if (template.examplePrompts.length < 3) {
      errors.push('Need at least 3 example prompts');
    }
    
    if (errors.length > 0) {
      throw new Error(`Template validation failed: ${errors.join(', ')}`);
    }
  }

  /**
   * Create variations of a base template
   */
  createVariations(baseTemplate: Template, variations: TemplateVariation[]): Template[] {
    return variations.map(variation => {
      const config: TemplateConfig = {
        ...baseTemplate,
        name: `${baseTemplate.name} ${variation.suffix}`,
        description: variation.description || `${baseTemplate.description} - ${variation.suffix}`,
        code: this.applyVariationToCode(baseTemplate.code, variation),
        parameters: [...baseTemplate.parameters, ...(variation.additionalParams || [])],
        tags: [...baseTemplate.tags, ...(variation.tags || [])],
        examplePrompts: [
          ...baseTemplate.examplePrompts,
          ...(variation.prompts || [])
        ]
      };
      
      return this.createTemplate(config);
    });
  }

  /**
   * Apply variation modifications to code
   */
  private applyVariationToCode(baseCode: string, variation: TemplateVariation): string {
    let code = baseCode;
    
    if (variation.codeModifications) {
      Object.entries(variation.codeModifications).forEach(([key, value]) => {
        code = code.replace(new RegExp(`\\$\{params\\.${key}\}`, 'g'), value);
      });
    }
    
    if (variation.additionalCode) {
      code = `${code}\n\n${variation.additionalCode}`;
    }
    
    return code;
  }

  /**
   * Get all templates
   */
  getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: TemplateCategory): Template[] {
    return Array.from(this.templates.values())
      .filter(template => template.category === category);
  }

  /**
   * Export templates to JSON
   */
  exportTemplates(): string {
    const templates = this.getAllTemplates();
    return JSON.stringify(templates, null, 2);
  }
}

// Types
export interface TemplateVariation {
  suffix: string;
  description?: string;
  codeModifications?: Record<string, string>;
  additionalCode?: string;
  additionalParams?: TemplateParameter[];
  tags?: string[];
  prompts?: string[];
}