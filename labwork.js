// 1. Напишіть функцію invokeAfterDelay, яка повертає проміс, який викликає задану функцію із
// заданою затримкою. Продемонструйте її роботу, повертаючи проміс, що містить
// випадкове число від 0 до 10. Отриманий результат виведіть в консолі.

function invokeAfterDelay(delay, func) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = func();
      resolve(result);
    }, delay);
  });
}

invokeAfterDelay(1000, () => {
  return Math.floor(Math.random() * 11);
})
  .then((result) => {
    console.log(`Random number: ${result}`);
  })
  .catch((error) => {
    console.error(error);
  });


// 2. Створивши на базі попередньої функції функцію produceRandomAfterDelay. Викличте
// функцію produceRandomAfterDelay двічі і надрукуйте суму, після того як будуть отримані
// обидва результати.

function produceRandomAfterDelay(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 11);
      resolve(randomNum);
    }, delay);
  });
}

Promise.all([produceRandomAfterDelay(2000), produceRandomAfterDelay(3000)])
  .then((results) => {
    const sum = results.reduce((acc, curr) => acc + curr);
    console.log(sum);
  })
  .catch((error) => {
    console.log(error);
  });


// 3. Напишіть функцію sleep, яка повертає проміс, який можна викликати так:
// await sleep(1000)

 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

await sleep(1000);


// 4. Напишіть функцію getUser яка приймає id та повертає проміс який виконується через 1
// секунду з обєктом користувача з полями імя, вік, місто, id. Підготуйте 4 обєкти користувача
// з id від 0 до 3 які повертатимуться функцією відповідно до id. Якщо незнайомий id
// отриманий – проміс має бути відхилений з помилкою ‘User not found’.

function getUser(id) {
  const users = [
    { id: 0, name: 'John', age: 25, city: 'New York' },
    { id: 1, name: 'Jane', age: 30, city: 'London' },
    { id: 2, name: 'Bob', age: 20, city: 'Paris' },
    { id: 3, name: 'Alice', age: 35, city: 'Berlin' },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

const user0 = { id: 0, name: 'John', age: 25, city: 'New York' };
const user1 = { id: 1, name: 'Jane', age: 30, city: 'London' };
const user2 = { id: 2, name: 'Bob', age: 20, city: 'Paris' };
const user3 = { id: 3, name: 'Alice', age: 35, city: 'Berlin' };

getUser(2)
  .then((user) => console.log(user))
  .catch((error) => console.error(error)); // { id: 2, name: 'Bob', age: 20, city: 'Paris' }

getUser(4)
  .then((user) => console.log(user))
  .catch((error) => console.error(error)); // Error: User not found


// 5. Напишіть функцію loadUsers яка приймає масив ідентифікаторів та повертає масив обєктів
// користувача використовуючи попередню функцію. Обробіть ситуацію коли один з промісів
// був відхилений.

function loadUsers(ids) {
  const promises = ids.map(id => getUser(id).catch(() => Promise.reject(`User ${id} not found`)));
  return Promise.all(promises);
}

loadUsers([0, 1, 2, 3])
  .then(users => console.log(users))
  .catch(error => console.log(error));


// 6. Напишіть функцію logCall яка приймає функцію коллбек – викликає її через одну секунду та
// пише в консоль поточний час. Зробіть щоб дана функція повертала проміс. Зробіть 4
// послідовних виклики даної функції використовуючи ланцюжок промісів.

function logCall(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentTime = new Date().toLocaleTimeString();
      console.log(`Calling function at ${currentTime}`);
      callback();
      resolve();
    }, 1000);
  });
}

logCall(() => console.log("Function 1"))
  .then(() => logCall(() => console.log("Function 2")))
  .then(() => logCall(() => console.log("Function 3")))
  .then(() => logCall(() => console.log("Function 4")));


// 7. Напишіть функцію яка showUsers яка симулює завантаження користувачів використовуючи
// loadUsers. Перед викликом loadUsers дана функція має вивести в консоль ‘loading’ при при
// успішному чи неуспішному завершенні виведе ‘loading finished’. Використайте синтаксис
// async/await при виконанні даного завдання.

async function showUsers(ids) {
  console.log('loading');
  try {
    const users = await loadUsers(ids);
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('loading finished');
  }
}
