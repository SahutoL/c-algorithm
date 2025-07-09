export const linkedListContent = {
  id: 'linked-list',
  title: '単方向連結リスト (Singly Linked List)',
  overview: `単方向連結リストは、各ノードが次のノードへのポインタを持つ線形データ構造です。配列とは異なり、メモリ上で連続していない場所にデータを格納し、ポインタによって要素を連結します。動的なサイズ変更が可能で、挿入・削除操作が効率的に行えます。`,
  
  algorithm: `
**基本操作:**
1. **挿入**: 新しいノードを作成し、適切な位置にリンクする
2. **削除**: 対象ノードを見つけて、前のノードのリンクを更新する
3. **探索**: 先頭から順番にノードを辿って目的の値を見つける
4. **表示**: 先頭から末尾まで全てのノードを順番に表示する
  `,
  
  codeImplementation: `#include <stdio.h>
#include <stdlib.h>

// ノード構造体の定義
typedef struct Node {
    int data;
    struct Node* next;
} Node;

// 新しいノードを作成する関数
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("メモリ割り当てエラー\\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// リストの先頭に要素を挿入
Node* insertAtBeginning(Node* head, int data) {
    Node* newNode = createNode(data);
    newNode->next = head;
    return newNode;  // 新しい先頭を返す
}

// リストの末尾に要素を挿入
Node* insertAtEnd(Node* head, int data) {
    Node* newNode = createNode(data);
    
    // リストが空の場合
    if (head == NULL) {
        return newNode;
    }
    
    // 末尾まで移動
    Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    current->next = newNode;
    return head;
}

// 指定位置に要素を挿入
Node* insertAtPosition(Node* head, int data, int position) {
    if (position < 0) {
        printf("無効な位置です\\n");
        return head;
    }
    
    // 先頭に挿入
    if (position == 0) {
        return insertAtBeginning(head, data);
    }
    
    Node* newNode = createNode(data);
    Node* current = head;
    
    // 挿入位置の前まで移動
    for (int i = 0; i < position - 1 && current != NULL; i++) {
        current = current->next;
    }
    
    if (current == NULL) {
        printf("位置が範囲外です\\n");
        free(newNode);
        return head;
    }
    
    newNode->next = current->next;
    current->next = newNode;
    return head;
}

// 値による要素の削除
Node* deleteByValue(Node* head, int data) {
    if (head == NULL) {
        printf("リストが空です\\n");
        return head;
    }
    
    // 先頭要素を削除
    if (head->data == data) {
        Node* temp = head;
        head = head->next;
        free(temp);
        printf("値 %d を削除しました\\n", data);
        return head;
    }
    
    // 削除対象を探索
    Node* current = head;
    while (current->next != NULL && current->next->data != data) {
        current = current->next;
    }
    
    if (current->next == NULL) {
        printf("値 %d が見つかりません\\n", data);
        return head;
    }
    
    Node* temp = current->next;
    current->next = current->next->next;
    free(temp);
    printf("値 %d を削除しました\\n", data);
    return head;
}

// 位置による要素の削除
Node* deleteAtPosition(Node* head, int position) {
    if (head == NULL) {
        printf("リストが空です\\n");
        return head;
    }
    
    if (position < 0) {
        printf("無効な位置です\\n");
        return head;
    }
    
    // 先頭要素を削除
    if (position == 0) {
        Node* temp = head;
        head = head->next;
        printf("位置 %d の要素 %d を削除しました\\n", position, temp->data);
        free(temp);
        return head;
    }
    
    Node* current = head;
    for (int i = 0; i < position - 1 && current->next != NULL; i++) {
        current = current->next;
    }
    
    if (current->next == NULL) {
        printf("位置が範囲外です\\n");
        return head;
    }
    
    Node* temp = current->next;
    current->next = current->next->next;
    printf("位置 %d の要素 %d を削除しました\\n", position, temp->data);
    free(temp);
    return head;
}

// 値を探索
int search(Node* head, int data) {
    Node* current = head;
    int position = 0;
    
    while (current != NULL) {
        if (current->data == data) {
            return position;
        }
        current = current->next;
        position++;
    }
    
    return -1;  // 見つからない
}

// リストの長さを取得
int getLength(Node* head) {
    int length = 0;
    Node* current = head;
    
    while (current != NULL) {
        length++;
        current = current->next;
    }
    
    return length;
}

// リストを表示
void printList(Node* head) {
    if (head == NULL) {
        printf("リストは空です\\n");
        return;
    }
    
    Node* current = head;
    printf("リスト: ");
    while (current != NULL) {
        printf("%d", current->data);
        if (current->next != NULL) {
            printf(" -> ");
        }
        current = current->next;
    }
    printf(" -> NULL\\n");
}

// リストを逆順にする
Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;  // 次のノードを保存
        current->next = prev;  // リンクを逆転
        prev = current;        // prevを前進
        current = next;        // currentを前進
    }
    
    return prev;  // 新しい先頭
}

// メモリを解放
void freeList(Node* head) {
    Node* current = head;
    Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}

// メイン関数
int main() {
    Node* head = NULL;
    
    printf("=== 単方向連結リストのデモンストレーション ===\\n\\n");
    
    // 要素の挿入
    printf("--- 要素の挿入 ---\\n");
    head = insertAtEnd(head, 10);
    head = insertAtEnd(head, 20);
    head = insertAtEnd(head, 30);
    printList(head);
    
    head = insertAtBeginning(head, 5);
    printf("先頭に5を挿入: ");
    printList(head);
    
    head = insertAtPosition(head, 15, 2);
    printf("位置2に15を挿入: ");
    printList(head);
    
    printf("\\nリストの長さ: %d\\n\\n", getLength(head));
    
    // 要素の探索
    printf("--- 要素の探索 ---\\n");
    int searchValue = 20;
    int position = search(head, searchValue);
    if (position != -1) {
        printf("値 %d は位置 %d で見つかりました\\n", searchValue, position);
    } else {
        printf("値 %d は見つかりませんでした\\n", searchValue);
    }
    printf("\\n");
    
    // 要素の削除
    printf("--- 要素の削除 ---\\n");
    head = deleteByValue(head, 15);
    printList(head);
    
    head = deleteAtPosition(head, 0);
    printList(head);
    
    printf("\\n");
    
    // リストの逆順
    printf("--- リストの逆順 ---\\n");
    printf("逆順前: ");
    printList(head);
    head = reverseList(head);
    printf("逆順後: ");
    printList(head);
    
    // メモリ解放
    freeList(head);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**Node構造体:**
- dataフィールドでデータを格納
- nextフィールドで次のノードへのポインタを保持
- 自己参照構造体として定義

**メモリ管理:**
- malloc()で動的にメモリを確保
- free()で不要になったメモリを解放
- メモリリークを防ぐため、削除時は必ずfree()を呼び出す

**挿入操作:**
- 先頭挿入：O(1)の時間計算量
- 末尾挿入：O(n)の時間計算量（末尾まで辿る必要があるため）
- 位置指定挿入：O(n)の時間計算量

**削除操作:**
- 削除対象の前のノードのnextポインタを更新
- 削除するノードのメモリを解放
- 先頭削除はO(1)、その他はO(n)

**逆順操作:**
- 3つのポインタ（prev, current, next）を使用
- 各ノードのnextポインタを前のノードに向ける
- O(n)の時間計算量、O(1)の空間計算量
  `,

  example: `
**実行例:**

--- 要素の挿入 ---
リスト: 10 -> 20 -> 30 -> NULL
先頭に5を挿入: 5 -> 10 -> 20 -> 30 -> NULL
位置2に15を挿入: 5 -> 10 -> 15 -> 20 -> 30 -> NULL

リストの長さ: 5

--- 要素の探索 ---
値 20 は位置 3 で見つかりました

--- 要素の削除 ---
値 15 を削除しました
リスト: 5 -> 10 -> 20 -> 30 -> NULL
位置 0 の要素 5 を削除しました
リスト: 10 -> 20 -> 30 -> NULL

--- リストの逆順 ---
逆順前: 10 -> 20 -> 30 -> NULL
逆順後: 30 -> 20 -> 10 -> NULL
  `,

  advantages: [
    '動的サイズ変更が可能',
    '挿入・削除操作が効率的（特に先頭）',
    'メモリを必要な分だけ使用',
    '実装が比較的簡単',
    '他のデータ構造の基礎となる'
  ],

  disadvantages: [
    'ランダムアクセスができない（O(n)の時間が必要）',
    '各ノードに追加のポインタ領域が必要',
    'キャッシュ効率が配列より劣る',
    'メモリの断片化が発生する可能性',
    'ポインタ操作によるバグが発生しやすい'
  ],

  variants: [
    '**双方向連結リスト**: 前のノードへのポインタも持つ',
    '**循環連結リスト**: 末尾ノードが先頭ノードを指す',
    '**番兵ノード付きリスト**: ダミーノードで境界処理を簡素化',
    '**XORリスト**: XOR演算を使ってポインタを1つに削減'
  ],

  useCases: [
    'スタックやキューの実装',
    'undo/redo機能の実装',
    'メモリプールの管理',
    'グラフの隣接リスト表現',
    'ハッシュテーブルのチェイン法',
    '音楽プレイヤーのプレイリスト',
    'ブラウザの履歴管理',
    'データ構造とアルゴリズムの学習'
  ]
};

