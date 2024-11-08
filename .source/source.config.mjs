// source.config.ts
import {
  defineDocs,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import {
  remarkDocGen,
  fileGenerator,
  typescriptGenerator
} from "fumadocs-docgen";
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { z } from "zod";
var { docs, meta } = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false)
    })
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: [[rehypeCode]],
    remarkPlugins: [
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }]
    ]
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
