import React, {Component} from 'react'
import {View,Button, Text, StyleSheet, Alert, FlatList} from 'react-native'
import axios from 'axios'
import {ListItem} from 'react-native-elements'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            listDetails :[],
          //  url:'http://127.0.0.1:5000/'
            }

    }

    
    componentDidMount() {
        this.getPlanets();
      }
    
      getPlanets = () => {
        //const { url } = this.state;
        axios.get("http://127.0.0.1:8080/")
          .then(response => {
              //Alert.alert(response.data)
            return this.setState({
              listDetails: response.data.data
            });
          })
          .catch(error => {
              if(error.response){
            Alert.alert("udhuhduwd",error.message,error.status);
              }
              else if(error.request)
              {
                Alert.alert("noooooo",error.message);

              }
          });
      };

    render(){
        const {listDetails} =this.state
        if(listDetails.length==0){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>
                        Loading..zzzzzzz
                    </Text>
                </View>
            )
        } 

        keyExtractor= (item,index)=> {index.toString()}

        renderItem=({item,index})=>(
            <ListItem
            key={index}
            title = {`Planet : ${item.name}`}
            subtitle={`Distance from Earth : ${item.distance_from_earth}`}
            titleStyle = {styles.titleList}
            containerStyle = {styles.containerList}
            bottomDivider
            onPress = {()=>{this.props.navigation.navigate("Details",{'itemName':item.name})}}

            />
        )

        return(
            <View style = {styles.container}>
                <View style = {styles.upperContainer}>
                    <Text style = {styles.headerText}> 
                        Exo Planets
                    </Text>
                </View >
                <View style = {styles.lowerContainer}>
                <FlatList
                renderItem = {this.renderItem}
                keyExtractor = {this.keyExtractor}
                data={this.state.listDetails}                
                />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create(
    {
        container:{flex:1, backgroundColor:"#BAB86C"},
        upperContainer:{flex:0.1,justifyContent:"center",alignItems:"center"},
        lowerContainer:{flex:0.9},
        headerText:{fontSize:30,fontWeight:'bold'},
        titleList:{fontWeight:'bold',fontSize:20},
        containerList:{backgroundColor:"#FFFFD1"}
    }
)