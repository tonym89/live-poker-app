import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, LoginFormInput, Button, Spinner } from './common';
import { Fonts } from '../utils/Fonts';
import { AnalysisSvg } from './common';
import mainIcon from './common/mainIcon.png';



class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
        return <Spinner size="large" />;
    }

    return (
    <View>
    <TouchableOpacity style={styles.saveButton} onPress={this.onButtonPress.bind(this)}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2D6BEC', '#1888E5', '#04A6E0']} style={styles.linearGradient}>
          <Text style={styles.saveText}>Login/Register</Text>
      </LinearGradient>
    </TouchableOpacity>
    </View>
    );
  }

  renderError(){
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (

      <View style={styles.mainViewStyle}>

      <KeyboardAwareScrollView  innerRef={ref => {
    this.scroll = ref
  }}>
        <View style={{alignSelf: 'center', marginTop: 0}}>
          <Image style={{width: 250, height: 250}} source={mainIcon} />
        </View>
        <View style={styles.loginCard}>

          <CardSection>
            <LoginFormInput
              label="Email"
              placeholder="myname@email.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              onFocus= {(event: Event) => {
        // `bind` the function if you're using ES6 classes
        this.scroll.props.scrollToPosition(0, 70)
      }}
            />
          </CardSection>

          <CardSection>
          <LoginFormInput
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
          </CardSection>

          {this.renderError()}


            <View style={{marginTop: 60}}>
              {this.renderButton()}
            </View>
        </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#274272',
    color: '#FCFDFC',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
    loginCard: {
    margin: 0,
    backgroundColor: '#3B5889',
    padding: 10
  },
  saveText: {
    fontFamily: Fonts.CabinBold,
    fontSize: 23,
    color: '#FCFDFC',
    textAlign: 'center',
  },
  saveButton: {
    alignSelf: 'center',
    width: 250,
    height: 40,
    backgroundColor: '#330066',
    borderRadius: 15,
    justifyContent: 'center',
    bottom: 30
  },
  linearGradient: {
   flex: 1,
   paddingLeft: 15,
   paddingRight: 15,
   borderRadius: 10,
   justifyContent: 'center',
   alignItems: 'center'
 },
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
