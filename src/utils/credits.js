import { getCredits, updateCredits } from "./sqlite";

export const DAILY_CREDITS = 5;

export async function subtractCredit() {
    const credits = await getCredits();

    updateCredits(credits - 1);
}

export async function canAnalyze() {
    const credits = await getCredits();
    if (parseInt(credits) > 0) {
        return true;
    } else {
        return false;
    }
}