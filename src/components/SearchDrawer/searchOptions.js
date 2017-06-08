import React from 'react'
export const searchOptions = [
  {
    uid: 'ONESEARCH',
    title: 'OneSearch',
    description:'The ND Catalog plus articles, datasets and more',
    target: 'https://library.nd.edu/utilities/search/ndu/onesearch',
    additionalLinks: (<a href='http://library.nd.edu/utilities/search/ndu/onesearch?mode=Advanced'>Advanced Search</a>),
  },
  {
    uid: 'NDCATALOG',
    title: 'ND Catalog',
    description:'Print and electronic books, journals and databases',
    target: 'https://library.nd.edu/utilities/search/ndu/nd_campus',
    additionalLinks: (<span><a href='http://library.nd.edu/utilities/search/ndu/ndcampus?mode=Advanced'>Advanced Search</a> | <a href='http://alephprod.library.nd.edu/F/?func=find-b-0'>Catalog Classic</a></span>),
  },
  {
    uid: 'CURATEND',
    title: 'CurateND',
    description:'Theses, dissertations and articles by ND researchers',
    target: 'https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q=',
    additionalLinks: (<span>&nbsp;</span>),
  },
  {
    uid: 'LIBRARY',
    title: 'Library Website',
    description:'Research guides, services, people and places',
    target: '/search',
    additionalLinks: (<span>&nbsp;</span>),
  },
]
