export const breadthFirstSearchContent = {
  title: "幅優先探索 (Breadth-First Search)",
  overview: `幅優先探索（BFS）は、グラフや木構造を探索するアルゴリズムで、開始ノードから近い順に探索を行います。キューを使用して実装され、最短パス問題の解決や、レベル順の探索が必要な場合に使用されます。重み付きでないグラフにおいて最短パスを保証する重要な特性を持ちます。`,
  
  algorithm: `1. 開始ノードをキューに追加し、訪問済みとマーク
2. キューが空でない間、以下を繰り返す：
   a. キューからノードをデキュー
   b. そのノードの未訪問の隣接ノードをすべてキューにエンキュー
   c. エンキューしたノードを訪問済みとマーク
3. すべての到達可能なノードが訪問されるまで続行`,

  codeImplementation: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

// グラフ構造体（隣接リスト表現）
typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

typedef struct Graph {
    int numVertices;
    Node** adjLists;
    bool* visited;
} Graph;

// キュー構造体
typedef struct Queue {
    int items[MAX_VERTICES];
    int front;
    int rear;
} Queue;

// キュー操作
Queue* createQueue() {
    Queue* queue = malloc(sizeof(Queue));
    queue->front = -1;
    queue->rear = -1;
    return queue;
}

bool isEmpty(Queue* queue) {
    return queue->rear == -1;
}

void enqueue(Queue* queue, int item) {
    if (queue->rear == MAX_VERTICES - 1) {
        printf("キューが満杯です\\n");
        return;
    }
    
    if (queue->front == -1) {
        queue->front = 0;
    }
    
    queue->rear++;
    queue->items[queue->rear] = item;
}

int dequeue(Queue* queue) {
    if (isEmpty(queue)) {
        printf("キューが空です\\n");
        return -1;
    }
    
    int item = queue->items[queue->front];
    queue->front++;
    
    if (queue->front > queue->rear) {
        queue->front = queue->rear = -1;
    }
    
    return item;
}

// グラフ操作
Node* createNode(int vertex) {
    Node* newNode = malloc(sizeof(Node));
    newNode->vertex = vertex;
    newNode->next = NULL;
    return newNode;
}

Graph* createGraph(int vertices) {
    Graph* graph = malloc(sizeof(Graph));
    graph->numVertices = vertices;
    
    graph->adjLists = malloc(vertices * sizeof(Node*));
    graph->visited = malloc(vertices * sizeof(bool));
    
    for (int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
        graph->visited[i] = false;
    }
    
    return graph;
}

// エッジの追加（無向グラフ）
void addEdge(Graph* graph, int src, int dest) {
    // src から dest へのエッジ
    Node* newNode = createNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;
    
    // dest から src へのエッジ（無向グラフの場合）
    newNode = createNode(src);
    newNode->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode;
}

// BFS実装
void bfs(Graph* graph, int startVertex) {
    Queue* queue = createQueue();
    
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    
    graph->visited[startVertex] = true;
    enqueue(queue, startVertex);
    
    printf("BFS探索順序: ");
    
    while (!isEmpty(queue)) {
        int currentVertex = dequeue(queue);
        printf("%d ", currentVertex);
        
        Node* adjList = graph->adjLists[currentVertex];
        while (adjList != NULL) {
            int connectedVertex = adjList->vertex;
            
            if (!graph->visited[connectedVertex]) {
                graph->visited[connectedVertex] = true;
                enqueue(queue, connectedVertex);
            }
            adjList = adjList->next;
        }
    }
    
    printf("\\n");
    free(queue);
}

// 最短パス探索（重み付きでないグラフ）
void shortestPath(Graph* graph, int start, int end) {
    if (start == end) {
        printf("開始点と終了点が同じです\\n");
        return;
    }
    
    Queue* queue = createQueue();
    int* distance = malloc(graph->numVertices * sizeof(int));
    int* parent = malloc(graph->numVertices * sizeof(int));
    
    // 初期化
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
        distance[i] = -1;
        parent[i] = -1;
    }
    
    graph->visited[start] = true;
    distance[start] = 0;
    enqueue(queue, start);
    
    bool found = false;
    
    while (!isEmpty(queue) && !found) {
        int currentVertex = dequeue(queue);
        
        Node* adjList = graph->adjLists[currentVertex];
        while (adjList != NULL) {
            int connectedVertex = adjList->vertex;
            
            if (!graph->visited[connectedVertex]) {
                graph->visited[connectedVertex] = true;
                distance[connectedVertex] = distance[currentVertex] + 1;
                parent[connectedVertex] = currentVertex;
                enqueue(queue, connectedVertex);
                
                if (connectedVertex == end) {
                    found = true;
                    break;
                }
            }
            adjList = adjList->next;
        }
    }
    
    if (found) {
        printf("%dから%dへの最短距離: %d\\n", start, end, distance[end]);
        
        // パスの復元
        printf("最短パス: ");
        int* path = malloc(graph->numVertices * sizeof(int));
        int pathLength = 0;
        int current = end;
        
        while (current != -1) {
            path[pathLength++] = current;
            current = parent[current];
        }
        
        // パスを逆順で表示
        for (int i = pathLength - 1; i >= 0; i--) {
            printf("%d", path[i]);
            if (i > 0) printf(" -> ");
        }
        printf("\\n");
        
        free(path);
    } else {
        printf("%dから%dへのパスは存在しません\\n", start, end);
    }
    
    free(queue);
    free(distance);
    free(parent);
}

