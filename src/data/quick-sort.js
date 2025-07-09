export const quickSortContent = {
  id: 'quick-sort',
  title: 'クイックソート (Quick Sort)',
  overview: `クイックソートは分割統治法を用いた高効率なソートアルゴリズムです。配列から基準値（ピボット）を選び、ピボットより小さい要素と大きい要素に分割し、それぞれを再帰的にソートします。平均的にO(n log n)の時間計算量を持ち、実用的なソートアルゴリズムとして広く使用されています。`,
  
  algorithm: `
1. 配列からピボット（基準値）を選択する
2. ピボットより小さい要素を左側、大きい要素を右側に分割する
3. ピボットを正しい位置に配置する
4. 左側と右側の部分配列に対して再帰的に同じ処理を行う
5. 部分配列のサイズが1以下になったら終了する
  `,
  
  codeImplementation: `#include <stdio.h>

// 要素を交換する関数
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// パーティション関数（Lomutoパーティション）
int partition(int arr[], int low, int high) {
    // 最後の要素をピボットとして選択
    int pivot = arr[high];
    int i = (low - 1);  // 小さい要素のインデックス
    
    for (int j = low; j <= high - 1; j++) {
        // 現在の要素がピボット以下の場合
        if (arr[j] <= pivot) {
            i++;  // 小さい要素のインデックスを増加
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// クイックソートの実装
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // パーティションインデックスを取得
        int pi = partition(arr, low, high);
        
        // ピボットの前後を個別にソート
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Hoareパーティション（代替実装）
int hoarePartition(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low - 1;
    int j = high + 1;
    
    while (1) {
        // 左からピボット以上の要素を見つける
        do {
            i++;
        } while (arr[i] < pivot);
        
        // 右からピボット以下の要素を見つける
        do {
            j--;
        } while (arr[j] > pivot);
        
        // ポインタが交差したら終了
        if (i >= j) {
            return j;
        }
        
        swap(&arr[i], &arr[j]);
    }
}

// Hoareパーティションを使ったクイックソート
void quickSortHoare(int arr[], int low, int high) {
    if (low < high) {
        int pi = hoarePartition(arr, low, high);
        quickSortHoare(arr, low, pi);
        quickSortHoare(arr, pi + 1, high);
    }
}

// 配列を表示する関数
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// ソート過程を表示する関数
void quickSortWithSteps(int arr[], int low, int high, int depth) {
    if (low < high) {
        // インデントを表示
        for (int i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("範囲 [%d, %d]: ", low, high);
        for (int i = low; i <= high; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
        
        int pi = partition(arr, low, high);
        
        // パーティション後の状態を表示
        for (int i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("ピボット %d の位置: %d\\n", arr[pi], pi);
        
        quickSortWithSteps(arr, low, pi - 1, depth + 1);
        quickSortWithSteps(arr, pi + 1, high, depth + 1);
    }
}

// メイン関数
int main() {
    int arr1[] = {10, 7, 8, 9, 1, 5};
    int arr2[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("=== クイックソートのデモンストレーション ===\\n\\n");
    
    printf("初期配列: ");
    printArray(arr1, n);
    printf("\\n");
    
    printf("--- Lomutoパーティション ---\\n");
    quickSortWithSteps(arr1, 0, n - 1, 0);
    printf("\\nソート結果: ");
    printArray(arr1, n);
    
    printf("\\n--- Hoareパーティション ---\\n");
    printf("初期配列: ");
    printArray(arr2, n);
    quickSortHoare(arr2, 0, n - 1);
    printf("ソート結果: ");
    printArray(arr2, n);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**partition関数（Lomutoパーティション）:**
- 配列の最後の要素をピボットとして選択します
- iは「ピボット以下の要素」の境界を管理します
- jでループしながら、ピボット以下の要素を左側に移動します
- 最後にピボットを正しい位置に配置します

**hoarePartition関数（Hoareパーティション）:**
- 配列の最初の要素をピボットとして選択します
- 左右から同時にスキャンして、条件に合わない要素を交換します
- Lomutoより効率的で、交換回数が少ない傾向があります

**再帰構造:**
- 分割統治法により、問題を小さな部分問題に分割します
- 各部分配列が独立してソートされます
- ベースケースは配列サイズが1以下の場合です

**ピボット選択の重要性:**
- 最悪の場合（既にソートされた配列で端を選ぶ）はO(n²)になります
- ランダムピボットや3点中央値法で性能を改善できます
  `,

  example: `
**実行例:**
初期配列: [10, 7, 8, 9, 1, 5]

範囲 [0, 5]: 10 7 8 9 1 5
ピボット 5 の位置: 1

  範囲 [0, 0]: 1
  範囲 [2, 5]: 8 9 10 7
  ピボット 7 の位置: 2
  
    範囲 [3, 5]: 9 10 8
    ピボット 8 の位置: 3
    
      範囲 [4, 5]: 10 9
      ピボット 9 の位置: 4

最終結果: [1, 5, 7, 8, 9, 10]
  `,

  advantages: [
    '平均時間計算量がO(n log n)と高効率',
    'インプレース（追加メモリがO(log n)のみ）でソートできる',
    '実装が比較的簡単',
    'キャッシュ効率が良い',
    '実用的なソートアルゴリズムとして広く使用されている'
  ],

  disadvantages: [
    '最悪時間計算量がO(n²)（既にソートされた配列など）',
    '不安定ソート（同じ値の要素の相対位置が変わる可能性）',
    '再帰呼び出しによるスタックオーバーフローの可能性',
    'ピボット選択によって性能が大きく左右される'
  ],

  optimizations: [
    '**ランダムピボット**: ピボットをランダムに選択して最悪ケースを回避',
    '**3点中央値法**: 先頭、中央、末尾の中央値をピボットとして選択',
    '**イントロソート**: 再帰が深くなりすぎた場合にヒープソートに切り替え',
    '**ハイブリッド手法**: 小さな部分配列には挿入ソートを使用',
    '**尾再帰最適化**: 一方の再帰呼び出しをループに変換してスタック使用量を削減'
  ],

  useCases: [
    '一般的なソート処理（多くのプログラミング言語の標準ライブラリ）',
    '大きなデータセットの高速ソート',
    'メモリ使用量を抑えたいソート処理',
    '分割統治法の学習目的',
    'ハイブリッドソートアルゴリズムの一部'
  ]
};

