import { useState } from 'react';
import { Search, Clock, Zap, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { algorithmCategories, algorithms } from '../data/algorithms.js';

const AlgorithmListPage = ({ onSelectAlgorithm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 検索とフィルタリング
  const filteredAlgorithms = Object.values(algorithms).filter(algorithm => {
    const matchesSearch = algorithm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         algorithm.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || algorithm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 計算量の表示用関数
  const getComplexityColor = (complexity) => {
    if (complexity.includes('1')) return 'text-green-600 bg-green-50';
    if (complexity.includes('log')) return 'text-blue-600 bg-blue-50';
    if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-red-600 bg-red-50';
    if (complexity.includes('n')) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            アルゴリズム一覧
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            C言語で実装された様々なアルゴリズムを探索し、詳細な解説とコード例を学習しましょう
          </p>
        </div>

        {/* 検索とフィルター */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 検索バー */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="アルゴリズム名や説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* カテゴリフィルター */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全てのカテゴリ</option>
                {algorithmCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 検索結果数 */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredAlgorithms.length} 個のアルゴリズムが見つかりました
          </div>
        </div>

        {/* アルゴリズムカード */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAlgorithms.map(algorithm => (
            <div
              key={algorithm.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                {/* ヘッダー */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {algorithm.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {algorithmCategories.find(cat => cat.id === algorithm.category)?.name}
                    </span>
                  </div>
                </div>

                {/* 説明 */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {algorithm.description}
                </p>

                {/* 計算量情報 */}
                <div className="space-y-3 mb-6">
                  {/* 時間計算量 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      時間計算量
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {algorithm.timeComplexity.best && (
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(algorithm.timeComplexity.best)}`}>
                          最良: {algorithm.timeComplexity.best}
                        </span>
                      )}
                      {algorithm.timeComplexity.average && (
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(algorithm.timeComplexity.average)}`}>
                          平均: {algorithm.timeComplexity.average}
                        </span>
                      )}
                      {algorithm.timeComplexity.worst && (
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(algorithm.timeComplexity.worst)}`}>
                          最悪: {algorithm.timeComplexity.worst}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 空間計算量 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      空間計算量
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(algorithm.spaceComplexity)}`}>
                      {algorithm.spaceComplexity}
                    </span>
                  </div>
                </div>

                {/* 特性 */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {algorithm.stable !== undefined && (
                    <div className="flex items-center text-sm">
                      {algorithm.stable ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={algorithm.stable ? 'text-green-600' : 'text-red-600'}>
                        {algorithm.stable ? '安定' : '不安定'}
                      </span>
                    </div>
                  )}
                  {algorithm.inPlace !== undefined && (
                    <div className="flex items-center text-sm">
                      {algorithm.inPlace ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={algorithm.inPlace ? 'text-green-600' : 'text-red-600'}>
                        {algorithm.inPlace ? 'インプレース' : '追加メモリ必要'}
                      </span>
                    </div>
                  )}
                </div>

                {/* 詳細ボタン */}
                <Button
                  onClick={() => onSelectAlgorithm(algorithm.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 検索結果なし */}
        {filteredAlgorithms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              アルゴリズムが見つかりません
            </h3>
            <p className="text-gray-600 mb-4">
              検索条件を変更して再度お試しください
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              フィルターをリセット
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmListPage;

