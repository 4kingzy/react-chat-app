import styled from "styled-components";
import { colors } from "./theme";

export const Button = styled.button`
  margin-right: 50px;
  display: inline-block;

  font-size: 16px;
  background-color: #f0f0f0;

  border-radius: 50px;

  transition: all 0.3s ease-out;
  box-shadow: 9px 10px 17px -8px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(61, 180, 182, 0.8);
  }
`;

export const Header = styled.header`
  /* position: relative; */
  width: auto;
  /*  padding: 24px; */
  background-color: #c9c9c9;
`;

export const MsgInput = styled.input`
  padding: 0 15px;
  line-height: 40px;
  border: none;
  border-radius: 35px;
  font-size: 14px;
  width: 80%;
  margin-left: 50px;
  box-shadow: 9px 10px 17px -8px rgba(0, 0, 0, 0.5);
`;

export const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  font-family: sans-serif;
  padding-top: 10px;
`;

export const Home = styled.div`
  width: 100%;
  height: 100%;
  /* position: relative; */
  background-color: #c9c9c9;
`;

export const Footer = styled.footer`
  position: absolute;
  /* bottom: 0px; */
  width: 100%;
  background-color: #c9c9c9;
  color: ${colors.textPrimary};

  display: flex;
  justify-content: space-evenly;
  padding: 4px 0px;
`;

export const Main = styled.div`
  width: auto;
  height: calc(100vh - 180px);
  /* overflow: scroll; */
  /*  position: relative; */
  border-radius: 20px;
  background-color: #f0f0f0;
  margin: 20px 50px;
  /* margin: 0 auto; */
  box-shadow: 9px 10px 17px -8px rgba(0, 0, 0, 0.5);
`;
export const MsgContainer = styled.div`
  width: auto;
  padding: 12px;
  position: relative;
  display: flex;
`;

export const MsgInner = styled.div`
  padding: 12px;
  line-height: 20px;

  top: 0px;
`;
