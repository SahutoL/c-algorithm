export const insertionSortContent = {
  id: 'insertion-sort',
  title: '挿入ソート (Insertion Sort)',
  overview: `挿入ソートは、要素を一つずつ取り出して、既にソートされた部分の適切な位置に挿入するアルゴリズムです。トランプのカードを手札に並べる際の動作に似ており、直感的で理解しやすいソートアルゴリズムです。`,
  
  algorithm: `
1. 2番目の要素から開始する（1番目は既にソート済みとみなす）
2. 現在の要素を取り出す
3. ソート済み部分を右から左に走査する
4. 現在の要素より大きい要素を右にシフトする
5. 適切な位置に現在の要素を挿入する
6. 全ての要素について繰り返す
  `,
  
  codeImplementation: `#include <stdio.h>

// 挿入ソートの実装
void insertionSort(int arr[], int n) {
    int i, key, j;
    
    // 2番目の要素から開始
    for (i = 1; i < n; i++) {
        key = arr[i];  // 現在挿入する要素
        j = i - 1;     // ソート済み部分の最後のインデックス
        
        // keyより大きい要素を右にシフト
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // keyを適切な位置に挿入
        arr[j + 1] = key;
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
void insertionSortWithSteps(int arr[], int n) {
    int i, key, j;
    
    printf("初期配列: ");
    printArray(arr, n);
    printf("\\n");
    
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        
        printf("ステップ %d: 要素 %d を挿入\\n", i, key);
        printf("挿入前: ");
        printArray(arr, n);
        
        // keyより大きい要素を右にシフト
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // keyを適切な位置に挿入
        arr[j + 1] = key;
        
        printf("挿入後: ");
        printArray(arr, n);
        printf("\\n");
    }
}

// 二分探索を使った挿入ソート（最適化版）
void binaryInsertionSort(int arr[], int n) {
    int i, j, key, left, right, mid;
    
    for (i = 1; i < n; i++) {
        key = arr[i];
        left = 0;
        right = i;
        
        // 二分探索で挿入位置を見つける
        while (left < right) {
            mid = (left + right) / 2;
            if (arr[mid] > key) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        // 要素をシフトして挿入
        for (j = i; j > left; j--) {
            arr[j] = arr[j - 1];
        }
        arr[left] = key;
    }
}

// メイン関数
int main() {
    int arr1[] = {12, 11, 13, 5, 6};
    int arr2[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("=== 挿入ソートのデモンストレーション ===\\n\\n");
    
    // 通常の挿入ソート
    printf("--- 通常の挿入ソート ---\\n");
    insertionSortWithSteps(arr1, n);
    
    printf("\\n--- 二分探索挿入ソート ---\\n");
    printf("ソート前: ");
    printArray(arr2, n);
    
    binaryInsertionSort(arr2, n);
    
    printf("ソート後: ");
    printArray(arr2, n);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**insertionSort関数:**
- 外側のループ(i)は挿入する要素を選択します
- keyは現在挿入しようとしている要素です
- 内側のwhile文でソート済み部分を右から左に走査します
- keyより大きい要素を右にシフトして空間を作ります
- 最後にkeyを適切な位置に挿入します

**binaryInsertionSort関数（最適化版）:**
- 二分探索を使って挿入位置を効率的に見つけます
- 比較回数をO(log n)に削減できます
- ただし、要素のシフトは依然としてO(n)必要です

**安定性:**
- 同じ値の要素の相対位置が保たれる安定ソートです
- arr[j] > keyの条件により、等しい要素は移動されません
  `,

  example: `
**実行例:**
初期配列: [12, 11, 13, 5, 6]

ステップ1: 要素 11 を挿入
挿入前: [12, 11, 13, 5, 6]
挿入後: [11, 12, 13, 5, 6]

ステップ2: 要素 13 を挿入  
挿入前: [11, 12, 13, 5, 6]
挿入後: [11, 12, 13, 5, 6] (位置変更なし)

ステップ3: 要素 5 を挿入
挿入前: [11, 12, 13, 5, 6]
挿入後: [5, 11, 12, 13, 6]

ステップ4: 要素 6 を挿入
挿入前: [5, 11, 12, 13, 6]
挿入後: [5, 6, 11, 12, 13]

最終結果: [5, 6, 11, 12, 13]
  `,

  advantages: [
    '既にソートされた配列に対してはO(n)で動作する',
    '安定ソート（同じ値の要素の相対位置が保たれる）',
    'インプレース（追加メモリ不要）でソートできる',
    'オンラインアルゴリズム（データが順次到着する場合に適用可能）',
    '小さなデータセットに対して効率的',
    'アルゴリズムが直感的で理解しやすい'
  ],

  disadvantages: [
    '平均・最悪時間計算量がO(n²)と非効率',
    '大きなデータセットには適さない',
    '要素の移動回数が多い場合がある'
  ],

  useCases: [
    '小さなデータセット（50要素以下）のソート',
    '既にほぼソートされたデータのソート',
    'ハイブリッドソートアルゴリズムの一部（クイックソートやマージソートと組み合わせ）',
    'リアルタイムでデータが到着する場合のソート',
    'ソートアルゴリズムの学習目的'
  ]
};

