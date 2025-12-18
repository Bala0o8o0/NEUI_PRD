
export interface PRDSection {
  title: string;
  content: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  TRANSCRIBING = 'TRANSCRIBING',
  GENERATING = 'GENERATING',
  VERIFYING = 'VERIFYING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export enum WorkflowStep {
  INPUT = 'INPUT',
  OUTLINE = 'OUTLINE',
  RESULT = 'RESULT',
  VERIFY_INPUT = 'VERIFY_INPUT',
  ABOUT = 'ABOUT'
}

export type DocType = 'PRD' | 'CLI' | 'PROMPT' | 'ALL';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
