import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Styled from "styled-components";
import {
  formatGreen,
  formatBlue,
  formatGray,
  formatGreenTranslucent
} from "../variables";

const backgroundColors = [formatGray, formatGreen, formatBlue];

const GridItem = Styled.div`
  width: 90%;
  background: ${formatGreenTranslucent};
  grid-row: span 1;
  grid-column: span 1;
  position: relative;
  border: 2px solid ${formatGreen};
  img {
    position: absolute;
    top: 0;
    bottom:0;
    right: 0;
    left: 0;
    width: 100%;
  }
  &:before{ 
    content: '';
    display: inline-block;
    width: 1px;
    height: 0;
    padding-bottom: 90%;
  }
  .item:nth-child(1) {
    grid-row-start: 1;
    grid-column-start: 1;
  }
  &:hover {
    .grid-item__title {
      visibility: visible;
    }
  }
  .grid-item__link, .grid-item__linkless {
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

class GridItems extends Component {
  constructor(props) {
    super(props);
    this.gridColorIndex = 0;
    this.state = {
      gridItems: null,
      blocks: null
    };
  }
  componentDidMount() {
    const blocks = new Array(10).fill(null);
    const blankSpaces = [3, 6, 7];
    const { gridItems } = this.props;

    blankSpaces.forEach(blankSpace => {
      blocks[blankSpace] = { blank: true };
    });

    Object.keys(gridItems).forEach((key, index) => {
      const gridItem = gridItems[key];

      const emptyBlockIndex = blocks.findIndex(block => {
        return block === null;
      });
      blocks[emptyBlockIndex] = gridItem;
    });

    this.setState({ blocks });
  }

  fetchBackgroundColor = () => {
    const color = backgroundColors[this.gridColorIndex];
    this.gridColorIndex =
      this.gridColorIndex >= backgroundColors.length - 1
        ? 0
        : this.gridColorIndex + 1;
    return color;
  };

  showBlocks = () => {
    return this.state.blocks.map((block, index) => {
      if (!block || !block.title) {
        const blockStyle = { backgroundColor: this.fetchBackgroundColor() };
        return (
          <div
            key={index}
            className={`grid-item grid-item--blank grid-item-${index + 1}`}
            style={blockStyle}
          ></div>
        );
      }
      return (
        <GridItem key={index} className={`grid-item grid-item-${index + 1}`}>
          {block.link ? (
            <Link className="grid-item__link" to={`/${block.link}`}>
              {block.image && block.image.childImageSharp ? (
                <Img
                  fluid={block.image.childImageSharp.thumbnail}
                  title={block.title}
                  sizes={{
                    aspectRatio: 1,
                    src: block.image.childImageSharp.thumbnail.src,
                    srcSet: block.image.childImageSharp.thumbnail.srcSet,
                    sizes: "200px 200px"
                  }}
                />
              ) : (
                "noimage"
              )}
              {block.title && block.title.length && (
                <h5 className="grid-item__title">{block.title}</h5>
              )}
            </Link>
          ) : block.image && block.image.childImageSharp ? (
            <div className="grid-item__linkless">
              <Img
                fluid={block.image.childImageSharp.thumbnail}
                title={block.title}
                sizes={{
                  aspectRatio: 1,
                  src: block.image.childImageSharp.thumbnail.src,
                  srcSet: block.image.childImageSharp.thumbnail.srcSet,
                  sizes: "100% 100%"
                }}
              />
            </div>
          ) : (
            "noimage"
          )}
        </GridItem>
      );
    });
  };
  render() {
    return <>{this.state.blocks && <>{this.showBlocks()}</>}</>;
  }
}

export default GridItems;
