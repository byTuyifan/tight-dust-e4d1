-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL
);

-- 插入一些示例评论数据
INSERT INTO comments (author, content)
VALUES
    ('张三', '网站很棒！'),
    ('李四', '非常实用'),
    ('王五', '期待更多功能');

-- 创建访问记录表
CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    visit_date DATE NOT NULL,
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ip, user_agent, visit_date)
); 