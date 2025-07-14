# Step-by-Step Cursor Implementation Guide

## File Organization and Placement

### Step 1: Create the Directory Structure

First, create these directories in your project:

```
gsap-ai-builder/
├── src/
│   ├── services/
│   │   └── templates/
│   ├── types/
│   ├── data/
│   │   └── templates/
│   │       ├── core/
│   │       └── scrollTrigger/
│   └── hooks/
├── scripts/
└── convex/
```

### Step 2: Place Each File

Here's where each file I created should go:

1. **Template Factory System** → `src/services/templates/TemplateFactory.ts`
2. **Type Definitions** → `src/types/template.types.ts`
3. **Core Animation Templates** → `src/data/templates/core/index.ts`
4. **ScrollTrigger Templates** → `src/data/templates/scrollTrigger/index.ts`
5. **Template Generator Script** → `scripts/generateTemplates.ts`

## Cursor Prompts for Each Component

### Prompt 1: Set Up Base Structure
```
Create the directory structure for the GSAP template system:
- src/services/templates/
- src/types/
- src/data/templates/core/
- src/data/templates/scrollTrigger/
- scripts/

Then create empty TypeScript files:
- src/services/templates/TemplateFactory.ts
- src/types/template.types.ts
- src/data/templates/core/index.ts
- src/data/templates/scrollTrigger/index.ts
- scripts/generateTemplates.ts
```

### Prompt 2: Implement Type Definitions
```
In src/types/template.types.ts, implement the TypeScript interfaces for the GSAP template system. Include:
- TemplateCategory enum with CORE, SCROLL_TRIGGER, SVG, TEXT, PHYSICS, ADVANCED
- ParameterType type union
- TemplateParameter interface with name, type, default, and optional min/max/step/options
- Template interface with all properties like id, name, category, code, parameters, etc.
- TemplateConfig interface for creating new templates
- GSAPPlugin enum with all GSAP plugins
```

### Prompt 3: Create Template Factory
```
In src/services/templates/TemplateFactory.ts, implement a TemplateFactory class that:
- Generates unique template IDs (ID-t1, ID-t2, etc.) based on category ranges
- Has a createTemplate method that accepts TemplateConfig and returns Template
- Validates template structure
- Processes template code with parameter placeholders
- Generates default CSS and prompts if not provided
- Includes methods to get templates by category and export to JSON
```

### Prompt 4: Implement Core Templates
```
In src/data/templates/core/index.ts, create GSAP core animation templates using the TemplateFactory. Include:
- fadeIn template with opacity, scale, and y offset parameters
- fadeOut template with hide on complete option
- crossFade template for transitioning between two elements
- slideIn template with directional options (left, right, top, bottom)
- scaleIn template with transform origin options
- rotate360 template with repeat options
Export all templates in a coreTemplates array.
```

### Prompt 5: Implement ScrollTrigger Templates
```
In src/data/templates/scrollTrigger/index.ts, create ScrollTrigger animation templates:
- basicParallax with yPercent movement
- fadeInOnScroll with toggle actions
- staggerReveal for multiple elements
- pinSection for pinning elements while scrolling
- progressBar for scroll progress indication
Include ScrollTrigger in requiredPlugins array for each template.
Export all in scrollTriggerTemplates array.
```

### Prompt 6: Create Generator Script
```
In scripts/generateTemplates.ts, create a template generation script with:
- TemplateVariationGenerator class that creates variations of base templates
- TemplateBatchGenerator class that generates templates by category
- Methods to save templates as JSON, generate SQL inserts, and create TypeScript constants
- A main function that generates all templates and saves them to output/templates/
Include fs and path imports for file operations.
```

### Prompt 7: Create Convex Schema
```
In convex/schema.ts, add a templates table definition:
- templateId: v.string() with unique ID like ID-t1
- name, category, subcategory, description as strings
- code: v.string() for GSAP code
- parameters: v.array() of parameter objects
- preview: v.object() with html, css, thumbnail
- metadata: v.object() with difficulty, performanceScore, etc.
- aiOptimization: v.object() with examplePrompts and keywords
Add appropriate indexes for searching by category and tags.
```

### Prompt 8: Create Template Search Hook
```
Create src/hooks/useTemplateSearch.ts with:
- A custom hook that uses Convex to search templates
- Accept search query and filters as parameters
- Return matched templates sorted by relevance
- Include loading and error states
```

### Prompt 9: Create Template Preview Component
```
Create src/components/TemplatePreview/TemplatePreview.tsx that:
- Accepts a template object as prop
- Renders the preview HTML in an iframe
- Injects GSAP and the template code
- Shows parameter controls for customization
- Has a "Use Template" button
Use React refs for iframe manipulation and GSAP for animations.
```

### Prompt 10: Create Template Gallery Component
```
Create src/components/TemplateGallery/TemplateGallery.tsx with:
- Search input for filtering templates
- Category filter buttons
- Grid of template cards showing thumbnails
- Click to preview functionality
- Integration with useTemplateSearch hook
Include proper TypeScript types and responsive design.
```

## Implementation Order

### Phase 1: Core Setup (Do First)
1. Create directory structure (Prompt 1)
2. Implement type definitions (Prompt 2)
3. Create Template Factory (Prompt 3)

### Phase 2: Template Creation
4. Implement Core Templates (Prompt 4)
5. Implement ScrollTrigger Templates (Prompt 5)
6. Create Generator Script (Prompt 6)

### Phase 3: Database Integration
7. Create Convex Schema (Prompt 7)
8. Run the generator script to create JSON files:
   ```bash
   npx ts-node scripts/generateTemplates.ts
   ```

### Phase 4: UI Components
9. Create Template Search Hook (Prompt 8)
10. Create Template Preview Component (Prompt 9)
11. Create Template Gallery Component (Prompt 10)

## Additional Cursor Prompts for Testing

### Test Template Generation
```
Create a test file scripts/testGeneration.ts that:
- Imports the TemplateFactory
- Creates a few test templates
- Validates their structure
- Outputs results to console
Run with: npx ts-node scripts/testGeneration.ts
```

### Create Template Seeder
```
Create convex/seedTemplates.ts that:
- Imports the generated JSON files from output/templates/
- Has a mutation to insert all templates into the database
- Includes error handling and progress logging
- Can be run from the Convex dashboard
```

## Troubleshooting Prompts

If you encounter issues, use these prompts:

### Fix Import Errors
```
Fix TypeScript import errors in the template files. Make sure:
- All imports use correct relative paths
- Type imports are properly exported/imported
- The tsconfig.json has proper path mappings
```

### Add Missing Dependencies
```
Add the required npm dependencies for the template system:
- gsap (latest version)
- convex
- @types/node for scripts
Update package.json with these dependencies.
```

### Create Helper Functions
```
Create src/utils/templateHelpers.ts with:
- generateGSAPCode function that replaces parameter placeholders
- validateTemplate function for checking template structure
- formatTemplateForAI function for optimization
```

## Verification Steps

After implementing each component, verify:

1. **Types compile**: No TypeScript errors
2. **Factory works**: Can create templates programmatically
3. **Templates valid**: All have required properties
4. **Generator runs**: Creates JSON output files
5. **Preview works**: Templates animate correctly

## Next Steps After Basic Implementation

Once the basic system is working:

1. Add more template categories (SVG, Physics, Text)
2. Implement AI-powered template matching
3. Create visual template editor
4. Add performance monitoring
5. Build template analytics

This systematic approach will help you build the template system step by step with Cursor, ensuring each component is properly implemented before moving to the next.