// レベル順探索（各レベルを分けて表示）
void levelOrderTraversal(Graph* graph, int startVertex) {
    Queue* queue = createQueue();
    
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    
    graph->visited[startVertex] = true;
    enqueue(queue, startVertex);
    enqueue(queue, -1); // レベル区切り
    
    int level = 0;
    printf("レベル %d: %d ", level, startVertex);
    
    while (!isEmpty(queue)) {
        int currentVertex = dequeue(queue);
        
        if (currentVertex == -1) {
            // レベル区切り
            if (!isEmpty(queue)) {
                level++;
                printf("\\nレベル %d: ", level);
                enqueue(queue, -1);
            }
        } else {
            Node* adjList = graph->adjLists[currentVertex];
            while (adjList != NULL) {
                int connectedVertex = adjList->vertex;
                
                if (!graph->visited[connectedVertex]) {
                    graph->visited[connectedVertex] = true;
                    printf("%d ", connectedVertex);
                    enqueue(queue, connectedVertex);
                }
                adjList = adjList->next;
            }
        }
    }
    
    printf("\\n");
    free(queue);
}

// 二部グラフ判定
bool isBipartite(Graph* graph) {
    int* color = malloc(graph->numVertices * sizeof(int));
    Queue* queue = createQueue();
    
    // 色を初期化（-1: 未着色, 0: 色1, 1: 色2）
    for (int i = 0; i < graph->numVertices; i++) {
        color[i] = -1;
    }
    
    // すべての連結成分をチェック
    for (int start = 0; start < graph->numVertices; start++) {
        if (color[start] == -1) {
            color[start] = 0;
            enqueue(queue, start);
            
            while (!isEmpty(queue)) {
                int currentVertex = dequeue(queue);
                
                Node* adjList = graph->adjLists[currentVertex];
                while (adjList != NULL) {
                    int connectedVertex = adjList->vertex;
                    
                    if (color[connectedVertex] == -1) {
                        color[connectedVertex] = 1 - color[currentVertex];
                        enqueue(queue, connectedVertex);
                    } else if (color[connectedVertex] == color[currentVertex]) {
                        free(color);
                        free(queue);
                        return false;
                    }
                    adjList = adjList->next;
                }
            }
        }
    }
    
    free(color);
    free(queue);
    return true;
}

// グラフの表示
void printGraph(Graph* graph) {
    for (int v = 0; v < graph->numVertices; v++) {
        Node* temp = graph->adjLists[v];
        printf("頂点 %d: ", v);
        while (temp) {
            printf("%d -> ", temp->vertex);
            temp = temp->next;
        }
        printf("NULL\\n");
    }
}

