import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Linking, SafeAreaView, TouchableOpacity, TextInput, Alert, Image } from "react-native"
import SponsorsDisplay from "../components/sponsors_display";
import Icon from 'react-native-vector-icons/MaterialIcons';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Mubarik Mahmood",
    position: "Assistant Professor, Animal Nutrition, UVAS, Lahore subcampus, Jhang",
    role: "Principal Investigator",
    img: "mubarik.jpg",
    imgOnline: "mubarik.jpg",
    desc: "Dr. Mubarik Mahmood is PhD in Animal Nutrition from University of Veterinary Medicine, Vienna-Austria. He has been involved in teaching and research for last 10 years. Currently, he has been working as Assistant Professor animal nutrition, UVAS, Sub campus, Jhang. Based upon his expertise in dairy and beef cattle nutrition and active area of research in exploring local feed ingredients in animal diet, Dr. Mahmood coined the idea of UVA-gro as Principal Investigator of this project. He supervises all project activities.",
    email: "mubarik.mahmood@uvas.edu.pk",
    phone: "+923338209714",
    web: "https://uvas.edu.pk/other_campuses/CVAS/departments/animal-sciences/profile/mubarik.htm"
  },
  {
    id: 2,
    name: "Dr. Nasrullah Khan",
    position: "Associate Professor, University of the Punjab, Lahore",
    role: "Co-Principal Investigator",
    img: "nasrullah.jpg",
    imgOnline: "nasrullah.jpg",
    desc: "Dr. Nasrullah Khan is PhD in statistics and has been working as Associate Professor in University of Punjab. In current project, he is acting as co-PI. He has diverse experience in Biological Phenomenon and expertise in programming of R, Python and development of mobile applications. In current project, his role is to monitor the back end data of the UVA-gro.",
    email: "nasrullah.stat@pu.edu.pk",
    phone: "+923454209208",
    web: "http://faculty.nasrullah-khan1.pu.edu.pk/"
  },
  {
    id: 3,
    name: "Dr. Muhammad Zafar Ullah Khan",
    position: "Director ARASS PVT Ltd, Lahore",
    role: "Industrial Partner",
    img: "zafarullah.jpg",
    imgOnline: "zafarullah.jpg",
    desc: "Dr. Muhammad Zafar Ullah Khan is PhD in Animal Nutrition from UVAS, Lahore and he is industrial partner of the UVA-gro project. He has more than 15 years of field experience and played managerial roles in livestock industry with expertise in animal nutrition and herd management of dairy animals. He has been currently working as Chief Executive Officer (CEO) in Agri-Food Research & Sustainable Solutions (Private) Limited (ARASS). He collaborated different research projects with academia.",
    email: "vetzafar@gmail.com",
    phone: "+923334754251",
    web: ""
  },
  {
    id: 4,
    name: "Dr. Muhammad Abdullah Nabeel",
    position: "Developer, Cybersecure Solutions",
    role: "App Developer",
    img: "abdullah.jpg",
    imgOnline: "abdullah.jpg",
    desc: "Mr. Muhammad Abdullah Nabeel is the key developer of UVA-gro Application. He earned his Doctor of Veterinary Medicine (DVM) degree from UVAS, Jhang campus in 2023, and at the same time he is expert in operating programs of Python, JavaScript, and R. Therefore, his contribution in blending these technological programs with field of animal sciences is remarkable. He has been continuously engaged in improving Application quality by working in close collaboration with project PI and Co-PI.",
    email: "muhammadabdullahnabeel@gmail.com",
    phone: "+923117039097",
    web: ""
  }
]

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

const Collapsible = ({title, children}) => {
  const [open, setOpen] = useState(true);
  return (
    <View style={{paddingBottom: open ? 0 : 20}}>
      <TouchableOpacity onPress={() => setOpen(prevState => !prevState)}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title}</Text>
          <Icon style={styles.titleText} name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={25} color="white"/>
        </View>
      </TouchableOpacity>
      
      {open && children}
    </View>
  )
}
function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>

        {/* Project Information */}
        <Collapsible title={"Project Description"}>
          <ProjectInfo/>
        </Collapsible>

        {/* Team */}
        <Collapsible title={"Team Members"}>
          <Team/>
        </Collapsible>

        {/* Guidelines */}
        <Collapsible title={"Guidelines"}>
          <Guidelines/>
        </Collapsible>

        {/* FAQ */}
        <Collapsible title={"Frequently Asked Questions"}>
          <FAQs/>
        </Collapsible>

        {/* sponsors displayed */}
        <SponsorsDisplay/>

      </ScrollView>
    </SafeAreaView>
  );
}

