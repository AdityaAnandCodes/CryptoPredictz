import { Request, Response } from "express";
import matchService from "../services/matchService";
import aptosService from "../services/aptosService";
import { AccountAddress } from "@aptos-labs/ts-sdk";
export const createMatch = async (req: Request, res: Response) => {
  try {
    const { homeTeam, awayTeam, startTime, endTime, oddsH, oddsA, group } = req.body;
    const marketEndTime = new Date(endTime);
    // Initialize Aptos market
    const marketAddress = await aptosService.initializeMarket(
      `${homeTeam} vs ${awayTeam}`,
      marketEndTime.getTime(),
      AccountAddress.fromStrict("0xd01a636978c0a2348e857ad3b60daf85e1bb40a1900cb5ef45d4cd2a82c7ba3e"),
      Math.floor(1000000 * oddsH), // Initial Yes Price (50%)
      Math.floor(1000000 * oddsA), // Initial No Price (50%)
      1000000, // Initial Liquidity
    );
    // Create match in local service
    const match = matchService.createMatch(
      homeTeam,
      awayTeam,
      new Date(startTime),
      marketEndTime,
      group,
      marketAddress,
    );
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
};
export const getMatches = (req: Request, res: Response) => {
  const matches = matchService.getMatches();
  res.json(matches);
};
export const getMatchById = (req: Request, res: Response) => {
  const match = matchService.getMatchById(req.params.id);
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: "Match not found" });
  }
};
export const getMatchesByGroup = (req: Request, res: Response) => {
  const matches = matchService.getMatchesByGroup(req.params.group);
  if (matches) {
    res.json(matches);
  } else {
    res.status(404).json({ error: "Match not found" });
  }
};
