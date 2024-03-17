import { ActivityIndicator, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

const GER_PHONE = [
    `+`,
    `9`,
    `1`,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

const Page = () => {
    const [loading,setLoading] = useState(false);
    const [phoneNum,setPhoneNum] = useState('');
    const router = useRouter();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const { bottom } = useSafeAreaInsets();

    const openLink = () =>{
        Linking.openURL('https://smarttech.one');
    }
    const sendOTP = async () =>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push(`/verify/${phoneNum}`)
        },2000);
    }
    const trySignIn = async () =>{
        setLoading(false);
    }
  return (
    <KeyboardAvoidingView 
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1}}
        behavior="padding"
        >
        {loading && (
                <View style={[StyleSheet.absoluteFill,styles.loading]}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={{fontSize: 18,padding: 10}}>Sending Code...</Text>
                </View>
            )}
        <View style={styles.container}>
            
            <Text style={styles.desc}>
                WhatsApp will need to verify your account. Carrier charges may apply
            </Text>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Text style={styles.listItemText}>India</Text>
                    <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
                </View>
                <View style={styles.separator} />
                <MaskInput 
                    value={phoneNum}
                    keyboardType="numeric"
                    autoFocus
                    placeholder="+91 your phone number"
                    onChangeText={(masked,unmasked) => {
                        setPhoneNum(masked);
                    }}
                    mask={GER_PHONE}
                    style={styles.input}
                
                />
            </View>
            <Text style={styles.legal}>
                You must be{' '}
                <Text style={styles.link} onPress={openLink}>
                    at least 16 years old
                </Text>{' '}
                to regsiter. Learn how WhatsApp works with the{' '}
                <Text style={styles.link} onPress={openLink}>
                    Meta Companies
                </Text>
                .
            </Text>

            <View style={{flex: 1}} />

            <TouchableOpacity 
                style={[styles.button,phoneNum !== '' ? styles.enabled : null,{marginBottom: bottom}]} 
                disabled={phoneNum === ''}
                onPress={sendOTP}>
                <Text style={[styles.buttonText,phoneNum !== '' ? styles.enabled : null]}>Next</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
    },
    desc:{
        fontSize: 14,
        color: Colors.gray
    },
    list:{
        backgroundColor: '#fff',
        width:'100%',
        borderRadius: 10,
        padding: 10,
    },listItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10
    },
    listItemText:{
        fontSize: 18,
        color: Colors.primary,
    },
    separator:{
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        opacity: 0.4
    },
    legal:{
        fontSize: 12,
        textAlign: 'center',
        color: '#000',

    },
    link:{
        color: Colors.primary
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,
      },
    
      loading: {
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 10,

      },
      enabled: {
        backgroundColor: Colors.primary,
        color: '#fff',
      },
      buttonText: {
        color: Colors.gray,
        fontSize: 18,
        fontWeight: '500',
      },
})