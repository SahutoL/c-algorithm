import { useState } from 'react';
import { ArrowLeft, Plus, X, Clock, Zap, CheckCircle, XCircle } from 'lucide-react';
import { algorithms } from '../data/algorithms';

const AlgorithmComparePage = ({ onNavigate }) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  const addAlgorithm = (algorithmId) => {
    if (selectedAlgorithms.length < 4 && !selectedAlgorithms.includes(algorithmId)) {
      setSelectedAlgorithms([...selectedAlgorithms, algorithmId]);
    }
    setShowSelector(false);
  };

  const removeAlgorithm = (algorithmId) => {
    setSelectedAlgorithms(selectedAlgorithms.filter(id => id !== algorithmId));
  };

  const getComplexityColor = (complexity) => {
    if (complexity.includes('1')) return 'text-green-600 bg-green-50';
    if (complexity.includes('log')) return 'text-blue-600 bg-blue-50';
    if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-red-600 bg-red-50';
    if (complexity.includes('n')) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const availableAlgorithms = Object.values(algorithms).filter(
    alg => !selectedAlgorithms.includes(alg.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('list')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-yellow-100 px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} />
              一覧に戻る
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                ホーム
              </button>
              <button
                onClick={() => onNavigate('list')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                アルゴリズム一覧
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">アルゴリズム比較</h1>
          <p className="text-gray-600">
            最大4つのアルゴリズムを選択して、性能や特性を比較できます。
          </p>
        </div>

        {/* アルゴリズム追加ボタン */}
        {selectedAlgorithms.length < 4 && (
          <div className="mb-8">
            <button
              onClick={() => setShowSelector(!showSelector)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              アルゴリズムを追加
            </button>
          </div>
        )}

        {/* アルゴリズム選択ドロップダウン */}
        {showSelector && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold mb-4">アルゴリズムを選択</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableAlgorithms.map(algorithm => (
                <button
                  key={algorithm.id}
                  onClick={() => addAlgorithm(algorithm.id)}
                  className="text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{algorithm.name}</div>
                  <div className="text-sm text-gray-600">{algorithm.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 比較テーブル */}
        {selectedAlgorithms.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">項目</th>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      return (
                        <th key={algorithmId} className="px-6 py-4 text-left text-sm font-medium text-gray-900 relative">
                          <div className="flex items-center justify-between">
                            <span>{algorithm.name}</span>
                            <button
                              onClick={() => removeAlgorithm(algorithmId)}
                              className="text-red-600 hover:text-red-800 ml-2"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* カテゴリー */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">カテゴリー</td>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      return (
                        <td key={algorithmId} className="px-6 py-4 text-sm text-gray-700">
                          {algorithm.category === 'sorting' && 'ソートアルゴリズム'}
                          {algorithm.category === 'searching' && '探索アルゴリズム'}
                          {algorithm.category === 'data-structures' && 'データ構造'}
                          {algorithm.category === 'graph-algorithms' && 'グラフアルゴリズム'}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 最良時間計算量 */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">最良時間計算量</td>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      const complexity = algorithm.timeComplexity.best || algorithm.timeComplexity.worst || 'N/A';
                      return (
                        <td key={algorithmId} className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getComplexityColor(complexity)}`}>
                            {complexity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 平均時間計算量 */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">平均時間計算量</td>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      const complexity = algorithm.timeComplexity.average || algorithm.timeComplexity.worst || 'N/A';
                      return (
                        <td key={algorithmId} className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getComplexityColor(complexity)}`}>
                            {complexity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 最悪時間計算量 */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">最悪時間計算量</td>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      const complexity = algorithm.timeComplexity.worst || 'N/A';
                      return (
                        <td key={algorithmId} className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getComplexityColor(complexity)}`}>
                            {complexity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 空間計算量 */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">空間計算量</td>
                    {selectedAlgorithms.map(algorithmId => {
                      const algorithm = algorithms[algorithmId];
                      return (
                        <td key={algorithmId} className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getComplexityColor(algorithm.spaceComplexity)}`}>
                            {algorithm.spaceComplexity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 安定性 */}
                  {selectedAlgorithms.some(id => algorithms[id].stable !== undefined) && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">安定ソート</td>
                      {selectedAlgorithms.map(algorithmId => {
                        const algorithm = algorithms[algorithmId];
                        return (
                          <td key={algorithmId} className="px-6 py-4">
                            {algorithm.stable !== undefined ? (
                              <div className="flex items-center gap-2">
                                {algorithm.stable ? (
                                  <CheckCircle size={16} className="text-green-600" />
                                ) : (
                                  <XCircle size={16} className="text-red-600" />
                                )}
                                <span className="text-sm text-gray-700">
                                  {algorithm.stable ? 'はい' : 'いいえ'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">N/A</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )}

                  {/* インプレース */}
                  {selectedAlgorithms.some(id => algorithms[id].inPlace !== undefined) && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">インプレース</td>
                      {selectedAlgorithms.map(algorithmId => {
                        const algorithm = algorithms[algorithmId];
                        return (
                          <td key={algorithmId} className="px-6 py-4">
                            {algorithm.inPlace !== undefined ? (
                              <div className="flex items-center gap-2">
                                {algorithm.inPlace ? (
                                  <CheckCircle size={16} className="text-green-600" />
                                ) : (
                                  <XCircle size={16} className="text-red-600" />
                                )}
                                <span className="text-sm text-gray-700">
                                  {algorithm.inPlace ? 'はい' : 'いいえ'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">N/A</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="text-gray-500 mb-4">
              <Clock size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">アルゴリズムを選択してください</h3>
              <p>比較したいアルゴリズムを追加して、性能や特性を比較できます。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmComparePage;

