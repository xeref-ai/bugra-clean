import { useState, useRef, useCallback } from 'react';

/**
 * A hook for handling audio recording and local audio files.
 */
export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  /**
   * Starts recording audio from the user's microphone.
   */
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Error starting recording:', error);
      // Handle permission denied error
    }
  }, []);

  /**
   * Stops the current audio recording.
   */
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all tracks on the stream to release the microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [isRecording]);

  /**
   * Pauses the current audio recording.
   */
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, [isRecording, isPaused]);

  /**
   * Resumes a paused audio recording.
   */
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, [isRecording, isPaused]);

  /**
   * Handles the file change event from a file input element,
   * and sets the audio blob to the selected file.
   * @param event The file change event.
   */
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (file.type.startsWith('audio/')) {
            setAudioBlob(file);
        } else {
            // Handle non-audio file selection
            console.error("Selected file is not an audio file.");
            // You might want to show an error to the user here.
        }
    }
  }, []);

  /**
   * Converts a Blob to a Data URI.
   * @param blob The blob to convert.
   * @returns A promise that resolves with the data URI.
   */
  const getAudioDataUri = useCallback(async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }, []);

  return {
    isRecording,
    isPaused,
    audioBlob,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    handleFileChange,
    getAudioDataUri,
  };
};
