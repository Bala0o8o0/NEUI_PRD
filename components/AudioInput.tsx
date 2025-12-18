
import React, { useState, useRef } from 'react';
import { MicIcon, StopIcon } from './Icons';
import { getMimeType, blobToBase64 } from '../services/audioUtils';
import { transcribeAudio } from '../services/geminiService';
import { soundManager } from '../services/soundUtils';
import { GenerationStatus } from '../types';

interface AudioInputProps {
  onTranscription: (text: string) => void;
  status: GenerationStatus;
  setStatus: (status: GenerationStatus) => void;
  disabled?: boolean;
}

/**
 * Retro Spectrum Analyzer Animation
 * Simulates voice activity with random bar heights
 */
const VoiceVisualizer = () => {
  return (
    <div className="flex items-end gap-[2px] h-4 mx-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className="w-1 bg-green-500 animate-voice-wave"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.4 + Math.random() * 0.3}s` 
          }}
        ></div>
      ))}
    </div>
  );
};

const AudioInput: React.FC<AudioInputProps> = ({ onTranscription, status, setStatus, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    soundManager.playClick();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getMimeType();
      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        await handleTranscription(audioBlob, mimeType);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus(GenerationStatus.RECORDING);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    soundManager.playClick();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (blob: Blob, mimeType: string) => {
    setStatus(GenerationStatus.TRANSCRIBING);
    try {
      const base64Audio = await blobToBase64(blob);
      const text = await transcribeAudio(base64Audio, mimeType);
      onTranscription(text);
      setStatus(GenerationStatus.IDLE);
    } catch (error) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
    }
  };

  const isBusy = status === GenerationStatus.TRANSCRIBING || status === GenerationStatus.GENERATING;

  return (
    <div className="flex items-center">
        {/* Dynamic Recording UI */}
        {isRecording ? (
            <div className="flex items-center bg-green-900/20 border border-green-500 rounded px-2 py-1 gap-2 animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.3)]">
                <span className="text-[10px] font-mono text-green-400 font-bold tracking-wider">REC</span>
                <VoiceVisualizer />
                <button
                    onClick={stopRecording}
                    className="p-1 hover:bg-green-500 hover:text-black text-red-500 transition-colors rounded-sm"
                    title="STOP_RECORDING"
                >
                    <StopIcon className="w-4 h-4" />
                </button>
            </div>
        ) : (
            <button
                onClick={startRecording}
                disabled={disabled || isBusy}
                className={`
                    p-2 transition-all duration-200 border border-transparent hover:border-green-400 hover:bg-green-900/30 rounded-sm
                    ${isBusy ? 'opacity-50 cursor-not-allowed text-gray-600' : 'text-green-400 drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,65,0.6)]'}
                `}
                title="INIT_VOICE_INPUT"
            >
                <MicIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
        )}
    </div>
  );
};

export default AudioInput;
