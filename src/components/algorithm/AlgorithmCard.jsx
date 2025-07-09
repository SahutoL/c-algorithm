import { Clock, Zap, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const AlgorithmCard = ({ algorithm, onSelect }) => {
  // 計算量の表示用関数
  const getComplexityColor = (complexity) => {
    if (complexity.includes('1')) return 'text-green-600 bg-green-50';
    if (complexity.includes('log')) return 'text-blue-600 bg-blue-50';
    if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-red-600 bg-red-50';
    if (complexity.includes('n')) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  // カテゴリーの色を取得
  const getCategoryColor = (category) => {
    switch (category) {
      case 'sorting':
        return 'bg-blue-100 text-blue-800';
      case 'searching':
        return 'bg-green-100 text-green-800';
      case 'data-structures':
        return 'bg-purple-100 text-purple-800';
      case 'graph-algorithms':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // カテゴリー名の日本語変換
  const getCategoryName = (category) => {
    switch (category) {
      case 'sorting':
        return 'ソート';
      case 'searching':
        return '探索';
      case 'data-structures':
        return 'データ構造';
      case 'graph-algorithms':
        return 'グラフ';
      default:
        return category;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="p-6">
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{algorithm.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(algorithm.category)}`}>
                {getCategoryName(algorithm.category)}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{algorithm.description}</p>
          </div>
        </div>

        {/* 計算量情報 */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">時間計算量:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {algorithm.timeComplexity.best && (
              <div className={`px-3 py-2 rounded-lg text-xs font-medium ${getComplexityColor(algorithm.timeComplexity.best)}`}>
                最良: {algorithm.timeComplexity.best}
              </div>
            )}
            {algorithm.timeComplexity.average && (
              <div className={`px-3 py-2 rounded-lg text-xs font-medium ${getComplexityColor(algorithm.timeComplexity.average)}`}>
                平均: {algorithm.timeComplexity.average}
              </div>
            )}
            {algorithm.timeComplexity.worst && (
              <div className={`px-3 py-2 rounded-lg text-xs font-medium ${getComplexityColor(algorithm.timeComplexity.worst)}`}>
                最悪: {algorithm.timeComplexity.worst}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Zap size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">空間計算量:</span>
            <div className={`px-3 py-1 rounded-lg text-xs font-medium ${getComplexityColor(algorithm.spaceComplexity)}`}>
              {algorithm.spaceComplexity}
            </div>
          </div>
        </div>

        {/* 特性 */}
        {(algorithm.stable !== undefined || algorithm.inPlace !== undefined) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">特性:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {algorithm.stable !== undefined && (
                <div className="flex items-center gap-1">
                  {algorithm.stable ? (
                    <CheckCircle size={14} className="text-green-600" />
                  ) : (
                    <XCircle size={14} className="text-red-600" />
                  )}
                  <span className="text-xs text-gray-600">安定ソート</span>
                </div>
              )}
              {algorithm.inPlace !== undefined && (
                <div className="flex items-center gap-1">
                  {algorithm.inPlace ? (
                    <CheckCircle size={14} className="text-green-600" />
                  ) : (
                    <XCircle size={14} className="text-red-600" />
                  )}
                  <span className="text-xs text-gray-600">インプレース</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <button
          onClick={() => onSelect(algorithm.id)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          詳細を見る
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AlgorithmCard;

