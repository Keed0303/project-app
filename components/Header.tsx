import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = ({title}: {title: string}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 20,
    width: '100%',
    elevation: 2,
    borderRadius: 8,
  },
  headerText: {
    textAlign: 'center',
  }
})

export default Header