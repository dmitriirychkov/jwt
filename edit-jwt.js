// Импортируем библиотеку
const jwt = require('jsonwebtoken');

// 1. Ваш исходный JWT токен, который нужно "изменить"
// Пример валидного токена (замените на ваш реальный токен)
const oldToken = 'eyJhbGciOiJIUzI1NiIsInR7cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG7gRG9lIiwiaWF1IjoxNTE2MjM8MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// 2. Ваш секретный ключ (ДОЛЖЕН БЫТЬ ИЗВЕСТЕН ТОЛЬКО СЕРВЕРУ!)
// Если токен был подписан с помощью RSA, используйте не строку, а приватный ключ.
// Пример секретного ключа (замените на ваш реальный ключ)
const secret = 'your-256-bit-secret';

// 3. Декодируем старый токен БЕЗ ПРОВЕРКИ ПОДПИСИ (verify не подойдет, т.к. мы его меняем)
// ВАЖНО: Этот метод только декодирует, но не проверяет валидность подписи.
const decodedPayload = jwt.decode(oldToken, { complete: true });

if (!decodedPayload) {
  console.error('Невалидный JWT формат.');
  process.exit(1);
}

// Извлекаем заголовок и полезную нагрузку
const { header, payload } = decodedPayload;

console.log('Старая полезная нагрузка:', payload);

// 4. ВНЕСИТЕ НУЖНЫЕ ИЗМЕНЕНИЯ В ПОЛЕЗНУЮ НАГРУЗКУ
// Например, изменим поле 'role' на 'admin' или добавим новое поле.
payload.role = 'admin';
payload.newField = 'Новое значение';
// Не забудьте про время истечения `exp`, если меняются права доступа!
// payload.exp = Math.floor(Date.now() / 1000) + (60 * 60); // Истечет через 1 час

// 5. Сохраняем старый заголовок или при необходимости меняем и его
// const newHeader = { ...header, alg: 'HS256' }; // Если нужно сменить алгоритм

// 6. Подписываем НОВЫЕ данные с тем же секретным ключом, создавая тем самым новый валидный JWT.
//    Используем старый заголовок или новый, если меняли.
const newToken = jwt.sign(payload, secret, { header: header });

// 7. Готово! Выводим новый токен.
console.log('\n--- Результат ---');
console.log('Новый JWT:', newToken);

// (Дополнительно) Проверим, что новый токен валиден
try {
  const verified = jwt.verify(newToken, secret);
  console.log('Проверка нового токена успешна:', verified);
} catch (err) {
  console.error('Новый токен не прошел проверку:', err.message);
}