import React, { Component } from "react";
import { Link } from "gatsby";

class GridImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridItems: null,
      blocks: null
    };
  }
  componentWillMount() {
    const blocks = new Array(10).fill(null);
    const blankSpaces = [3, 6, 7, 9];
    const { gridImages } = this.props;

    blankSpaces.forEach(blankSpace => {
      blocks[blankSpace] = { blank: true };
    });

    Object.keys(gridImages).map((key, index) => {
      console.log(gridImages);
      const gridImage = gridImages[key];
      // gridImage.index = index + 1;

      const emptyBlockIndex = blocks.findIndex(block => {
        return block === null;
      });
      blocks[emptyBlockIndex] = gridImage;
    });

    this.setState({ blocks });
  }

  showBlocks = () => {
    console.log(this.state.blocks);
    return this.state.blocks.map((block, index) => {
      console.log({ block });
      if (!block.title) {
        return (
          <div
            key={index}
            className={`grid-item grid-item--blank grid-item-${index + 1}`}
          >
            empty
          </div>
        );
      }
      return (
        <div key={block.index} className={`grid-item grid-item-${index + 1}`}>
          <Link to={`/${block.link}`}>
            <img
              src={block.image.childImageSharp.fluid.src}
              alt={block.title}
            />
            <h5 className="grid-item__title">{block.title}</h5>
          </Link>
        </div>
      );
    });
  };
  render() {
    return <>{this.state.blocks && <>{this.showBlocks()}</>}</>;
  }
}

export default GridImages;
