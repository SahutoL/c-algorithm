export const linearSearchContent = {
  id: 'linear-search',
  title: '線形探索 (Linear Search)',
  overview: `線形探索は最もシンプルな探索アルゴリズムです。配列やリストの要素を先頭から順番に調べて、目的の値を見つけるまで探索を続けます。実装が簡単で、ソートされていない配列でも使用できるため、基本的な探索手法として広く使用されています。`,
  
  algorithm: `
1. 配列の先頭要素から開始する
2. 現在の要素が目的の値と等しいかチェックする
3. 等しい場合は、そのインデックスを返す
4. 等しくない場合は、次の要素に移動する
5. 配列の末尾まで到達しても見つからない場合は、-1を返す
  `,
  
  codeImplementation: `#include <stdio.h>

// 線形探索の基本実装
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // 見つかった場合はインデックスを返す
        }
    }
    return -1;  // 見つからない場合は-1を返す
}

// 線形探索（詳細版）- 探索過程を表示
int linearSearchWithSteps(int arr[], int n, int target) {
    printf("目標値 %d を探索中...\\n", target);
    
    for (int i = 0; i < n; i++) {
        printf("ステップ %d: arr[%d] = %d", i + 1, i, arr[i]);
        
        if (arr[i] == target) {
            printf(" -> 発見！\\n");
            return i;
        } else {
            printf(" -> 一致しない\\n");
        }
    }
    
    printf("探索完了: 値が見つかりませんでした\\n");
    return -1;
}

// 線形探索（全ての出現位置を検索）
int linearSearchAll(int arr[], int n, int target, int result[]) {
    int count = 0;
    
    printf("目標値 %d の全ての出現位置を探索中...\\n", target);
    
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            result[count] = i;
            count++;
            printf("位置 %d で発見\\n", i);
        }
    }
    
    return count;  // 見つかった個数を返す
}

// 線形探索（番兵法）
int linearSearchSentinel(int arr[], int n, int target) {
    // 配列の末尾に目標値を配置（番兵）
    int last = arr[n - 1];
    arr[n - 1] = target;
    
    int i = 0;
    while (arr[i] != target) {
        i++;
    }
    
    // 元の値を復元
    arr[n - 1] = last;
    
    // 番兵の位置で見つかった場合は、元の末尾要素をチェック
    if (i < n - 1 || arr[n - 1] == target) {
        return i;
    }
    
    return -1;
}

// 文字列の線形探索
int linearSearchString(char* str, char target) {
    int i = 0;
    while (str[i] != '\\0') {
        if (str[i] == target) {
            return i;
        }
        i++;
    }
    return -1;
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
    int arr[] = {2, 3, 4, 10, 40, 3, 7, 3};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    int target2 = 3;
    int target3 = 99;
    
    printf("=== 線形探索のデモンストレーション ===\\n\\n");
    
    printf("配列: ");
    printArray(arr, n);
    printf("\\n");
    
    // 基本的な線形探索
    printf("--- 基本的な線形探索 ---\\n");
    int result = linearSearch(arr, n, target);
    if (result != -1) {
        printf("値 %d は位置 %d で見つかりました\\n", target, result);
    } else {
        printf("値 %d は見つかりませんでした\\n", target);
    }
    printf("\\n");
    
    // 探索過程を表示
    printf("--- 探索過程の表示 ---\\n");
    linearSearchWithSteps(arr, n, target3);
    printf("\\n");
    
    // 全ての出現位置を検索
    printf("--- 全ての出現位置を検索 ---\\n");
    int positions[n];
    int count = linearSearchAll(arr, n, target2, positions);
    if (count > 0) {
        printf("値 %d は %d 回出現しました: ", target2, count);
        for (int i = 0; i < count; i++) {
            printf("位置%d ", positions[i]);
        }
        printf("\\n");
    }
    printf("\\n");
    
    // 番兵法
    printf("--- 番兵法 ---\\n");
    int sentinelResult = linearSearchSentinel(arr, n, target);
    printf("番兵法での結果: ");
    if (sentinelResult != -1) {
        printf("値 %d は位置 %d で見つかりました\\n", target, sentinelResult);
    } else {
        printf("値 %d は見つかりませんでした\\n", target);
    }
    printf("\\n");
    
    // 文字列探索
    printf("--- 文字列探索 ---\\n");
    char* text = "Hello World";
    char ch = 'o';
    int charPos = linearSearchString(text, ch);
    if (charPos != -1) {
        printf("文字 '%c' は文字列 \\\"%s\\\" の位置 %d で見つかりました\\n", ch, text, charPos);
    } else {
        printf("文字 '%c' は見つかりませんでした\\n", ch);
    }
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**linearSearch関数（基本版）:**
- 最もシンプルな実装で、配列を先頭から順番に探索します
- 見つかった場合はインデックス、見つからない場合は-1を返します
- 時間計算量：O(n)、空間計算量：O(1)

**linearSearchAll関数:**
- 同じ値が複数回出現する場合に、全ての位置を見つけます
- 結果を別の配列に格納し、見つかった個数を返します
- 重複データの処理に有用です

**linearSearchSentinel関数（番兵法）:**
- 配列の末尾に目標値を配置することで、境界チェックを省略します
- ループ内の条件判定を1つ減らすことで、わずかに高速化できます
- 元の配列を変更するため、注意が必要です

**linearSearchString関数:**
- 文字列内の文字を探索する例です
- ヌル終端文字（'\\0'）まで探索を続けます
- 文字列処理の基本的なパターンです
  `,

  example: `
**実行例:**
配列: [2, 3, 4, 10, 40, 3, 7, 3]

目標値 10 を探索中...
ステップ1: arr[0] = 2 -> 一致しない
ステップ2: arr[1] = 3 -> 一致しない  
ステップ3: arr[2] = 4 -> 一致しない
ステップ4: arr[3] = 10 -> 発見！

結果: 値 10 は位置 3 で見つかりました

目標値 3 の全ての出現位置を探索中...
位置 1 で発見
位置 5 で発見
位置 7 で発見
結果: 値 3 は 3 回出現しました: 位置1 位置5 位置7
  `,

  advantages: [
    'アルゴリズムが非常にシンプルで理解しやすい',
    'ソートされていない配列でも使用できる',
    '実装が簡単で、バグが入りにくい',
    '追加メモリが不要（空間計算量O(1)）',
    '小さなデータセットでは十分高速',
    'あらゆるデータ型に適用可能'
  ],

  disadvantages: [
    '時間計算量がO(n)と非効率（大きなデータセットでは遅い）',
    '配列がソートされている場合でも、その利点を活用できない',
    '最悪の場合、全ての要素を調べる必要がある'
  ],

  optimizations: [
    '**番兵法**: 境界チェックを省略して高速化',
    '**早期終了**: 複数の値を探索する場合、見つかったら即座に終了',
    '**並列探索**: 配列を分割して複数のスレッドで並列探索',
    '**キャッシュ最適化**: メモリアクセスパターンを最適化'
  ],

  useCases: [
    '小さなデータセット（100要素以下）の探索',
    'ソートされていないデータの探索',
    '一度だけの探索（ソートのコストが見合わない場合）',
    'リンクリストなどの順次アクセスしかできないデータ構造',
    'プロトタイプ開発や学習目的',
    '全ての出現位置を見つける必要がある場合',
    'データ構造の実装テストやデバッグ'
  ]
};

