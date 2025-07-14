# GSAP Template System Implementation Guide

## Overview

This guide explains how to implement and use the GSAP template library system for your AI Animation Builder. The system is designed to be scalable, maintainable, and optimized for AI-powered template discovery.

## System Architecture

### 1. Template Factory (`TemplateFactory.ts`)
The core component that:
- Generates unique IDs for each template (ID-t1, ID-t2, etc.)
- Validates template structure
- Processes parameters and code
- Manages template storage

### 2. Template Types (`template.types.ts`)
Defines the structure for:
- Template interface with all required properties
- Parameter types and configurations
- Category enumerations
- Plugin dependencies

### 3. Template Collections
Organized by category:
- **Core Animations** (ID-t1 to ID-t50): Basic transforms, fades, slides
- **ScrollTrigger** (ID-t51 to ID-t150): Scroll-based animations
- **SVG Animations** (ID-t151 to ID-t250): Path animations, morphing
- **Physics** (ID-t251 to ID-t350): Spring, bounce effects
- **Text Effects** (ID-t351 to ID-t450): Typography animations
- **Advanced** (ID-t451+): Complex, performance-optimized animations

## Implementation Steps

### Step 1: Set Up the Project Structure

```bash
src/
├── services/
│   └── templates/
│       ├── TemplateFactory.ts
│       ├── TemplateValidator.ts
│       └── TemplateSearchService.ts
├── types/
│   └── template.types.ts
├── data/
│   └── templates/
│       ├── core/
│       │   └── index.ts
│       ├── scrollTrigger/
│       │   └── index.ts
│       ├── svg/
│       │   └── index.ts
│       ├── physics/
│       │   └── index.ts
│       ├── text/
│       │   └── index.ts
│       └── advanced/
│           └── index.ts
└── scripts/
    └── generateTemplates.ts
```

### Step 2: Install Dependencies

```bash
npm install gsap convex
npm install -D @types/node
```

### Step 3: Generate Initial Templates

Run the template generator script:

```bash
npx ts-node scripts/generateTemplates.ts
```

This will:
1. Generate all base templates
2. Create variations automatically
3. Output JSON files for database import
4. Generate TypeScript constants
5. Create SQL insert statements

### Step 4: Import Templates to Convex

```typescript
// convex/seedTemplates.ts
import { mutation } from "./_generated/server";
import templates from "../output/templates/all-templates.json";

export const seedTemplates = mutation(async ({ db }) => {
  for (const template of templates) {
    await db.insert("templates", template);
  }
  return { imported: templates.length };
});
```

### Step 5: Implement Template Search

```typescript
// src/hooks/useTemplateSearch.ts
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function useTemplateSearch(query: string) {
  return useQuery(api.templates.search, { 
    query,
    limit: 20 
  });
}
```

## Creating New Templates

### Basic Template Structure

```typescript
const myNewTemplate = factory.createTemplate({
  name: "Template Name",
  category: TemplateCategory.CORE,
  subcategory: "subcategory",
  description: "What this animation does",
  difficulty: "beginner",
  
  code: `gsap.to("[data-element-id='\${params.elementId}']", {
    // Animation properties
    x: \${params.x},
    duration: \${params.duration},
    ease: "\${params.ease}"
  })`,
  
  preview: {
    html: `<div class="preview-container">
      <div data-element-id="preview">Preview Content</div>
    </div>`,
    css: `.preview-container { /* styles */ }`
  },
  
  parameters: [
    {
      name: "duration",
      type: "range",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Animation duration"
    }
  ],
  
  examplePrompts: [
    "primary use case",
    "alternative phrase",
    "natural language query"
  ],
  
  commonUseCases: ["Use case 1", "Use case 2"]
});
```

### Parameter Types

1. **Number**: Simple numeric input
```typescript
{
  name: "delay",
  type: "number",
  default: 0,
  min: 0,
  max: 10,
  description: "Delay in seconds"
}
```

2. **Range**: Slider input
```typescript
{
  name: "duration",
  type: "range",
  default: 1,
  min: 0.1,
  max: 5,
  step: 0.1,
  description: "Duration"
}
```

3. **Select**: Dropdown options
```typescript
{
  name: "ease",
  type: "select",
  default: "power2.out",
  options: [
    { label: "Power2 Out", value: "power2.out" },
    { label: "Elastic", value: "elastic.out" }
  ],
  description: "Easing function"
}
```

