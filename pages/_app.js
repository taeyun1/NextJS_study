import React from "react";
import Layout from "../components/Layout";
import "../styles/globals.css"; // _app.js에만 Global Styles를 임포트 할수있음.

// 모든 페이지를 렌더링 하고플때 _app.js 파일 안에 작성 (어느 페이지에 들어가던 컴포넌트 및 스타일이 적용됨)
// 첫번째 파라미터 Component는 렌더링 할 수 있는 페이지들을 Prop으로 넣어주고 ...pageProps으로 전달. Component에는 (about.js, index.js, test.js)가 들어있음
// 무조건 Component, pageProps 라고 써야함 (NextJS가 정한것)

function App({ Component, pageProps }) {
  return (
    // Layout의 childern은 <Layout></Layout>컴포넌트가 감싸고 있는 모든것들을 불러옴
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
