export const depthFirstSearchContent = {
  title: "深さ優先探索 (Depth-First Search)",
  overview: `深さ優先探索（DFS）は、グラフや木構造を探索するアルゴリズムの一つです。可能な限り深く進んでから戻るという戦略を取り、スタック（または再帰）を使用して実装されます。迷路の探索、連結成分の検出、トポロジカルソートなど、多くの応用があります。`,
  
  algorithm: `1. 開始ノードをスタックにプッシュし、訪問済みとマーク
2. スタックが空でない間、以下を繰り返す：
   a. スタックからノードをポップ
   b. そのノードの未訪問の隣接ノードをすべてスタックにプッシュ
   c. プッシュしたノードを訪問済みとマーク
3. すべてのノードが訪問されるまで続行`,

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

// スタック構造体
typedef struct Stack {
    int items[MAX_VERTICES];
    int top;
} Stack;

// スタック操作
Stack* createStack() {
    Stack* stack = malloc(sizeof(Stack));
    stack->top = -1;
    return stack;
}

bool isEmpty(Stack* stack) {
    return stack->top == -1;
}

void push(Stack* stack, int item) {
    if (stack->top < MAX_VERTICES - 1) {
        stack->items[++stack->top] = item;
    }
}

int pop(Stack* stack) {
    if (!isEmpty(stack)) {
        return stack->items[stack->top--];
    }
    return -1;
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

// DFS（再帰版）
void dfsRecursive(Graph* graph, int vertex) {
    graph->visited[vertex] = true;
    printf("%d ", vertex);
    
    Node* adjList = graph->adjLists[vertex];
    while (adjList != NULL) {
        int connectedVertex = adjList->vertex;
        if (!graph->visited[connectedVertex]) {
            dfsRecursive(graph, connectedVertex);
        }
        adjList = adjList->next;
    }
}

// DFS（反復版・スタック使用）
void dfsIterative(Graph* graph, int startVertex) {
    Stack* stack = createStack();
    
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    
    push(stack, startVertex);
    
    while (!isEmpty(stack)) {
        int currentVertex = pop(stack);
        
        if (!graph->visited[currentVertex]) {
            graph->visited[currentVertex] = true;
            printf("%d ", currentVertex);
            
            // 隣接ノードをスタックに追加
            Node* adjList = graph->adjLists[currentVertex];
            while (adjList != NULL) {
                int connectedVertex = adjList->vertex;
                if (!graph->visited[connectedVertex]) {
                    push(stack, connectedVertex);
                }
                adjList = adjList->next;
            }
        }
    }
    
    free(stack);
}

// 連結成分の検出
void findConnectedComponents(Graph* graph) {
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    
    int componentCount = 0;
    
    for (int i = 0; i < graph->numVertices; i++) {
        if (!graph->visited[i]) {
            printf("連結成分 %d: ", ++componentCount);
            dfsRecursive(graph, i);
            printf("\\n");
        }
    }
}

// パスの存在確認
bool hasPath(Graph* graph, int start, int end) {
    if (start == end) return true;
    
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    
    Stack* stack = createStack();
    push(stack, start);
    
    while (!isEmpty(stack)) {
        int currentVertex = pop(stack);
        
        if (currentVertex == end) {
            free(stack);
            return true;
        }
        
        if (!graph->visited[currentVertex]) {
            graph->visited[currentVertex] = true;
            
            Node* adjList = graph->adjLists[currentVertex];
            while (adjList != NULL) {
                int connectedVertex = adjList->vertex;
                if (!graph->visited[connectedVertex]) {
                    push(stack, connectedVertex);
                }
                adjList = adjList->next;
            }
        }
    }
    
    free(stack);
    return false;
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
    
    printf("グラフ構造:\\n");
    printGraph(graph);
    
    printf("\\nDFS（再帰版）- 開始点0: ");
    // 訪問状態をリセット
    for (int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = false;
    }
    dfsRecursive(graph, 0);
    printf("\\n");
    
    printf("DFS（反復版）- 開始点0: ");
    dfsIterative(graph, 0);
    printf("\\n");
    
    printf("\\n連結成分の検出:\\n");
    findConnectedComponents(graph);
    
    printf("\\nパスの存在確認:\\n");
    printf("0から5へのパス: %s\\n", hasPath(graph, 0, 5) ? "存在" : "不存在");
    printf("1から4へのパス: %s\\n", hasPath(graph, 1, 4) ? "存在" : "不存在");
    
    freeGraph(graph);
    return 0;
}`,

  example: `**実行例:**
グラフ構造:
頂点 0: 2 -> 1 -> NULL
頂点 1: 3 -> 0 -> NULL
頂点 2: 4 -> 0 -> NULL
頂点 3: 5 -> 1 -> NULL
頂点 4: 2 -> NULL
頂点 5: 3 -> NULL

DFS（再帰版）- 開始点0: 0 1 3 5 2 4 
DFS（反復版）- 開始点0: 0 2 4 1 3 5 

連結成分の検出:
連結成分 1: 0 1 3 5 2 4 

パスの存在確認:
0から5へのパス: 存在
1から4へのパス: 存在`,

  explanation: `深さ優先探索は「深さ優先」という名前の通り、可能な限り深く探索してから戻る戦略を取ります。これは迷路を探索する際に、一つの道を最後まで進んでから別の道を試すのと似ています。

実装方法には2つあります：

1. 再帰版：関数の呼び出しスタックを利用
2. 反復版：明示的なスタックデータ構造を使用

再帰版は実装が簡潔ですが、深いグラフではスタックオーバーフローの可能性があります。反復版はメモリ使用量を制御できますが、実装がやや複雑になります。

DFSの重要な性質：
- 時間計算量：O(V + E)（Vは頂点数、Eは辺数）
- 空間計算量：O(V)（訪問配列とスタック）
- 完全性：有限グラフでは必ず終了
- 最適性：最短パスを保証しない

DFSは多くのグラフアルゴリズムの基礎となっており、トポロジカルソート、強連結成分の検出、サイクル検出などに応用されます。`,

  advantages: [
    "メモリ使用量が少ない",
    "実装が比較的簡単",
    "パスの存在を効率的に検出",
    "連結成分の検出が可能"
  ],

  disadvantages: [
    "最短パスを保証しない",
    "無限グラフでは終了しない可能性",
    "深いグラフでスタックオーバーフローの危険",
    "探索順序が予測しにくい"
  ],

  useCases: [
    "迷路の解法探索",
    "連結成分の検出",
    "サイクル検出",
    "トポロジカルソート"
  ],

  applications: [
    "Webクローラーのページ探索",
    "ゲームのAI探索",
    "ファイルシステムの走査",
    "依存関係の解析"
  ],

  optimizations: [
    "反復深化深さ優先探索",
    "双方向探索",
    "枝刈りによる探索空間削減",
    "並列DFS"
  ],

  variants: [
    "反復深化DFS（IDDFS）",
    "限定深さ優先探索",
    "双方向DFS",
    "並列DFS"
  ]
};

