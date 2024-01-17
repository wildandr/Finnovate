import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'GOTO', value: '1'},
  {label: 'BCA', value: '2'},
];

const DropdownNotificationEquity = ({onValueChange}) => {
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
        placeholder={!isFocus ? 'Select Equity' : 'Select Equity'}
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

export default DropdownNotificationEquity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002351',
  },
  dropdown: {
    height: 45,
    backgroundColor: '#002351',
    borderColor: '#6b7280',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
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
