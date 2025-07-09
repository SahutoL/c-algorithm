export const queueContent = {
  id: 'queue',
  title: 'キュー (Queue)',
  overview: `キューは「先入れ先出し」（FIFO: First In, First Out）の原則に従うデータ構造です。要素の追加は一方の端（リア）で行い、削除はもう一方の端（フロント）で行います。銀行の待ち行列や印刷ジョブの管理のように、最初に来たものを最初に処理するという公平な動作をします。幅優先探索やタスクスケジューリングなど、多くのアルゴリズムで使用される重要なデータ構造です。`,
  
  algorithm: `
**基本操作:**
1. **Enqueue**: キューのリア（後端）に要素を追加する
2. **Dequeue**: キューのフロント（前端）から要素を削除して返す
3. **Front/Peek**: キューのフロントの要素を削除せずに参照する
4. **isEmpty**: キューが空かどうかを判定する
5. **Size**: キュー内の要素数を取得する
  `,
  
  codeImplementation: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

// 配列ベースのキュー構造体
typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
    int size;
} ArrayQueue;

// 連結リストベースのキューのノード
typedef struct QueueNode {
    int data;
    struct QueueNode* next;
} QueueNode;

// 連結リストベースのキュー構造体
typedef struct {
    QueueNode* front;
    QueueNode* rear;
    int size;
} LinkedQueue;

// 循環配列ベースのキュー構造体
typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
    int size;
} CircularQueue;

// === 配列ベースのキュー実装 ===

// キューを初期化
void initArrayQueue(ArrayQueue* queue) {
    queue->front = 0;
    queue->rear = -1;
    queue->size = 0;
}

// キューが空かチェック
bool isArrayQueueEmpty(ArrayQueue* queue) {
    return queue->size == 0;
}

// キューが満杯かチェック
bool isArrayQueueFull(ArrayQueue* queue) {
    return queue->size == MAX_SIZE;
}

// 要素をエンキュー
bool enqueueArray(ArrayQueue* queue, int data) {
    if (isArrayQueueFull(queue)) {
        printf("エラー: キューが満杯です\\n");
        return false;
    }
    
    queue->rear++;
    queue->data[queue->rear] = data;
    queue->size++;
    
    printf("エンキュー: %d\\n", data);
    return true;
}

// 要素をデキュー
int dequeueArray(ArrayQueue* queue) {
    if (isArrayQueueEmpty(queue)) {
        printf("エラー: キューが空です\\n");
        return -1;
    }
    
    int data = queue->data[queue->front];
    queue->front++;
    queue->size--;
    
    printf("デキュー: %d\\n", data);
    return data;
}

// フロント要素を参照
int frontArray(ArrayQueue* queue) {
    if (isArrayQueueEmpty(queue)) {
        printf("エラー: キューが空です\\n");
        return -1;
    }
    
    return queue->data[queue->front];
}

// 配列キューを表示
void printArrayQueue(ArrayQueue* queue) {
    if (isArrayQueueEmpty(queue)) {
        printf("キューは空です\\n");
        return;
    }
    
    printf("キュー (フロント -> リア): ");
    for (int i = queue->front; i <= queue->rear; i++) {
        printf("%d ", queue->data[i]);
    }
    printf("\\n");
}

// === 循環配列ベースのキュー実装 ===

// 循環キューを初期化
void initCircularQueue(CircularQueue* queue) {
    queue->front = 0;
    queue->rear = 0;
    queue->size = 0;
}

// 循環キューが空かチェック
bool isCircularQueueEmpty(CircularQueue* queue) {
    return queue->size == 0;
}

// 循環キューが満杯かチェック
bool isCircularQueueFull(CircularQueue* queue) {
    return queue->size == MAX_SIZE;
}

// 循環キューに要素をエンキュー
bool enqueueCircular(CircularQueue* queue, int data) {
    if (isCircularQueueFull(queue)) {
        printf("エラー: 循環キューが満杯です\\n");
        return false;
    }
    
    queue->data[queue->rear] = data;
    queue->rear = (queue->rear + 1) % MAX_SIZE;
    queue->size++;
    
    printf("循環エンキュー: %d\\n", data);
    return true;
}

// 循環キューから要素をデキュー
int dequeueCircular(CircularQueue* queue) {
    if (isCircularQueueEmpty(queue)) {
        printf("エラー: 循環キューが空です\\n");
        return -1;
    }
    
    int data = queue->data[queue->front];
    queue->front = (queue->front + 1) % MAX_SIZE;
    queue->size--;
    
    printf("循環デキュー: %d\\n", data);
    return data;
}

// 循環キューを表示
void printCircularQueue(CircularQueue* queue) {
    if (isCircularQueueEmpty(queue)) {
        printf("循環キューは空です\\n");
        return;
    }
    
    printf("循環キュー (フロント -> リア): ");
    int index = queue->front;
    for (int i = 0; i < queue->size; i++) {
        printf("%d ", queue->data[index]);
        index = (index + 1) % MAX_SIZE;
    }
    printf("\\n");
}

