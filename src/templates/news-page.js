import React from "react";
import { graphql, StaticQuery } from "gatsby";
import FullPageGrid from "../components/FullPageGrid";

const NewsPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <FullPageGrid posts={posts}></FullPageGrid>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query NewsStoriesQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { tags: { in: ["format"] } } }
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                title
                tags
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    thumbnail: fluid(maxWidth: 300, quality: 20) {
                      ...GatsbyImageSharpFluid
                      src
                      aspectRatio
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NewsPage data={data} count={count} />}
  />
);