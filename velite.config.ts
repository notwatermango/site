import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    labReports: {
      name: 'LabReport',
      pattern: 'lab-reports/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.path().transform(p => p.replace(/^lab-reports\//, '')),
        date: s.isodate(),
        divergence_number: s.string(),
        cover_image: s.image().optional(),
        content: s.markdown()
      })
    }
  }
})
