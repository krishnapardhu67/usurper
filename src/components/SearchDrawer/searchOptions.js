import React from 'react'

export const ONESEARCH = 'ONESEARCH'
export const NDCATALOG = 'NDCATALOG'
export const CURATEND = 'CURATEND'
export const LIBRARY = 'LIBRARY'

export const searchOptions = [
  {
    uid: ONESEARCH,
    title: 'OneSearch',
    description:'The ND Catalog plus articles, datasets and more',
  },
  {
    uid: NDCATALOG,
    title: 'ND Catalog',
    description:'Print and electronic books, journals and databases',
    additionalLinks: (<a href='https://alephprod.library.nd.edu/F/?func=find-b-0'>Catalog Classic</a>),
  },
  {
    uid: CURATEND,
    title: 'CurateND',
    description:'Theses, dissertations, articles, and data by ND Researchers',
    additionalLinks: '\u00a0',
  },
  {
    uid: LIBRARY,
    title: 'Library Website',
    description:'Research guides, services, people and places',
    additionalLinks: '\u00a0',
  },
]
