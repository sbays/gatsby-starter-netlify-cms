import React from "react";
import PropTypes from "prop-types";
import { ProjectsPage } from "../../templates/projects-page";

const ProjectsPagePreview = ({ entry, getAsset }) => {

  return (
    <ProjectsPage
      // image={entry.getIn(["data", "image"])}
      data={[{
        title: entry.getIn(["data", "title"])
      }]}
      // projects={[
      //   {
      //     images: [
      //       {
      //         image: entry.getIn(["data", "projects", "images", "image"])
      //       }
      //     ]
      //   }
      // ]}
    />
  );
};

ProjectsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default ProjectsPagePreview;