// メモリ解放
void freeGraph(Graph* graph) {
    for (int i = 0; i < graph->numVertices; i++) {
        Node* current = graph->adjLists[i];
        while (current) {
            Node* temp = current;
            current = current->next;
            free(temp);
        }
    }
    free(graph->adjLists);
    free(graph->visited);
    free(graph);
}

// メイン関数
int main() {
    Graph* graph = createGraph(6);
    
    // エッジの追加
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 2, 4);
    addEdge(graph, 3, 5);
    addEdge(graph, 4, 5);
    
    printf("グラフ構造:\\n");
    printGraph(graph);
    printf("\\n");
    
    // BFS探索
    bfs(graph, 0);
    printf("\\n");
    
    // 最短パス探索
    shortestPath(graph, 0, 5);
    printf("\\n");
    
    // レベル順探索
    levelOrderTraversal(graph, 0);
    printf("\\n");
    
    // 二部グラフ判定
    printf("二部グラフ判定: %s\\n", isBipartite(graph) ? "はい" : "いいえ");
    
    freeGraph(graph);
    return 0;
}`,

  example: `**実行例:**
グラフ構造:
頂点 0: 2 -> 1 -> NULL
頂点 1: 3 -> 0 -> NULL
頂点 2: 4 -> 0 -> NULL
頂点 3: 5 -> 1 -> NULL
頂点 4: 5 -> 2 -> NULL
頂点 5: 4 -> 3 -> NULL

BFS探索順序: 0 1 2 3 4 5 

0から5への最短距離: 3
最短パス: 0 -> 1 -> 3 -> 5

レベル 0: 0 
レベル 1: 1 2 
レベル 2: 3 4 
レベル 3: 5 

二部グラフ判定: はい`,

  explanation: `幅優先探索は「幅優先」という名前の通り、開始ノードから同じ距離にあるすべてのノードを先に探索してから、より遠いノードに進む戦略を取ります。これは水面に石を投げた時の波紋の広がりに似ています。

BFSの重要な特性：
1. 最短パス保証：重み付きでないグラフにおいて、BFSは最短パス（最少エッジ数）を保証します
2. レベル順探索：各距離レベルごとに順序立てて探索
3. 完全性：有限グラフでは必ず終了

実装にはキューを使用します。キューのFIFO（先入れ先出し）特性により、近いノードから順に処理されることが保証されます。

時間計算量：O(V + E)（Vは頂点数、Eは辺数）
空間計算量：O(V)（訪問配列とキュー）

BFSの応用：
- 最短パス問題
- 連結成分の検出
- 二部グラフ判定
- レベル順走査
- ソーシャルネットワークの距離計算

DFSとの比較：
- BFS：最短パス保証、メモリ使用量多
- DFS：メモリ効率良、最短パス保証なし`,

  advantages: [
    "最短パス（最少エッジ数）を保証",
    "レベル順の探索が可能",
    "二部グラフ判定が効率的",
    "連結成分の検出が可能"
  ],

  disadvantages: [
    "メモリ使用量が多い（キューサイズ）",
    "重み付きグラフでは最短パス保証なし",
    "深いグラフでは非効率",
    "実装がDFSより複雑"
  ],

  useCases: [
    "最短パス問題（重み付きでない）",
    "レベル順の処理が必要な場合",
    "二部グラフの判定",
    "ソーシャルネットワーク分析"
  ],

  applications: [
    "GPS ナビゲーションシステム",
    "ソーシャルメディアの友達推薦",
    "Webクローラーの階層探索",
    "ゲームのAI（最短経路探索）"
  ],

  optimizations: [
    "双方向BFS",
    "A*アルゴリズムとの組み合わせ",
    "並列BFS",
    "メモリ効率的なキュー実装"
  ],

  variants: [
    "双方向BFS",
    "限定幅優先探索",
    "並列BFS",
    "重み付きBFS（Dijkstra法）"
  ]
};

