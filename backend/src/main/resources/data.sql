-- 카테고리 추가
INSERT INTO categories (name) VALUES ('Headphones');

-- 소니 헤드폰 상품 추가
INSERT INTO products (name, description, price, image_url, stock, category_id) VALUES
('Sony WH-1000XM5', '노이즈 캔슬링 무선 헤드폰, 30시간 배터리, LDAC 지원', 399000, 'https://example.com/sony-wh1000xm5.jpg', 50, 1),
('Sony WH-1000XM4', '프리미엄 노이즈 캔슬링 무선 헤드폰, 30시간 배터리', 349000, 'https://example.com/sony-wh1000xm4.jpg', 30, 1),
('Sony WF-1000XM5', '완전 무선 노이즈 캔슬링 이어버드, 8시간 배터리', 299000, 'https://example.com/sony-wf1000xm5.jpg', 100, 1),
('Sony WF-1000XM4', '완전 무선 노이즈 캔슬링 이어버드, 8시간 배터리', 249000, 'https://example.com/sony-wf1000xm4.jpg', 80, 1);

-- 보스 헤드폰 상품 추가
INSERT INTO products (name, description, price, image_url, stock, category_id) VALUES
('Bose QuietComfort 45', '프리미엄 노이즈 캔슬링 헤드폰, 24시간 배터리', 379000, 'https://example.com/bose-qc45.jpg', 40, 1),
('Bose QuietComfort Earbuds II', '완전 무선 노이즈 캔슬링 이어버드, 6시간 배터리', 329000, 'https://example.com/bose-qc-earbuds2.jpg', 60, 1),
('Bose 700', '프리미엄 노이즈 캔슬링 헤드폰, 20시간 배터리', 359000, 'https://example.com/bose-700.jpg', 25, 1),
('Bose Sport Earbuds', '운동용 완전 무선 이어버드, 5시간 배터리', 199000, 'https://example.com/bose-sport.jpg', 70, 1); 