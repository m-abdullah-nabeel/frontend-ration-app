import {TouchableOpacity, View, Image, Text, StyleSheet} from "react-native"

const AdTests = () => {
    const adData = {
        imageUrl: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'New Pharma Product Ad',
        description: 'Give your furry family members the gift of a healthier life with PetVital Health Pro™! Our cutting-edge pharmaceutical product is specially formulated to enhance the well-being of your beloved pets.        ',
        ctaText: 'Learn More',
      };
    
      const handleAdPress = () => {
        // Implement the action to be taken when the ad is pressed.
        // For example, navigate to a product page.
      };
    return (
        <RealisticAdBanner adData={adData} onPress={handleAdPress} />

    )
}

const RealisticAdBanner = ({ adData, onPress }) => {
    const { imageUrl, title, description, ctaText } = adData;
  
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.adImage} />
          <View style={styles.adInfoContainer}>
            <Text style={styles.adTitle}>{title}</Text>
            <Text style={styles.adDescription}>{description}</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={onPress}
            >
              <Text style={styles.ctaButtonText}>{ctaText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    adImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 10,
    },
    adInfoContainer: {
      flex: 1,
    },
    adTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    adDescription: {
      fontSize: 14,
    },
    ctaButton: {
      backgroundColor: '#3498db',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginTop: 10,
      alignItems: 'center',
    },
    ctaButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  

export default AdTests