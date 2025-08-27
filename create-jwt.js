// Импортируем библиотеку
const jwt = require('jsonwebtoken');

// ========== НАСТРОЙКИ ГЕНЕРАЦИИ JWT ==========

// 1. Ваш секретный ключ для подписи токена
// ВАЖНО: В продакшене используйте длинный случайный ключ и храните его в переменных окружения!
const secret = 'your-256-bit-secret';

// 2. Настройте полезную нагрузку (payload) - основные данные токена
const payload = {
  LastName: "Иванов",
  MiddleName: "Иванович",
  email: "test@domain.ru",
  guid: "0192b9c6-3d08-44f8-9c8b-a1ea3a16d1ff",
  scope: "openid profile email",
  FirstName: "Александр",
  family_name: "Иванов",
  jti: "W5ITWMw6g9EpXc_U78IJV0_v0Dt4itLJKhkj67lRdW9hMmNlNDdjMS00ODMxLTRuOTctYTVmYy03MWY3ZjU1N2ZmMzQ",
  client_id: "rancher-test.mos-tech.moscow",
  exp: 1710160959,
  kfp_ksid: "bc212ded-b599-472b-b6fb-94da6ad6cad5_0",
  middle_name: "Александрович",
  trusted: false,
  iat: 1710157352,
  sub: "535d51d5-7ec8-42dc-a449-25c9066f725e",
  aud: [
    "rancher-test.org"
  ],
  kfp_lvl: "gray",
  crid: "tt5Uht5N6Cn6Vmro5u5LaQ",
  iss: "https://login-tech.ru",
  name: "Евгений",
  email_verified: true,
  kfp_rl: "[]",
  amr: [
    "password"
  ]
};

// 3. Настройте заголовок (header) токена
const header = {
  alg: 'HS256',    // Алгоритм подписи (HMAC SHA256)
  typ: 'JWT'       // Тип токена
};

// 4. Дополнительные опции для генерации
const options = {
  header: header,
  // algorithm: 'HS256',    // Можно указать алгоритм здесь вместо header
  // audience: 'моё-приложение',    // Для кого предназначен токен
  // issuer: 'мой-сервер',   // Кто выдал токен
  // jwtid: 'уникальный-id',    // Уникальный ID токена
};

// ========== ГЕНЕРАЦИЯ ТОКЕНА ==========

console.log('🔧 Генерация JWT токена...\n');

try {
  // Создаем новый JWT токен
  const token = jwt.sign(payload, secret, options);
  
  console.log('✅ Токен успешно создан!\n');
  console.log('📋 Исходные данные:');
  console.log('Полезная нагрузка:', JSON.stringify(payload, null, 2));
  console.log('Заголовок:', JSON.stringify(header, null, 2));
  console.log('Секретный ключ:', secret);
  
  console.log('\n🎯 Результат:');
  console.log('JWT Токен:');
  console.log(token);
  
  // Проверяем созданный токен
  console.log('\n🔍 Проверка токена:');
  const decoded = jwt.verify(token, secret);
  console.log('Декодированные данные:', JSON.stringify(decoded, null, 2));
  
  // Показываем части токена
  console.log('\n📝 Структура токена:');
  const parts = token.split('.');
  console.log('Заголовок (Header):', Buffer.from(parts[0], 'base64').toString());
  console.log('Полезная нагрузка (Payload):', Buffer.from(parts[1], 'base64').toString());
  console.log('Подпись (Signature):', parts[2]);
  
} catch (error) {
  console.error('❌ Ошибка при создании токена:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('💡 Инструкции по использованию:');
console.log('1. Измените полезную нагрузку выше, добавив свои данные');
console.log('2. Установите свой секретный ключ в переменную secret');
console.log('3. При необходимости настройте время истечения (exp)');
console.log('4. Запустите: node create-jwt.js');
console.log('='.repeat(60));