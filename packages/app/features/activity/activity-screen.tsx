import React, { useEffect, useState } from 'react';
import { useRouter } from 'solito/router'
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { createParam } from 'solito';
import { SafeAreaView, ScrollView } from 'moti';
import { NavigationScreen } from '../components/NavigationBar/NavigationBar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StylessButton } from 'app/components/StylessButton/StylessButton';
import Input from 'app/components/Input/input';
import { DisplayItem } from 'app/testingInput/index';
import COLORS from '../../design/const';
import AudioRecorder from '../audioRecorder/AudioRecorder';
import { A, H1 } from 'app/design/typography';
import { ExclamationCircle, XMark } from '@nandorojo/heroicons/24/outline';

// State Management
import {useDispatch} from 'react-redux';
import { addPhysicalActivity } from '../../../store/physicalActivitySlice';
import RecordingAnimation from './RecordingAnimation';

interface Transcript {
  calories?: number;
  pointA?: string;
  pointB?: string;
  mood?: string[];
  drankWater?: boolean;
  // Add other properties related to the transcript if needed
  // For example: pointA: string, pointB: string, drankWater: boolean, etc.
}

const { useParam } = createParam<{ id: string }>();
const GOOGLE_API_KEY = process.env.GOOGLE_API;

export function ActivityScreen(onFocus = () => {}, ...props) {

  // Routing
  const { push, replace, back, parseNextPath } = useRouter()
  
  // State Management
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [exampleOne, setExampleOne] = useState(false);
  const [id] = useParam('id');
  const [currentStep, setCurrentStep] = useState(1); // Start with the first step

  const [pointAFlag, setPointAFlag] = useState(false);
  const [pointBFlag, setPointBFlag] = useState(false);
  const [calories, setCalories] = useState<Number | null>(null);
  const [pointA, setPointA] = useState<String | null>(null);
  const [pointB, setPointB] = useState<String | null>(null);
  const [mood, setMood] = useState<String[] | null>(null);
  const [drankWater, setDrankwater] = useState<boolean | null>(null);

  // Audio Recording Transcript
  const [transcript, setTranscript] = useState(null);
  const [transcriptObject, setTranscriptObject] = useState<Transcript | null>(null);

  // Mood
  const [moodInput, setMoodInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Checkbox
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setDrankwater(!drankWater);
  };

  const handleRemoveMoodItem = (itemMood) => {
    if(mood){
      let NewCollection = mood.filter(item => item !== itemMood);
      setMood(NewCollection);
    }
  }
  const handleInputChange = (text) => {
    setMoodInput(text);
  }

  const onPressHandleInsertingMood = (currentMood) => {
    if(mood){
      let newObject = [...mood, currentMood];
      setMood(newObject);
    }else{
      setMood([currentMood]);
    }

    setMoodInput('');
  }

  const onHandleSubmitForm = (items) => {
    console.log(items);
    dispatch(addPhysicalActivity(items))
    push('/');
  }

  useEffect(() => {
    if(transcriptObject){
      console.log("Activity-screen:", transcriptObject);
      console.log("Activity-screen:", transcriptObject.calories);
    }

    if (transcriptObject && transcriptObject.calories) {
      setCalories(transcriptObject.calories);
    }

    if (transcriptObject && transcriptObject.pointA) {
      setPointA(transcriptObject.pointA);
    }

    if (transcriptObject && transcriptObject.pointB) {
      setPointB(transcriptObject.pointB);
    }

    if (transcriptObject && transcriptObject.mood) {
      setMood(transcriptObject.mood);
    }

    if (transcriptObject && transcriptObject.drankWater) {
      setDrankwater(transcriptObject.drankWater);
    }

    // await console.log("PointA: ", transcriptObject.pointA);
    // await console.log("PointB: ", transcriptObject.pointB);
    // await console.log("mood: ", transcriptObject.drankWater);

  },[transcriptObject]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);

    console.log("transcriptObject:", transcriptObject);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const data = [
    // {
    //   placeholder: 'Enter calories burned',
    //   iconName: 'icon',
    //   label: 'Calories Burned',
    // },
    // {
    //   placeholder: 'Did you drink water?',
    //   iconName: 'icon',
    //   label: 'Drank water',
    // },
    // {
    //   placeholder: 'How are you feeling?',
    //   iconName: 'icon',
    //   label: 'Mood',
    // },
  ];

  const renderItem = ({ item }) => (
    <Input
      value='d'
      placeholder={item.placeholder}
      iconName={item.iconName}
      label={item.label}
      error={undefined}
      password={undefined}
    />
  );

  return (
    // <View style={{ backgroundColor: 'white', height: '100%' }}>
    //   <View className="flex w-full">
    //     <NavigationScreen />
    //   </View>
        
    //   <View style={{backgroundColor: 'red', height: '100%'}}>
    //     <View style={{flex: 1, backgroundColor: 'blue'}}>
    //       <Text>1</Text>
    //     </View>
    //     <View style={{flex: 1, backgroundColor: 'pink'}}>
    //       <Text>2</Text>
    //     </View>
    //     <View style={{backgroundColor: 'yellow', height: 150}}>
    //       <Text>Options</Text>
    //     </View>
    //     <View style={{backgroundColor: 'red', height: 200}}>
    //       <View style={{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'pink', padding: 12, gap: 2, height: 100}}>
    //         <View style={{flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center'}}>
    //           <Text>Options 1</Text>
    //         </View>
    //         <View style={{flex: 1, backgroundColor: 'yellow',justifyContent: 'center', alignItems: 'center'}}>
    //           <Text>Options 1</Text>
    //         </View>
    //         <View style={{flex: 1, backgroundColor: 'yellow',justifyContent: 'center', alignItems: 'center'}}>
    //           <Text>Options 1</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>

    // </View>
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* <View style={styles.navigation}>
        <TouchableOpacity style={styles.navigationItem}>
          <Text style={styles.navigationText}>Left</Text>
        </TouchableOpacity>
        <View style={styles.navigationMiddle}>
          <Text style={styles.navigationText}>Middle</Text>
        </View>
        <TouchableOpacity style={styles.navigationItem}>
          <Text style={styles.navigationText}>Right</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.middle}>
        <View style={{flex: 1, backgroundColor: 'white', padding: 40}}>
          <View style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <Text style={{color: COLORS.grey, fontSize: 18, fontWeight: 800}}>Read the following script out loud,</Text>
            <Text style={{color: COLORS.grey, fontSize: 17, fontWeight: 600}}>replacing the key points with your own personal experience:</Text>
          </View>

          <View style={{ flex: 1}}>
              <A className='text-xl mb-1 mt-12'>Script</A>
              <Text className='w-auto text-base text-left'>
                Today, I went for a walk from <Text style={{ fontWeight: 'bold' }}>[Point  A]</Text> to <Text style={{ fontWeight: 'bold' }}>[Point  B]</Text>.
                I burned <Text style={{ fontWeight: 'bold' }}>[Number of Calories]</Text> Calories and <Text style={{ fontWeight: 'bold' }}>[drank water]</Text>. Overall, I feel <Text style={{ fontWeight: 'bold' }}>[How you feel]</Text>.
              </Text>
            </View>
          </View>
        <View style={{flex: 1, backgroundColor: 'white', padding: 40}}>
          <View className='mt-8 mb-8'>
              <A className='text-xl mb-1'>Your Audio</A>
              <Text className='w-auto text-base text-left'>
                Today, I went for a walk from <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Gellert Park</Text> to <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>AMC Movie Theather</Text>.
                I burned <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>350 calories</Text> and <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>drank water</Text>. Overall, I feel <Text style={{ fontWeight: 'bold',  textDecorationLine: 'underline' }}>happy and relax</Text>.
              </Text>
            </View>
        </View>
        <View style={{height: 100, backgroundColor: 'white'}}>
          <RecordingAnimation />
          {/* <Text style={styles.middleText}>Audio Visualizer</Text> */}
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Option 3</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
  },
  navigationItem: {},
  navigationMiddle: {},
  navigationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  middle: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  middleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: '#f0f0f0',
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActivityScreen;
