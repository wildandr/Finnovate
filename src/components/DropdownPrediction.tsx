import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Bullish', value: '1'},
  {label: 'Bearish', value: '2'},
];

const DropdownComponent = ({onValueChange}) => {
  // add onValueChange prop
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={[styles.placeholderStyle, {color: 'white'}]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: 'white', padding: 8},
        ]}
        inputSearchStyle={[styles.inputSearchStyle, {color: 'white'}]}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Pick Your Prediction' : 'Pick Your Prediction'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value); // set the value state
          onValueChange(item.label); // call onValueChange with the label of the selected item
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A476E',
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  dropdown: {
    height: 45,
    backgroundColor: '#001736',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    padding: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    padding: 8,
  },
});
