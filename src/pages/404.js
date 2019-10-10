import React from "react";
import Layout from "../components/Layout";
import Styled from "styled-components";

const NotFound = Styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const NotFoundPage = () => (
  <Layout>
    <NotFound className="container">
      <h1>NOT FOUND</h1>
      <p>You've found a page that doesn&#39;t exist... Sorry about that.</p>
    </NotFound>
  </Layout>
);

export default NotFoundPage;
