export const binarySearchTreeContent = {
  title: "二分探索木 (Binary Search Tree)",
  overview: `二分探索木（BST）は、各ノードが最大2つの子ノードを持つ木構造で、左の子ノードの値は親ノードより小さく、右の子ノードの値は親ノードより大きいという性質を持ちます。この性質により、平均的にO(log n)の時間で検索、挿入、削除操作を実行できる効率的なデータ構造です。`,
  
  algorithm: `1. 挿入：ルートから開始し、値を比較しながら適切な位置を見つける
2. 検索：ルートから開始し、値を比較しながら目標ノードを探す
3. 削除：3つのケースに分けて処理
   - 葉ノード：単純に削除
   - 子が1つ：子ノードで置き換え
   - 子が2つ：後継ノードまたは前任ノードで置き換え
4. 走査：中順、前順、後順の3つの方法`,

  codeImplementation: `#include <stdio.h>
#include <stdlib.h>

// 二分探索木のノード構造体
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

// 新しいノードの作成
TreeNode* createNode(int data) {
    TreeNode *node = malloc(sizeof(TreeNode));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 挿入操作
TreeNode* insert(TreeNode *root, int data) {
    // ベースケース：空の木または葉ノードに到達
    if (root == NULL) {
        return createNode(data);
    }
    
    // 値を比較して適切な子ノードに再帰的に挿入
    if (data < root->data) {
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        root->right = insert(root->right, data);
    }
    
    // 重複する値は挿入しない
    return root;
}

// 検索操作
TreeNode* search(TreeNode *root, int data) {
    // ベースケース：空の木または値が見つかった
    if (root == NULL || root->data == data) {
        return root;
    }
    
    // 値を比較して適切な子ノードを検索
    if (data < root->data) {
        return search(root->left, data);
    } else {
        return search(root->right, data);
    }
}

// 最小値ノードを見つける
TreeNode* findMin(TreeNode *root) {
    while (root && root->left != NULL) {
        root = root->left;
    }
    return root;
}

// 削除操作
TreeNode* delete(TreeNode *root, int data) {
    if (root == NULL) {
        return root;
    }
    
    // 削除するノードを見つける
    if (data < root->data) {
        root->left = delete(root->left, data);
    } else if (data > root->data) {
        root->right = delete(root->right, data);
    } else {
        // 削除するノードが見つかった
        
        // ケース1：葉ノード（子がない）
        if (root->left == NULL && root->right == NULL) {
            free(root);
            return NULL;
        }
        
        // ケース2：子が1つ
        if (root->left == NULL) {
            TreeNode *temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            TreeNode *temp = root->left;
            free(root);
            return temp;
        }
        
        // ケース3：子が2つ
        // 右部分木の最小値（後継ノード）を見つける
        TreeNode *temp = findMin(root->right);
        
        // 後継ノードの値をコピー
        root->data = temp->data;
        
        // 後継ノードを削除
        root->right = delete(root->right, temp->data);
    }
    
    return root;
}

// 中順走査（左→ルート→右）
void inorderTraversal(TreeNode *root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

// 前順走査（ルート→左→右）
void preorderTraversal(TreeNode *root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}

// 後順走査（左→右→ルート）
void postorderTraversal(TreeNode *root) {
    if (root != NULL) {
        postorderTraversal(root->left);
        postorderTraversal(root->right);
        printf("%d ", root->data);
    }
}

// 木の高さを計算
int height(TreeNode *root) {
    if (root == NULL) {
        return -1;
    }
    
    int leftHeight = height(root->left);
    int rightHeight = height(root->right);
    
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// メモリ解放
void freeTree(TreeNode *root) {
    if (root != NULL) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

// メイン関数
int main() {
    TreeNode *root = NULL;
    
    // データの挿入
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(values) / sizeof(values[0]);
    
    for (int i = 0; i < n; i++) {
        root = insert(root, values[i]);
    }
    
    printf("中順走査: ");
    inorderTraversal(root);
    printf("\\n");
    
    printf("前順走査: ");
    preorderTraversal(root);
    printf("\\n");
    
    printf("後順走査: ");
    postorderTraversal(root);
    printf("\\n");
    
    // 検索
    int searchValue = 40;
    TreeNode *found = search(root, searchValue);
    if (found) {
        printf("%d が見つかりました\\n", searchValue);
    } else {
        printf("%d は見つかりませんでした\\n", searchValue);
    }
    
    // 削除
    root = delete(root, 30);
    printf("30削除後の中順走査: ");
    inorderTraversal(root);
    printf("\\n");
    
    printf("木の高さ: %d\\n", height(root));
    
    freeTree(root);
    return 0;
}`,

  example: `**実行例:**
挿入順序: [50, 30, 70, 20, 40, 60, 80]

構築された木:
        50
       /  \\
      30   70
     / \\   / \\
    20 40 60 80

中順走査: 20 30 40 50 60 70 80
前順走査: 50 30 20 40 70 60 80
後順走査: 20 40 30 60 80 70 50

40 が見つかりました
30削除後の中順走査: 20 40 50 60 70 80
木の高さ: 2`,

  explanation: `二分探索木の効率性は、その構造的性質に由来します。各ノードで、左の部分木のすべての値は現在のノードより小さく、右の部分木のすべての値は現在のノードより大きいという不変条件が維持されます。

挿入操作では、ルートから開始して値を比較し、適切な位置まで下降します。検索操作も同様に、各ステップで探索範囲を半分に削減できます。

削除操作は最も複雑で、3つのケースがあります：
1. 葉ノード：単純に削除
2. 子が1つ：子ノードで置き換え
3. 子が2つ：後継ノード（右部分木の最小値）または前任ノード（左部分木の最大値）で置き換え

走査方法には3種類あり、それぞれ異なる順序で要素を訪問します：
- 中順走査：昇順でソートされた順序
- 前順走査：木の構造を保持した順序
- 後順走査：子ノードを先に処理する順序

バランスが重要で、最悪の場合（完全に偏った木）では線形時間になってしまいます。`,

  advantages: [
    "平均的にO(log n)の効率的な操作",
    "中順走査でソート済み順序を取得",
    "動的なサイズ変更が可能",
    "範囲検索が効率的"
  ],

  disadvantages: [
    "最悪ケースでO(n)の性能（偏った木）",
    "バランス維持が困難",
    "ポインタによる追加メモリが必要",
    "キャッシュ効率が良くない"
  ],

  useCases: [
    "動的な集合の管理",
    "範囲検索が必要な場合",
    "優先度付きキューの実装",
    "式の構文解析"
  ],

  applications: [
    "データベースのインデックス構造",
    "ファイルシステムのディレクトリ構造",
    "コンパイラの構文解析",
    "ゲームのAI決定木"
  ],

  optimizations: [
    "AVL木による自動バランス調整",
    "赤黒木による効率的なバランス維持",
    "スプレー木による局所性の活用",
    "B木による外部記憶装置対応"
  ],

  variants: [
    "AVL木（高さバランス木）",
    "赤黒木（色付きバランス木）",
    "スプレー木（自己調整木）",
    "トレープ（ランダム化BST）"
  ]
};

