'use client'
import { useRef } from 'react'
import { Platform, Animated, Easing } from 'react-native'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View, Button, ScrollView } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { SolitoImage } from 'solito/image'
import { TextInput } from 'react-native'
import Calendar from './Calendar'
import { useEffect, useReducer } from 'react'
import {
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
// import { HeroOutline, HeroSolid, HeroSolid20 } from '@nandorojo/heroicons'
import RightIcon from '../../../assets/Icons/right/Right'
import XMenu from './Xmenu'
import React, { useState } from 'react'

import { SafeAreaView } from 'moti'
// import { ScrollView } from 'react-native-gesture-handler'

import AssetExample from './Asset.jsx'

// Components
import DistanceCalculator from './DistanceCalculator'
import AudioRecorder from '../audioRecorder/AudioRecorder'
import GenerateCV from '../extractData/extractData'
import LongPressButton from './components/RecordingButton/RecordingButton'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'

// Interfaces
import { RootState } from '../../store/store'

// State Management
import { useSelector } from 'react-redux'

import { useRouter } from 'solito/router'
import { style } from '@motionone/dom'

export const Card = () => {
  return (
    <View style={stylex.cardContainer}>
      <View style={stylex.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          }}
          style={stylex.image}
        />
      </View>
      <View style={stylex.contentContainer}>
        <Text style={stylex.category}>startups</Text>
        <Text style={stylex.title}>
          Lyft launching cross-platform service this week
        </Text>
        <Text style={stylex.description}>
          Like so many organizations these days, Autodesk is a company in
          transition. It was until recently a traditional boxed software company
          selling licenses. Yet its own business model disruption is only part
          of the story.
        </Text>
        <TouchableOpacity style={stylex.button}>
          <Text style={stylex.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const stylex = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    margin: 16,
  },
  imageContainer: {
    width: '40%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  category: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4', // Pink color
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    borderRadius: 20,
    padding: 12,
  },
  buttonText: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
})

export const newCalendar = () => {
  return (
    <View>
      <Text>Hello there</Text>
    </View>
  )
}

export default newCalendar

