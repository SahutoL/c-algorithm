export const bubbleSortContent = {
  id: 'bubble-sort',
  title: 'バブルソート (Bubble Sort)',
  overview: `バブルソートは最もシンプルなソートアルゴリズムの一つです。隣接する要素を比較し、順序が間違っている場合に交換を行うことを繰り返します。大きな要素が配列の末尾に向かって「泡のように浮上」することからこの名前が付けられました。`,
  
  algorithm: `
1. 配列の先頭から隣接する要素を比較する
2. 左の要素が右の要素より大きい場合、交換する
3. 配列の末尾まで比較を続ける
4. 一回のパスで最大値が末尾に移動する
5. 未ソート部分に対して同じ処理を繰り返す
6. 交換が発生しなくなるまで続ける
  `,
  
  codeImplementation: `#include <stdio.h>

// 要素を交換する関数
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// バブルソートの実装
void bubbleSort(int arr[], int n) {
    int i, j;
    int swapped;
    
    for (i = 0; i < n - 1; i++) {
        swapped = 0;  // 交換が発生したかのフラグ
        
        // 未ソート部分を走査
        for (j = 0; j < n - i - 1; j++) {
            // 隣接する要素を比較
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = 1;  // 交換が発生
            }
        }
        
        // 交換が発生しなかった場合、ソート完了
        if (swapped == 0) {
            break;
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

// メイン関数
int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("ソート前の配列: ");
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    printf("ソート後の配列: ");
    printArray(arr, n);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**swap関数:**
- 二つの整数のポインタを受け取り、値を交換します
- 一時変数tempを使用して安全に値を交換します

**bubbleSort関数:**
- 外側のループ(i)は配列全体のパス数を制御します
- 内側のループ(j)は隣接要素の比較を行います
- swappedフラグにより、交換が発生しなかった場合の早期終了を実現します
- n-i-1まで比較することで、既にソートされた末尾部分を除外します

**最適化のポイント:**
- swappedフラグにより、既にソートされた配列の場合はO(n)で終了します
- 各パスで最大値が確実に末尾に移動するため、比較範囲を狭めることができます
  `,

  example: `
**実行例:**
初期配列: [64, 34, 25, 12, 22, 11, 90]

パス1: [34, 25, 12, 22, 11, 64, 90] (90が末尾に移動)
パス2: [25, 12, 22, 11, 34, 64, 90] (64が正しい位置に移動)
パス3: [12, 22, 11, 25, 34, 64, 90] (34が正しい位置に移動)
パス4: [12, 11, 22, 25, 34, 64, 90] (25が正しい位置に移動)
パス5: [11, 12, 22, 25, 34, 64, 90] (22が正しい位置に移動)
パス6: [11, 12, 22, 25, 34, 64, 90] (交換なし、ソート完了)

最終結果: [11, 12, 22, 25, 34, 64, 90]
  `,

  advantages: [
    'アルゴリズムが非常にシンプルで理解しやすい',
    'インプレース（追加メモリ不要）でソートできる',
    '安定ソート（同じ値の要素の相対位置が保たれる）',
    '既にソートされた配列に対してはO(n)で動作する'
  ],

  disadvantages: [
    '時間計算量がO(n²)と非効率',
    '大きなデータセットには適さない',
    '実用的なアプリケーションでは使用されることが少ない'
  ],

  useCases: [
    '教育目的でのソートアルゴリズムの学習',
    '小さなデータセット（10要素以下）のソート',
    'アルゴリズムの動作を視覚的に理解するためのデモンストレーション'
  ]
};

