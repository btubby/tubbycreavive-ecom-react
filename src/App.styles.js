import styled from "styled-components";

export const Container = styled.div`
// background-color:red;
  display: relative;
  flex-direction: column;
  height:100%
`;
export const Header = styled.div`
/* background-size: 50%; */
/* width: 100%; */
/* margin: 0px; */
/* height: 6vw; */
height: 110px;
padding-right:50px;
position: fixed;
top: 9px;
right: 0px;
z-index: 1000;
text-align: right;

  display:none;
`;
export const TitleContainer = styled.div`
`;
export const TitleImage = styled.img`
  width: 30%;
  background-color: white
`;

export const PreviewImage = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  z-index:1;
`;
export const Floater = styled.div`
  position: fixed;
  z-index:10;
  background-color: white;
  // width: 100%
`;
export const GalleryContainer = styled.div`
  // margin-top: 100px;
  z-index:1;
`;