import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, AsyncStorage,Image,ScrollView,Animated,InteractionManager} from 'react-native';
import { maxSatisfying } from 'semver';

function ImageCard(props){
    const [dim] = useState(new Animated.Value(50));

    var newdim = dim.interpolate({
        inputRange: [50, 76, 90, 150, 300],
        outputRange:[50,300,50,1000,300]
    })

    return(
        <View>
        <Text>{props.title}</Text>
        <Animated.View style={{width:newdim,height:newdim}}>
        <Image source={{uri:props.url}} style={{width:'100%', height:'100%'}} />
        </Animated.View>
        <Button 
            title="Expand"
            onPress={()=>{
                Animated.timing(
                    dim,
                    {
                        toValue:300,
                        duration:1000
                    }
                ).start();

                InteractionManager.runAfterInteractions(()=>{
                    Animated.timing(
                        dim,
                        {
                            toValue:50,
                            duration:1000,
                            delay:1000
                        }
                    )
                })
            }}
        />
        </View>
    );
}

function Main(){
    console.log("in main");
    const [name,setName] = useState("");
    const [img, setImg] = useState([]);

    const handleButton = async()=>{
        //Load a loading animation
        await AsyncStorage.setItem("name", name);
        //Stop the loading animation
    }
    const getName = async()=>{
        var a_name = await AsyncStorage.getItem("name");
        console.log(a_name);
        if(a_name != null && a_name != ""){
            setName(a_name);
        }
    }

    const getCats = async()=>{
        var resp = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        var json = await resp.json();
        console.log(json);
        setImg(json);
    }
    /*
    function handlButton(){
        
    }
    */
   useEffect(()=>{
        getName();
        getCats();
   },[]);

   useEffect(()=>{
       //When name is updated, run this script
   },[name]);

   /* var imgComps = [];
   for (var i=0; i<img.length;i++){
       imgComps.push(
            <Image source={{uri:img[i].url}} style={{width:100,height:100}} />
       );
   } */

    return(
        <View>
            <TextInput
                placeholder="Type your name here"
                onChangeText={(text)=>{
                    console.log("Typing"+text);
                    setName(text);
                }}
            />
            <Button
                title="Store Name"
                onPress={()=>{
                    console.log("Pressed");
                    handleButton();
                }}
            />

            <Text>Hi {name}</Text>
            {/* {
                // Saying if statement is true, do the image ui, otherwise make it null
                (img != null) ? <Image source={{uri:img}} style={{width:100,height:100}} /> : null
            }  */}
            {
               img.map((obj,index)=>{
                return <ImageCard 
                    title={"Image Card "+ (index+1)}
                    url={obj.url}
                />
            }) 
            }
        </View>
    );
}

export default Main;
