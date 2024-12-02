import sqlite3, { Database } from "sqlite3";
import { v4 as uuidv4 } from "uuid";
import { Match } from "../models/match";
class MatchService {
  private db: Database | null = null;
  constructor() {
    this.initializeDatabase();
  }
  private async initializeDatabase() {
    this.db = new Database("matches.db");
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        homeTeam TEXT NOT NULL,
        awayTeam TEXT NOT NULL,
        "group" TEXT NOT NULL,
        startTime INTEGER NOT NULL,
        endTime INTEGER NOT NULL,
        marketAddress TEXT NOT NULL,
        resolved BOOLEAN NOT NULL DEFAULT 0,
        outcome INTEGER
      )
    `);
  }
  async createMatch(
    homeTeam: string,
    awayTeam: string,
    startTime: Date,
    endTime: Date,
    group: string,
    marketAddress: string,
  ): Promise<Match> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    const match: Match = {
      id: uuidv4(),
      homeTeam,
      awayTeam,
      startTime,
      endTime,
      group,
      marketAddress,
      resolved: false,
    };
    try {
      await this.db!.run(
        `INSERT INTO matches 
        (id, homeTeam, awayTeam, startTime, endTime, "group", marketAddress, resolved) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          match.id,
          match.homeTeam,
          match.awayTeam,
          match.startTime.getTime(),
          match.endTime.getTime(),
          match.group,
          match.marketAddress,
          0,
        ],
      );
    } catch (error) {
      console.error("Failed to create match:", error);
      throw error;
    }
    return match;
  }
  async getMatches(): Promise<Match[]> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    return new Promise((resolve, reject) => {
      this.db!.all("SELECT * FROM matches", (err, rows: any) => {
        if (err) reject(err);
        resolve(
          rows.map((row: any) => ({
            ...row,
            startTime: new Date(row.startTime),
            endTime: new Date(row.endTime),
          })),
        );
      });
    });
  }
  async getMatchById(id: string): Promise<Match | undefined> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    return new Promise((resolve, reject) => {
      this.db!.get("SELECT * FROM matches WHERE id = ?", [id], (err, row: any) => {
        if (err) reject(err);
        if (row) {
          resolve({
            ...row,
            startTime: new Date(row.startTime),
            endTime: new Date(row.endTime),
          });
        } else {
          resolve(undefined);
        }
      });
    });
  }
  async getMatchesByGroup(group: string): Promise<Match[]> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    return new Promise((resolve, reject) => {
      this.db!.all('SELECT * FROM matches WHERE "group" = ?', [group], (err, rows: any) => {
        if (err) reject(err);
        resolve(
          rows.map((row: any) => ({
            ...row,
            startTime: new Date(row.startTime),
            endTime: new Date(row.endTime),
          })),
        );
      });
    });
  }
  async resolveMatch(id: string, outcome: number): Promise<Match | undefined> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    await this.db!.run(`UPDATE matches SET resolved = 1, outcome = ? WHERE id = ?`, [outcome, id]);
    return this.getMatchById(id);
  }
  async getUnresolvedMatches(): Promise<Match[]> {
    if (!this.db) {
      await this.initializeDatabase();
    }
    return new Promise((resolve, reject) => {
      this.db!.all("SELECT * FROM matches WHERE resolved = 0 AND endTime <= ?", [Date.now()], (err, rows: any) => {
        if (err) reject(err);
        resolve(
          rows.map((row: any) => ({
            ...row,
            startTime: new Date(row.startTime),
            endTime: new Date(row.endTime),
          })),
        );
      });
    });
  }
}
export default new MatchService();
