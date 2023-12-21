import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../../../shared/components/wrapper';
import styles from './styles';
import { Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RF } from '../../../shared/exporter';
import { RFValue } from 'react-native-responsive-fontsize';
import BottomSheet from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
// import { TextInput } from '@react-native-material/core';
// import { GTranslate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { setCurrentLocation } from '../../../shared/redux/reducers/userReducer';

const setAddress = ({ navigation, route }: any) => {

  const dispatch = useDispatch();
  const { t } = useTranslation()

  const [langCheck, setLangCheck] = useState(true);
  const [strLoc, setStrLoc] = useState('')

  const [region, setRegion] = useState({
    latitude: 26.0667,
    longitude: 50.5577,
    latitudeDelta: 0.012,
    longitudeDelta: 0.01,
  });
  const [regionMap, setRegionMap] = useState({
    latitude: 26.0667,
    longitude: 50.5577,
    latitudeDelta: 0.012,
    longitudeDelta: 0.01,
  });

  const [isMapReady, setisMapReady] = useState(false);
  const [paddingTop, setPaddingTop] = useState(1);
  const [locType, setLocType] = useState('');
  const [item, setTime] = useState('');
  const [marginBottom, setMarginBottom] = useState(1);
  const [marginTop, setMarginTop] = useState(1);
  const [userLocation, setUserLocation] = useState('');
  const [regionChangeProgress, setRegionChangeProgress] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_KEY = "AIzaSyDvKg5Lu91CHoCKdr-wc1DteqF3FG2k6TE"

  const mapRef = useRef(null);
  const gRef = useRef(null);

  const { setAddLocation } = route?.params

  useEffect(() => {
    Geocoder.init("AIzaSyDvKg5Lu91CHoCKdr-wc1DteqF3FG2k6TE");
    Geolocation.getCurrentPosition(info =>
      console.log(info, "Geolocation.getCurrentPosition(info => console.log(info));")
    )
    getCurrentLocation()
  }, [])

  const fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      region.latitude +
      ',' +
      region.longitude +
      '&key=' +
      API_KEY,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        setUserLocation(userLocation);
        gRef.current?.setAddressText(userLocation);
        setStrLoc(userLocation)
        setRegionChangeProgress(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  // Update state on region change
  const onRegionChange = async (regionInfo: React.SetStateAction<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; }>) => {
    setRegion(regionInfo)
    setRegionChangeProgress(true);
    fetchAddress();
  };


  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const regionData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.007,
        };
        setRegionMap(regionData);
        setRegion(regionData);
        fetchAddress();
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  };

  const goToInitialLocation = () => {
    if (isMapReady) {
      setTimeout(() => mapRef.current.animateToRegion(region), 200);
    }
  };




  // 
  return (
    <Wrapper >
      <View style={styles.linearGradient}>
        <View style={{ backgroundColor: '#fff', flex: 0.3, zIndex: 10, }} >

          <View style={{ paddingHorizontal: 20, marginTop: RFValue(32), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.forgot_text}>{t('Add your location')}</Text>
            <Icon
              name='g-translate'
              type='materialIcons'
              color='#9B0328'
            />
          </View>

          <View style={{
            backgroundColor: '#F5F5F8', marginHorizontal: RFValue(13), alignItems: "center",
            marginVertical: 20,
            paddingVertical: 18,
            paddingHorizontal: 10,
            borderRadius: 65,
            flexDirection: 'row',
            zIndex: 10,
            justifyContent: 'flex-start'
          }}>
            <Icon name="search1" type='antdesign' size={28} />
            <GooglePlacesAutocomplete
              placeholder='Search'
              ref={gRef}
              textInputProps={{
                placeholderTextColor: '#888',
                returnKeyType: "search"
              }}
              autoFocus={false}
              numberOfLines={2}
              styles={{
                textInputContainer: {
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 12,
                  textAlign: "left"
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setStrLoc(data?.description)
                Geocoder.from(data?.description)
                  .then(json => {
                    var location = json.results[0].geometry.location;
                    setRegionMap({
                      ...regionMap,
                      latitude: location.lat,
                      longitude: location.lng
                    })
                    goToInitialLocation()
                  })
                  .catch(error => console.log(error, 'sss'));
                // console.log(JSON.stringify(details?.geometry?.location));
              }}
              query={{
                key: 'AIzaSyDvKg5Lu91CHoCKdr-wc1DteqF3FG2k6TE',
                language: 'en',
              }}

              currentLocation={true}

              currentLocationLabel='Current location'
            />
            {/* <TextInput
              placeholder={t('Search')}
              underlineColorAndroid={'rgba(0,0,0,0)'}
              style={{ fontSize: 19, padding: 5, width: '90%', textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}

            /> */}
          </View>
        </View>
        <View style={styles.container}>
          <MapView.Animated
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            zoomEnabled
            loadingEnabled
            zoomTapEnabled
            onRegionChange={onRegionChange}
            region={regionMap}
          >
            <Marker.Animated
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title={'Location'}
              draggable>
            </Marker.Animated>
          </MapView.Animated>
          <View style={{ flexDirection: 'row', position: 'absolute', width: "100%", bottom: 0 }}>
            <TouchableOpacity
              onPress={() => {
                const location = { ...region, strLoc }
                // console.log(location, 'send');
                dispatch(setCurrentLocation(location))
                setAddLocation(strLoc)
                navigation.goBack()
              }}
              style={{
                marginHorizontal: 10,
                justifyContent: 'center',
                flexDirection: "row",
                alignItems: "center",
                height: RF(55),
                borderRadius: 30,
                alignSelf: 'center',
                marginBottom: RF(20),
                width: '95%',
                padding: 20,
                backgroundColor: '#CA2323'
              }}>
              <Text style={[styles.get_started, { color: 'white', fontSize: 20 }]}>{t('Save')} </Text>
              {/* <Icon name='chevron-down' type='ionicon' color='white' size={RF(15)} /> */}
            </TouchableOpacity>
          </View>

        </View>



      </View>
    </Wrapper >

  );
};

export default setAddress;
