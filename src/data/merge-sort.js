export const mergeSortContent = {
  id: 'merge-sort',
  title: 'マージソート (Merge Sort)',
  overview: `マージソートは分割統治法を用いた安定で効率的なソートアルゴリズムです。配列を半分ずつに分割し、それぞれを再帰的にソートした後、ソート済みの部分配列をマージ（併合）して全体をソートします。常にO(n log n)の時間計算量を保証し、安定ソートであることから、多くの実用的な場面で使用されています。`,
  
  algorithm: `
1. 配列を中央で2つの部分配列に分割する
2. 左の部分配列を再帰的にソートする
3. 右の部分配列を再帰的にソートする
4. ソート済みの2つの部分配列をマージ（併合）する
5. 部分配列のサイズが1になったら終了する（ベースケース）
  `,
  
  codeImplementation: `#include <stdio.h>
#include <stdlib.h>

// 2つのソート済み部分配列をマージする関数
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;  // 左の部分配列のサイズ
    int n2 = right - mid;     // 右の部分配列のサイズ
    
    // 一時配列を作成
    int* leftArr = (int*)malloc(n1 * sizeof(int));
    int* rightArr = (int*)malloc(n2 * sizeof(int));
    
    // データを一時配列にコピー
    for (i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for (j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }
    
    // 一時配列をマージして元の配列に戻す
    i = 0;    // 左の部分配列のインデックス
    j = 0;    // 右の部分配列のインデックス
    k = left; // マージされた配列のインデックス
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // 残りの要素をコピー
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
    
    // メモリを解放
    free(leftArr);
    free(rightArr);
}

// マージソートの実装
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        // 中央点を計算（オーバーフロー回避）
        int mid = left + (right - left) / 2;
        
        // 左半分をソート
        mergeSort(arr, left, mid);
        
        // 右半分をソート
        mergeSort(arr, mid + 1, right);
        
        // ソート済みの半分をマージ
        merge(arr, left, mid, right);
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
void mergeSortWithSteps(int arr[], int left, int right, int depth) {
    if (left < right) {
        // インデントを表示
        for (int i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("分割 [%d, %d]: ", left, right);
        for (int i = left; i <= right; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
        
        int mid = left + (right - left) / 2;
        
        // 再帰的に分割
        mergeSortWithSteps(arr, left, mid, depth + 1);
        mergeSortWithSteps(arr, mid + 1, right, depth + 1);
        
        // マージ
        merge(arr, left, mid, right);
        
        // マージ後の状態を表示
        for (int i = 0; i < depth; i++) {
            printf("  ");
        }
        printf("マージ [%d, %d]: ", left, right);
        for (int i = left; i <= right; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
    }
}

// ボトムアップマージソート（反復版）
void mergeSortIterative(int arr[], int n) {
    int curr_size;  // 現在のサブ配列のサイズ
    int left_start; // 左のサブ配列の開始インデックス
    
    // サブ配列のサイズを1から始めて2倍ずつ増加
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        // 現在のサイズのサブ配列を選択
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // 中央点を計算
            int mid = left_start + curr_size - 1;
            
            // 右端を計算
            int right_end = (left_start + 2 * curr_size - 1 < n - 1) ? 
                           left_start + 2 * curr_size - 1 : n - 1;
            
            // マージ
            if (mid < right_end) {
                merge(arr, left_start, mid, right_end);
            }
        }
    }
}

// メイン関数
int main() {
    int arr1[] = {12, 11, 13, 5, 6, 7};
    int arr2[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("=== マージソートのデモンストレーション ===\\n\\n");
    
    printf("初期配列: ");
    printArray(arr1, n);
    printf("\\n");
    
    printf("--- 再帰版マージソート ---\\n");
    mergeSortWithSteps(arr1, 0, n - 1, 0);
    printf("\\n最終結果: ");
    printArray(arr1, n);
    
    printf("\\n--- 反復版マージソート ---\\n");
    printf("初期配列: ");
    printArray(arr2, n);
    mergeSortIterative(arr2, n);
    printf("ソート結果: ");
    printArray(arr2, n);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**merge関数:**
- 2つのソート済み部分配列を1つのソート済み配列にマージします
- 一時配列を使用して元のデータを保存します
- 2つのポインタを使って小さい方の要素から順に選択します
- 残った要素を最後にコピーします

**mergeSort関数（再帰版）:**
- 分割統治法により配列を半分ずつに分割します
- ベースケース：left >= rightの場合は何もしません
- 再帰的に左右をソートしてからマージします

**mergeSortIterative関数（反復版）:**
- スタックオーバーフローを避けるための反復実装です
- ボトムアップ方式でサイズ1から始めて2倍ずつ増加させます
- 再帰呼び出しを使わないため、大きなデータセットでも安全です

**安定性の保証:**
- leftArr[i] <= rightArr[j]の条件により安定性を保証します
- 等しい要素の場合、左側の要素を先に選択します
  `,

  example: `
**実行例:**
初期配列: [12, 11, 13, 5, 6, 7]

分割 [0, 5]: 12 11 13 5 6 7
  分割 [0, 2]: 12 11 13
    分割 [0, 1]: 12 11
    マージ [0, 1]: 11 12
    分割 [2, 2]: 13
  マージ [0, 2]: 11 12 13
  分割 [3, 5]: 5 6 7
    分割 [3, 4]: 5 6
    マージ [3, 4]: 5 6
    分割 [5, 5]: 7
  マージ [3, 5]: 5 6 7
マージ [0, 5]: 5 6 7 11 12 13

最終結果: [5, 6, 7, 11, 12, 13]
  `,

  advantages: [
    '時間計算量が常にO(n log n)で安定している',
    '安定ソート（同じ値の要素の相対位置が保たれる）',
    '最悪ケースでも性能が劣化しない',
    '並列化が容易（分割された部分を独立して処理可能）',
    '外部ソート（メモリに収まらないデータ）に適している',
    '予測可能な性能特性'
  ],

  disadvantages: [
    '空間計算量がO(n)と追加メモリが必要',
    'インプレースソートではない',
    '小さなデータセットでは他のアルゴリズムより遅い場合がある',
    'キャッシュ効率がクイックソートより劣る場合がある'
  ],

  optimizations: [
    '**ハイブリッド手法**: 小さな部分配列には挿入ソートを使用',
    '**インプレース版**: 追加メモリを最小限に抑えた実装',
    '**自然マージソート**: 既存の順序を活用した最適化',
    '**並列マージソート**: マルチコアCPUを活用した並列処理',
    '**外部マージソート**: 大容量データの効率的な処理'
  ],

  useCases: [
    '安定性が重要なソート処理',
    '大きなデータセットの確実なソート',
    '外部ソート（ファイルソートなど）',
    '並列処理を活用したソート',
    'リンクリストのソート',
    '最悪ケース性能が重要なアプリケーション',
    'ソートアルゴリズムの学習目的'
  ]
};