const TeamMember = (props) => {
  const { name, role, position, desc, web, email, phone, img, imgOnline } = props;

  const Hideable = () => (
    <View
      style={{
        paddingVertical: 10
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[{ fontSize: 14 }, styles.ptext]}>{desc}</Text>
      </View>
      <View style={{ 
        flex: 1, //flexDirection: "row",
      }}>
        <OpenURLButton url={`mailto:${email}`}>
          <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
            <Icon style={{marginRight: 10, marginTop: 5}} name="email" size={25} color="dodgerblue"  />
            <Text style={styles.ptext}>{email}</Text>
          </View>
        </OpenURLButton>

        
        <OpenURLButton url={`tel:${phone}`}>
          <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
            <Icon style={{marginRight: 10, marginTop: 5}} name="phone" size={25} color="green"  />
            <Text style={styles.ptext}>{phone}</Text>
          </View>
        </OpenURLButton>


        {web!=='' && 
          <OpenURLButton url={web}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
              <Icon style={{marginRight: 10, marginTop: 5}} name="web" size={25} color="orange"  />
              <Text style={styles.ptext}>{web}</Text>
            </View>
          </OpenURLButton>
        }
      </View>

    </View>

  )

  return (
    <View style={[styles.contentContainer, {}]}>
      <View
        style={{
          minHeight: 140, borderRadius: 10, flexDirection: 'row', justifyContent: "space-between",
          borderBottomColor: 'grey', borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 2, alignItems: "center", paddingTop: 40 }}>
          {img && 
          <Image
            style={{ width: 100, height: 100, borderRadius: 100 }}
            // source={require("../../assets/images/team/mubarik.jpg")}
            source={{ uri: `https://raw.githubusercontent.com/m-abdullah-nabeel/frontend-ration-app/main/assets/images/team/${imgOnline}` }}
          />
          }
        </View>

        <View style={{ flex: 4, paddingVertical: 20 }}>
          <Text style={[{ fontWeight: '600' }, styles.ptext]}>{role}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{position}</Text>

          <Hideable/>
        </View>
      </View>
    </View>
)
}

const Team = () => {
  return (
    <View>
      <Contact/>

      {teamMembers.map((i) => (
        <TeamMember key={i.id} 
          name={i.name} role={i.role} position={i.position} img={i.img} imgOnline={i.imgOnline}
          desc={i.desc} email={i.email} web={i.web} phone={i.phone}
        />
      ))}

    </View>
  )
}

const Guidelines = () => {
  return (
    <View>
    {/* <Text style={styles.title}>Guidelines</Text> */}
    <View style={styles.contentContainer}>
      <View>
        <Text style={[styles.ptext, {}]}>
          Step 1: Touch the tab "Formulate Feed".
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 2: Select your animal.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 3: Select body weight and milk production level of your animal.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 4: Load default nutrient requirements per your selection of animal.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 5: Make any changes to the default nutrient requirement values. 
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 6: Add any new nutrients, if desired.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 7. Proceed to selection of feedstuffs.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 8-9: Touch the feedstuff, touch "Add" to add to the feed formulation. 
          If you know composition of your feedstuffs (by running tests from a laboratory), 
          you can change the nutrient composition of your feedstuffs.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 10: Be sure to update the inclusion levels in the scale of 0 to 1, which means if you want a 
          nutient to have a maximum inclusion level of 40%, write 0.4. If you want it to be 100%, write 1. 
          If you want 5%, write 0.05
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 11: You can remove or even update your selections with updated compositions. 
          After selecting necessary 
          feedstuffs, proceed to next screen.
        </Text>
        <Text style={[styles.ptext, {}]}>
          Step 12: Screen will appear with your required BASE formulae as dry matter and as fed.
          Now go back and experiment with various feedstuffs available, change inclusion level and 
          get the formula of your choice in terms of nutrient composition and price.
        </Text>
        <Image
          style={{ width: 270, height: 950, alignSelf: "center" }}
          source={require("../../assets/images/demo/Demo.png")}
        />
      </View>

    </View>
  </View>

  )
}

const ProjectInfo = () => {
  return (
    <View>
    {/* <Text style={styles.title}>Project Description</Text> */}
    <View style={styles.contentContainer}>
      <Text style={styles.ptext}>
      The milestone of UVA-gro was made possible by the research project entitled “UVA-gro, Development of a mobile application for least cost feed formulation using local feed resources”. This collaborative project is jointly funded by ORIC-UVAS through Technology Transfer Support Fund (TTSF) and Agri Food Research and Sustainable Solutions (ARASS) with worth of 0.635 million PKR.  
      </Text>
    </View>
  </View>

  )
}

const Contact = () => {
  return (
    <View>
    {/* <Text style={styles.title}>Contact Team</Text> */}
    <View style={styles.contentContainer}>
      <Text style={styles.ptext}>
      UVA-gro team is engaged in providing services to the livestock stakeholders by providing 
      free of cost mobile phone application which enables people to formulate feed for their dairy 
      and beef animals. Please read guidelines to efficiently use UVA-gro. In case you need any guidance, 
      UVA-gro team is available for your help. 
      Your queries are dealt on the following email.
      </Text>

      <Text>
        <View>
        <OpenURLButton url='mailto:uvagro.pak@gmail.com'>
          <Text style={{ color: 'blue' }}>uvagro.pak@gmail.com</Text>
        </OpenURLButton>

        </View>
      </Text>
    </View>
  </View>

  )
}

const FAQs = () => {
  return (
    <View>
    <View style={styles.contentContainer}>
      <Text style={styles.ptext}>
        Coming Soon!
      </Text>

      <Text>
        <View>
        <OpenURLButton url='mailto:uvagro.pak@gmail.com'>
          <Text style={{ color: 'blue' }}>Coming Soon!</Text>
        </OpenURLButton>

        </View>
      </Text>
    </View>
  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  titleView: {
    backgroundColor: "rgb(10, 100, 10)",
    color: "white",
    padding: 20,
    borderRadius: 15,
    flex: 1,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between"
  },
  titleText: {
    fontSize: 25,
    color: "white",
    paddingLeft: 5,
    fontWeight: "500",
  },
  contentContainer: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  teamMemberContainer: {
    height: 140,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  teamMemberImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  teamMemberInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  teamMemberRole: {
    fontWeight: "600",
  },
  teamMemberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  teamMemberDescription: {
    fontSize: 12,
  },
  ptext: {
    fontSize: 14,
    // fontWeight: "500",
    textAlign: "justify",
  },
  linkText: {
    color: "blue",
  },
});


export default Settings;

