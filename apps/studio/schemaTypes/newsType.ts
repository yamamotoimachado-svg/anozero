import {defineField, defineType} from 'sanity'
import type {Rule} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          {title: 'Portuguese', value: 'pt'},
          {title: 'English', value: 'en'},
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'reference',
      to: [{type: 'news'}],
      description: 'Link to the translated version of this news item.',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Short category label shown on cards.',
    }),
    defineField({
      name: 'destaque',
      type: 'boolean',
      title: 'Destaque',
      description: 'Show this news item first in listings.',
      initialValue: false,
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      description: 'Manual date shown in the news item.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ]
    }),
     defineField({
      name: 'bodyone',
      type: 'array',
      of: [{type: 'block'},]
    }),
  ],
})