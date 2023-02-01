import React, {Component} from 'react';

import { StatusBar } from 'expo-status-bar';
import { AppState, Appearance, Platform, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { getLocales } from 'expo-localization';

export default class App extends Component{
 
  constructor(){
    super();
    this.OS = Platform.OS;
    this.languageCode = getLocales()[0].languageCode;
    this.colorScheme = Appearance.getColorScheme();
    this.fontSize = 16;
    this.fontScale = 'medium';
    this.defaults = [getLocales()[0].languageCode, Appearance.getColorScheme(), 16];
    // Ignore dynamic type scaling on iOS
    Text.defaultProps = Text.defaultProps || {};
    Button.defaultProps = Button.defaultProps || {};
    Text.defaultProps.allowFontScaling = false; 
    Button.defaultProps.allowFontScaling = false;
 
    this.config = {
      en: {
        lang: `Hello, I am an ${this.OS} Expo app. This system's language setting is in English but we can override them here:`,
        color: `The system is set to ${this.colorScheme} mode but you can override here:`,
        font: `This device's font is set to ${this.fontScale} but only you can tell me what to do!`,
        restore: 'Restore System Default',
        buttons: ['Small','Medium','Large', 'Dark', 'Light']
      },
      fr: {
        lang: `Bonjour, je suis une application ${this.OS} Expo. Le paramètre de langue de ce système est en français, mais nous pouvons les remplacer ici:`,
        color: `Le système est réglé sur le mode ${this.colorScheme === 'dark' ? 'sombre' : 'lumière'} mais vous pouvez passer outre ici:`,
        font: `La police de cet appareil est définie sur ${this.fontScale} mais vous seul pouvez me dire quoi faire !`,
        restore: 'Restaurer les paramètres par défaut du système',
        buttons: ['Petit','Moyen','Gros', 'Sombre', 'Lumière']
      },
      es: {
        lang: `Hola, soy una aplicación de ${this.OS}. La configuración de idioma de este sistema está en español, pero podemos anularla aquí: `,
        color: `El sistema está configurado en modo ${this.colorScheme === 'dark' ? 'oscuro' : 'de luz'}, pero puede anularlo aquí:`,
        font: `¡La fuente de este dispositivo está configurada en ${this.fontScale} pero solo tú puedes decirme qué hacer!`,
        restore: 'Restaurar valores predeterminados del sistema',
        buttons: ['Pequeño','Mediano','Grande', 'Oscuro', 'De Luz']
      }
    }
    
    this.currentText = this.config[this.languageCode]
  
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonBox: {
        flexDirection: 'row'
      },
      button: {
        marginRight: 24,
        backgroundColor: 'black'
      },
      textColorLight: {
        color: '#000'
      },
      textColorDark: {
        color: '#fff'
      }
    });
    
    this.state = {
      textValue: this.config[this.languageCode],
      colorScheme: this.colorScheme,
      fontScale: this.fontScale,
      appState: AppState.currentState
    }
  }
  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          this.languageCode = getLocales()[0].languageCode;
          this.colorScheme = Appearance.getColorScheme();
          this.fontSize = 16;
          this.fontScale = 'medium';
          this.defaults = [getLocales()[0].languageCode, Appearance.getColorScheme(), 16];
        }
        this.setState({appState: nextAppState});
      },
    );
  }
  getFontSize() {
    let fontScale = useWindowDimensions().fontScale;
    let textSize;
    switch (true) {
      case fontScale > 1.29:
        textSize = 'largest';
        break;
      case fontScale < 1.29 && fontScale > 1.14:
        textSize = 'large';
        break;
      case fontScale === 1:
        textSize = 'default';
        break;
      default:
        textSize = 'small';
        break;
    }

    return textSize;
  }
  setLanguageCode(code) {
    this.languageCode = code;

    this.setState({
        textValue: this.config[this.languageCode]
    })
  }
  setColorScheme(color) {
    this.colorScheme = color;

    this.setState({
      colorScheme: this.colorScheme
    })
  }
  setFontSize(size) {
    this.fontSize = size;

    this.setState({
      fontSize: this.fontSize
    })
  }
  restoreDefaults() {
    this.languageCode = this.defaults[0];
    this.colorScheme = this.defaults[1];
    this.fontSize = this.defaults[2];
    this.setState({
      textValue: this.config[this.languageCode],
      colorScheme: this.colorScheme,
      fontSize: this.fontSize
    })
  }

  render() {
    return (
    <View 
      style={this.styles.container}
      backgroundColor={this.colorScheme === 'dark' ? '#555' : '#fff'}
      >
      <Text
        style={[this.colorScheme === 'dark' ? this.styles.textColorDark : this.styles.textColorLight, {fontSize: this.fontSize}]}
      >{this.state.textValue.lang}</Text>
      <View style={this.styles.buttonBox}>
        <Button
          style={this.styles.button}
          title="English"
          onPress={() => this.setLanguageCode('en')}
        />
        <Button
          style={this.styles.button}
          title="Español"
          onPress={() => this.setLanguageCode('es')}
        />
        <Button
          style={this.styles.button}
          title="Français"
          onPress={() => this.setLanguageCode('fr')}
        />
      </View>
      <Text
        style={[this.colorScheme === 'dark' ? this.styles.textColorDark : this.styles.textColorLight, {fontSize: this.fontSize}]}
      >{this.state.textValue.color}</Text>

      <View style={this.styles.buttonBox}>
          <Button
            style={this.styles.button}
            title={this.state.textValue.buttons[3]}
            onPress={() => this.setColorScheme('dark')}
          />
          <Button
            style={this.styles.button}
            title={this.state.textValue.buttons[4]}
            onPress={() => this.setColorScheme('light')}
          />
      </View>
      <Text 
        style={[this.colorScheme === 'dark' ? this.styles.textColorDark : this.styles.textColorLight, {fontSize: this.fontSize}]}
      >{this.state.textValue.font}</Text>

      <View style={this.styles.buttonBox}>
          <Button
            style={this.styles.button}
            title={this.state.textValue.buttons[0]}
            onPress={() => this.setFontSize(16)}
          />
          <Button
            style={this.styles.button}
            title={this.state.textValue.buttons[1]}
            onPress={() => this.setFontSize(24)}
          />
          <Button
            style={this.styles.button}
            title={this.state.textValue.buttons[2]}
            onPress={() => this.setFontSize(32)}
          />
      </View>
      <StatusBar style="auto" />
      <Button
            style={this.styles.button}
            title={this.state.textValue.restore}
            onPress={() => this.restoreDefaults()}
          />
    </View>
  );
}};