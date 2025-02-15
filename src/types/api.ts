export interface DetectionResponse {
  fakePercentage: number;
  isHuman: boolean;
  aiWords: number;
  textWords: number;
  sentences?: string[];
  otherFeedback?: string;
} 