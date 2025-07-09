export const stackContent = {
  id: 'stack',
  title: 'スタック (Stack)',
  overview: `スタックは「後入れ先出し」（LIFO: Last In, First Out）の原則に従うデータ構造です。要素の追加と削除が一方の端（トップ）でのみ行われます。本の積み重ねや皿の重ね置きのように、最後に置いたものを最初に取り出すという直感的な動作をします。関数呼び出しの管理や式の評価など、多くのアルゴリズムで使用される基本的なデータ構造です。`,
  
  algorithm: `
**基本操作:**
1. **Push**: スタックのトップに要素を追加する
2. **Pop**: スタックのトップから要素を削除して返す
3. **Peek/Top**: スタックのトップの要素を削除せずに参照する
4. **isEmpty**: スタックが空かどうかを判定する
5. **Size**: スタック内の要素数を取得する
  `,
  
  codeImplementation: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

// 配列ベースのスタック構造体
typedef struct {
    int data[MAX_SIZE];
    int top;
} ArrayStack;

// 連結リストベースのスタックのノード
typedef struct StackNode {
    int data;
    struct StackNode* next;
} StackNode;

// 連結リストベースのスタック構造体
typedef struct {
    StackNode* top;
    int size;
} LinkedStack;

// === 配列ベースのスタック実装 ===

// スタックを初期化
void initArrayStack(ArrayStack* stack) {
    stack->top = -1;
}

// スタックが空かチェック
bool isArrayStackEmpty(ArrayStack* stack) {
    return stack->top == -1;
}

// スタックが満杯かチェック
bool isArrayStackFull(ArrayStack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// 要素をプッシュ
bool pushArray(ArrayStack* stack, int data) {
    if (isArrayStackFull(stack)) {
        printf("エラー: スタックが満杯です\\n");
        return false;
    }
    
    stack->data[++stack->top] = data;
    printf("プッシュ: %d\\n", data);
    return true;
}

// 要素をポップ
int popArray(ArrayStack* stack) {
    if (isArrayStackEmpty(stack)) {
        printf("エラー: スタックが空です\\n");
        return -1;
    }
    
    int data = stack->data[stack->top--];
    printf("ポップ: %d\\n", data);
    return data;
}

// トップ要素を参照
int peekArray(ArrayStack* stack) {
    if (isArrayStackEmpty(stack)) {
        printf("エラー: スタックが空です\\n");
        return -1;
    }
    
    return stack->data[stack->top];
}

// スタックのサイズを取得
int getArrayStackSize(ArrayStack* stack) {
    return stack->top + 1;
}

// 配列スタックを表示
void printArrayStack(ArrayStack* stack) {
    if (isArrayStackEmpty(stack)) {
        printf("スタックは空です\\n");
        return;
    }
    
    printf("スタック (トップ -> ボトム): ");
    for (int i = stack->top; i >= 0; i--) {
        printf("%d ", stack->data[i]);
    }
    printf("\\n");
}

// === 連結リストベースのスタック実装 ===

// スタックを初期化
void initLinkedStack(LinkedStack* stack) {
    stack->top = NULL;
    stack->size = 0;
}

// スタックが空かチェック
bool isLinkedStackEmpty(LinkedStack* stack) {
    return stack->top == NULL;
}

// 要素をプッシュ
bool pushLinked(LinkedStack* stack, int data) {
    StackNode* newNode = (StackNode*)malloc(sizeof(StackNode));
    if (newNode == NULL) {
        printf("エラー: メモリ割り当てに失敗しました\\n");
        return false;
    }
    
    newNode->data = data;
    newNode->next = stack->top;
    stack->top = newNode;
    stack->size++;
    
    printf("プッシュ: %d\\n", data);
    return true;
}

// 要素をポップ
int popLinked(LinkedStack* stack) {
    if (isLinkedStackEmpty(stack)) {
        printf("エラー: スタックが空です\\n");
        return -1;
    }
    
    StackNode* temp = stack->top;
    int data = temp->data;
    stack->top = stack->top->next;
    stack->size--;
    
    free(temp);
    printf("ポップ: %d\\n", data);
    return data;
}

// トップ要素を参照
int peekLinked(LinkedStack* stack) {
    if (isLinkedStackEmpty(stack)) {
        printf("エラー: スタックが空です\\n");
        return -1;
    }
    
    return stack->top->data;
}

// スタックのサイズを取得
int getLinkedStackSize(LinkedStack* stack) {
    return stack->size;
}

// 連結リストスタックを表示
void printLinkedStack(LinkedStack* stack) {
    if (isLinkedStackEmpty(stack)) {
        printf("スタックは空です\\n");
        return;
    }
    
    printf("スタック (トップ -> ボトム): ");
    StackNode* current = stack->top;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

// 連結リストスタックのメモリを解放
void freeLinkedStack(LinkedStack* stack) {
    while (!isLinkedStackEmpty(stack)) {
        popLinked(stack);
    }
}

// === 応用例：括弧の対応チェック ===
bool isValidParentheses(char* str) {
    ArrayStack stack;
    initArrayStack(&stack);
    
    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = str[i];
        
        // 開き括弧をプッシュ
        if (ch == '(' || ch == '[' || ch == '{') {
            pushArray(&stack, ch);
        }
        // 閉じ括弧をチェック
        else if (ch == ')' || ch == ']' || ch == '}') {
            if (isArrayStackEmpty(&stack)) {
                return false;
            }
            
            char top = popArray(&stack);
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{')) {
                return false;
            }
        }
    }
    
    return isArrayStackEmpty(&stack);
}

// === 応用例：逆ポーランド記法の計算 ===
int evaluateRPN(char* tokens[], int tokenCount) {
    ArrayStack stack;
    initArrayStack(&stack);
    
    for (int i = 0; i < tokenCount; i++) {
        char* token = tokens[i];
        
        if (token[0] == '+' || token[0] == '-' || 
            token[0] == '*' || token[0] == '/') {
            
            if (getArrayStackSize(&stack) < 2) {
                printf("エラー: オペランドが不足しています\\n");
                return 0;
            }
            
            int b = popArray(&stack);
            int a = popArray(&stack);
            int result;
            
            switch (token[0]) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': 
                    if (b == 0) {
                        printf("エラー: ゼロ除算\\n");
                        return 0;
                    }
                    result = a / b; 
                    break;
            }
            
            pushArray(&stack, result);
        } else {
            // 数値をプッシュ
            int num = atoi(token);
            pushArray(&stack, num);
        }
    }
    
    return popArray(&stack);
}

// メイン関数
int main() {
    printf("=== スタックのデモンストレーション ===\\n\\n");
    
    // 配列ベースのスタック
    printf("--- 配列ベースのスタック ---\\n");
    ArrayStack arrayStack;
    initArrayStack(&arrayStack);
    
    pushArray(&arrayStack, 10);
    pushArray(&arrayStack, 20);
    pushArray(&arrayStack, 30);
    printArrayStack(&arrayStack);
    
    printf("トップ要素: %d\\n", peekArray(&arrayStack));
    printf("スタックサイズ: %d\\n\\n", getArrayStackSize(&arrayStack));
    
    popArray(&arrayStack);
    popArray(&arrayStack);
    printArrayStack(&arrayStack);
    printf("\\n");
    
    // 連結リストベースのスタック
    printf("--- 連結リストベースのスタック ---\\n");
    LinkedStack linkedStack;
    initLinkedStack(&linkedStack);
    
    pushLinked(&linkedStack, 100);
    pushLinked(&linkedStack, 200);
    pushLinked(&linkedStack, 300);
    printLinkedStack(&linkedStack);
    
    printf("トップ要素: %d\\n", peekLinked(&linkedStack));
    printf("スタックサイズ: %d\\n\\n", getLinkedStackSize(&linkedStack));
    
    popLinked(&linkedStack);
    printLinkedStack(&linkedStack);
    printf("\\n");
    
    // 括弧の対応チェック
    printf("--- 括弧の対応チェック ---\\n");
    char* testStrings[] = {
        "((()))",
        "([{}])",
        "(((",
        "([)]",
        ""
    };
    
    for (int i = 0; i < 5; i++) {
        printf("\\"%s\\": %s\\n", testStrings[i], 
               isValidParentheses(testStrings[i]) ? "有効" : "無効");
    }
    printf("\\n");
    
    // 逆ポーランド記法の計算
    printf("--- 逆ポーランド記法の計算 ---\\n");
    char* rpnTokens[] = {"2", "1", "+", "3", "*"};  // (2 + 1) * 3 = 9
    int tokenCount = 5;
    
    printf("式: 2 1 + 3 * \\n");
    int result = evaluateRPN(rpnTokens, tokenCount);
    printf("結果: %d\\n", result);
    
    // メモリ解放
    freeLinkedStack(&linkedStack);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**配列ベースの実装:**
- 固定サイズの配列を使用
- topインデックスでスタックの先頭を管理
- メモリ効率が良く、キャッシュ効率も高い
- サイズ制限があるが、実装が簡単

**連結リストベースの実装:**
- 動的にメモリを確保
- サイズ制限がない
- 各ノードに追加のポインタ領域が必要
- メモリの断片化が発生する可能性

**括弧の対応チェック:**
- 開き括弧をスタックにプッシュ
- 閉じ括弧が来たらスタックからポップして対応をチェック
- 最終的にスタックが空なら正しい対応

**逆ポーランド記法（RPN）:**
- オペランドをスタックにプッシュ
- 演算子が来たら2つのオペランドをポップして計算
- 結果をスタックにプッシュ
- 最後にスタックに残った値が答え
  `,

  example: `
**実行例:**

--- 配列ベースのスタック ---
プッシュ: 10
プッシュ: 20
プッシュ: 30
スタック (トップ -> ボトム): 30 20 10
トップ要素: 30
スタックサイズ: 3

ポップ: 30
ポップ: 20
スタック (トップ -> ボトム): 10

--- 連結リストベースのスタック ---
プッシュ: 100
プッシュ: 200
プッシュ: 300
スタック (トップ -> ボトム): 300 200 100
トップ要素: 300
スタックサイズ: 3

ポップ: 300
スタック (トップ -> ボトム): 200 100

--- 括弧の対応チェック ---
"((()))": 有効
"([{}])": 有効
"(((": 無効
"([)]": 無効
"": 有効

--- 逆ポーランド記法の計算 ---
式: 2 1 + 3 *
プッシュ: 2
プッシュ: 1
ポップ: 1
ポップ: 2
プッシュ: 3
プッシュ: 3
ポップ: 3
ポップ: 3
プッシュ: 9
ポップ: 9
結果: 9
  `,

  advantages: [
    'LIFO操作が非常に効率的（O(1)）',
    '実装が簡単で理解しやすい',
    'メモリ使用量が予測可能（配列版）',
    '関数呼び出しの自然なモデル',
    '再帰アルゴリズムの実装に適している'
  ],

  disadvantages: [
    'ランダムアクセスができない',
    '中間要素へのアクセスが困難',
    'サイズ制限がある（配列版）',
    'メモリオーバーヘッドがある（連結リスト版）'
  ],

  applications: [
    '**関数呼び出し管理**: プログラムの実行時スタック',
    '**式の評価**: 中置記法から後置記法への変換',
    '**括弧の対応チェック**: コンパイラの構文解析',
    '**Undo機能**: エディタやゲームの操作履歴',
    '**深さ優先探索**: グラフやツリーの探索',
    '**バックトラッキング**: 迷路の解法や数独',
    '**メモリ管理**: ガベージコレクションのマーク&スイープ'
  ],

  useCases: [
    'プログラミング言語の実行環境',
    'Webブラウザの戻るボタン機能',
    '数式計算機の実装',
    'コンパイラの構文解析器',
    'ゲームの状態管理',
    'アルゴリズムの学習と理解',
    'データ構造の基礎学習'
  ]
};

