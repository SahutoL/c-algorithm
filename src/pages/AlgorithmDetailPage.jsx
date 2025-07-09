import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Clock,
  Zap,
  CheckCircle,
  XCircle,
  Play,
  BookOpen,
  Code,
  Lightbulb,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { algorithms } from "../data/algorithms.js";

// 各アルゴリズムの詳細コンテンツをインポート
import { bubbleSortContent } from "../data/bubble-sort.js";
import { selectionSortContent } from "../data/selection-sort.js";
import { insertionSortContent } from "../data/insertion-sort.js";
import { quickSortContent } from "../data/quick-sort.js";
import { mergeSortContent } from "../data/merge-sort.js";
import { heapSortContent } from "../data/heap-sort.js";
import { linearSearchContent } from "../data/linear-search.js";
import { binarySearchContent } from "../data/binary-search.js";
import { linkedListContent } from "../data/linked-list.js";
import { stackContent } from "../data/stack.js";
import { queueContent } from "../data/queue.js";
import { hashTableContent } from "../data/hash-table.js";
import { binarySearchTreeContent } from "../data/binary-search-tree.js";
import { depthFirstSearchContent } from "../data/depth-first-search.js";
import { breadthFirstSearchContent } from "../data/breadth-first-search.js";

const AlgorithmDetailPage = ({ algorithmId, onBack }) => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // アルゴリズムの詳細コンテンツマッピング
  const contentMap = {
    "bubble-sort": bubbleSortContent,
    "selection-sort": selectionSortContent,
    "insertion-sort": insertionSortContent,
    "quick-sort": quickSortContent,
    "merge-sort": mergeSortContent,
    "heap-sort": heapSortContent,
    "linear-search": linearSearchContent,
    "binary-search": binarySearchContent,
    "linked-list": linkedListContent,
    stack: stackContent,
    queue: queueContent,
    "hash-table": hashTableContent,
    "binary-search-tree": binarySearchTreeContent,
    "depth-first-search": depthFirstSearchContent,
    "breadth-first-search": breadthFirstSearchContent,
  };

  const algorithm = algorithms[algorithmId];
  const content = contentMap[algorithmId];

  if (!algorithm || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            アルゴリズムが見つかりません
          </h2>
          <Button onClick={onBack}>一覧に戻る</Button>
        </div>
      </div>
    );
  }

  // コードをクリップボードにコピー
  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  // 計算量の表示用関数
  const getComplexityColor = (complexity) => {
    if (complexity.includes("1")) return "text-green-600 bg-green-50";
    if (complexity.includes("log")) return "text-blue-600 bg-blue-50";
    if (complexity.includes("n²") || complexity.includes("n^2"))
      return "text-red-600 bg-red-50";
    if (complexity.includes("n")) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const tabs = [
    { id: "overview", label: "概要", icon: <BookOpen className="h-4 w-4" /> },
    { id: "implementation", label: "実装", icon: <Code className="h-4 w-4" /> },
    {
      id: "explanation",
      label: "解説",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    { id: "usage", label: "応用", icon: <Target className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3540900632101010"
        crossorigin="anonymous"
      ></script>
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                一覧に戻る
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {content.title}
                </h1>
                <p className="text-gray-600 mt-1">{algorithm.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* サイドバー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                アルゴリズム情報
              </h3>

              {/* 計算量 */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    時間計算量
                  </h4>
                  <div className="space-y-1">
                    {algorithm.timeComplexity.best && (
                      <div
                        className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(
                          algorithm.timeComplexity.best
                        )}`}
                      >
                        最良: {algorithm.timeComplexity.best}
                      </div>
                    )}
                    {algorithm.timeComplexity.average && (
                      <div
                        className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(
                          algorithm.timeComplexity.average
                        )}`}
                      >
                        平均: {algorithm.timeComplexity.average}
                      </div>
                    )}
                    {algorithm.timeComplexity.worst && (
                      <div
                        className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(
                          algorithm.timeComplexity.worst
                        )}`}
                      >
                        最悪: {algorithm.timeComplexity.worst}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    空間計算量
                  </h4>
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(
                      algorithm.spaceComplexity
                    )}`}
                  >
                    {algorithm.spaceComplexity}
                  </div>
                </div>

                {/* 特性 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    特性
                  </h4>
                  <div className="space-y-2">
                    {algorithm.stable !== undefined && (
                      <div className="flex items-center text-sm">
                        {algorithm.stable ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-2" />
                        )}
                        <span
                          className={
                            algorithm.stable ? "text-green-600" : "text-red-600"
                          }
                        >
                          {algorithm.stable ? "安定ソート" : "不安定ソート"}
                        </span>
                      </div>
                    )}
                    {algorithm.inPlace !== undefined && (
                      <div className="flex items-center text-sm">
                        {algorithm.inPlace ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mr-2" />
                        )}
                        <span
                          className={
                            algorithm.inPlace
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {algorithm.inPlace
                            ? "インプレース"
                            : "追加メモリ必要"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            {/* タブナビゲーション */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* 概要タブ */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        概要
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {content.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        アルゴリズムの手順
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                          {content.algorithm}
                        </pre>
                      </div>
                    </div>

                    {content.example && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          実行例
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                            {content.example}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 実装タブ */}
                {activeTab === "implementation" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        C言語実装
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(content.codeImplementation, "code")
                        }
                        className="flex items-center space-x-2"
                      >
                        {copiedSection === "code" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span>
                          {copiedSection === "code" ? "コピー済み" : "コピー"}
                        </span>
                      </Button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-100">
                        <code>{content.codeImplementation}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* 解説タブ */}
                {activeTab === "explanation" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        詳細解説
                      </h3>
                      <div className="prose max-w-none">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {content.explanation}
                        </pre>
                      </div>
                    </div>

                    {content.advantages && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          利点
                        </h3>
                        <ul className="space-y-2">
                          {content.advantages.map((advantage, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {content.disadvantages && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          欠点
                        </h3>
                        <ul className="space-y-2">
                          {content.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="flex items-start">
                              <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">
                                {disadvantage}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 応用タブ */}
                {activeTab === "usage" && (
                  <div className="space-y-6">
                    {content.useCases && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          使用例
                        </h3>
                        <ul className="space-y-2">
                          {content.useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start">
                              <Target className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {content.applications && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          実用的な応用
                        </h3>
                        <ul className="space-y-2">
                          {content.applications.map((application, index) => (
                            <li key={index} className="flex items-start">
                              <Play className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">
                                {application}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {content.optimizations && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          最適化手法
                        </h3>
                        <ul className="space-y-2">
                          {content.optimizations.map((optimization, index) => (
                            <li key={index} className="flex items-start">
                              <Zap className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">
                                {optimization}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {content.variants && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          バリエーション
                        </h3>
                        <ul className="space-y-2">
                          {content.variants.map((variant, index) => (
                            <li key={index} className="flex items-start">
                              <Code className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{variant}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetailPage;
