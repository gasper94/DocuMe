import { MutableRefObject } from "react";

const startRecording = (
    event: Event, 
    mediaRecorderRef: MutableRefObject<MediaRecorder | null>, 
    setAudioBlobc, 
    startTimeRef, 
    isRecording
) => {
    console.log("about to start recording");

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        console.log("stream started", stream);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks: BlobPart[] = [];


        mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
            chunks.push(event.data as BlobPart);
            console.log(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            const duration = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
            const blob = new Blob(chunks, { type: 'audio/wav' });

            console.log("blob:", blob);
            const audioURL = URL.createObjectURL(blob);

            const newObjectBlob = {
                blob: blob, 
                audioURL: audioURL,
                duration: getDurationFormatted(duration)
            }
            setAudioBlobc(newObjectBlob);
        });

        mediaRecorder.start(1000);
        startTimeRef.current = Date.now();
        isRecording(true);
    })
    .catch(error => {
        console.error('Error accessing microphone:', error);
    });
};

const stopRecording = (audioRef, isRecording, mediaRecorderRef, audioBlob, recordings, setRecordings) => {
    console.log("Stop recording");
    audioRef.current?.pause();
    isRecording(false);
    mediaRecorderRef.current?.stop();

    console.log("recordingssssssssssssssssssssss: audioBlob", audioBlob);
    console.log("recordingssssssssssssssssssssss", recordings);
    if(audioBlob){
        setRecordings([...recordings, audioBlob]);
        console.log("recordingssssssssssssssssssssss", recordings);
    }
    // const endTime = Date.now();
    // const duration = (endTime - startTimeRef.current) / 1000; // Convert to seconds
    // setAudioDuration(duration);
    // console.log("duration: " + duration);

    // Additional cleanup steps if required
    if (mediaRecorderRef.current?.stream) {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach(track => track.stop());
    }
};

const getDurationFormatted = (timeInSeconds) => {
    const pad = (value) => (value < 10 ? `0${value}` : value);
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const getAudio =  async () => {
    alert('web')
}

export {getAudio, startRecording, stopRecording, getDurationFormatted};