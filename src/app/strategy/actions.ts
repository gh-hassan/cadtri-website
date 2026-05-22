"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface StrategyFormData {
  path: "investment" | "project" | "";

  // Investment path
  city:             string;
  state:            string;
  lotSize:          string;
  propertyType:     string;
  alreadyPurchased: string;
  zoning:           string;
  overlays:         string[];
  investmentGoal:   string;
  investmentHorizon: string;
  totalBudget:      string;
  buildingIntent:   string;
  experienceLevel:  string;
  knownIssues:      string;
  biggestQuestion:  string;

  // Ongoing project path
  projectType:      string;
  projectLocation:  string;
  projectSqFt:      string;
  projectBudget:    string;
  currentStage:     string;
  hasDrawings:      string;
  hasArchitect:     string;
  hasContractor:    string;
  hasPermits:       string;
  mainChallenge:    string;
  targetDate:       string;
  hardDeadline:     string;
  teamComposition:  string[];
  needsMost:        string;

  // Common
  name:  string;
  email: string;
  phone: string;
  notes: string;
}

export type StrategyFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitStrategyForm(formData: FormData): Promise<StrategyFormState> {
  // Full implementation in Task 4
  void formData;
  return { status: "error", message: "Not yet implemented." };
}
