import { useRouter } from "next/router";
import Seo from "../../components/Seo";

// 상세페이지

// 스텝2) 페이지는 그 정보를 받아서 보여줌
function Detail({ params }) {
  const router = useRouter();

  // Detail에서 prop으로 params를 받아와서 넣어줌
  const [title, id] = params || [];
  console.log(router);
  return (
    <div>
      <Seo title={`${title}`} />
      <h4>영화제목 :{title}</h4>
    </div>
  );
}

export default Detail;

// getServerSideProps함수를 URL정보를 가져오는데만 사용. (영화제목)
// API에서 데이터를 가져오지 않음,

// 스텝1) getServerSideProps함수로 server-side에서 정보를 페이지로 넘겨주면
// 그럽 server-side에서 pre-render가 됨
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}

// 컴포넌트 내부에있는 router는 클라이언트사이드 에서만 실행됨
// 만약 URL에 있는 영화제목을 사용해서 구글 SEO에 최적화 하고, 유저가 접속하기 전에 탭 제목을 바꾸고 싶거나, 기본적으로 이 페이지를 pre-render하고 싶다면
// 그때에는 server-side에서 정보를 얻기 위한 getServerSideProps함수를 실행하면됨
