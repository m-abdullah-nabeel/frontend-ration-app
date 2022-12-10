import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { Button, View, Text } from 'react-native'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <View>
        <Button
          title="Increment value"
          onPress={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Text>{count}</Text>
        <Button
          title="Decrement value"
          onPress={() => dispatch(decrement())}
        >
          Decrement
        </Button>
    </View>
  )
}