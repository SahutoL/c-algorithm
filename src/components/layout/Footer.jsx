import { Code, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3540900632101010"
        crossorigin="anonymous"
      ></script>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイト情報 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">
                C言語アルゴリズム学習
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              C言語で実装された様々なアルゴリズムを学習できるサイトです。
              初心者から上級者まで、アルゴリズムの理解を深めるための
              詳細な解説とコード例を提供しています。
            </p>
          </div>

          {/* クイックリンク */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">クイックリンク</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  ホーム
                </a>
              </li>
              <li>
                <a
                  href="#algorithms"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  アルゴリズム一覧
                </a>
              </li>
              <li>
                <a
                  href="#sorting"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  ソートアルゴリズム
                </a>
              </li>
              <li>
                <a
                  href="#searching"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  探索アルゴリズム
                </a>
              </li>
              <li>
                <a
                  href="#data-structures"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  データ構造
                </a>
              </li>
            </ul>
          </div>

          {/* 学習リソース */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">学習のポイント</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 各アルゴリズムの時間計算量を理解する</li>
              <li>• 実際にコードを書いて動作を確認する</li>
              <li>• 異なるデータサイズで性能を比較する</li>
              <li>• 実用的な応用例を考えてみる</li>
              <li>• 他のアルゴリズムとの違いを把握する</li>
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for learning algorithms</span>
            </div>
            <div className="text-sm text-gray-300">
              © 2025 C言語アルゴリズム学習サイト. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
