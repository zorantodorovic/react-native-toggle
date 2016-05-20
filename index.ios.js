/**
 * React Native Toggle
 * Created by Zoran Todorovic
 */

import React, { Component } from 'react';
import DummyData from './src/DummyData';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  View
} from 'react-native';

class RN_Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentCheckedOptionsArray: [],
      data: DummyData(),
      isLoading: true,
    };
  }

  componentDidMount() {
    this._data = [];
    this.facetsContainerVisibilityArray = [];
    this.loadData();
  }

  loadData() {
    for(var item in this.state.data) {
      this._data.push(this.state.data[item]);
      this.facetsContainerVisibilityArray.push(false);
    }
    console.log(this.facetsContainerVisibilityArray)
    this.setState({
      isLoading: false,
      facetsContainerVisibility: this.facetsContainerVisibilityArray
    });
  }

  toggleOptionsView(parentIndex) {
    if (this.facetsContainerVisibilityArray[parentIndex] === true) {
      this.facetsContainerVisibilityArray[parentIndex] = false;
    } else {
      this.facetsContainerVisibilityArray[parentIndex] = true;
    }
    this.setState({
      facetsContainerVisibility: this.facetsContainerVisibilityArray
    });
  }

  renderFacetsListWithOptions() {
    console.log(this.state.facetsContainerVisibility)
    var facetsArray = this.state.data;
    var facetListViewArray = [];

    facetsArray = facetsArray.map((facet, i) => { 
      facetListViewArray.push(
        <View key={facet.name} style={{flex: 1}}>
          <View style={{marginTop: 10}} />
          <TouchableHighlight
            onPress={this.toggleOptionsView.bind(this, i)}
            style={styles.row}
            underlayColor= {'#b0b0b0'}>
            <View style={styles.facetsContainer}>
              <View style={styles.facetTitleWrapper}>
                  <Text numberOfLines={1} style={styles.facetCategoryTitle}>{facet.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>)
        facet.options.map((option, j) => {
          facetListViewArray.push(
            <View key={String(option.name)}>
              <TouchableHighlight
                style={this.state.facetsContainerVisibility[i] === true ? styles.row : {width: 0, height: 0}}
                underlayColor={'#b0b0b0'}>
                <View
                    style={this.state.facetsContainerVisibility[i] === true ? {flex: 1} : {width: 0, height: 0}}>
                    <View 
                        style={this.state.facetsContainerVisibility[i] === true ? styles.whiteSeparator : {width: 0, height: 0}}/>
                    <View
                        style={this.state.facetsContainerVisibility[i] === true ? styles.facetOptionContainer : {width: 0, height: 0}}>
                        <View 
                          style={this.state.facetsContainerVisibility[i] === true ? styles.facetTitleWrapper : {width: 0, height: 0}}>
                          <Text numberOfLines={3} 
                              style={this.state.facetsContainerVisibility[i] === true ? styles.facetTitle : {width: 0, height: 0}}>
                              {option.name}
                          </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            </View>
          )
        })
      facetListViewArray.push(
        <View style={styles.separator} key={'separator' + i}/>
      )
    })
    return(facetListViewArray)
  }

  render() {
    if (this.state.isLoading) {
      return (<View></View>)
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollView}>
            {this.renderFacetsListWithOptions()}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F0F1F2',
    marginTop: 20,
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: '#dddddd'
  },
  facetsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15
  },
  facetTitleWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  facetNumberOfItemsWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: 10
  },
  facetCategoryTitle: {
    flex: 1,
    color: 'rgb(85, 85, 85)',
    fontSize: 16,
    fontWeight: '600',
  },
  whiteSeparator: {
    height: 1,
    backgroundColor: '#fff'
  },
  facetOptionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(248, 248, 248)',
    padding: 15,
  }
});

AppRegistry.registerComponent('RN_Toggle', () => RN_Toggle);