// === 連結リストベースのキュー実装 ===

// 連結キューを初期化
void initLinkedQueue(LinkedQueue* queue) {
    queue->front = NULL;
    queue->rear = NULL;
    queue->size = 0;
}

// 連結キューが空かチェック
bool isLinkedQueueEmpty(LinkedQueue* queue) {
    return queue->front == NULL;
}

// 連結キューに要素をエンキュー
bool enqueueLinked(LinkedQueue* queue, int data) {
    QueueNode* newNode = (QueueNode*)malloc(sizeof(QueueNode));
    if (newNode == NULL) {
        printf("エラー: メモリ割り当てに失敗しました\\n");
        return false;
    }
    
    newNode->data = data;
    newNode->next = NULL;
    
    if (isLinkedQueueEmpty(queue)) {
        queue->front = queue->rear = newNode;
    } else {
        queue->rear->next = newNode;
        queue->rear = newNode;
    }
    
    queue->size++;
    printf("連結エンキュー: %d\\n", data);
    return true;
}

// 連結キューから要素をデキュー
int dequeueLinked(LinkedQueue* queue) {
    if (isLinkedQueueEmpty(queue)) {
        printf("エラー: 連結キューが空です\\n");
        return -1;
    }
    
    QueueNode* temp = queue->front;
    int data = temp->data;
    
    queue->front = queue->front->next;
    if (queue->front == NULL) {
        queue->rear = NULL;
    }
    
    queue->size--;
    free(temp);
    
    printf("連結デキュー: %d\\n", data);
    return data;
}

