export const getBestProductPosterQuery = /* GraphQL */ `
  query getBestProductPoster {
    metaobjects(type: "best_product_poster", reverse: true, first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            reference {
              ... on Product {
                handle
                title
                tags
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
