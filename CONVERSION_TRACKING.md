# コンバージョントラッキング実装ガイド

## 概要
LaLa GLOBAL LANGUAGEのランディングページにGoogle Analytics 4（GA4）とGoogle Adsのコンバージョントラッキングを実装しました。

## 実装されたイベント

### 1. application_submit（申し込み）
**目的**: ユーザーが申し込みボタンをクリックした際のトラッキング

**トリガーされる要素**:
- ヘッダーナビゲーション「お申し込み」ボタン
- ヒーローセクション「まずは4回だけ体験する」ボタン
- narrowingセクション「今すぐ申し込む」ボタン
- CTAセクション「法人語学研修体験お申し込み」ボタン

**パラメータ**:
```javascript
{
    'event_category': 'conversion',
    'event_label': '{button_location}_label',
    'button_location': 'header|hero_section|narrowing_section|cta_section',
    'value': 11000,  // トライアル価格
    'urgency': 'high' // narrowingセクションのみ
}
```

### 2. consultation_request（相談リクエスト）
**目的**: ユーザーが相談ボタンをクリックした際のトラッキング

**トリガーされる要素**:
- CTAセクション「まずはご相談」ボタン

**パラメータ**:
```javascript
{
    'event_category': 'conversion',
    'event_label': 'cta_secondary',
    'button_location': 'cta_section'
}
```

### 3. detail_view（詳細表示）
**目的**: ユーザーが詳細情報を見ようとした際のトラッキング

**トリガーされる要素**:
- ヒーローセクション「詳細を見る」ボタン

**パラメータ**:
```javascript
{
    'event_category': 'conversion',
    'event_label': 'hero_secondary',
    'button_location': 'hero_section'
}
```

## Google Ads設定手順

### 1. GA4でのコンバージョン設定
1. GA4管理画面にアクセス
2. 「設定」→「イベント」を選択
3. 以下のイベントを「コンバージョンとしてマーク」:
   - `application_submit`
   - `consultation_request`

### 2. Google Adsでのインポート
1. Google Ads管理画面にアクセス
2. 「ツールと設定」→「測定」→「コンバージョン」
3. 「+」ボタンをクリック→「インポート」を選択
4. 「Google アナリティクス 4 プロパティ」を選択
5. GA4で設定したコンバージョンイベントをインポート

### 3. コンバージョン値の設定
- `application_submit`: 11,000円（トライアル価格）
- `consultation_request`: 設定なし（リード獲得として測定）

## テスト方法

### 1. ローカルテスト
```bash
# テストページを開く
open conversion-test.html
```

### 2. Chrome DevToolsでの確認
1. F12キーでDevToolsを開く
2. Consoleタブを選択
3. ボタンクリック時に以下のログが表示されることを確認:
   ```
   GA4 Event tracked: {event_name} {parameters}
   ```

### 3. GA4リアルタイムレポート
1. GA4管理画面→「レポート」→「リアルタイム」
2. イベント数が増加することを確認
3. イベント名をクリックして詳細パラメータを確認

## デバッグモード
テスト環境では以下の設定でデバッグモードを有効化:
```javascript
gtag('config', 'G-ZEV77K26TD', {
    'debug_mode': true
});
```

## トラブルシューティング

### イベントが送信されない場合
1. GTAGが正しく読み込まれているか確認
2. ブラウザの広告ブロッカーを無効化
3. Consoleエラーを確認

### Google Adsでコンバージョンが表示されない場合
1. GA4でコンバージョンとしてマークされているか確認
2. Google AdsとGA4のリンクを確認
3. コンバージョンのインポートから24時間待つ

## 実装ファイル
- `/script.js`: メインのトラッキング実装
- `/index.html`: GA4タグの設置
- `/conversion-test.html`: テスト用ページ

## 今後の改善案
1. スクロール深度のトラッキング追加
2. フォーム離脱率の測定
3. A/Bテスト用のイベントパラメータ追加
4. エンゲージメント時間の測定