// 連結キューを表示
void printLinkedQueue(LinkedQueue* queue) {
    if (isLinkedQueueEmpty(queue)) {
        printf("連結キューは空です\\n");
        return;
    }
    
    printf("連結キュー (フロント -> リア): ");
    QueueNode* current = queue->front;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

// 連結キューのメモリを解放
void freeLinkedQueue(LinkedQueue* queue) {
    while (!isLinkedQueueEmpty(queue)) {
        dequeueLinked(queue);
    }
}

// === 応用例：幅優先探索（BFS）のシミュレーション ===
void bfsSimulation() {
    printf("\\n--- 幅優先探索のシミュレーション ---\\n");
    printf("グラフ: 1 -> 2, 3\\n");
    printf("       2 -> 4, 5\\n");
    printf("       3 -> 6\\n");
    printf("開始ノード: 1\\n\\n");
    
    CircularQueue queue;
    initCircularQueue(&queue);
    bool visited[7] = {false}; // ノード0は使用しない
    
    // 開始ノードをエンキュー
    enqueueCircular(&queue, 1);
    visited[1] = true;
    
    printf("BFS探索順序: ");
    
    while (!isCircularQueueEmpty(&queue)) {
        int current = dequeueCircular(&queue);
        printf("%d ", current);
        
        // 隣接ノードをエンキュー
        switch (current) {
            case 1:
                if (!visited[2]) {
                    enqueueCircular(&queue, 2);
                    visited[2] = true;
                }
                if (!visited[3]) {
                    enqueueCircular(&queue, 3);
                    visited[3] = true;
                }
                break;
            case 2:
                if (!visited[4]) {
                    enqueueCircular(&queue, 4);
                    visited[4] = true;
                }
                if (!visited[5]) {
                    enqueueCircular(&queue, 5);
                    visited[5] = true;
                }
                break;
            case 3:
                if (!visited[6]) {
                    enqueueCircular(&queue, 6);
                    visited[6] = true;
                }
                break;
        }
    }
    printf("\\n");
}

// === 応用例：ジョセフス問題 ===
int josephusProblem(int n, int k) {
    CircularQueue queue;
    initCircularQueue(&queue);
    
    // 1からnまでの人をキューに追加
    for (int i = 1; i <= n; i++) {
        enqueueCircular(&queue, i);
    }
    
    printf("\\nジョセフス問題 (n=%d, k=%d):\\n", n, k);
    
    while (queue.size > 1) {
        // k-1人をスキップ
        for (int i = 0; i < k - 1; i++) {
            int person = dequeueCircular(&queue);
            enqueueCircular(&queue, person);
        }
        
        // k番目の人を除外
        int eliminated = dequeueCircular(&queue);
        printf("除外: %d\\n", eliminated);
    }
    
    int survivor = dequeueCircular(&queue);
    printf("生存者: %d\\n", survivor);
    return survivor;
}

// メイン関数
int main() {
    printf("=== キューのデモンストレーション ===\\n\\n");
    
    // 配列ベースのキュー
    printf("--- 配列ベースのキュー ---\\n");
    ArrayQueue arrayQueue;
    initArrayQueue(&arrayQueue);
    
    enqueueArray(&arrayQueue, 10);
    enqueueArray(&arrayQueue, 20);
    enqueueArray(&arrayQueue, 30);
    printArrayQueue(&arrayQueue);
    
    printf("フロント要素: %d\\n", frontArray(&arrayQueue));
    printf("キューサイズ: %d\\n\\n", arrayQueue.size);
    
    dequeueArray(&arrayQueue);
    printArrayQueue(&arrayQueue);
    printf("\\n");
    
    // 循環配列ベースのキュー
    printf("--- 循環配列ベースのキュー ---\\n");
    CircularQueue circularQueue;
    initCircularQueue(&circularQueue);
    
    for (int i = 1; i <= 5; i++) {
        enqueueCircular(&circularQueue, i * 10);
    }
    printCircularQueue(&circularQueue);
    
    dequeueCircular(&circularQueue);
    dequeueCircular(&circularQueue);
    printCircularQueue(&circularQueue);
    
    enqueueCircular(&circularQueue, 60);
    enqueueCircular(&circularQueue, 70);
    printCircularQueue(&circularQueue);
    printf("\\n");
    
    // 連結リストベースのキュー
    printf("--- 連結リストベースのキュー ---\\n");
    LinkedQueue linkedQueue;
    initLinkedQueue(&linkedQueue);
    
    enqueueLinked(&linkedQueue, 100);
    enqueueLinked(&linkedQueue, 200);
    enqueueLinked(&linkedQueue, 300);
    printLinkedQueue(&linkedQueue);
    
    dequeueLinked(&linkedQueue);
    printLinkedQueue(&linkedQueue);
    
    // 応用例
    bfsSimulation();
    josephusProblem(7, 3);
    
    // メモリ解放
    freeLinkedQueue(&linkedQueue);
    
    return 0;
}`,

  explanation: `
**コードの詳細解説:**

**配列ベースの実装:**
- frontとrearのインデックスで管理
- エンキューでrearを増加、デキューでfrontを増加
- 単純だが、デキュー後の空間が無駄になる

**循環配列ベースの実装:**
- モジュロ演算（%）で配列を循環的に使用
- メモリ効率が良く、空間の無駄がない
- frontとrearの管理が少し複雑

**連結リストベースの実装:**
- frontとrearの両方のポインタを管理
- 動的サイズで制限がない
- 各ノードに追加のポインタ領域が必要

**幅優先探索（BFS）:**
- キューを使ってノードを順次処理
- 同じレベルのノードを先に処理する特性
- グラフの最短経路探索に使用

**ジョセフス問題:**
- 円形に並んだ人からk番目ごとに除外
- 循環キューの特性を活用した古典的問題
- 数学的解法もあるが、キューで直感的に解ける
  `,

  example: `
**実行例:**

--- 配列ベースのキュー ---
エンキュー: 10
エンキュー: 20
エンキュー: 30
キュー (フロント -> リア): 10 20 30
フロント要素: 10
キューサイズ: 3

デキュー: 10
キュー (フロント -> リア): 20 30

--- 循環配列ベースのキュー ---
循環エンキュー: 10
循環エンキュー: 20
循環エンキュー: 30
循環エンキュー: 40
循環エンキュー: 50
循環キュー (フロント -> リア): 10 20 30 40 50

循環デキュー: 10
循環デキュー: 20
循環キュー (フロント -> リア): 30 40 50

循環エンキュー: 60
循環エンキュー: 70
循環キュー (フロント -> リア): 30 40 50 60 70

--- 幅優先探索のシミュレーション ---
グラフ: 1 -> 2, 3
       2 -> 4, 5
       3 -> 6
開始ノード: 1

BFS探索順序: 1 2 3 4 5 6

ジョセフス問題 (n=7, k=3):
除外: 3
除外: 6
除外: 2
除外: 7
除外: 5
除外: 1
生存者: 4
  `,

  advantages: [
    'FIFO操作が効率的（O(1)）',
    '公平な処理順序を保証',
    '実装が比較的簡単',
    '多くのアルゴリズムの基礎となる',
    'リアルタイムシステムに適している'
  ],

  disadvantages: [
    'ランダムアクセスができない',
    '中間要素へのアクセスが困難',
    'サイズ制限がある（配列版）',
    'メモリの無駄が発生する可能性（単純配列版）'
  ],

  variants: [
    '**優先度付きキュー**: 優先度に基づいて要素を処理',
    '**双端キュー（Deque）**: 両端で挿入・削除が可能',
    '**循環キュー**: 配列を循環的に使用してメモリ効率を向上',
    '**ブロッキングキュー**: マルチスレッド環境での同期機能付き'
  ],

  applications: [
    '**タスクスケジューリング**: OSのプロセス管理',
    '**幅優先探索**: グラフやツリーの探索',
    '**バッファリング**: データストリームの一時保存',
    '**印刷キュー**: プリンタジョブの管理',
    '**ネットワーク**: パケットの送受信管理',
    '**ゲーム開発**: イベントキューやアニメーション',
    '**Webサーバー**: リクエストの処理順序管理'
  ],

  useCases: [
    'オペレーティングシステムの実装',
    'ネットワークプログラミング',
    'ゲームエンジンの開発',
    'データベースの実装',
    'リアルタイムシステム',
    'アルゴリズムの学習と理解',
    'システムプログラミング'
  ]
};

