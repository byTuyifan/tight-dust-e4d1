import { renderHtml } from "./renderHtml";
import { renderAdmin } from "./renderAdmin";

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (url.pathname === '/dashboard-123') {
      const params = new URLSearchParams(url.search);
      if (params.get('token') !== 'tuyifan999') {
        return new Response('Not Found', { status: 404 });
      }
      
      // 获取访问记录
      const stmt = env.DB.prepare(`
        SELECT ip, user_agent, visit_date, COUNT(*) as visit_count 
        FROM visitors 
        GROUP BY ip, user_agent, visit_date 
        ORDER BY visit_date DESC, visit_time DESC
        LIMIT 100
      `);
      const { results } = await stmt.all();
      
      return new Response(renderAdmin(results), {
        headers: { "content-type": "text/html" },
      });
    }

    // 记录访问信息
    try {
      // 首先检查今天是否已经有记录
      const checkStmt = env.DB.prepare(`
        SELECT COUNT(*) as count 
        FROM visitors 
        WHERE ip = ? 
        AND user_agent = ? 
        AND visit_date = DATE('now')
      `);
      const result = await checkStmt.bind(ip, userAgent).all();
      
      // 如果没有记录，则插入新记录
      if (result.results[0].count === 0) {
        const insertStmt = env.DB.prepare(`
          INSERT INTO visitors (ip, user_agent, visit_date, visit_time)
          VALUES (?, ?, DATE('now'), DATETIME('now'))
        `);
        await insertStmt.bind(ip, userAgent).run();
      }
    } catch (error) {
      console.error('Error recording visitor:', error);
    }

    // 显示评论页面
    const commentsStmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await commentsStmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: { "content-type": "text/html" },
    });
  },
} satisfies ExportedHandler<Env>;
