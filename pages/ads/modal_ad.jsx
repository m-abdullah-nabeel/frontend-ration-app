import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const FullScreenAdModal = ({ showAd, setShowAd, adData }) => {
  const hideModal = () => setShowAd(false);

  const { imageUrl, logoURL, title, description, ctaText } = adData;
  const { t } = useTranslation();

  return (
    <Modal visible={showAd} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.adContainer}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity> */}
          {/* <Button style={styles.closeButton} onPress={hideModal}>
            X
          </Button> */}

          <View style={styles.adInfoContainer}>
            <Text style={styles.adTitle}>{title}</Text>
            {/* <Text style={styles.adSponsored}>Sponsored</Text> */}
            {/* <Text style={styles.adDescription}>{description}</Text> */}
            {/* <Button
              mode="contained"
              style={styles.ctaButton}
              onPress={hideModal}
            >
              {ctaText}
            </Button> */}
          </View>
          {/* <Image source={{ uri: imageUrl }} style={styles.adImage} /> */}
          <Image source={{ uri: logoURL }} style={styles.adImage} />
          <Button
            mode="contained"
            style={styles.ctaButton}
            onPress={hideModal}
          >
            {t("next")}
            {/* {ctaText} */}
          </Button>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  adContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    flexDirection: 'column',
  },
  adImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  adInfoContainer: {
    marginBottom: 20
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adSponsored: {
    borderWidth: 2,
    borderColor: "red", 
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    borderRadius: 20
  },
  adDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    // padding: 20, // Increase the padding for a larger button
    // borderWidth: 2,
    // borderColor: "black",
    // height: 40, 
    // width: 40,
    // borderRadius: 40,
    // justifyContent: "center",
    // alignItems: "center"

  },
  closeButtonText: {
    fontSize: 20,
    color: "red",
    fontWeight: 'bold',
  },
});

export default FullScreenAdModal;
