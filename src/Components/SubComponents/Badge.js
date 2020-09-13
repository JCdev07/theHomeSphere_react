import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const colors = {
   base: {
      black: "#000000",
      ebonyClay: "#1F2533",
      emperorGray: "#555555",
      boulderGray: "#777777",
      silverGray: "#CCCCCC",
      galleryGray: "#EEEEEE",
      wildSand: "#f5f5f5",
      white: "#FFFFFF",
      radiantBlue: "#0064d6",
      radiantBlueLt: "#d1e7ff",
      aliceBlue: "#F2F8FF",
      ginFizz: "#FFF9E3",
      chateauGreen: "#3eac51",
      chateauGreenLt: "#c7ebcd",
      superNova: "#dbaf00",
      superNovaLt: "#fff0b3",
      cerise: "#E8135D",
      ceriseLt: "#fbd0df",
      doveGray: "#676767",
      tuna: "#333545",
      tunaLt: "#b6b8c9",
   },
};

const webWeights = {
   thin: "100",
   ultraLight: "200",
   light: "300",
   regular: "400",
   medium: "500",
   semibold: "600",
   bold: "700",
   heavy: "800",
   black: "900",
};

const BadgeStyle = {
   default: {
      background: `${colors.base.silverGray}`,
      color: `${colors.base.white}`,
   },
   primary: {
      background: `${colors.base.radiantBlueLt}`,
      color: `${colors.base.radiantBlue}`,
   },
   success: {
      background: `${colors.base.chateauGreenLt}`,
      color: `${colors.base.chateauGreen}`,
   },
   info: {
      background: `${colors.base.tunaLt}`,
      color: `${colors.base.tuna}`,
   },
   warning: {
      background: `${colors.base.superNovaLt}`,
      color: `${colors.base.superNova}`,
   },
   danger: {
      background: `${colors.base.ceriseLt}`,
      color: `${colors.base.cerise}`,
   },
};

const StyledBadge = styled.span`
   display: inline-block;
   vertical-align: middle;
   font-size: 13px;
   font-weight: ${webWeights.regular};
   line-height: 1;
   color: ${(props) => BadgeStyle[props.type].color};
   background: ${(props) => BadgeStyle[props.type].background};
   padding: 4px 8px;
   border-radius: 21px;
   border: 1px solid ${(props) => BadgeStyle[props.type].color};
`;

const Badge = ({ text, type }) => <StyledBadge type={type}>{text}</StyledBadge>;

Badge.propTypes = {
   text: PropTypes.string,
   type: PropTypes.oneOf([
      "default",
      "primary",
      "success",
      "info",
      "warning",
      "danger",
   ]),
};

Badge.defaultProps = {
   text: "",
   type: "default",
};

export default Badge;
