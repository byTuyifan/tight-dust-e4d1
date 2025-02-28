interface VisitorRecord {
  ip: string;
  user_agent: string;
  visit_date: string;
  visit_count: number;
}

export function renderAdmin(visitors: VisitorRecord[]) {
  const visitorRows = visitors.map(visitor => `
    <tr>
      <td>${visitor.visit_date}</td>
      <td>${visitor.ip}</td>
      <td>${visitor.user_agent}</td>
      <td>${visitor.visit_count}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>访问统计</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <h1>访问统计</h1>
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>IP</th>
              <th>设备信息</th>
              <th>访问次数</th>
            </tr>
          </thead>
          <tbody>
            ${visitorRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
} 