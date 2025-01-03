import { Slot } from 'expo-router'
import Header from '../components/Header'

import React from 'react'

export default function RootLayoutNav() {

  return (
    <>
      <Slot />
      <Header />
    </>
  )
}
