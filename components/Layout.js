import React from "react";
import NavBar from "./NavBar";

// 많이 쓰는 패턴
// Layout은 childern을 prop으로 가지고 있음
// 이 childern은 <Layout></Layout>컴포넌트가 감싸고 있는 모든것들을 불러옴
function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}

export default Layout;