export function HomeScreen() {
  const [mobileCalendar, setMobileCalendar] = useState(34)
  const [miniCalendar, setCalendar] = useState(false)

  let isChildScrolling = false

  const handleChildScroll = () => {
    isChildScrolling = true
  }

  const handleChildTouchStart = () => {
    isChildScrolling = false
  }

  const handleParentScroll = () => {
    if (!isChildScrolling) {
      // Parent scroll behavior
    }
  }

  const router = useRouter()

  // State Management
  const activity = useSelector((state: RootState) => state.activities.activity)
  const processingActivity = useSelector(
    (state: RootState) => state.activities.processingActivity
  )

  const [visible, toggle] = useReducer((s) => !s, true)
  const [isHovered, setIsHovered] = useState(false)

  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const buttonStyle = {
    backgroundColor: isPressed ? 'blue' : 'red',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleSingOut = () => {
    alert('signout')
  }

  const [isExpanded, setIsExpanded] = useState(true)

  const toggleCalendar = () => {
    setIsExpanded(!isExpanded)
  }

  const changeCalendarView = () => {
    if (mobileCalendar === 34) {
      setMobileCalendar(350)
    } else if (mobileCalendar === 350) {
      setMobileCalendar(34)
    }
  }

  return (
    // <View className="flex-1 items-center justify-center p-3">
    //   <View className="flex w-full">
    //     <NavigationScreen />
    //   </View>

    //   {/* <View>
    //   <AudioRecorder />
    //   <DistanceCalculator />
    // </View> */}
    //   <ScrollView style={{ paddingTop: 20 }}>
    //     <View className="flex flex-col items-center justify-center">
    //       <Calendar />
    //     </View>
    //     {/* <Text>{`Key: ${key}`}</Text> */}
    //   </ScrollView>

    //   <Text>{activity.length}</Text>

    //   {/* <View
    //     style={[styles.container, isHovered && styles.containerHovered]}
    //     onMouseEnter={handleMouseEnter}
    //     onMouseLeave={handleMouseLeave}
    //   >
    //     <TouchableHighlight
    //       onPressIn={handlePressIn}
    //       onPressOut={handlePressOut}
    //       style={[styles.button, isHovered && styles.buttonHovered]}
    //       underlayColor="red"
    //     >
    //       <Text style={styles.buttonText}>Hover Me2</Text>
    //     </TouchableHighlight>
    //   </View> */}

    //   {/* This bellow is a touchable button */}
    //   {/* <TouchableWithoutFeedback
    //       onPress={() => console.log('Button clicked!')}
    //       onPressIn={handlePressIn}
    //       onPressOut={handlePressOut}
    //     >
    //     <View style={buttonStyle}>
    //       <Text>Button</Text>
    //     </View>
    //   </TouchableWithoutFeedback> */}

    //   <Row className="space-x-8">
    // <MotiLink
    //   href="/user/xxx"
    //   animate={({ hovered, pressed }) => {
    //     'worklet'

    //     return {
    //       scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //       rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //     }
    //   }}
    //   transition={{
    //     type: 'timing',
    //     duration: 150,
    //   }}
    //   style={undefined}
    //   onLayout={undefined}
    // >
    //   <Text selectable={false} className="text-base font-bold">
    //     User
    //   </Text>
    // </MotiLink>
    //     {/*
    //     <MotiLink
    //       href="/activity/xxx"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Add Activity
    //       </Text>
    //     </MotiLink> */}

    //     <MotiLink
    //       href="/login"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Go to Login
    //       </Text>
    //     </MotiLink>

    //     {/* <MotiLink
    //       href="/saved-activities"
    //       animate={({ hovered, pressed }) => {
    //         'worklet'

    //         return {
    //           scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //           rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //         }
    //       }}
    //       transition={{
    //         type: 'timing',
    //         duration: 150,
    //       }}
    //       style={undefined}
    //       onLayout={undefined}
    //     >
    //       <Text selectable={false} className="text-base font-bold">
    //         Saved Activities
    //       </Text>
    //     </MotiLink> */}
    //   </Row>
    // </View>

    // // Second View
    // <View className="flex-1 items-center justify-center p-3">
    //   <View className="flex w-full">
    //     <NavigationScreen />
    //   </View>

    //   <Text>Hello there</Text>
    //   <MotiLink
    //     href="/login"
    //     animate={({ hovered, pressed }) => {
    //       'worklet'

    //       return {
    //         scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //         rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //       }
    //     }}
    //     transition={{
    //       type: 'timing',
    //       duration: 150,
    //     }}
    //     style={undefined}
    //     onLayout={undefined}
    //   >
    //     <Text selectable={false} className="text-base font-bold">
    //       Go to Login
    //     </Text>
    //   </MotiLink>
    // </View>

    // <View className="h-screen w-full">
    //   <View style={styles.navigation}>
    //     <NavigationScreen />
    //   </View>

    // <View
    //   className="bg-blue-100 min-[320px]:mt-4 min-[640px]:mt-1"
    //   style={styles.mainx}
    // >
    //   <Text>Hello</Text>
    // </View>
    // </View>
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <NavigationScreen />
      </View>
      <View style={styles.mainx}>
        <View
          // className=" min-[320px]:bg-green-500 min-[540px]:bg-red-500 min-[1540px]:bg-purple-500"
          style={{ ...styles.left, maxHeight: mobileCalendar }}
        >
          {miniCalendar ? (
            <View
              style={styles.leftContainer}
              className="align-center min-[320px]:bg-green-200 min-[540px]:bg-orange-200 min-[720px]:bg-blue-600 min-[1540px]:items-end"
            >
              <View style={styles.calendar}>
                {isExpanded ? <Calendar /> : null}
              </View>
            </View>
          ) : (
            <View className="h-8 bg-red-900">
              <TouchableOpacity
                className="w-32 bg-red-400"
                onPress={() => changeCalendarView()}
              >
                <Text>Options</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView style={styles.center} showsVerticalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>

        <View style={styles.right}>
          <View style={styles.rightContainer}>
            <View style={styles.calendar}>
              <Text>The options should go here</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgb(33, 37, 46)',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  navigation: {
    width: '100%',
    height: '5%',
    // backgroundColor: 'red',

    ...Platform.select({
      ios: {
        height: 'auto',
      },
    }),
  },
  mainx: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '95%',
    // backgroundColor: 'purple',

    overflow: 'hidden',
    ...Platform.select({
      ios: {
        flexDirection: 'column',
      },
    }),
  },
  center: {
    overflow: 'scroll',
    flex: 1,
    height: '100%',
    // backgroundColor: 'pink',

    ...Platform.select({
      ios: {
        height: '100%',
      },
    }),
  },
  left: {
    flex: 1,
    backgroundColor: 'yellow',
    overflow: 'hidden',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // mart

    width: '100%',
    maxHeight: 34,
    // height: 'auto',

    // ...Platform.select({
    //   ios: {
    //     maxHeight: 34,
    //   },
    // }),
  },
  right: {
    flex: 1,
    backgroundColor: 'blue',
    overflow: 'hidden',

    ...Platform.select({
      ios: {
        display: 'none',
      },
    }),
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    // backgroundColor: 'purple',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
    // backgroundColor: 'red',
  },
})
