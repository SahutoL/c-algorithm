export const selectionSortContent = {
  id: 'selection-sort',
  title: '選択ソート (Selection Sort)',
  overview: `選択ソートは、未ソート部分から最小値（または最大値）を選択して、ソート済み部分の末尾に配置するアルゴリズムです。各パスで一つの要素が正しい位置に配置されるため、動作が分かりやすいソートアルゴリズムです。`,
  
  algorithm: `
1. 未ソート部分から最小値を見つける
2. 最小値を未ソート部分の先頭要素と交換する
3. ソート済み部分を一つ拡張する
4. 未ソート部分がなくなるまで繰り返す
  `,
  
  codeImplementation: `#include <stdio.h>

// 要素を交換する関数
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 選択ソートの実装
void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    
    // 未ソート部分の境界を一つずつ移動
    for (i = 0; i < n - 1; i++) {
        // 未ソート部分の最小値のインデックスを見つける
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // 最小値を現在の位置と交換
        if (min_idx != i) {
            swap(&arr[min_idx], &arr[i]);
        }
    }
}

// 配列を表示する関数
void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// ソート過程を表示する関数
void selectionSortWithSteps(int arr[], int n) {
    int i, j, min_idx;
    
    printf("初期配列: ");
    printArray(arr, n);
    
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        
        // 最小値を探索
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // 交換が必要な場合
        if (min_idx != i) {
            printf("パス %d: 最小値 %d (位置 %d) を位置 %d と交換\\n", 
                   i + 1, arr[min_idx], min_idx, i);
            swap(&arr[min_idx], &arr[i]);
        } else {
            printf("パス %d: 位置 %d の要素 %d は既に最小値\\n", 
                   i + 1, i, arr[i]);
        }
        
        printf("結果: ");
        printArray(arr, n);
        printf("\\n");
    }
}

// メイン関数
int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("=== 選択ソートのデモンストレーション ===\\n\\n");
    
    // ソート過程を表示
    selectionSortWithSteps(arr, n);
    
    printf("最終結果: ");
    printArray(arr, n);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**selectionSort関数:**
- 外側のループ(i)はソート済み部分の境界を管理します
- 内側のループ(j)は未ソート部分から最小値を探索します
- min_idxは現在見つかっている最小値のインデックスを保持します
- 最小値が見つかったら、未ソート部分の先頭と交換します

**最適化のポイント:**
- 交換が不要な場合（min_idx == i）はswapを実行しません
- 比較回数は常にn(n-1)/2回で一定です
- 交換回数は最大でn-1回です

**メモリ使用量:**
- インプレースソートのため、追加メモリはO(1)です
- 元の配列以外に必要なのは数個の変数のみです
  `,

  example: `
**実行例:**
初期配列: [64, 25, 12, 22, 11]

パス1: 最小値 11 (位置 4) を位置 0 と交換
結果: [11, 25, 12, 22, 64]

パス2: 最小値 12 (位置 2) を位置 1 と交換  
結果: [11, 12, 25, 22, 64]

パス3: 最小値 22 (位置 3) を位置 2 と交換
結果: [11, 12, 22, 25, 64]

パス4: 位置 3 の要素 25 は既に最小値
結果: [11, 12, 22, 25, 64]

最終結果: [11, 12, 22, 25, 64]
  `,

  advantages: [
    'アルゴリズムが理解しやすく実装が簡単',
    '交換回数が最大でn-1回と少ない',
    'インプレース（追加メモリ不要）でソートできる',
    'どんな入力に対しても性能が一定（O(n²)）'
  ],

  disadvantages: [
    '時間計算量がO(n²)と非効率',
    '不安定ソート（同じ値の要素の相対位置が変わる可能性）',
    '既にソートされた配列でも性能が改善されない',
    '大きなデータセットには適さない'
  ],

  useCases: [
    '小さなデータセット（20要素以下）のソート',
    'メモリ使用量を最小限に抑えたい場合',
    '交換コストが高い場合（交換回数を最小化したい）',
    'ソートアルゴリズムの学習目的'
  ]
};

