import React, { useEffect, useState, forwardRef } from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import PFormLabel from './PFormLabel';
import { Body1, Body2, Body3 } from '../../theme/fonts';
import {
  WHITE,
  BLACK,
  GRAY800,
  GRAY700,
  DANGER,
  DANGER30,
} from 'shared/src/colors';

interface PTextInputProps extends TextInputProps {
  label: string;
  text: string;
  icon?: string;
  numberOfLines?: number;
  onPress?: () => void;
  onPressText?: () => void;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  subLabel?: string;
  subLabelTextStyle?: StyleProp<TextStyle>;
  subLabelStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

const PTextInput = forwardRef<React.FC<PTextInputProps>, PTextInputProps>(
  (props, ref) => {
    const {
      containerStyle,
      label,
      labelStyle,
      labelTextStyle,
      text,
      textInputStyle,
      textContainerStyle,
      subLabel,
      subLabelStyle,
      subLabelTextStyle,
      onChangeText,
      onPressText,
      onPress,
      onFocus,
      onBlur,
      onSubmitEditing,
      icon,
      placeholder,
      secureTextEntry = false,
      keyboardType = 'default',
      editable = true,
      autoCapitalize = 'none',
      autoFocus = false,
      children,
      placeholderTextColor = '#888',
      multiline = false,
      autoCorrect = true,
      error,
      errorStyle,
      numberOfLines = 1,
      ...textInputProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const handleOnChangeText = (val: string): void => {
      onChangeText?.(val);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.row}>
          <PFormLabel
            label={label}
            style={labelStyle}
            textStyle={[styles.defaultLabelText, labelTextStyle]}
          />
          <PFormLabel
            label={subLabel ?? ''}
            style={subLabelStyle}
            textStyle={subLabelTextStyle}
            onPress={onPressText}
          />
        </View>
        <View
          style={[
            styles.view,
            textContainerStyle,
            !!error && styles.errorInput,
          ]}>
          <TextInput
            {...textInputProps}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={handleOnChangeText}
            secureTextEntry={secureTextEntry}
            style={[
              styles.textInput,
              textInputStyle,
              isFocused && styles.focused,
            ]}
            value={text}
            keyboardType={keyboardType}
            editable={editable}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            onFocus={(evt) => {
              onFocus?.(evt);
              setIsFocused(true);
            }}
            onBlur={(evt) => {
              onBlur?.(evt);
              setIsFocused(false);
            }}
            autoFocus={autoFocus}
            multiline={multiline}
            autoCorrect={autoCorrect}
            numberOfLines={numberOfLines}
            keyboardAppearance="dark"
          />
          {children}
          {!!icon && (
            <TouchableOpacity onPress={onPress}>
              <View style={styles.icon}>{icon}</View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.error, errorStyle]}>{error ? error : null}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    ...Body1,
    color: WHITE,
    paddingTop: 0,
    textAlignVertical: 'top',
    flex: 1,
  },
  errorInput: {
    borderColor: DANGER,
    backgroundColor: DANGER30,
  },
  focused: {
    borderColor: WHITE,
  },
  defaultLabelText: {
    ...Body2,
    color: WHITE,
    fontWeight: '700',
  },
  container: {},
  view: {
    position: 'relative',
    minHeight: 40,
    maxHeight: 140,
    borderColor: GRAY800,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: GRAY700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 1,
    shadowColor: BLACK,
    shadowOpacity: 0.25,
    marginBottom: 4,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: DANGER,
    ...Body3,
    marginBottom: 10,
    height: 12,
  },
});

export default PTextInput;
