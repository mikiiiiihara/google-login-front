import Link from "next/link";
import { useTickers } from "../../features/hooks/useTickers";

const TopTemplate = () => {
  // GraphQLを取得
  const { getTickers } = useTickers();
  const tickers = getTickers().tickers;
  if (tickers == "loading") return <div>Loading...</div>;
  return (
    <div>
      <h1>Home</h1>
      <p>useQueryからの取得値：{tickers.tickers}</p>
      <Link href="/test" className="navbar-brand float-left">
        別画面へ（Linkタグ）
      </Link>
    </div>
  );
};
export default TopTemplate;
