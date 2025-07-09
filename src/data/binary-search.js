export const binarySearchContent = {
  id: 'binary-search',
  title: '二分探索 (Binary Search)',
  overview: `二分探索は、ソート済み配列から目的の値を効率的に見つけるアルゴリズムです。配列の中央要素と目的の値を比較し、探索範囲を半分ずつ絞り込んでいきます。時間計算量がO(log n)と非常に効率的で、大きなデータセットでも高速に動作します。`,
  
  algorithm: `
1. ソート済み配列の左端（low）と右端（high）を設定する
2. 中央のインデックス（mid）を計算する
3. 中央の要素と目的の値を比較する
   - 等しい場合：見つかったのでインデックスを返す
   - 目的の値が小さい場合：右半分を除外（high = mid - 1）
   - 目的の値が大きい場合：左半分を除外（low = mid + 1）
4. low > highになるまで繰り返す
5. 見つからない場合は-1を返す
  `,
  
  codeImplementation: `#include <stdio.h>

// 二分探索の基本実装（反復版）
int binarySearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        // オーバーフロー回避のための中央値計算
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid;  // 見つかった
        }
        else if (arr[mid] < target) {
            low = mid + 1;  // 右半分を探索
        }
        else {
            high = mid - 1;  // 左半分を探索
        }
    }
    
    return -1;  // 見つからない
}

// 二分探索の再帰実装
int binarySearchRecursive(int arr[], int low, int high, int target) {
    if (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        else if (arr[mid] < target) {
            return binarySearchRecursive(arr, mid + 1, high, target);
        }
        else {
            return binarySearchRecursive(arr, low, mid - 1, target);
        }
    }
    
    return -1;
}

// 二分探索（探索過程を表示）
int binarySearchWithSteps(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int step = 1;
    
    printf("目標値 %d を二分探索中...\\n", target);
    printf("初期範囲: [%d, %d]\\n\\n", low, high);
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        printf("ステップ %d:\\n", step);
        printf("  範囲: [%d, %d]\\n", low, high);
        printf("  中央: arr[%d] = %d\\n", mid, arr[mid]);
        
        if (arr[mid] == target) {
            printf("  結果: 発見！\\n");
            return mid;
        }
        else if (arr[mid] < target) {
            printf("  判定: %d < %d なので右半分を探索\\n", arr[mid], target);
            low = mid + 1;
        }
        else {
            printf("  判定: %d > %d なので左半分を探索\\n", arr[mid], target);
            high = mid - 1;
        }
        
        printf("\\n");
        step++;
    }
    
    printf("探索完了: 値が見つかりませんでした\\n");
    return -1;
}

// 最初の出現位置を見つける（重複要素対応）
int binarySearchFirst(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int result = -1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            high = mid - 1;  // 左側も探索を続ける
        }
        else if (arr[mid] < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    
    return result;
}

// 最後の出現位置を見つける（重複要素対応）
int binarySearchLast(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int result = -1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            low = mid + 1;  // 右側も探索を続ける
        }
        else if (arr[mid] < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    
    return result;
}

// 挿入位置を見つける
int binarySearchInsertPosition(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] < target) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    
    return low;  // 挿入すべき位置
}

// 配列を表示する関数
void printArray(int arr[], int size) {
    printf("[");
    for (int i = 0; i < size; i++) {
        printf("%d", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("]\\n");
}

// メイン関数
int main() {
    int arr[] = {2, 3, 4, 10, 40, 50, 60, 70};
    int duplicateArr[] = {1, 2, 2, 2, 3, 4, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int dupN = sizeof(duplicateArr) / sizeof(duplicateArr[0]);
    
    printf("=== 二分探索のデモンストレーション ===\\n\\n");
    
    printf("ソート済み配列: ");
    printArray(arr, n);
    printf("\\n");
    
    // 基本的な二分探索
    printf("--- 基本的な二分探索 ---\\n");
    int target = 10;
    int result = binarySearch(arr, n, target);
    if (result != -1) {
        printf("値 %d は位置 %d で見つかりました\\n", target, result);
    } else {
        printf("値 %d は見つかりませんでした\\n", target);
    }
    printf("\\n");
    
    // 探索過程を表示
    printf("--- 探索過程の表示 ---\\n");
    binarySearchWithSteps(arr, n, 40);
    printf("\\n");
    
    // 再帰版
    printf("--- 再帰版二分探索 ---\\n");
    int recursiveResult = binarySearchRecursive(arr, 0, n - 1, 60);
    if (recursiveResult != -1) {
        printf("再帰版: 値 60 は位置 %d で見つかりました\\n", recursiveResult);
    }
    printf("\\n");
    
    // 重複要素の処理
    printf("--- 重複要素の処理 ---\\n");
    printf("重複ありの配列: ");
    printArray(duplicateArr, dupN);
    
    int dupTarget = 2;
    int first = binarySearchFirst(duplicateArr, dupN, dupTarget);
    int last = binarySearchLast(duplicateArr, dupN, dupTarget);
    
    if (first != -1) {
        printf("値 %d の最初の出現: 位置 %d\\n", dupTarget, first);
        printf("値 %d の最後の出現: 位置 %d\\n", dupTarget, last);
        printf("値 %d の出現回数: %d\\n", dupTarget, last - first + 1);
    }
    printf("\\n");
    
    // 挿入位置の検索
    printf("--- 挿入位置の検索 ---\\n");
    int insertTarget = 45;
    int insertPos = binarySearchInsertPosition(arr, n, insertTarget);
    printf("値 %d を挿入すべき位置: %d\\n", insertTarget, insertPos);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**binarySearch関数（基本版）:**
- 反復的な実装で、スタックオーバーフローの心配がありません
- mid = low + (high - low) / 2でオーバーフローを回避します
- 探索範囲を半分ずつ絞り込んでいきます

**binarySearchRecursive関数:**
- 再帰的な実装で、分割統治法の考え方が明確です
- 関数型プログラミングのスタイルに近い実装です
- 深い再帰によるスタックオーバーフローに注意が必要です

**重複要素への対応:**
- binarySearchFirst: 最初の出現位置を見つけます
- binarySearchLast: 最後の出現位置を見つけます
- これらを組み合わせて出現回数も計算できます

**挿入位置の検索:**
- ソート順を保ったまま要素を挿入する位置を見つけます
- データベースのインデックスや動的配列の実装で使用されます

**オーバーフロー対策:**
- mid = (low + high) / 2ではなく、mid = low + (high - low) / 2を使用
- 大きな配列でも安全に動作します
  `,

  example: `
**実行例:**
ソート済み配列: [2, 3, 4, 10, 40, 50, 60, 70]

目標値 40 を二分探索中...
初期範囲: [0, 7]

ステップ1:
  範囲: [0, 7]
  中央: arr[3] = 10
  判定: 10 < 40 なので右半分を探索

ステップ2:
  範囲: [4, 7]  
  中央: arr[5] = 50
  判定: 50 > 40 なので左半分を探索

ステップ3:
  範囲: [4, 4]
  中央: arr[4] = 40
  結果: 発見！

最終結果: 値 40 は位置 4 で見つかりました
  `,

  advantages: [
    '時間計算量がO(log n)と非常に効率的',
    '大きなデータセットでも高速に動作',
    '実装が比較的簡単',
    '予測可能な性能特性',
    '空間計算量がO(1)（反復版）',
    '分割統治法の良い例'
  ],

  disadvantages: [
    '配列が事前にソートされている必要がある',
    'ランダムアクセスが可能なデータ構造でないと使用できない',
    'ソートのコストを考慮する必要がある',
    '小さなデータセットでは線形探索より遅い場合がある'
  ],

  variants: [
    '**三分探索**: 配列を3つに分割して探索範囲を絞り込む',
    '**指数探索**: 範囲を指数的に拡大してから二分探索',
    '**補間探索**: データの分布を考慮した探索',
    '**フィボナッチ探索**: フィボナッチ数を使った分割'
  ],

  useCases: [
    '大きなソート済み配列での高速検索',
    'データベースのインデックス検索',
    '辞書や電話帳などの検索',
    '数値計算での根の発見',
    'ゲームでのスコアランキング検索',
    'ライブラリ関数（bsearch、lower_bound等）の実装',
    'アルゴリズム学習での分割統治法の理解'
  ]
};

