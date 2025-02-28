-- 清空现有数据
DELETE FROM comments;
DELETE FROM visitors;

-- 重置自增ID
DELETE FROM sqlite_sequence WHERE name='visitors';

-- 插入示例评论数据
INSERT INTO comments (author, content)
VALUES
    ('张三', '网站很棒！'),
    ('李四', '非常实用'),
    ('王五', '期待更多功能');

-- 插入一些示例访问记录（可选）
INSERT INTO visitors (ip, user_agent, visit_date, visit_time)
VALUES
    ('192.168.1.1', 'Mozilla/5.0', DATE('now', '-2 days'), DATETIME('now', '-2 days')),
    ('192.168.1.2', 'Chrome/91.0', DATE('now', '-1 days'), DATETIME('now', '-1 days')),
    ('192.168.1.3', 'Safari/14.0', DATE('now'), DATETIME('now')); 