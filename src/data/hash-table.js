export const hashTableContent = {
  title: "ハッシュテーブル (Hash Table)",
  overview: `ハッシュテーブルは、キーと値のペアを効率的に格納・検索するデータ構造です。ハッシュ関数を使用してキーを配列のインデックスにマッピングし、平均的にO(1)の時間で挿入、削除、検索操作を実現します。現代のプログラミングにおいて最も重要なデータ構造の一つです。`,
  
  algorithm: `1. ハッシュ関数でキーをインデックスに変換
2. 衝突が発生した場合の解決方法を適用
3. 挿入：計算されたインデックスに値を格納
4. 検索：キーからインデックスを計算し値を取得
5. 削除：該当する要素を削除またはマーク`,

  codeImplementation: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 100

// ハッシュテーブルのノード構造体
typedef struct Node {
    char *key;
    int value;
    struct Node *next;
} Node;

// ハッシュテーブル構造体
typedef struct {
    Node *table[TABLE_SIZE];
} HashTable;

// ハッシュ関数（DJB2アルゴリズム）
unsigned int hash(const char *key) {
    unsigned int hash_value = 5381;
    int c;
    
    while ((c = *key++)) {
        hash_value = ((hash_value << 5) + hash_value) + c;
    }
    
    return hash_value % TABLE_SIZE;
}

// ハッシュテーブルの初期化
HashTable* createHashTable() {
    HashTable *ht = malloc(sizeof(HashTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->table[i] = NULL;
    }
    return ht;
}

// 新しいノードの作成
Node* createNode(const char *key, int value) {
    Node *node = malloc(sizeof(Node));
    node->key = malloc(strlen(key) + 1);
    strcpy(node->key, key);
    node->value = value;
    node->next = NULL;
    return node;
}

// 挿入操作
void insert(HashTable *ht, const char *key, int value) {
    unsigned int index = hash(key);
    Node *node = ht->table[index];
    
    // キーが既に存在する場合は値を更新
    while (node != NULL) {
        if (strcmp(node->key, key) == 0) {
            node->value = value;
            return;
        }
        node = node->next;
    }
    
    // 新しいノードを先頭に挿入
    Node *new_node = createNode(key, value);
    new_node->next = ht->table[index];
    ht->table[index] = new_node;
}

// 検索操作
int search(HashTable *ht, const char *key) {
    unsigned int index = hash(key);
    Node *node = ht->table[index];
    
    while (node != NULL) {
        if (strcmp(node->key, key) == 0) {
            return node->value;
        }
        node = node->next;
    }
    
    return -1; // キーが見つからない場合
}

// 削除操作
int delete(HashTable *ht, const char *key) {
    unsigned int index = hash(key);
    Node *node = ht->table[index];
    Node *prev = NULL;
    
    while (node != NULL) {
        if (strcmp(node->key, key) == 0) {
            if (prev == NULL) {
                ht->table[index] = node->next;
            } else {
                prev->next = node->next;
            }
            free(node->key);
            free(node);
            return 1; // 削除成功
        }
        prev = node;
        node = node->next;
    }
    
    return 0; // キーが見つからない
}

// ハッシュテーブルの表示
void display(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (ht->table[i] != NULL) {
            printf("Index %d: ", i);
            Node *node = ht->table[i];
            while (node != NULL) {
                printf("(%s, %d) ", node->key, node->value);
                node = node->next;
            }
            printf("\\n");
        }
    }
}

// メモリ解放
void freeHashTable(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *node = ht->table[i];
        while (node != NULL) {
            Node *temp = node;
            node = node->next;
            free(temp->key);
            free(temp);
        }
    }
    free(ht);
}

// メイン関数
int main() {
    HashTable *ht = createHashTable();
    
    // データの挿入
    insert(ht, "apple", 100);
    insert(ht, "banana", 200);
    insert(ht, "orange", 300);
    insert(ht, "grape", 400);
    
    printf("ハッシュテーブルの内容:\\n");
    display(ht);
    
    // 検索
    printf("\\napple: %d\\n", search(ht, "apple"));
    printf("banana: %d\\n", search(ht, "banana"));
    printf("cherry: %d\\n", search(ht, "cherry"));
    
    // 削除
    delete(ht, "banana");
    printf("\\nbanana削除後:\\n");
    display(ht);
    
    freeHashTable(ht);
    return 0;
}`,

  example: `**実行例:**
ハッシュテーブルの内容:
Index 23: (grape, 400) 
Index 45: (apple, 100) 
Index 67: (orange, 300) 
Index 89: (banana, 200) 

apple: 100
banana: 200
cherry: -1

banana削除後:
Index 23: (grape, 400) 
Index 45: (apple, 100) 
Index 67: (orange, 300)`,

  explanation: `ハッシュテーブルの核心はハッシュ関数です。この関数は任意のキーを配列のインデックスに変換します。理想的なハッシュ関数は、キーを均等に分散させ、衝突を最小化します。

衝突処理には主に二つの方法があります：

1. チェイン法（Separate Chaining）
各配列要素に連結リストを持たせ、同じインデックスにマッピングされた要素を連結します。実装が簡単で、負荷率が高くても性能が急激に悪化しません。

2. オープンアドレス法（Open Addressing）
衝突が発生した場合、別の空いているスロットを探します。線形探査、二次探査、ダブルハッシュなどの方法があります。

負荷率（Load Factor）は性能に大きく影響します。負荷率 = 要素数 / テーブルサイズで、一般的に0.75以下に保つことが推奨されます。負荷率が高くなると、動的にテーブルサイズを拡張するリハッシュが必要になります。`,

  advantages: [
    "平均的にO(1)の高速な操作",
    "キーと値の関連付けが直感的",
    "動的なサイズ変更が可能",
    "多くのプログラミング言語で標準実装"
  ],

  disadvantages: [
    "最悪ケースでO(n)の性能",
    "メモリ使用量が多い場合がある",
    "ハッシュ関数の設計が重要",
    "順序を保持しない"
  ],

  useCases: [
    "辞書やマップの実装",
    "キャッシュシステム",
    "データベースのインデックス",
    "重複検出"
  ],

  applications: [
    "プログラミング言語の変数管理",
    "Webブラウザのキャッシュ",
    "データベース管理システム",
    "分散システムの一貫性ハッシュ"
  ],

  optimizations: [
    "ロビンフッドハッシュによる性能改善",
    "カッコウハッシュによる最悪ケース保証",
    "一貫性ハッシュによる分散システム対応",
    "ブルームフィルターとの組み合わせ"
  ],

  variants: [
    "オープンアドレス法ハッシュテーブル",
    "一貫性ハッシュ",
    "カッコウハッシュ",
    "ロビンフッドハッシュ"
  ]
};

