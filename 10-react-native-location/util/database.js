import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const db = await SQLite.openDatabaseAsync("places.db");
// console.log("000000000000", db);

// init() : 초기 기본 db
// export async function init() {
//   // 데이터베이스 객체를 Promise에서 얻어옴
//   // database = await databasePromise;
//   const promise = new Promise((resolve, reject) => {
//     // .transaction() : db에 대한 쿼리 실행
//     database.transaction((tx) => {
//       // 'places'라는 테이블이 없을 때 새로 생성
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY NOT NULL,
//             title TEXT NOT NULL,
//             imageUri TEXT NOT NULL,
//             address TEXT NOT NULL,
//             lat REAL NOT NULL,
//             lng REAL NOT NULL
//             )`,
//         [],
//         () => {
//           resolve();
//         },
//         (_, error) => {
//           reject(error);
//         },
//       );
//     });
//   });

//   return promise;
// }

// 데이터베이스 열기
// let database;
// async function openDatabase() {
//   if (!database) {
//     database = await SQLite.openDatabaseAsync("places.db");
//   }
//   return database;
// }

// ✅ DB 초기화 (CREATE TABLE)
export async function init() {
  // const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

// export function insertPlace(place) {
//   const promise = new Promise((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
//         [
//           place.title,
//           place.imageUri,
//           place.address,
//           place.location.lat,
//           place.location.lng,
//         ],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, error) => {
//           reject(error);
//         },
//       );
//     });
//   });

//   return promise;
// }

// ✅ 장소 추가 (INSERT)
export async function insertPlace(place) {
  // const db = await openDatabase();
  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    place.title,
    place.imageUri,
    place.address,
    place.location.lat,
    place.location.lng,
  );
  console.log("********", result);
  return result.lastInsertRowId; // 삽입된 행의 ID 반환
}

// ✅ 모든 장소 조회 (SELECT ALL)
export async function fetchPlaces() {
  // const db = await openDatabase();
  const rows = await db.getAllAsync(`SELECT * FROM places`);
  return rows.map(
    (dp) =>
      new Place(
        dp.title,
        dp.imageUri,
        {
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
        },
        dp.id,
      ),
  );
}

// ✅ 특정 장소 조회 (SELECT ONE)
export async function fetchPlaceDetails(id) {
  // const db = await openDatabase();
  const dbPlace = await db.getFirstAsync(
    `SELECT * FROM places WHERE id = ?`,
    id,
  );
  console.log("db", db);
  console.log("dbPlace", dbPlace);
  if (!dbPlace) return null;

  return new Place(
    dbPlace.title,
    dbPlace.imageUri,
    { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
    dbPlace.id,
  );
}
