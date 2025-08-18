export const getPromoBannerQuery = /* GraphQL */ `
  query getPromoBanner {
    metaobjects(type: "promo_banner", reverse: true, first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on Product {
                id
                handle
                title
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