4. **Boolean**: Checkbox
```typescript
{
  name: "loop",
  type: "boolean",
  default: false,
  description: "Loop animation"
}
```

5. **Color**: Color picker
```typescript
{
  name: "backgroundColor",
  type: "color",
  default: "#3498db",
  description: "Background color"
}
```

## AI Integration

### Optimizing for Natural Language

1. **Example Prompts**: Include 5-10 variations
```typescript
examplePrompts: [
  "fade in slowly",
  "gentle appearance",
  "smooth entrance",
  "make it appear softly",
  "opacity animation"
]
```

2. **Keywords**: Extract meaningful terms
```typescript
keywords: ["fade", "opacity", "entrance", "reveal", "appear"]
```

3. **Related Templates**: Link similar animations
```typescript
relatedTemplates: ["ID-t2", "ID-t15", "ID-t23"]
```

### Template Matching Algorithm

```typescript
async function findBestTemplate(userPrompt: string) {
  // 1. Semantic search
  const semanticMatches = await searchBySemantic(userPrompt);
  
  // 2. Keyword matching
  const keywordMatches = searchByKeywords(userPrompt);
  
  // 3. Weighted scoring
  const scores = combineScores(semanticMatches, keywordMatches);
  
  // 4. Return best match
  return scores[0];
}
```

## Performance Optimization

### 1. Code Optimization
- Use `force3D: true` for GPU acceleration
- Minimize DOM queries
- Batch animations with timelines

### 2. Template Scoring
```typescript
performanceScore: calculateScore({
  fps: averageFPS,
  paintTime: averagePaintTime,
  memoryUsage: peakMemory
})
```

### 3. Mobile Optimization
```typescript
mobileOptimized: true,
code: `
  const isMobile = window.innerWidth < 768;
  gsap.to(element, {
    duration: isMobile ? 0.5 : 1,
    ease: isMobile ? "power2.out" : "elastic.out"
  })
`
```

## Testing Templates

### Automated Testing
```typescript
describe('Template: Fade In', () => {
  it('should have valid parameters', () => {
    expect(fadeInTemplate.parameters).toHaveLength(5);
    expect(fadeInTemplate.parameters[0].type).toBe('range');
  });
  
  it('should generate valid GSAP code', () => {
    const code = generateCode(fadeInTemplate, {
      duration: 1,
      ease: 'power2.out'
    });
    expect(code).toContain('gsap.from');
  });
});
```

### Performance Testing
```typescript
async function testTemplatePerformance(template: Template) {
  const results = await runBenchmark(template);
  
  expect(results.fps).toBeGreaterThan(30);
  expect(results.memoryLeaks).toBe(false);
  expect(results.paintTime).toBeLessThan(16);
}
```

## Deployment Checklist

- [ ] Generate all 500+ templates
- [ ] Validate each template structure
- [ ] Test performance scores
- [ ] Import to database
- [ ] Build search indices
- [ ] Test AI matching accuracy
- [ ] Verify mobile optimization
- [ ] Create documentation
- [ ] Set up monitoring

## Best Practices

1. **Consistent Naming**: Use descriptive, searchable names
2. **Comprehensive Prompts**: Cover various ways users might describe the animation
3. **Parameter Defaults**: Choose sensible defaults that work well
4. **Performance First**: Always consider performance impact
5. **Mobile Friendly**: Test on various devices
6. **Documentation**: Include clear descriptions and use cases

## Troubleshooting

### Common Issues

1. **Template ID Conflicts**
```typescript
// Check for duplicate IDs
const ids = templates.map(t => t.id);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
```

2. **Invalid Parameters**
```typescript
// Validate parameter structure
parameters.forEach(param => {
  if (!param.name || !param.type || param.default === undefined) {
    throw new Error(`Invalid parameter: ${JSON.stringify(param)}`);
  }
});
```

3. **Performance Issues**
```typescript
// Monitor template performance
if (template.performanceScore < 60) {
  console.warn(`Low performance: ${template.id}`);
}
```

## Next Steps

1. **Expand Template Library**: Continue adding templates to reach 500+
2. **Enhance AI Matching**: Train models on user interactions
3. **Add Preview System**: Build live preview component
4. **Create Template Editor**: Visual template creation tool
5. **Analytics Integration**: Track popular templates and usage patterns

This system provides a robust foundation for your GSAP template library that can scale to thousands of templates while maintaining quality and performance.