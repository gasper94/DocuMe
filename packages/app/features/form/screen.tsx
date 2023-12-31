import React, { useEffect, useState } from 'react'
import { useRouter } from 'solito/router'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
} from 'react-native'
import { createParam } from 'solito'
import { SafeAreaView, ScrollView } from 'moti'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { StylessButton } from 'app/components/StylessButton/StylessButton'
import Input from 'app/components/Input/input'
import { DisplayItem } from 'app/testingInput/index'
import COLORS from '../../design/const'
import AudioRecorder from '../audioRecorder/AudioRecorder'
import { A, H1 } from 'app/design/typography'
import {
  ExclamationCircle,
  XMark,
  ArrowLeft,
} from '@nandorojo/heroicons/24/outline'

// State Management
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPhysicalActivity,
  addProcessingActivity,
} from '../../store/physicalActivitySlice'

interface Transcript {
  calories?: number
  pointA?: string
  pointB?: string
  mood?: string[]
  drankWater?: boolean
  // Add other properties related to the transcript if needed
  // For example: pointA: string, pointB: string, drankWater: boolean, etc.
}

const { useParam } = createParam<{ id: string }>()
const GOOGLE_API_KEY = process.env.GOOGLE_API

export function ActivityFormScreen(onFocus = () => {}, ...props) {
  // Routing
  const { push, replace, back, parseNextPath } = useRouter()

  // State Management
  const processingActivity = useSelector(
    (state: RootState) => state.activities.processingActivity
  )
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [exampleOne, setExampleOne] = useState(false)
  const [id] = useParam('id')
  const [currentStep, setCurrentStep] = useState(1) // Start with the first step

  const [pointAFlag, setPointAFlag] = useState(false)
  const [pointBFlag, setPointBFlag] = useState(false)
  const [calories, setCalories] = useState<Number | null>(
    processingActivity.burnedCalories ? processingActivity.burnedCalories : null
  )
  const [pointA, setPointA] = useState<String | null>(
    processingActivity.pointA ? processingActivity.pointA : ''
  )
  const [pointB, setPointB] = useState<String | null>(
    processingActivity.pointB ? processingActivity.pointB : ''
  )
  const [mood, setMood] = useState<String[] | null>(
    processingActivity.mood ? processingActivity.mood : null
  )
  const [drankWater, setDrankwater] = useState<boolean | null>(
    processingActivity.drankWater
  )

  // useEffect(() => {
  //   console.log("processing:", processingActivity.pointA);
  //     if (processingActivity.pointA) {
  //         setPointA(processingActivity.pointA);
  //     }
  // }, [processingActivity.pointA]);

  // Audio Recording Transcript
  const [transcript, setTranscript] = useState(null)
  const [transcriptObject, setTranscriptObject] = useState<Transcript | null>(
    null
  )

  // Mood
  const [moodInput, setMoodInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  // Checkbox
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = () => {
    setDrankwater(!drankWater)
  }

  const handleRemoveMoodItem = (itemMood) => {
    if (mood) {
      let NewCollection = mood.filter((item) => item !== itemMood)
      setMood(NewCollection)
    }
  }
  const handleInputChange = (text) => {
    setMoodInput(text)
  }

  const onPressHandleInsertingMood = (currentMood) => {
    if (mood) {
      let newObject = [...mood, currentMood]
      setMood(newObject)
    } else {
      setMood([currentMood])
    }

    setMoodInput('')
  }

  const onHandleSubmitForm = (items) => {
    console.log(items)
    dispatch(addPhysicalActivity(items))
    dispatch(
      addProcessingActivity({
        pointA: '',
        pointB: '',
        burnedCalories: 0,
        drankWater: false,
        mood: [],
      })
    )
    push('/')
  }

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)

    console.log('transcriptObject:', transcriptObject)
  }

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

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
  ]

  const renderItem = ({ item }) => (
    <Input
      value="d"
      placeholder={item.placeholder}
      iconName={item.iconName}
      label={item.label}
      error={undefined}
      password={undefined}
    />
  )

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View className="flex w-full">
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navigationItem}
            onPress={() => push('/activity/xxx')}
          >
            <ArrowLeft color={'blue'} />
            {/* <Text style={styles.navigationText}>Left</Text> */}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <FlatList
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 40,
                  fontWeight: 'bold',
                }}
              >
                Register
              </Text>
              <Text
                style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}
              >
                Enter Your Details to Register
              </Text>

              <View style={{ marginTop: 20 }}>
                <DisplayItem
                  label={'Start (point A)'}
                  currentLocation={pointA}
                  setCurrentLocation={setPointA}
                />
                <DisplayItem
                  label={'Start (point B)'}
                  currentLocation={pointB}
                  setCurrentLocation={setPointB}
                />
                <Input
                  placeholder={'Enter Calories'}
                  iconName={'icon'}
                  label={'Calories burned'}
                  value={calories}
                  error={undefined}
                  password={undefined}
                />
                <Text>{`${calories}`}</Text>
                <View
                  style={{ display: 'flex', flexDirection: 'row', height: 100 }}
                >
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flex: 1,
                    }}
                  >
                    <Text style={styles.label}>Mood</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          borderColor: false
                            ? COLORS.red
                            : isFocused
                            ? COLORS.darkblue
                            : COLORS.light,
                        },
                      ]}
                    >
                      <ExclamationCircle
                        style={{
                          fontSize: 22,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                      />
                      <TextInput
                        placeholderTextColor={false ? 'red' : COLORS.grey}
                        style={{
                          height: '100%',
                          color: COLORS.darkblue,
                          flex: 1,
                        }}
                        autoCorrect={false}
                        placeholder={'Enter your Mood'}
                        onChangeText={handleInputChange}
                        value={moodInput}
                        onFocus={() => {
                          setIsFocused(true)
                        }}
                        onBlur={() => {
                          setIsFocused(false)
                        }}
                        {...props}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '25%',
                      paddingTop: 19,
                    }}
                  >
                    {/* <Button title='Hello there!' /> */}
                    <TouchableOpacity
                      style={styles.buttonx}
                      onPress={() => onPressHandleInsertingMood(moodInput)}
                    >
                      <Text style={styles.buttonText}>add</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text>Mood:</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {mood ? (
                    mood.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'blue',
                          borderRadius: 4,
                        }}
                        onPress={() => handleRemoveMoodItem(item)}
                      >
                        <Text style={{ padding: 8, color: 'white' }}>
                          {item}
                        </Text>
                        <XMark color="white" />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ color: COLORS.grey, paddingTop: 10 }}>
                      Empty
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    color: COLORS.grey,
                    marginTop: 24,
                    marginBottom: 12,
                    fontSize: 16,
                  }}
                >
                  Did you drink water?
                </Text>
                <TouchableOpacity
                  style={styles.container}
                  onPress={handleCheckboxChange}
                >
                  <View style={[styles.checkbox, drankWater && styles.checked]}>
                    {drankWater && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.label}>I drank some!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.container}
                  onPress={handleCheckboxChange}
                >
                  <View
                    style={[
                      styles.checkbox,
                      !drankWater ? styles.checked : null,
                    ]}
                  >
                    {!drankWater ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : null}
                  </View>
                  <Text style={styles.label}>I didn't drink</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          ListFooterComponent={
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePreviousStep}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttony}
                onPress={() =>
                  onHandleSubmitForm({
                    pointA,
                    pointB,
                    burnedCalories: calories,
                    mood,
                    drankWater,
                  })
                }
              >
                <Text style={styles.buttonText}>Submit Activity</Text>
              </TouchableOpacity>
            </>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    // backgroundColor: '#007bff',
  },
  navigationItem: {},
  navigationMiddle: {},
  navigationText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
  },
  label: {
    fontSize: 18,
  },
  button: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttony: {
    backgroundColor: COLORS.blue,
    padding: 10,
    marginBottom: 250,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonx: {
    backgroundColor: COLORS.blue,
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    height: '65%',
    width: 80,
  },
})

export default ActivityFormScreen
