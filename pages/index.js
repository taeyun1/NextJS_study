import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

function Home({ results }) {
  const router = useRouter();

  // 클릭시 id 이동
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title={"Home"} />
      {/* {!results && <h4>Loading...</h4>} */}
      {results?.map((movieData) => (
        <div
          onClick={() => onClick(movieData.id, movieData.original_title)}
          className="movie"
          key={movieData.id}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          />
          <Link href={`/movies/${movieData.original_title}/${movieData.id}`}>
            <a>
              <h4>제목 : {movieData.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.02) translateY(-10px);
          cursor: pointer;
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
export default Home;

// getServerSideProps는 오직 서버에서 실행됨.
// 우리가 여기서 무엇을 return 하던지, 이걸 props로써 page에게 주게됨.
// 결국 우리가 하는건 page가 유저에게 보여지기 전에 props를 받아오는 function을 만드는것
// 여기에거 뭐가 return되던, 우리 페이지의 props값으로 사용됨 (더이상 Loading은 없는데, 만약 API load가 느리다면, 유저가 아무것도 보지 못한채로 오래 기다려야 한다는 단점이 있음)
// 선택1) 유저가 접속시, NavBar와 footer, 그리고 가운데 Loading표시를 보여주는것? CSR
// 선택2) 아니면 Loading표시 없이, API가 완료되도록 기다힌 후에 모든 정보를 보여주는것? SSR (getServerSideProps사용)

// Next.js는 getServerSideProps함수를 실행시켜서 _app.js에  {...pageProps}에 넣어줌
// 그럼 여기 Home의 props처럼 들어오게됨

// getServerSideProps함수를 이용해 API데이터 가져오기
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
/*
getServerSideProps
page에서 서버 측 랜더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. getServerSideProps는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다.
https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

getServerSideProps를 사용하여 request시 데이터 fetch하기
다음 예는 request 시 데이터를 fetch하고 결과를 pre-render하는 방법을 보여줍니다.
*/

/*
const [Movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      console.log(results);
      setMovies(results);
    })();
  }, []);
*/
