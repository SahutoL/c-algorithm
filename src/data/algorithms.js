// アルゴリズムデータ構造
export const algorithmCategories = [
  {
    id: 'sorting',
    name: 'ソートアルゴリズム',
    description: '配列やリストの要素を特定の順序で並び替えるアルゴリズム',
    algorithms: ['bubble-sort', 'selection-sort', 'insertion-sort', 'quick-sort', 'merge-sort', 'heap-sort']
  },
  {
    id: 'searching',
    name: '探索アルゴリズム',
    description: 'データ構造から特定の要素を見つけるアルゴリズム',
    algorithms: ['linear-search', 'binary-search']
  },
  {
    id: 'data-structures',
    name: 'データ構造',
    description: 'データを効率的に格納・操作するための構造',
    algorithms: ['linked-list', 'stack', 'queue', 'hash-table', 'binary-search-tree']
  },
  {
    id: 'graph-algorithms',
    name: 'グラフアルゴリズム',
    description: 'グラフ構造に対する探索や最適化のアルゴリズム',
    algorithms: ['depth-first-search', 'breadth-first-search']
  }
];

export const algorithms = {
  'bubble-sort': {
    id: 'bubble-sort',
    name: 'バブルソート',
    description: '隣接する要素を比較して交換を繰り返すシンプルなソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true
  },
  'selection-sort': {
    id: 'selection-sort',
    name: '選択ソート',
    description: '未ソート部分から最小値を選択して先頭に配置するソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true
  },
  'insertion-sort': {
    id: 'insertion-sort',
    name: '挿入ソート',
    description: '要素を一つずつ取り出して適切な位置に挿入するソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true
  },
  'quick-sort': {
    id: 'quick-sort',
    name: 'クイックソート',
    description: '分割統治法を使った高速なソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true
  },
  'merge-sort': {
    id: 'merge-sort',
    name: 'マージソート',
    description: '分割統治法を使った安定なソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false
  },
  'heap-sort': {
    id: 'heap-sort',
    name: 'ヒープソート',
    description: 'ヒープデータ構造を利用した効率的なソートアルゴリズム',
    category: 'sorting',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true
  },
  'linear-search': {
    id: 'linear-search',
    name: '線形探索',
    description: '配列を先頭から順番に探索するシンプルな探索アルゴリズム',
    category: 'searching',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)'
  },
  'binary-search': {
    id: 'binary-search',
    name: '二分探索',
    description: 'ソート済み配列に対して効率的に探索を行うアルゴリズム',
    category: 'searching',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)'
  },
  'linked-list': {
    id: 'linked-list',
    name: '連結リスト',
    description: 'ノードがポインタで連結されたデータ構造',
    category: 'data-structures',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    spaceComplexity: 'O(n)'
  },
  'stack': {
    id: 'stack',
    name: 'スタック',
    description: 'LIFO（後入れ先出し）の原則に従うデータ構造',
    category: 'data-structures',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    spaceComplexity: 'O(n)'
  },
  'queue': {
    id: 'queue',
    name: 'キュー',
    description: 'FIFO（先入れ先出し）の原則に従うデータ構造',
    category: 'data-structures',
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    spaceComplexity: 'O(n)'
  },
  'hash-table': {
    id: 'hash-table',
    name: 'ハッシュテーブル',
    description: 'キーと値のペアを効率的に格納・検索するデータ構造',
    category: 'data-structures',
    timeComplexity: {
      access: 'O(1)',
      search: 'O(1)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    spaceComplexity: 'O(n)'
  },
  'binary-search-tree': {
    id: 'binary-search-tree',
    name: '二分探索木',
    description: '各ノードが最大2つの子ノードを持つ木構造',
    category: 'data-structures',
    timeComplexity: {
      access: 'O(log n)',
      search: 'O(log n)',
      insertion: 'O(log n)',
      deletion: 'O(log n)'
    },
    spaceComplexity: 'O(n)'
  },
  'depth-first-search': {
    id: 'depth-first-search',
    name: '深さ優先探索',
    description: 'グラフや木構造を深さ優先で探索するアルゴリズム',
    category: 'graph-algorithms',
    timeComplexity: {
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)'
  },
  'breadth-first-search': {
    id: 'breadth-first-search',
    name: '幅優先探索',
    description: 'グラフや木構造を幅優先で探索するアルゴリズム',
    category: 'graph-algorithms',
    timeComplexity: {
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)'
  }
};

