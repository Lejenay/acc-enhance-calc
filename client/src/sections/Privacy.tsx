
function Privacy() {
  return (
    <section className="w-[800px]">
      <div className="flex flex-col m-10">
        <p className="text-lg font-Kiaro text-slate-700">プライバシーポリシー</p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">Privacy Policy</p>
      </div>

      <div className="bg-slate-50 shadow-md rounded-lg px-10 py-8 relative font-Noto mx-10">
        <div className="font-bold text-lg font-Kiaro">
          <p>情報の収集とクッキー</p>
        </div>
        <div className="mt-4 leading-7 text-slate-800 text-md">
          <p>本サイトは一切の個人情報を収集しません。</p>
          <p>また本サイトは次の2種類のCookieを使用します。</p>
          <br />

          <p>◆セッションCookie: セッション中にユーザーを追跡する一時的な Cookieです。ブラウザを閉じると削除されます。</p>
          <p>◆永続的 Cookie: サイトがお客様とお客様の設定を記憶し、セッション終了後もお客様のデバイスに残るのに役立ちます。</p>
          <br />
          <p>本サイトが使用するさまざまな Cookie は次のとおりです。</p>
          <br />
          <p>◇絶対に必要なCookie: これらは、当のサイトが正しく機能し、安全な領域にアクセスできるようにするために非常に重要です。</p>
          <p>◇パフォーマンスCookieと分析: ユーザーが当サイトをどのように操作するかに関する匿名の集約情報を収集し、パフォーマンスの向上に役立てます。</p>
          <br />

          <p>Cookie を無効にするには、ブラウザの設定を調整するか、同意マネージャーを使用します。 Cookie を無効にすると、当社サイトの一部の使用に影響が出る可能性があります。</p>
          <p>ブラウザ設定の調整の詳細については、次のサイトを参照してください。www.allaboutcookies.org</p>
        </div>
      </div>
    </section>
  )
}

export default Privacy