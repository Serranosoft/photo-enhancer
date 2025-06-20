import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { DAILY_CREDITS } from './credits';

const db = SQLite.openDatabaseSync("photo-enhancer");
export async function initDb() {
    await db.execAsync('PRAGMA foreign_keys = ON');

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY NOT NULL, old_image TEXT, new_image TEXT, filename TEXT, date TEXT);
        CREATE TABLE IF NOT EXISTS credits (credits INTEGER);
    `);

    // Si no hay registros en credits, se establece 15 como valor inicial.
    await db.runAsync(`INSERT INTO credits (credits) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM credits)`, DAILY_CREDITS);

}

export async function getAllRecords() {
    const allRows = await db.getAllAsync('SELECT * FROM records');
    return allRows;
}

export async function insertRecord(old_image, new_image, filename, date) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO records (id, old_image, new_image, filename, date) VALUES (?, ?, ?, ?, ?)", id, old_image, new_image, filename, date);
    return id;
}

export async function deleteRecordFromId(id) {
    db.runAsync("DELETE FROM records WHERE id = ?", id);
}

export async function getRecordFromId(id) {
    const x = await db.getFirstAsync('SELECT * FROM records WHERE id = ?', id);
    return x;
}




// CREDITS
export async function getCredits() {
    const x = await db.getAllAsync("SELECT * FROM credits");
    return x[0].credits;
}
export async function updateCredits(credits) {
    db.runAsync("UPDATE credits SET credits = ?", credits);
}