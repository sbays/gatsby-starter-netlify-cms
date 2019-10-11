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

export const ProjectsPageTemplate = ({ title, projects }) =>
  console.log(projects) || (
    <ProjectsWrapper className="content">
      {projects.length > 1 &&
        projects.map((project, i) => {
          const images = project.images
            .filter(image => !!image.image)
            .map((image, i) => {
              let photo = { ...image.image.childImageSharp };
              photo = {
                ...photo,
                title: image.title
              };
              return photo;
            });
          console.log(images);
          return (
            <ProjectItem className="project__item" key={i}>
              <div className="images">
                <div className="blank-block"></div>
                <Gallery
                  title=""
                  slug=""
                  images={images}
                  itemsPerRow={[3]}
                ></Gallery>
              </div>
            </ProjectItem>
          );
        })}
    </ProjectsWrapper>
  );

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
