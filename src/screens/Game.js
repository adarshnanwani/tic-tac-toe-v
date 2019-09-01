import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Cell from '../components/Cell';

const WIDTH = Dimensions.get('window').width;
export default class Game extends Component {
  state = {
    cells: Array(9).fill(null),
    disabledCells: Array(9).fill(false),
    nextMoveIsP1: true,
    player1: 'Player 1',
    player2: 'Player 2',
  };

  cellClickHandler = (i) => {
    const cells = this.state.cells.slice();
    const disabledCells = this.state.disabledCells.slice();
    cells[i] = this.state.nextMoveIsP1? 'P1': 'P2';
    disabledCells[i] = true;
    const nextMove = this.state.nextMoveIsP1 ? false : true;
    this.setState({
      cells:cells,
      nextMoveIsP1: nextMove,
      disabledCells:disabledCells
    });
  }

  renderCell = val => {
    return (
      <Cell
        value={this.state.cells[val]}
        onPress={() => this.cellClickHandler(val)}
        disabled= {this.state.disabledCells[val]}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Next Move:{' '}
          {this.state.nextMoveIsP1 ? this.state.player1 : this.state.player2}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: WIDTH*.80,
  },
  gameRow: {
    flexDirection: 'row',
  },
});
