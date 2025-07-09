import { ArrowRight, Clock, Zap, BookOpen, Code2, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { algorithmCategories } from '../data/algorithms.js';

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: <Code2 className="h-8 w-8 text-blue-600" />,
      title: "実践的なC言語実装",
      description: "実際に動作するC言語のコードで、アルゴリズムの動作を詳しく学習できます。"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "計算量の詳細解説",
      description: "時間計算量と空間計算量を分析し、アルゴリズムの効率性を理解できます。"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "ステップバイステップ",
      description: "アルゴリズムの動作過程を段階的に追跡し、理解を深めることができます。"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "豊富な解説",
      description: "初心者にも分かりやすい詳細な解説と実用的な応用例を提供します。"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "学習者向け設計",
      description: "プログラミング初心者から上級者まで、段階的に学習できる構成です。"
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-600" />,
      title: "実用的な応用",
      description: "実際のプログラミングで使える知識と技術を身につけることができます。"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              C言語で学ぶ
              <span className="text-blue-600 block">アルゴリズム</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              ソートから探索、データ構造まで。実践的なC言語のコード例と詳細な解説で、
              アルゴリズムの本質を理解し、プログラミングスキルを向上させましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('algorithm-list')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                アルゴリズムを学ぶ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              なぜこのサイトで学ぶのか
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              効率的で実践的なアルゴリズム学習のための特徴をご紹介します
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* アルゴリズムカテゴリセクション */}
      <section id="algorithms" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              学習できるアルゴリズム
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基本的なソートから高度なデータ構造まで、段階的に学習できます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {algorithmCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">含まれるアルゴリズム:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.algorithms.slice(0, 3).map((algorithmId) => (
                      <li key={algorithmId} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {algorithmId.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </li>
                    ))}
                    {category.algorithms.length > 3 && (
                      <li className="text-blue-600 font-medium">
                        他 {category.algorithms.length - 3} 個...
                      </li>
                    )}
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => onNavigate('algorithm-list')}
                >
                  詳細を見る
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* このサイトについてセクション */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              このサイトについて
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                このサイトは、C言語でアルゴリズムを学習したい方のために作成されました。
                プログラミング初心者から上級者まで、誰でも理解できるよう、
                詳細な解説と実際に動作するコード例を提供しています。
              </p>
              <p>
                各アルゴリズムには、動作原理の説明、C言語での実装、
                時間・空間計算量の分析、実用的な応用例が含まれています。
                また、アルゴリズムの動作過程を段階的に追跡できるよう、
                ステップバイステップの解説も用意しています。
              </p>
              <p>
                アルゴリズムとデータ構造の理解は、効率的なプログラムを書くための
                基礎となります。このサイトを通じて、皆さんのプログラミングスキルの
                向上に貢献できれば幸いです。
              </p>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => onNavigate('algorithm-list')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                学習を始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

