import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  CoordinatorLayout,
  BottomSheetBehavior,
} from 'react-native-bottom-sheet-behavior';
import Cell from '../../components/Cell';
import {checkWinner} from '../../components/GameLogic';
import {GameData} from '../../components/GameData';

const WIDTH = Dimensions.get('window').width;
export default class Game extends Component {
  state = {
    cells: Array(9).fill(null),
    disabledCells: Array(9).fill(false),
    nextMoveIsP1: '',
    player1: '',
    player2: '',
    moveCounter: 0,
    winner: '',
    selectedPlayersData: {},
  };

  disableAllCells = () => {
    this.setState({
      disabledCells: Array(9).fill(true),
    });
  };

  checkWinner = () => {
    if (this.state.moveCounter > 4 && this.state.winner === '') {
      const cells = this.state.cells.slice();
      const p1Vals = cells.reduce((prevArr, cell, index) => {
        if (cell === this.state.player1.name) prevArr.push(index);
        return prevArr;
      }, []);

      const p2Vals = cells.reduce((prevArr, cell, index) => {
        if (cell === this.state.player2.name) prevArr.push(index);
        return prevArr;
      }, []);

      if (checkWinner(p1Vals)) {
        this.setState({
          winner: this.state.player1.name,
        });
        this.disableAllCells();
        return this.state.player1.name;
      }
      if (checkWinner(p2Vals)) {
        this.setState({
          winner: this.state.player2,
        });
        this.disableAllCells();
        return this.state.player2;
      } else if (this.state.moveCounter === 9) {
        this.setState({
          winner: 'Tie',
        });
        return 'Tie';
      } else return 'In progress';
    }
  };

  cellClickHandler = i => {
    if (this.state.player1 !== '') {
      const cells = this.state.cells.slice();
      const disabledCells = this.state.disabledCells.slice();
      cells[i] = this.state.nextMoveIsP1
        ? this.state.player1.name
        : this.state.player2.name;
      disabledCells[i] = true;

      this.setState((prevState, state) => {
        return {
          cells: cells,
          nextMoveIsP1: !prevState.nextMoveIsP1,
          disabledCells: disabledCells,
          moveCounter: prevState.moveCounter + 1,
        };
      });
    }
  };

  renderCell = val => {
    return (
      <Cell
        value={this.state.cells[val]}
        onPress={() => this.cellClickHandler(val)}
        disabled={this.state.disabledCells[val]}
      />
    );
  };

  componentDidUpdate() {
    this.checkWinner();
  }

  playerSelectHandler = playerRow => {
    this.setState({
      player1: playerRow.player1,
      player2: playerRow.player2,
      selectedPlayersData: playerRow,
      nextMoveIsP1: true,
    });
  };

  generatePlayerRows = () => {
    return GameData.map(playerRow => {
      return (
        <TouchableOpacity onPress={() => this.playerSelectHandler(playerRow)}>
          <View style={styles.imageRow}>
            <View style={styles.playerImageView}>
              <Image source={playerRow.player1.image} style={styles.image} />
              <Text>{playerRow.player1.name}</Text>
            </View>
            <Text> V </Text>
            <View style={styles.playerImageView}>
              <Image source={playerRow.player2.image} style={styles.image} />
              <Text>{playerRow.player2.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <CoordinatorLayout style={{flex: 1}}>
        <View style={styles.container}>
          <Text>
            {this.state.moveCounter === 9 || this.state.winner !== ''
              ? 'GAME OVER!'
              : this.state.nextMoveIsP1 === ''
              ? 'Select your players!'
              : this.state.nextMoveIsP1 === true
              ? 'Next Move: ' + this.state.player1.name
              : 'Next Move: ' + this.state.player2.name}
          </Text>
          <Text>
            {this.state.winner !== '' && this.state.winner !== 'Tie'
              ? this.state.winner + ' Won'
              : this.state.winner === 'Tie'
              ? 'Its a tie!'
              : null}
          </Text>
          <View style={styles.gameContainer}>
            <View style={styles.gameRow}>
              {this.renderCell(0)}
              {this.renderCell(1)}
              {this.renderCell(2)}
            </View>
            <View style={styles.gameRow}>
              {this.renderCell(3)}
              {this.renderCell(4)}
              {this.renderCell(5)}
            </View>
            <View style={styles.gameRow}>
              {this.renderCell(6)}
              {this.renderCell(7)}
              {this.renderCell(8)}
            </View>
          </View>
        </View>
        <BottomSheetBehavior
          ref="bottomSheet"
          peekHeight={70}
          hideable={false}
          state={BottomSheetBehavior.STATE_COLLAPSED}>
          <View style={{backgroundColor: '#4389f2'}}>
            <View style={{padding: 26, alignItems: 'center'}}>
              <Text>Swipe up and tap to pick your players!</Text>
            </View>
            <ScrollView
              style={{
                backgroundColor: '#fff',
              }}>
              {this.generatePlayerRows()}
            </ScrollView>
          </View>
        </BottomSheetBehavior>
      </CoordinatorLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  gameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: WIDTH * 0.8,
  },
  gameRow: {
    flexDirection: 'row',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 5,
    height: 80,
  },
  playerImageView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
});
