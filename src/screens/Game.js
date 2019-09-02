import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Cell from '../components/Cell';
import {checkWinner} from '../components/GameLogic';

const WIDTH = Dimensions.get('window').width;
export default class Game extends Component {
  state = {
    cells: Array(9).fill(null),
    disabledCells: Array(9).fill(false),
    nextMoveIsP1: true,
    player1: 'Player 1',
    player2: 'Player 2',
    moveCounter: 0,
    winner: '',
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
        if (cell === 'P1') prevArr.push(index);
        return prevArr;
      }, []);

      const p2Vals = cells.reduce((prevArr, cell, index) => {
        if (cell === 'P2') prevArr.push(index);
        return prevArr;
      }, []);

      if (checkWinner(p1Vals)) {
        this.setState({
          winner: 'P1',
        });
        this.disableAllCells();
        return 'P1';
      }
      if (checkWinner(p2Vals)) {
        this.setState({
          winner: 'P2',
        });
        this.disableAllCells();
        return 'P2';
      } else if (this.state.moveCounter === 9) {
        this.setState({
          winner: 'Tie',
        });
        return 'Tie';
      } else return 'In progress';
    }
  };

  cellClickHandler = i => {
    const cells = this.state.cells.slice();
    const disabledCells = this.state.disabledCells.slice();
    cells[i] = this.state.nextMoveIsP1 ? 'P1' : 'P2';
    disabledCells[i] = true;

    this.setState((prevState, state) => {
      return {
        cells: cells,
        nextMoveIsP1: !prevState.nextMoveIsP1,
        disabledCells: disabledCells,
        moveCounter: prevState.moveCounter + 1,
      };
    });
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

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.moveCounter === 9 || this.state.winner !== ''
            ? 'GAME OVER!'
            : this.state.nextMoveIsP1
            ? 'Next Move: ' + this.state.player1
            : 'Next Move: ' + this.state.player2}
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
    width: WIDTH * 0.8,
  },
  gameRow: {
    flexDirection: 'row',
  },
});
