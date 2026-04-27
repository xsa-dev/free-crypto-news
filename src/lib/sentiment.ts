export const BULLISH_WORDS = ['surge', 'soar', 'rally', 'bullish', 'gains', 'ath', 'all-time high', 'pump', 'moon', 'breakthrough', 'adoption', 'approval', 'launch', 'partnership', 'growth', 'record', 'milestone'];

export const BEARISH_WORDS = ['crash', 'plunge', 'bearish', 'dump', 'decline', 'drop', 'low', 'sell-off', 'fear', 'hack', 'exploit', 'lawsuit', 'ban', 'delay', 'reject', 'investigation', 'fraud', 'collapse'];

export interface SentimentResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  score: number;
}

export function analyzeSentiment(text: string): SentimentResult {
  const lowerText = text.toLowerCase();
  let bullishScore = 0;
  let bearishScore = 0;
  
  for (const word of BULLISH_WORDS) {
    if (lowerText.includes(word)) bullishScore++;
  }
  for (const word of BEARISH_WORDS) {
    if (lowerText.includes(word)) bearishScore++;
  }
  
  const totalScore = bullishScore + bearishScore;
  if (totalScore === 0) {
    return { sentiment: 'neutral', score: 0 };
  }
  
  const normalizedScore = (bullishScore - bearishScore) / totalScore;
  
  if (normalizedScore > 0.3) return { sentiment: 'bullish', score: normalizedScore };
  if (normalizedScore < -0.3) return { sentiment: 'bearish', score: normalizedScore };
  return { sentiment: 'neutral', score: normalizedScore };
}
