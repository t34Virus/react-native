import React, {Component} from 'react';

import { StatusBar } from 'expo-status-bar';
import { Appearance, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { getLocales } from 'expo-localization';

export default class App extends Component{

  constructor(){
    super();
    this.OS = Platform.OS;
    this.languageCode = getLocales()[0].languageCode;
    this.colorScheme = Appearance.getColorScheme();
    this.fontScale = 'medium';

    // this.config = {
    //   en: `Hello, I am an ${this.OS} Expo app on ${this.colorScheme} mode. I speak English but not very well. This device's font is set to.`,
    //   fr: `Bonjour, je suis une application ${this.OS} Expo en mode ${this.colorScheme === 'dark' ? 'dark' : 'clair'}. Je parle français mais pas bien. La police de cet appareil est définie sur'.`,
    //   es: `Hola, soy una aplicación de ${this.OS} Expo en modo ${this.colorScheme === 'dark' ? 'oscuro' : 'ligero'}. Hablo español pero no muy bien. La fuente de este dispositivo está configurada en'.`
    // }
  
    this.config = {
      en: {
        lang: `Hello, I am an ${this.OS} Expo app. This system's language setting is in English but we can override them here:`,
        color: `I'm currently on `,
        font: `This device's font is set to `
      },
      fr: {
        lang: `Bonjour, je suis une application ${this.OS} Expo. Le paramètre de langue de ce système est en français, mais nous pouvons les remplacer ici:`,
        color: `Je suis actuellement en mode `,
        font: `La police de cet appareil est définie sur `
      },
      es: {
        lang: `Hola, soy una aplicación de ${this.OS}. La configuración de idioma de este sistema está en español, pero podemos anularla aquí: `,
        color: `Actualmente estoy en modo `,
        font: `La fuente de este dispositivo está configurada en `
      }
    }
    
    this.currentText = this.config[this.languageCode]
  
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonBox: {
        flexDirection: 'row'
      },
      button: {
        marginRight: 24,
        backgroundColor: 'black'
      }
    });
    
    this.state = {
      textValue: this.config[this.languageCode],
      colorScheme: this.colorScheme,
      fontScale: this.fontScale,
    }
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
    this.fontScale = size;

    this.setState({
      fontScale: this.fontScale
    })
  }

  render() {
    const { languageCode } = this.state;
    return (
    <View style={this.styles.container}>
      <Text>{this.state.textValue.lang}</Text>
      {/* <Text>Hello, I am an {this.OS} Expo app. I speak {this.languageCode} but not very well.</Text> */}
      <View style={this.styles.buttonBox}>
        <Button
          style={this.styles.button}
          title="English"
          onPress={() => this.setLanguageCode('en')}
        />
        <Button
          style={this.styles.button}
          title="Spanish"
          onPress={() => this.setLanguageCode('es')}
        />
        <Button
          style={this.styles.button}
          title="French"
          onPress={() => this.setLanguageCode('fr')}
        />
      </View>
      {/* <Text>I'm currently on {this.colorScheme} mode. </Text> */}
      <Text>{this.state.textValue.color}{this.colorScheme}</Text>

      <View style={this.styles.buttonBox}>
          <Button
            style={this.styles.button}
            title="Dark"
            onPress={() => this.setColorScheme('dark')}
          />
          <Button
            style={this.styles.button}
            title="Light"
            onPress={() => this.setColorScheme('light')}
          />
      </View>
      {/* <Text>This device's font is set to {this.fontScale}</Text> */}
      <Text>{this.state.textValue.font}{this.fontScale}</Text>

      <View style={this.styles.buttonBox}>
          <Button
            style={this.styles.button}
            title="Small"
            onPress={() => this.setFontSize('small')}
          />
          <Button
            style={this.styles.button}
            title="Medium"
            onPress={() => this.setFontSize('medium')}
          />
          <Button
            style={this.styles.button}
            title="Large"
            onPress={() => this.setFontSize('large')}
          />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}};