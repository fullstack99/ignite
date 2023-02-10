import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CaretLeft, X } from 'phosphor-react-native';

import PLabel from 'mobile/src/components/common/PLabel';
import PHeader from 'mobile/src/components/common/PHeader';

import { WHITE } from 'shared/src/colors';
import { Body1Bold } from 'mobile/src/theme/fonts';

interface AccreditationHeaderProps {
  centerLabel: string;
  handleBack?: () => void;
}

const AccreditationHeader: React.FC<AccreditationHeaderProps> = (props) => {
  const { centerLabel, handleBack } = props;

  return (
    <PHeader
      leftIcon={
        <TouchableOpacity style={styles.iconContainer} onPress={handleBack}>
          <CaretLeft size={24} color={WHITE} />
        </TouchableOpacity>
      }
      centerIcon={<PLabel label={centerLabel} textStyle={styles.headerTitle} />}
      rightIcon={
        <TouchableOpacity style={styles.iconContainer} onPress={handleBack}>
          <X size={24} color={WHITE} />
        </TouchableOpacity>
      }
      containerStyle={styles.headerContainer}
    />
  );
};

export default AccreditationHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 0,
    marginBottom: 0,
  },
  headerTitle: {
    ...Body1Bold,
  },
  iconContainer: {
    padding: 8,
  },
});
