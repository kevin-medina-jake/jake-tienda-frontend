export const getHeroItemsQuery = /* GraphQL */ `
  query getHeroItems {
    metaobjects(type: "hero", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
              ... on Product {
                handle
              }
            }
          }
        }
      }
    }
  }
`;
