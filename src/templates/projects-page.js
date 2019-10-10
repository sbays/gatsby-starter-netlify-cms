import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import get from "lodash.get";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  gap: 5px;
  margin: 0 auto;
  padding-bottom: 30px;
  .project__item {
    margin: 3px 0;
  }
  .project__item .blank-block {
    background: #1cb2bf;
    width: 100%;
  }
  .project__item:nth-child(2n) .blank-block {
    background: #1daeec;
  }
  .project__item:nth-child(3n) .blank-block {
    background: #818285;
  }
`;

const ProjectItem = styled.div`
  .images {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 5px;
    height: 160px;
    overflow: hidden;
  }
`;

export const ProjectsPageTemplate = ({ title, projects }) => (
  <ProjectsWrapper className="content">
    {projects.length > 1 &&
      projects.map((project, i) => {
        const images = project.images.map((image, i) => {
          let photo = { ...image.image.childImageSharp };
          photo = {
            ...photo,
            // aspectRatio: 1
            title: image.title
          };
          return photo;
        });
        return (
          <ProjectItem className="project__item" key={i}>
            {/* <h3>{project.projectTitle}</h3>
            <p>{project.projectDescription}</p> */}
            <div className="images">
              <div className="blank-block"></div>
              <Gallery
                title=""
                slug=""
                images={images}
                itemsPerRow={[3, 3, 5, 7]}
              ></Gallery>
              {/* {project.images &&
                project.images.map((image, i) => (
                  <img
                    key={i}
                    src={image.image.childImageSharp.fluid.src}
                    alt={image.title}
                    title={image.title}
                  />
                ))} */}
            </div>
          </ProjectItem>
        );
      })}
  </ProjectsWrapper>
);

// ProjectsPageTemplate.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   projects: PropTypes.arrayOf(
//     PropTypes.shape({
//       images: PropTypes.arrayOf(
//         PropTypes.shape({
//           image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//           title: PropTypes.string
//         })
//       ),
//       projectDescription: PropTypes.string,
//       projectTitle: PropTypes.string
//     })
//   )
// };

const ProjectsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <ProjectsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        projects={frontmatter.projects}
      />
    </Layout>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default ProjectsPage;

export const projectsPageQuery = graphql`
  query ProjectsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        projects {
          images {
            image {
              childImageSharp {
                id
                fluid(maxWidth: 1600, quality: 50) {
                  ...GatsbyImageSharpFluid
                  src
                  aspectRatio
                }
                thumbnail: fluid(maxWidth: 300, quality: 20) {
                  ...GatsbyImageSharpFluid
                  src
                  aspectRatio
                }
                #   fluid(maxWidth: 2048, quality: 100) {
                #     ...GatsbyImageSharpFluid
                #   }
              }
            }
            title
          }
          projectDescription
          projectTitle
        }
      }
    }
  }
`;
