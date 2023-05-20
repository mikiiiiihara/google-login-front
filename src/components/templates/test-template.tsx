import Link from "next/link";
import { useTickerDetail } from "../../features/hooks/useTickerDetail";

const TestTemplate = () => {
  // GraphQLを取得
  const { getTickerDetail } = useTickerDetail();
  const tickers = getTickerDetail().tickerDetail;
  if (tickers == "loading") return <div>Loading...</div>;
  return (
    <div>
      <h1>Home</h1>
      <p>useQueryからの取得値：{tickers.tickerDetail}</p>
      <Link href="/" className="navbar-brand float-left">
        別画面へ（Linkタグ）
      </Link>
    </div>
  );
};
export default TestTemplate;
